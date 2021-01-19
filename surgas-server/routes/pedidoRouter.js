const fs = require('fs');

const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');

const pedidoRouter = require('express').Router();
pedidoRouter.use(require('body-parser').json());
const pool = db.pool;

pedidoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    if (req.user.tipo == 'cliente') {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }

    //const query = db.buildQuery('producto', req.query);
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
            values.push(params.numeroMinimo);
        }

        if (params.numeroMaximo) {
            conditions.push('numero <= ?');
            values.push(params.numeroMaximo);
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
            values.push('%' + params.direccion + '%');
        }

        if (params.precioBrutoMinimo) {
            conditions.push('precio_bruto >= ?');
            values.push(params.precioBrutoMinimo);
        }

        if (params.precioBrutoMaximo) {
            conditions.push('precio_bruto <= ?');
            values.push(params.precioBrutoMaximo);
        }

        if (params.precioFinalMinimo) {
            conditions.push('precio_final >= ?');
            values.push(params.precioFinalMinimo);
        }

        if (params.precioFinalMaximo) {
            conditions.push('precio_final <= ?');
            values.push(params.precioFinalMaximo);
        }

        if (params.estado) {
            conditions.push('estado = ?');
            values.push(params.estado);
        }

        if (params.bodega) {
            conditions.push('bodega LIKE ?');
            values.push('%' + params.bodega + '%');
        }

        if (params.puntosMinimos) {
            conditions.push('puntos_compra >= ?');
            values.push(params.puntosMinimos);
        }

        if (params.puntosMaximos) {
            conditions.push('puntos_compra <= ?');
            values.push(params.puntosMaximos);
        }

        if (params.tipoCliente) {
            conditions.push('tipo_cliente = ?');
            values.push(params.tipoCliente);
        }

        if (params.nota) {
            conditions.push('nota LIKE ?');
            values.push('%' + params.nota + '%');
        }
    }

    const results = await pool.promise().execute(query + conditions.join(' AND '), values);
    if (results) {
        res.json(JSON.parse(JSON.stringify(results[0])))
    } else {
        throw {
            status: 500
        };
    }
}))
.post(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    const pedido = req.body;

    if (pedido.productos.length == 0) {
        let error = new Error('no hay productos');
        error.status = 400;
        next(error);
    }
    
    let results = await pool.promise().execute('SELECT tipo FROM cliente WHERE telefono = ?', [pedido.cliente_pedidor]);
    const tipoCliente = JSON.parse(JSON.stringify(results[0]))[0].tipo;
    results = await pool.promise().execute('SELECT MAX(numero) AS num FROM pedido WHERE fecha = ?', [pedido.fecha]);
    let numero = JSON.parse(JSON.stringify(results[0]))[0].num;
    if (numero) {
        numero += 1;
    } else {
        numero = 1;
    }
    const date = new Date();
    const hora_registro = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        results = await conn.promise().execute(
            "INSERT INTO pedido(fecha, numero, hora_registro, direccion, estado, tipo_cliente, nota, usuario_registrador, cliente_pedidor) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [pedido.fecha, numero, hora_registro, pedido.direccion, pedido.estado, tipoCliente, pedido.nota, req.user.username, pedido.cliente_pedidor]
        );

        let productos = pedido.productos;
        if (results[0].affectedRows == 1) {
            let precio_bruto = 0;
            for (let i = 0; i < productos.length; i++) {
                results = await conn.promise().execute(
                    'INSERT INTO pedidoxproducto VALUES(?, ?, ?, ?, ?)',
                    [productos[i].codigo, pedido.fecha, numero, productos[i].precio, productos[i].cantidad]
                );

                precio_bruto += productos[i].precio * productos[i].cantidad;

                if (results[0].affectedRows != 1) {
                    conn.rollback();
                    throw {
                        status: 500
                    }
                }
            }
            const precio_final = precio_bruto * (1 - (pedido.descuento / 100));
            
            let query, par, puntos_compra;
            if (pedido.estado == 'verificacion') {
                query = 'UPDATE pedido SET precio_bruto = ?, precio_final = ? WHERE fecha = ? AND numero = ?';
                par = [precio_bruto, precio_final, pedido.fecha, numero];
            } else {
                results = await pool.promise().execute(
                    'SELECT SUM(p.peso) AS peso_total FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
                    [pedido.fecha, pedido.numero]
                );
                const peso_total = JSON.parse(JSON.stringify(results[0])).peso_total;
                results = await pool.promise().execute('SELECT puntos_libra FROM static');
                const puntos_libra = JSON.parse(JSON.stringify(results[0])).puntos_libra;
                puntos_compra = peso_total * puntos_libra;

                query = 'UPDATE pedido SET precio_bruto = ?, precio_final = ?, puntos_compra = ?, empleado_despachador = ? WHERE fecha = ? AND numero = ?';
                par = [precio_bruto, precio_final, puntos_compra, pedido.empleado, pedido.fecha, numero];
            }

            results = await conn.promise().execute(query, par);

            if (results[0].affectedRows == 1) {
                if (pedido.estado = 'verificacion') {
                    query = 'UPDATE cliente SET fecha_ultimo_pedido = ?, numero_ultimo_pedido = ?, numero_pedidos = numero_pedidos + 1, puntos = puntos + ? WHERE telefono = ?';
                    par = [pedido.fecha, numero, puntos_compra, pedido.cliente_pedidor]
                } else {
                    query = 'UPDATE cliente SET fecha_ultimo_pedido = ?, numero_ultimo_pedido = ?, numero_pedidos = numero_pedidos + 1 WHERE telefono = ?';
                    [pedido.fecha, numero, pedido.cliente_pedidor];
                }

                results = await conn.promise().execute(query, par);
                if (results[0].affectedRows == 1) {
                    conn.commit();
                    results = await pool.promise().execute('SELECT * FROM pedido WHERE fecha = ? AND numero = ?', [pedido.fecha, numero]);
                    res.json(JSON.parse(JSON.stringify(results[0])));
                } else {
                    conn.rollback();
                    throw {
                        status: 500
                    }
                }
            } else {
                conn.rollback();
                throw {
                    status: 500
                }
            }
        } else {
            conn.rollback();
            throw {
                status: 500
            }
        }
    });
}))
.put(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    if (req.user.tipo == 'cliente') {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }

    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
    
        let changes = [];
        let values = [];

        const params = req.body;

        if (params.direccion) {
            changes.push('direccion = ? ');
            values.push(params.direccion);
        }

        if (params.nota) {
            changes.push('nota = ? ');
            values.push(params.nota);
        }

        if (params.bodega) {
            changes.push('bodega = ?');
            values.push(params.bodega);
        }
        
        if (params.estado) {
            const estado = params.estado;
            changes.push('estado = ? ');
            values.push(estado);
            if (estado == 'proceso' || estado == 'fiado' || estado == 'pago') {
                let re = await pool.promise().execute(
                    'SELECT estado FROM pedido WHERE fecha = ? AND numero = ?',
                    [params.fecha, params.numero]
                );
                const original = JSON.parse(JSON.stringify(re[0]))[0].estado;
                if (original == 'verificacion' || original == 'cola') {
                    re = await pool.promise().execute(
                        'SELECT producto FROM pedidoxproducto WHERE fecha_pedido = ? AND numero_pedido = ?',
                        [params.fecha, params.numero]
                    );
                    const productos = JSON.parse(JSON.stringify(re[0]));
                    productos.forEach(async (val, idx, arr) => {
                        re = await conn.promise().execute(
                            'UPDATE producto SET inventario = inventario - (SELECT unidades FROM pedidoxproducto WHERE producto = ? AND fecha_pedido = ? AND numero_pedido = ?) WHERE codigo = ?',
                            [val.producto, params.fecha, params.numero, val.producto]
                        );
                    });
                }
            }
        }

        if (params.empleado) {
            changes.push('empleado_despachador = ? ');
            values.push(params.empleado);
        }

        values.push(params.fecha);
        values.push(params.numero);

        const result = await conn.promise().execute(
            'UPDATE pedido SET ' + changes.join(', ') + 'WHERE fecha = ? AND numero = ?',
            values
        );
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'pedido updated successfully'
            });
        } else {
            conn.rollback();
            next(new Error('update error'));
        }
    });
}));

