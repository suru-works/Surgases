const fs = require('fs').promises;
const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');
const utils = require('../utils');
const crypto = require('crypto');

const { values } = require('mysql2/lib/constants/charset_encodings');
const { ok } = require('assert');

const pool = db.pool;

const pedidoRouter = require('express').Router();
pedidoRouter.use(require('body-parser').json());

pedidoRouter.route("/")
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
        if (!req.user.empleado) {
            let err = new Error('solo los empleados pueden consultar pedidos');
            err.status = 403;
            next(err);
        }

        let query = 'SELECT * FROM pedido';
        const params = req.query;
        let conditions = [];
        let values = [];

        if (Object.keys(params).length !== 0) {
            query = query + ' WHERE ';

            if (params.fechaMinima) {
                conditions.push('fecha >= ?');
                values.push(params.fechaMinima);
            }

            if (params.fechaMaxima) {
                conditions.push('fecha <= ?');
                values.push(params.fechaMaxima);
            }

            if (params.numeroMinimo) {
                conditions.push('numero >= ?');
                values.push(parseInt(params.numeroMinimo));
            }

            if (params.numeroMaximo) {
                conditions.push('numero <= ?');
                values.push(parseInt(params.numeroMaximo));
            }

            if (params.horaMinima) {
                conditions.push('hora_registro >= ?');
                values.push(params.horaMinima);
            }

            if (params.horaMaxima) {
                conditions.push('hora_registro <= ?');
                values.push(params.horaMaxima);
            }

            if (params.direccion) {
                conditions.push('direccion LIKE ?');
                values.push(`%${params.direccion}%`);
            }

            if (params.municipio) {
                conditions.push('municipio LIKE ?');
                values.push(`%${params.municipio}%`);
            }

            if (params.precioBrutoMinimo) {
                conditions.push('precio_bruto >= ?');
                values.push(parseInt(params.precioBrutoMinimo));
            }

            if (params.precioBrutoMaximo) {
                conditions.push('precio_bruto <= ?');
                values.push(parseInt(params.precioBrutoMaximo));
            }

            if (params.precioFinalMinimo) {
                conditions.push('precio_final >= ?');
                values.push(parseFloat(params.precioFinalMinimo));
            }

            if (params.precioFinalMaximo) {
                conditions.push('precio_final <= ?');
                values.push(parseFloat(params.precioFinalMaximo));
            }

            if (params.estado) {
                conditions.push('estado = ?');
                values.push(params.estado);
            }

            if (params.bodega) {
                conditions.push('bodega LIKE ?');
                values.push(`%${params.bodega}%`);
            }

            if (params.puntosMinimos) {
                conditions.push('puntos_compra >= ?');
                values.push(parseInt(params.puntosMinimos));
            }

            if (params.puntosMaximos) {
                conditions.push('puntos_compra <= ?');
                values.push(parseInt(params.puntosMaximos));
            }

            if (params.tipoCliente) {
                conditions.push('tipo_cliente = ?');
                values.push(params.tipoCliente);
            }

            if (params.nota) {
                conditions.push('nota LIKE ?');
                values.push(`%${params.nota}%`);
            }
        }

        const [results,] = await pool.execute(query + conditions.join(' AND '), values);

        res.json(utils.soloFechas(results, 'fecha'));
    }))
    .post(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
        const pedido = req.body;
        const productos = pedido.productos;

        if (pedido.productos.length == 0) {
            let error = new Error('no hay productos');
            error.status = 400;
            next(error);
        }

        const conn = await pool.getConnection();

        await conn.beginTransaction();

        try {
            let pedido_estado;
            if (req.user.empleado) {
                pedido_estado = 'cola';
            } else if (req.user.cliente) {
                pedido_estado = 'verificacion';
            } else {
                throw new Error('usuario no es ni cliente ni empleado');
            }
            let [results,] = await conn.execute(
                'CALL proc_pedido_insertar(?, ?, ?, ?, ?, ?, ?, ?)',
                [pedido.direccion, pedido.municipio, pedido_estado, pedido.bodega, pedido.nota, req.user.empleado, pedido.empleado_repartidor, pedido.cliente_pedidor]
            );
            let pk = utils.parseToJSON(results)[0][0];
            pk.fecha = pk.fecha.substring(0, 10);

            let precio_bruto = 0;
            let precio_final = 0;

            for (let i = 0; i < productos.length; i++) {
                let producto = productos[i];

                [results,] = await conn.execute(
                    'CALL proc_pedidoxproducto_insertar(?, ?, ?, ?, ?, ?)',
                    [producto.codigo, pk.fecha, pk.numero, producto.precio, producto.cantidad, pedido.cliente_pedidor]
                );
                const precios = utils.parseToJSON(results)[0][0];

                precio_bruto += precios.precio_bruto;
                precio_final += precios.precio_final;
            }

            await conn.execute(
                'UPDATE pedido SET precio_bruto = ?, precio_final = ? WHERE fecha = ? AND numero = ?',
                [precio_bruto, precio_final, pk.fecha, pk.numero]
            );

            await conn.commit();
            conn.release();

            res.json({
                fecha: pk.fecha,
                numero: pk.numero
            });
        } catch (err) {
            await conn.rollback();
            conn.release();
            next(err);
        }
    }));

