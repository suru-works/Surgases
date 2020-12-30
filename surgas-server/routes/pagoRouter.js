const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');

const pagoRouter = require('express').Router();
pagoRouter.use(require('body-parser').json());
const pool = db.pool;

pagoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    //const query = db.buildQuery('producto', req.query);
    let query = 'SELECT * FROM pago';
    const params = req.query;
    let conditions = [];
    let values = [];

    if (Object.keys(params).length !== 0) {
        query = query + ' WHERE ';

        if (params.fechaMinima) {
            conditions.push('fechaHora >= ?');
            values.push(params.fechaMinima);
        }

        if (params.fechaMaxima) {
            conditions.push('fechaHora <= ?');
            values.push(params.fechaMaxima);
        }

        if (params.montoMinimo) {
            conditions.push('monto >= ?');
            values.push(params.montoMinimo);
        }

        if (params.montoMaximo) {
            conditions.push('monto <= ?');
            values.push(params.montoMaximo);
        }

        if (params.empleado) {
            conditions.push('empleado LIKE %?%');
            values.push(params.empleado);
        }

        if (params.usuario) {
            conditions.push('usuario LIKE %?%');
            values.push(params.usuario);
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
        const pago = req.body;
        const result = await conn.promise().execute(
            'INSERT INTO pago(fechaHora, monto, empleado, usuario) VALUES (?, ?, ?, ?)',
            [pago.fechaHora, pago.monto, pago.empleado, req.user.username]
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

pagoRouter.route("/:id")
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

        const query = db.buildUpdate('pago', { name: 'id', value: req.params.codigo }, req.body);
        const result = await conn.promise().execute(query.query, query.values);
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'employee updated successfully'
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

        const result = await conn.promise().execute('DELETE FROM pago WHERE id = ?', [req.params.id]);
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'employee deleted successfully'
            });
        } else {
            conn.rollback();
            next(new Error('deletion error'));
        }
    })
}));

module.exports = pagoRouter;