pedidoRouter.get('/:fecha/:numero', auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    if (req.user.tipo == 'cliente') {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }

    const results = await pool.promise().execute(
        'SELECT p.codigo AS codigo, p.nombre AS nombre, p.color AS color, p.peso AS peso, pp.precio_venta AS precio, pp.cantidad AS cantidad FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [req.params.fecha, req.params.numero]
    );

    if (results) {
        res.json(JSON.parse(JSON.stringify(results[0])));
    } else {
        throw {
            status: 500
        };
    }
}));

pedidoRouter.post('/verify', auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    if (req.user.tipo == 'cliente') {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }

    const pedido = req.body;

    let results = await pool.promise().execute(
        'SELECT SUM(p.peso) AS peso_total FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [pedido.fecha, pedido.numero]
    );
    const peso_total = JSON.parse(JSON.stringify(results[0])).peso_total;
    results = await pool.promise().execute('SELECT puntos_libra FROM static');
    const puntos_libra = JSON.parse(JSON.stringify(results[0])).puntos_libra;
    const puntos_compra = peso_total * puntos_libra;
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        results = await conn.promise().execute(
            "UPDATE pedido SET estado = 'cola', puntos_compra = ?, bodega = ? WHERE fecha = ? AND numero = ?",
            [puntos_compra, pedido.bodega, pedido.fecha, pedido.numero]
        );

        if (results[0].affectedRows == 1) {
            results = await conn.promise().execute(
                "UPDATE cliente SET puntos = puntos + (SELECT puntos_compra FROM pedido WHERE fecha = ? AND numero = ?) WHERE telefono = (SELECT cliente_pedidor FROM pedido WHERE fecha = ? AND numero = ?)",
                [pedido.fecha, pedido.numero, pedido.fecha, pedido.numero]
            );

            if (results[0].affectedRows == 1) {
                conn.commit();
                res.json({
                    msg: 'puntos adicionados'
                });
            } else {
                conn.rollback();
                throw {
                    status: 500
                }
            }
        } else {
            conn.rollback();
            throw {
                status: 500
            }
        }
    });
}));

