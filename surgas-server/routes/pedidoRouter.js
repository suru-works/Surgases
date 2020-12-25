const db = require('../db');
const asyncHandler = require('express-async-handler');

const pedidoRouter = require('express').Router();
pedidoRouter.use(require('body-parser').json());
const pool = db.pool;

pedidoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const params = req.query;

    let query = '';

    if (params.type == 'comun') {
        query = ''
        + 'SELECT'
        + ' pedido.horaRegistro AS hora',
        + ' pedido.numero AS numero',
        + ' pedido.id_cliente AS cliente',
        + ' pedido.direccion AS direccion',
        + ' pedido.id_municipio AS municipio',
        + ' pedido.nota AS nota',
        + ' pedido.precio_total AS precio_total',
        + ' pedido.estado AS estado',
        + ' pedido.id_usuario AS usuario',
        + ' pedido.id_empleado AS empleado',
        + ' pedido.tipo AS tipo',
        + ' pedido.bodega AS bodega',
        + ' productomxpedido.consecutivo AS consecutivo',
        + ' productomxpedido.id_productom_codigo AS codigo_producto',
        + ' productomxpedido.nombre AS nombre_producto',
        + ' productomxpedido.color AS color_producto',
        + ' productomxpedido.peso AS peso_producto',
        + ' productomxpedido.precio AS precio_unidad_ofertado',
        + ' productomxpedido.puntos AS puntos_unidad'
        + ' FROM pedido INNER JOIN productomxpedido'
        + ' ON pedido.fecha = productomxpedido.id_pedido_fecha AND pedido.numero = productomxpedido.id_pedido_numero'
        + ' WHERE'
        + ' fecha BETWEEN ? AND ?'
        + ' AND hora LIKE ?'
        + ' AND numero LIKE ?'
        + ' AND cliente LIKE ?'
        + ' AND direccion LIKE ?'
        + ' AND municipio LIKE ?'
        + ' AND precio_total LIKE ?'
        + ' AND empleado LIKE ?'
        + ' AND tipo LIKE ?'
        + ' AND bodega LIKE ?'
        + ' AND nota LIKE ?'
        + ' AND usuario LIKE ?'
        + ' AND consecutivo LIKE ?'
        + ' AND codigo_producto LIKE ?'
        + ' AND nombre_producto LIKE ?'
        + ' AND color_producto LIKE ?'
        + ' AND peso_producto LIKE ?'
        + ' AND precio_unidad_ofertado LIKE ?'
        + ' AND puntos_unidad LIKE ?';
    } else if (params.type == 'empresarial') {
        query = ''
        + 'SELECT'
        + ' pedido.horaRegistro AS hora',
        + ' pedido.numero AS numero',
        + ' pedido.id_cliente AS cliente',
        + ' pedido.direccion AS direccion',
        + ' pedido.id_municipio AS municipio',
        + ' pedido.nota AS nota',
        + ' pedido.precio_total AS precio_total',
        + ' pedido.estado AS estado',
        + ' pedido.id_usuario AS usuario',
        + ' pedido.id_empleado AS empleado',
        + ' pedido.tipo AS tipo',
        + ' pedido.bodega AS bodega',
        + ' productoexpedido.consecutivo AS consecutivo',
        + ' productoexpedido.id_productom_codigo AS codigo_producto',
        + ' productoexpedido.nombre AS nombre_producto',
        + ' productoexpedido.color AS color_producto',
        + ' productoexpedido.peso AS peso_producto',
        + ' productoexpedido.precio AS precio_unidad_ofertado',
        + ' productoexpedido.puntos AS puntos_unidad'
        + ' FROM pedido INNER JOIN productoexpedido'
        + ' ON pedido.fecha = productoexpedido.id_pedido_fecha AND pedido.numero = productoexpedido.id_pedido_numero'
        + ' WHERE'
        + ' fecha BETWEEN ? AND ?'
        + ' AND hora LIKE ?'
        + ' AND numero LIKE ?'
        + ' AND cliente LIKE ?'
        + ' AND direccion LIKE ?'
        + ' AND municipio LIKE ?'
        + ' AND precio_total LIKE ?'
        + ' AND empleado LIKE ?'
        + ' AND tipo LIKE ?'
        + ' AND bodega LIKE ?'
        + ' AND nota LIKE ?'
        + ' AND usuario LIKE ?'
        + ' AND consecutivo LIKE ?'
        + ' AND codigo_producto LIKE ?'
        + ' AND nombre_producto LIKE ?'
        + ' AND color_producto LIKE ?'
        + ' AND peso_producto LIKE ?'
        + ' AND precio_unidad_ofertado LIKE ?'
        + ' AND puntos_unidad LIKE ?';
    } else {
        query = 'SELECT * FROM'
        + ' ((SELECT'
        + ' pedido.horaRegistro AS hora',
        + ' pedido.numero AS numero',
        + ' pedido.id_cliente AS cliente',
        + ' pedido.direccion AS direccion',
        + ' pedido.id_municipio AS municipio',
        + ' pedido.nota AS nota',
        + ' pedido.precio_total AS precio_total',
        + ' pedido.estado AS estado',
        + ' pedido.id_usuario AS usuario',
        + ' pedido.id_empleado AS empleado',
        + ' pedido.tipo AS tipo',
        + ' pedido.bodega AS bodega',
        + ' productomxpedido.consecutivo AS consecutivo',
        + ' productomxpedido.id_productom_codigo AS codigo_producto',
        + ' productomxpedido.nombre AS nombre_producto',
        + ' productomxpedido.color AS color_producto',
        + ' productomxpedido.peso AS peso_producto',
        + ' productomxpedido.precio AS precio_unidad_ofertado',
        + ' productomxpedido.puntos AS puntos_unidad'
        + ' FROM pedido INNER JOIN productomxpedido'
        + ' ON pedido.fecha = productomxpedido.id_pedido_fecha AND pedido.numero = productomxpedido.id_pedido_numero)'
        + ' UNION'
        + ' (SELECT'
        + ' pedido.horaRegistro AS hora',
        + ' pedido.numero AS numero',
        + ' pedido.id_cliente AS cliente',
        + ' pedido.direccion AS direccion',
        + ' pedido.id_municipio AS municipio',
        + ' pedido.nota AS nota',
        + ' pedido.precio_total AS precio_total',
        + ' pedido.estado AS estado',
        + ' pedido.id_usuario AS usuario',
        + ' pedido.id_empleado AS empleado',
        + ' pedido.tipo AS tipo',
        + ' pedido.bodega AS bodega',
        + ' productoexpedido.consecutivo AS consecutivo',
        + ' productoexpedido.id_productom_codigo AS codigo_producto',
        + ' productoexpedido.nombre AS nombre_producto',
        + ' productoexpedido.color AS color_producto',
        + ' productoexpedido.peso AS peso_producto',
        + ' productoexpedido.precio AS precio_unidad_ofertado',
        + ' productoexpedido.puntos AS puntos_unidad'
        + ' FROM pedido INNER JOIN productoexpedido'
        + ' ON pedido.fecha = productoexpedido.id_pedido_fecha AND pedido.numero = productoexpedido.id_pedido_numero))'
        + ' WHERE'
        + ' fecha BETWEEN ? AND ?'
        + ' AND hora LIKE ?'
        + ' AND numero LIKE ?'
        + ' AND cliente LIKE ?'
        + ' AND direccion LIKE ?'
        + ' AND municipio LIKE ?'
        + ' AND precio_total LIKE ?'
        + ' AND empleado LIKE ?'
        + ' AND tipo LIKE ?'
        + ' AND bodega LIKE ?'
        + ' AND nota LIKE ?'
        + ' AND usuario LIKE ?'
        + ' AND consecutivo LIKE ?'
        + ' AND codigo_producto LIKE ?'
        + ' AND nombre_producto LIKE ?'
        + ' AND color_producto LIKE ?'
        + ' AND peso_producto LIKE ?'
        + ' AND precio_unidad_ofertado LIKE ?'
        + ' AND puntos_unidad LIKE ?';
    }
    
    const results = await db.pool.promise().execute(query, [
        params.fechaInicio,
        params.fechaFin,
        params.hora,
        params.numero,
        params.cliente,
        params.direccion,
        params.municipio,
        params.precio_total,
        params.empleado,
        params.tipo,
        params.bodega,
        params.nota,
        params.usuario,
        params.consecutivo,
        params.codigo_producto,
        params.nombre_producto,
        params.color_producto,
        params.peso_producto,
        params.precio_unidad_ofertado,
        params.puntos_unidad
    ]);

    if (results) {
        res.json(JSON.parse(JSON.stringify(results[0])));
    } else {
        throw {
            status: 500
        };
    }
}))
.post(asyncHandler(async (req, res, next) => {
    
}));