pedidoRouter.route('/:fecha/:numero')
    .all(auth.isEmployee, (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    }, auth.isAuthenticated)
    .get(asyncHandler(async (req, res, next) => {
        const params = req.params;

        const [result,] = await pool.execute('SELECT * FROM pedido WHERE fecha = ? AND numero = ?', [params.fecha, params.numero]);

        res.json(utils.soloFechas(result, 'fecha')[0]);
    }))
    .put(asyncHandler(async (req, res, next) => {
        const conn = await pool.getConnection();

        await conn.beginTransaction();

        try {
            const fecha = req.params.fecha;
            const numero = req.params.numero;
            const body = req.body;
            let changes = [];
            let values = [];

            let [results,] = await conn.execute('SELECT * FROM pedido WHERE fecha = ? AND numero = ?', [fecha, numero]);
            const pedidos = utils.parseToJSON(results);

            if (pedidos.length > 0) {
                const estado_actual = pedidos[0].estado;
                const cliente_pedidor = pedidos[0].cliente_pedidor;
                const fiado = estado_actual == 'fiado';
                const pago = estado_actual == 'pago';
                const estado = body.estado;

                if (!fiado && !pago) {
                    if (body.direccion) {
                        changes.push('direccion = ?');
                        values.push(body.direccion);
                    }

                    if (body.municipio) {
                        changes.push('municipio = ?');
                        values.push(body.municipio);
                    }

                    if (body.bodega) {
                        changes.push('bodega = ?');
                        values.push(body.bodega);
                    }

                    if (body.nota) {
                        changes.push('nota = ?');
                        values.push(body.nota);
                    }

                    if (body.empleado_repartidor) {
                        changes.push('empleado_repartidor = ?');
                        values.push(body.empleado_repartidor);
                    }

                    if (body.productos) {
                        const productos = body.productos;

                        let precio_bruto = 0;
                        let precio_final = 0;

                        for (let i = 0; i < productos.length; i++) {
                            let precios;

                            let producto = productos[i];
                            let modificacion = producto.modificacion;

                            if (modificacion == 'insert') {
                                [results,] = await conn.execute(
                                    'CALL proc_pedidoxproducto_insertar(?, ?, ?, ?, ?, ?)',
                                    [producto.codigo, fecha, numero, producto.precio, producto.cantidad, cliente_pedidor]
                                );
                                precios = utils.parseToJSON(results)[0][0];

                                precio_bruto += precios.precio_bruto;
                                precio_final += precios.precio_final;
                            } else if (modificacion == 'update') {
                                [results,] = await conn.execute(
                                    'CALL proc_pedidoxproducto_actualizar(?, ?, ?, ?, ?)',
                                    [producto.codigo, fecha, numero, producto.precio, producto.cantidad]
                                );
                                precios = utils.parseToJSON(results)[0][0];

                                precio_bruto -= precios.precio_bruto_original;
                                precio_bruto += precios.precio_bruto_nuevo;
                                precio_final -= precios.precio_final_original;
                                precio_final += precios.precio_final_nuevo;
                            } else if (modificacion == 'delete') {
                                [results,] = await conn.execute(
                                    'CALL proc_pedidoxproducto_eliminar(?, ?, ?)',
                                    [producto.codigo, fecha, numero]
                                );
                                const precios = utils.parseToJSON(results)[0][0];

                                precio_bruto -= precios.precio_bruto;
                                precio_final -= precios.precio_final;
                            }
                        }

                        changes.push('precio_bruto = precio_bruto + ?');
                        values.push(precio_bruto);

                        changes.push('precio_final = precio_final + ?');
                        values.push(precio_final);
                    }

                    if (estado) {
                        changes.push('estado = ?');
                        values.push(estado);

                        if (estado == 'fiado' || estado == 'pago') {
                            await conn.execute(
                                'CALL proc_pedido_inventario_puntos(?, ?)',
                                [fecha, numero]
                            );
                        }
                    }

                    values.push(fecha);
                    values.push(numero);

                    await conn.execute(
                        'UPDATE pedido SET ' + changes.join(', ') + 'WHERE fecha = ? AND numero = ?',
                        values
                    );

                    await conn.commit();

                    conn.release();

                    res.json({
                        success: true,
                        msg: 'order updated successfully'
                    });
                } else if (fiado && estado && estado == 'pago') {
                    await conn.execute("UPDATE pedido SET estado = 'pago' WHERE fecha = ? AND numero = ?", [fecha, numero]);

                    await conn.commit();

                    conn.release();

                    res.json({
                        success: true
                    });
                } else {
                    let error = new Error('No se puede modificar este pedido');
                    error.status = 403;
                    throw error;
                }
            } else {
                let error = new Error('El pedido no existe');
                error.status = 404;
                throw error;
            }
        } catch (err) {
            await conn.rollback();
            conn.release();
            next(err);
        }
    }));