pedidoRouter.get('/stats', asyncHandler(async (req, res, next) => {
    const results = await pool.promise().execute('SELECT fecha, COUNT(*) AS cantidad FROM pedido GROUP BY fecha');
    res.json(JSON.parse(JSON.stringify(results[0])));
}));

pedidoRouter.post('/print', asyncHandler(async (req, res, next) => {
    const body = req.body;
    const result = await pool.promise().execute(
        'SELECT pe.cliente_pedidor AS telefono, pe.direccion AS direccion, pe.nota AS nota, pe.precio_final AS precio_final, pe.puntos_compra AS puntos_compra pe.empleado_despachador AS empd, p.nombre AS nombre, p.color AS color, p.peso AS peso, pp.precio_venta AS precio, pp.unidades AS unidades FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [body.fecha, body.numero]
    );
    const results = JSON.parse(JSON.stringify(result[0]));
    const ped = results[0];

    let cabecera = ""+
        "FECHA: "+body.fecha+"\n"+
        "NUMERO DE PEDIDO: "+body.numero+"\n"+
        "MENSAJERO: "+ped.empd+"\n"+
        "===================================\n";
    
    let productos = "| Nombre\t| Color\t| Peso\t| Precio\t| Unidades\t|\n";
    for (let i = 0; i < results.length; i++) {
        let prod = results[i];
        productos += "| " + prod.nombre + "\t| " + prod.peso + "\t| " + prod.precio + "\t| " + prod.unidades + "\t|\n";
    }
    productos += "===================================\n";

    let datos = ""+
        "TELEFONO: "+ped.telefono+"\n"+
        "DIRECCION:"+ped.direccion+"\n"+
        "NOTA: "+ped.nota+"\n"+
        "===================================\n";
    
    let final = ""+
        "TOTAL A PAGAR: "+ped.precio_final+"\n"+
        "PUNTOS DESPUES DE COMPRA: "+ped.puntos_compra+"\n"+
        "\n \n";
    
    fs.writeFile(
        'G:\\Unidades compartidas\\suru-works\\surgas\\Impresoras\\' + body.impresora + '\\' + body.fecha + '_' + body.numero + '.txt',
        cabecera + datos + productos + final,
        (err, file) => {
            if (err) {
                let error = new Error('error en el recibo');
                error.status = 500;
                next(error);
            }
            res.json({
                msg: 'recibo creado correctamente'
            });
        }
    );
}));

module.exports = pedidoRouter;