/*
comun:
SELECT pedido.fecha AS fecha, pedido.horaRegistro AS hora, pedido.numero AS numero, pedido.id_cliente AS cliente,
pedido.direccion AS direccion, pedido.id_municipio AS municipio, pedido.nota AS nota, pedido.precio_total AS precio_total,
pedido.estado AS estado, pedido.id_usuario AS usuario, pedido.id_empleado AS empleado, pedido.tipo AS tipo, pedido.bodega AS bodega,
productomxpedido.consecutivo,productomxpedido.id_productom_codigo AS codigo_producto ,productomxpedido.nombre, productomxpedido.color,
productomxpedido.peso, productomxpedido.precio AS precio_unidad_ofertado, productomxpedido.puntos AS puntos_unidad
FROM pedido INNER JOIN productomxpedido ON pedido.fecha = productomxpedido.id_pedido_fecha
AND pedido.numero = productomxpedido.id_pedido_numero INNER JOIN productom ON productomxpedido.id_productom_codigo = productom.codigo

(SELECT pedido.fecha AS fecha, pedido.horaRegistro AS hora, pedido.numero AS numero, pedido.id_cliente AS cliente,
    pedido.direccion AS direccion, pedido.id_municipio AS municipio, pedido.nota AS nota, pedido.precio_total AS precio_total,
    pedido.estado AS estado, pedido.id_usuario AS usuario, pedido.id_empleado AS empleado, pedido.tipo AS tipo, pedido.bodega AS bodega,
    productoexpedido.consecutivo,productoexpedido.id_productoe_codigo AS codigo_producto ,productoexpedido.nombre,
    productoexpedido.color,productoexpedido.peso, productoexpedido.precio AS precio_unidad_ofertado,
    productoexpedido.puntos AS puntos_unidad FROM pedido INNER JOIN productoexpedido ON pedido.fecha = productoexpedido.id_pedido_fecha
    AND pedido.numero = productoexpedido.id_pedido_numero INNER JOIN productoe ON productoexpedido.id_productoe_codigo = productoe.codigo)

SELECT * FROM ("+consulta +") AS resultado WHERE (fecha <= '"+fecha+"' AND fecha >= '"+fechaInicial+"' AND hora like '"+hora+"' AND numero like '"+numero+"' AND cliente LIKE '"+cliente+"' AND direccion LIKE '"+direccion+"' AND municipio LIKE '"+municipio+"' AND precio_total LIKE '"+precio_total+"' AND empleado LIKE '"+empleado+"' AND estado LIKE '"+estado+"' AND tipo LIKE '"+tipo+"' AND bodega LIKE '"+bodega+"' AND nota LIKE '"+nota+"' AND usuario LIKE '"+usuario+"' AND consecutivo like '"+concecutivo+"' AND codigo_producto LIKE '"+codigo_producto+"' AND nombre LIKE '"+nombre+"' AND color LIKE '"+color+"' AND peso LIKE '"+peso+"' AND precio_unidad_ofertado LIKE '"+precio_ofertado+"' AND puntos_unidad LIKE '"+puntos_unidad+"')" 

(SELECT
    pedido.fecha AS fecha,
    pedido.horaRegistro AS hora,
    pedido.numero AS numero,
    pedido.id_cliente AS cliente,
    pedido.direccion AS direccion,
    pedido.id_municipio AS municipio,
    pedido.nota AS nota,
    pedido.precio_total AS precio_total,
    pedido.estado AS estado,
    pedido.id_usuario AS usuario,
    pedido.id_empleado AS empleado,
    pedido.tipo AS tipo,
    pedido.bodega AS bodega,
    productomxpedido.consecutivo,
    productomxpedido.id_productom_codigo AS codigo_producto,
    productomxpedido.nombre,
    productomxpedido.color,
    productomxpedido.peso,
    productomxpedido.precio AS precio_unidad_ofertado,
    productomxpedido.puntos AS puntos_unidad
FROM
    pedido
    INNER JOIN productomxpedido ON pedido.fecha = productomxpedido.id_pedido_fecha AND pedido.numero = productomxpedido.id_pedido_numero
    INNER JOIN productom ON productomxpedido.id_productom_codigo = productom.codigo)
UNION
(SELECT
    pedido.fecha AS fecha,
    pedido.horaRegistro AS hora,
    pedido.numero AS numero,
    pedido.id_cliente AS cliente,
    pedido.direccion AS direccion,
    pedido.id_municipio AS municipio,
    pedido.nota AS nota,
    pedido.precio_total AS precio_total,
    pedido.estado AS estado,
    pedido.id_usuario AS usuario,
    pedido.id_empleado AS empleado,
    pedido.tipo AS tipo,
    pedido.bodega AS bodega,
    productoexpedido.consecutivo,
    productoexpedido.id_productoe_codigo AS codigo_producto,
    productoexpedido.nombre,
    productoexpedido.color,
    productoexpedido.peso,
    productoexpedido.precio AS precio_unidad_ofertado,
    productoexpedido.puntos AS puntos_unidad
FROM pedido
    INNER JOIN productoexpedido ON pedido.fecha = productoexpedido.id_pedido_fecha AND pedido.numero = productoexpedido.id_pedido_numero
    INNER JOIN productoe ON productoexpedido.id_productoe_codigo = productoe.codigo)


WHERE
(fecha <= '"+fecha+"' AND fecha >= '"+fechaInicial+"'
AND hora like '"+hora+"'
AND numero like '"+numero+"'
AND cliente LIKE '"+cliente+"'
AND direccion LIKE '"+direccion+"'
AND municipio LIKE '"+municipio+"'
AND precio_total LIKE '"+precio_total+"'
AND empleado LIKE '"+empleado+"'
AND estado LIKE '"+estado+"'
AND tipo LIKE '"+tipo+"'
AND bodega LIKE '"+bodega+"'
AND nota LIKE '"+nota+"'
AND usuario LIKE '"+usuario+"'
AND consecutivo like '"+concecutivo+"'
AND codigo_producto LIKE '"+codigo_producto+"'
AND nombre LIKE '"+nombre+"'
AND color LIKE '"+color+"'
AND peso LIKE '"+peso+"'
AND precio_unidad_ofertado LIKE '"+precio_ofertado+"'
AND puntos_unidad LIKE '"+puntos_unidad+"')"
*/

module.exports = pedidoRouter;