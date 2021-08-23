const fs = require('fs');
const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');
const { values } = require('mysql2/lib/constants/charset_encodings');

const pool = db.pool;

const pedidoRouter = require('express').Router();
pedidoRouter.use(require('body-parser').json());

pedidoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    if (req.user.cliente) {
        let err = new Error('not authorized');
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

        if (params.municipio) {
            conditions.push('municipio LIKE ?');
            values.push('%' + params.municipio + '%');
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

    const [results,] = await pool.execute(query + conditions.join(' AND '), values);

    res.json(utils.parseToJSON(results));
}))
.post(auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    const pedido = req.body;

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
            'CALL proc_pedido_insertar(?, ?, ?, ?, ?, ?, ?)',
            [pedido.direccion, pedido.municipio, pedido_estado, pedido.bodega, pedido.nota, pedido.empleado_vendedor, pedido.cliente_pedidor]
        );
        const pk = utils.parseToJSON(results)[0][0];

        let productos = pedido.productos;

        let precio_bruto = 0;
        let precio_final = 0;

        for (let i = 0; i < productos.length; i++) {
            let producto = productos[i];

            [results, ] = await conn.execute(
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
    } catch(err) {
        await conn.rollback();
        conn.release();
        next(err);
    }
}));

pedidoRouter.route('/:fecha/:numero')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}, auth.isAuthenticated)
.put(asyncHandler(async (req, res, next) => {
    if (!req.user.empleado) {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }

    const conn = await pool.getConnection();

    const fecha = req.params.fecha;
    const numero = req.params.numero;
    const body = req.body;
    let changes = [];
    let values = [];

    if (body.estado) {
        const estado = body.estado;
        changes.push('estado = ? ');
        values.push(estado);

        if (estado == 'fiado' || estado == 'pago') {
            await conn.execute(
                'CALL proc_pedido_inventario_puntos(?, ?)',
                [fecha, numero]
            )
        }
    }

    if (body.direccion) {
        changes.push('direccion = ? ');
        values.push(body.direccion);
    }

    if (body.municipio) {
        changes.push('municipio = ? ');
        values.push(body.municipio);
    }

    if (body.bodega) {
        changes.push('bodega = ? ');
        values.push(body.bodega);
    }

    if (body.nota) {
        changes.push('nota = ? ');
        values.push(body.nota);
    }

    if (body.empleado_repartidor) {
        changes.push('empleado_repartidor = ? ');
        values.push(body.empleado_repartidor);
    }

    values.push(fecha);
    values.push(numero);

    await conn.execute(
        'UPDATE pedido SET ' + changes.join(', ') + 'WHERE fecha = ? AND numero = ?',
        values
    );
    
    conn.release();
    
    res.json({
        success: true,
        msg: 'order updated successfully'
    });
}));

pedidoRouter.get('/:fecha/:numero/productos', auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    if (!req.user.empleado) {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }

    const pedido = req.params;

    const [results,] = await pool.execute(
        'SELECT p.codigo AS codigo, p.nombre AS nombre, p.color AS color, p.peso AS peso, p.tipo AS tipo, pp.precio_venta AS precio, pp.cantidad AS cantidad FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [pedido.fecha, pedido.numero]
    );

    res.json(utils.parseToJSON(results));
}));

pedidoRouter.get('/stats', asyncHandler(async (req, res, next) => {
    const [results,] = await pool.execute('SELECT fecha, COUNT(*) AS cantidad FROM pedido GROUP BY fecha');

    res.json(utils.parseToJSON(results));
}));

pedidoRouter.post('/print', asyncHandler(async (req, res, next) => {
    const body = req.body;
    const [result,] = await pool.execute(
        'SELECT pe.cliente_pedidor AS telefono, pe.direccion AS direccion, pe.nota AS nota, pe.precio_final AS precio_final, pe.puntos_compra AS puntos_compra pe.empleado_despachador AS empd, p.nombre AS nombre, p.color AS color, p.peso AS peso, pp.precio_venta AS precio, pp.unidades AS unidades FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [body.fecha, body.numero]
    );
    const results = utils.parseToJSON(result);
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