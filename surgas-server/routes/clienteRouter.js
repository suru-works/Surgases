const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');

const clienteRouter = require('express').Router();
clienteRouter.use(require('body-parser').json());
const pool = db.pool;

clienteRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    //const query = db.buildQuery('producto', req.query);
    let query = 'SELECT * FROM cliente';
    const params = req.query;
    let conditions = [];
    let values = [];

    if (Object.keys(params).length !== 0) {
        query = query + ' WHERE ';

        if (params.telefono) {
            conditions.push('telefono LIKE %?%');
            values.push(params.telefono);
        }

        if (params.email) {
            conditions.push('email LIKE %?%');
            values.push(params.email);
        }

        if (params.nombre) {
            conditions.push('nombre LIKE %?%');
            values.push(params.nombre);
        }

        if (params.fechaRegistroMinima) {
            conditions.push('fecha_registro >= ?');
            values.push(params.fechaRegistroMinima);
        }

        if (params.fechaRegistroMaxima) {
            conditions.push('fecha_registro <= ?');
            values.push(params.fechaRegistroMaxima);
        }

        if (params.puntosMinimos) {
            conditions.push('puntos >= ?');
            values.push(params.puntosMinimos);
        }

        if (params.puntosMaximos) {
            conditions.push('puntos <= ?');
            values.push(params.puntosMaximos);
        }

        if (params.descuentoMinimo) {
            conditions.push('descuento >= ?');
            values.push(params.descuentoMinimo);
        }

        if (params.descuentoMaximo) {
            conditions.push('descuento <= ?');
            values.push(params.descuentoMaximo);
        }

        if (params.tipo) {
            conditions.push('tipo = ?');
            values.push(params.tipo);
        }

        if (params.fechaPedidoMinima) {
            conditions.push('fecha_pedido >= ?');
            values.push(params.fechaPedidoMinima);
        }

        if (params.fechaPedidoMaxima) {
            conditions.push('fecha_pedido <= ?');
            values.push(params.fechaPedidoMaxima);
        }

        if (params.numeroUltimoPedidoMinimo) {
            conditions.push('numero_ultimo_pedido >= ?');
            values.push(params.numeroUltimoPedidoMinimo);
        }

        if (params.numeroUltimoPedidoMaximo) {
            conditions.push('numero_ultimo_pedido <= ?');
            values.push(params.numeroUltimoPedidoMaximo);
        }

        if (params.numeroPedidosMinimo) {
            conditions.push('numero_pedidos >= ?');
            values.push(params.numeroPedidosMinimo);
        }

        if (params.numeroPedidosMaximo) {
            conditions.push('numero_pedidos <= ?');
            values.push(params.numeroPedidosMaximo);
        }

        if (params.username) {
            conditions.push('username LIKE %?%');
            values.push(params.username);
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
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    pool.getConnection(async (err, conn) => {
        const cl = req.body;
        let result;

        if (user.tipoCl == 'empresarial') {
            result = await conn.promise().execute('SELECT descuento FROM static');
            cl.descuento = JSON.parse(JSON.stringify(result[0]))[0].descuento;
        } else {
            cl.descuento = 0.0;
        }
        
        result = await conn.promise().execute(
            'INSERT INTO cliente VALUES (?, ?, ?, ?, 0, ?, ?, NULL, NULL, 0, NULL)',
            [cl.telefono, cl.email, cl.nombre, cl.fecha_registro, cl.descuento, cl.tipo]
        );

        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json(req.body);
        } else {
            conn.rollback();
            throw {
                status: 500
            }
        }
    });
}));

clienteRouter.route("/:telefono")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.put(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            next(err);
        }

        const query = db.buildUpdate('cliente', { name: 'telefono', value: req.params.codigo }, req.body);
        const result = await conn.promise().execute(query.query, query.values);
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'client updated successfully'
            });
        } else {
            conn.rollback();
            next(new Error('update error'));
        }
    })
}))
.delete(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            next(err);
        }

        const result = await conn.promise().execute('DELETE FROM cliente WHERE telefono = ?', [req.params.telefono]);
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'client deleted successfully'
            });
        } else {
            conn.rollback();
            next(new Error('deletion error'));
        }
    })
}));

module.exports = clienteRouter;