const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');

const empleadoRouter = require('express').Router();
empleadoRouter.use(require('body-parser').json());
const pool = db.pool;

empleadoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    //const query = db.buildQuery('producto', req.query);
    let query = 'SELECT * FROM empleado';
    const params = req.query;
    let conditions = [];
    let values = [];

    if (Object.keys(params).length !== 0) {
        query = query + ' WHERE ';

        if (params.id) {
            conditions.push('id LIKE ?');
            values.push('%' + params.id + '%');
        }

        if (params.nombre) {
            conditions.push('nombre LIKE ?');
            values.push('%' + params.nombre + '%');
        }

        if (params.direccion) {
            conditions.push('direccion LIKE ?');
            values.push('%' + params.direccion + '%');
        }

        if (params.telefono) {
            conditions.push('telefono LIKE ?');
            values.push('%' + params.telefono + '%');
        }
        
        if (params.estado) {
            conditions.push('estado = ?');
            values.push(params.estado);
        }

        if (params.tipo) {
            conditions.push('tipo = ?');
            values.push(params.tipo);
        }

        if (params.username) {
            conditions.push('username LIKE ?');
            values.push('%' + params.username + '%');
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
        const emp = req.body;
        const result = await conn.promise().execute(
            'INSERT INTO empleado VALUES (?, ?, ?, ?, ?, NULL)',
            [emp.id, emp.nombre, emp.direccion, emp.telefono, emp.estado]
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

empleadoRouter.route("/:id")
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

        const query = db.buildUpdate('empleado', { name: 'id', value: req.params.codigo }, req.body);
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

        const result = await conn.promise().execute('DELETE FROM empleado WHERE id = ?', [req.params.id]);
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

module.exports = empleadoRouter;