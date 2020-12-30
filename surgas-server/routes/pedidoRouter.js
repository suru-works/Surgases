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
            conditions.push('direccion LIKE %?%');
            values.push(params.direccion);
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
            conditions.push('bodega LIKE %?%');
            values.push(params.bodega);
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
            conditions.push('nota LIKE %?%');
            values.push(params.nota);
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
    let results = await pool.promise().execute('SELECT tipo FROM cliente WHERE telefono = ?', [pedido.cliente_pedidor]);
    const tipoCliente = JSON.parse(JSON.stringify(results[0]))[0].tipo;
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        results = await conn.promise().execute(
            "INSERT INTO pedido VALUES(?, ?, ?, ?, NULL, NULL, 'verificacion', NULL, NULL, ?, ?, NULL)",
            [pedido.fecha, pedido.numero, pedido.hora_registro, pedido.direccion, tipoCliente, pedido.nota, req.user.username, pedido.cliente_pedidor]
        );

        if (results[0].affectedRows == 1) {
            let precio_bruto = 0;
            pedido.productos.forEach((val, idx, arr) => {
                results = conn.promise().execute(
                    'INSERT INTO productoxpedido VALUES(?, ?, ?, ?, ?)',
                    [val.codigo, pedido.fecha, pedido.numero, val.precio, val.cantidad]
                );

                precio_bruto += val.precio * val.cantidad;

                if (results[0].affectedRows != 1) {
                    conn.rollback();
                    throw {
                        status: 500
                    }
                }
            });

            results = pool.promise().execute('SELECT descuento FROM cliente WHERE telefono = ?', [pedido.cliente_pedidor]);
            const descuento = JSON.parse(JSON.stringify(results[0]))[0].descuento;
            const precio_final = precio_bruto * (1 - descuento);
            results = conn.promise().execute(
                'UPDATE pedido SET precio_bruto = ?, precio_final = ?, empleado_despachador = ? WHERE fecha = ? AND numero = ?',
                [precio_bruto, precio_final, pedido.empleado, pedido.fecha, pedido.numero]
            );

            if (results[0].affectedRows == 1) {
                conn.commit();
                results = pool.promise().execute('SELECT * FROM pedido WHERE fecha = ? AND numero = ?', [pedido.fecha, pedido.numero]);
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
            changes.push('estado = ? ');
            values.push(params.estado);
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

    const results = pool.promise().execute(
        'SELECT p.codigo AS codigo, p.nombre AS nombre, p.color AS color, p.peso AS peso, pp.precio_venta AS precio, pp.cantidad AS cantidad FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [req.query.fecha, req.query.numero]
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

    let results = pool.promise().execute(
        'SELECT SUM(p.peso) AS peso_total FROM (pedido pe INNER JOIN productoxpedido pp ON pe.fecha = pp.fecha_pedido AND pe.numero = pp.numero_pedido) INNER JOIN producto p ON pp.producto = p.codigo WHERE pe.fecha = ? AND pe.numero = ?',
        [pedido.fecha, pedido.numero]
    );
    const peso_total = JSON.parse(JSON.stringify(results[0])).peso_total;
    results = pool.promise().execute('SELECT puntos_libra FROM static');
    const puntos_libra = JSON.parse(JSON.stringify(results[0])).puntos_libra;
    const puntos_compra = peso_total * puntos_libra;
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        results = conn.promise().execute(
            'UPDATE pedido SET puntos_compra = ? AND bodega = ? WHERE fecha = ? AND numero = ?',
            [puntos_compra, pedido.bodega, pedido.fecha, pedido.numero]
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
    });
}));

module.exports = pedidoRouter;