pedidoRouter.get('/:fecha/:numero/productos', auth.isAuthenticated, auth.isEmployee, asyncHandler(async (req, res, next) => {
    const pedido = req.params;

    const [results,] = await pool.execute(
        'WITH pexpp AS (SELECT * FROM pedido pe INNER JOIN pedidoxproducto pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) SELECT p.codigo AS codigo, p.nombre AS nombre, p.color AS color, p.peso AS peso, p.tipo AS tipo, pexpp.precio_venta AS precio, pexpp.unidades AS cantidad FROM pexpp INNER JOIN producto p ON pexpp.producto = p.codigo WHERE pexpp.fecha = ? AND pexpp.numero = ?',
        [pedido.fecha, pedido.numero]
    );
    res.json(utils.parseToJSON(results));
}));

pedidoRouter.get('/stats', asyncHandler(async (req, res, next) => {
    const [results,] = await pool.execute('SELECT fecha, COUNT(*) AS cantidad FROM pedido GROUP BY fecha');

    res.json(utils.parseToJSON(results));
}));

pedidoRouter.get('/last-product-price/:codigo/:telefono', auth.isAuthenticated, auth.isEmployee, asyncHandler(async (req, res, next) => {
    const params = req.params;

    const conn = await pool.getConnection();

    let [result,] = await conn.execute("SELECT * FROM empleado WHERE id = ? AND tipo LIKE '%vendedor%'", [req.user.empleado]);
    const empleado = utils.parseToJSON(result)[0];

    if (empleado) {
        [result,] = await conn.execute(
            'SELECT precio_venta FROM pedidoxproducto WHERE (fecha_pedido, numero_pedido) IN (SELECT fecha, numero FROM pedido WHERE cliente_pedidor = ?) AND producto = ? ORDER BY fecha_pedido, numero_pedido DESC',
            [params.telefono, params.codigo]
        );

        conn.release();

        res.json(utils.parseToJSON(result)[0]);
    } else {
        conn.release();

        let err = new Error('El empleado no es un vendedor');
        err.status = 403;
        next(err);
    }
}));

pedidoRouter.post('/print/:printings', asyncHandler(async (req, res, next) => {
    const body = req.body;
    const [result,] = await pool.execute(
        'SELECT pe.cliente_pedidor AS telefono, pe.direccion AS direccion, pe.nota AS nota, pe.precio_final AS precio_final, pe.puntos_compra AS puntos_compra, pe.empleado_repartidor AS empd, p.nombre AS nombre, p.color AS color, p.peso AS peso, pp.precio_venta AS precio, pp.valor_iva AS iva, pp.descuento AS descuento, pp.unidades AS unidades FROM (pedido pe INNER JOIN pedidoxproducto pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [body.fecha, body.numero]
    );
    const results = utils.parseToJSON(result);
    const ped = results[0];

    let cabecera = `FECHA: ${body.fecha}
    NUMERO DE PEDIDO: ${body.numero}
    MENSAJERO: ${ped.empd}
    TELEFONO: ${ped.telefono}
    DIRECCION: ${ped.direccion}
    NOTA: ${ped.nota}
    ===================================`;

    let productos = "| Nombre\t| Color\t| Peso\t| Precio\t| IVA\t| Descuento\t| Unidades\t| Valor Final\n";
    for (let i = 0; i < results.length; i++) {
        let prod = results[i];
        productos += `| ${prod.nombre}\t| ${prod.color}\t| ${prod.peso}\t| ${prod.precio}\t| ${prod.iva}\t| ${prod.descuento}\t| ${prod.unidades}\t| ${(prod.precio + prod.iva) * (100 - prod.descuento) / 100}`;
    }
    productos += "===================================\n";

    let final = `TOTAL A PAGAR: ${ped.precio_final}
    PUNTOS DESPUES DE COMPRA: ${ped.puntos_compra}`
    let hash = '';
    let hashAnterior = '';
    for (let i = 0; i < req.params.printings && i<5; i++) {
        hash = crypto.randomBytes(20).toString('hex');
        while (hash == hashAnterior) {
            hash = crypto.randomBytes(20).toString('hex');
        }
        await fs.writeFile(
            `${process.env.PRINTERS_PATH}\\${body.impresora}\\${body.fecha}_${body.numero}_${hash}.factura`,
            cabecera + productos + final
        );
        hashAnterior = hash;
    }

    res.json({
        msg: 'recibo creado correctamente'
    });
}));

module.exports = pedidoRouter;