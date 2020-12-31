const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');

const productoRouter = require('express').Router();
productoRouter.use(require('body-parser').json());
const pool = db.pool;

productoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    //const query = db.buildQuery('producto', req.query);
    let query = 'SELECT * FROM producto';
    const params = req.query;
    let conditions = [];
    let values = [];

    if (Object.keys(params).length !== 0) {
        query = query + ' WHERE ';

        if (params.codigo) {
            conditions.push('codigo LIKE ?');
            values.push('%' + params.codigo + '%');
        }

        if (params.nombre) {
            conditions.push('nombre LIKE ?');
            values.push('%' + params.nombre + '%');
        }

        if (params.color) {
            conditions.push('color LIKE ?');
            values.push('%' + params.color + '%');
        }

        if (params.pesoMinimo) {
            conditions.push('peso >= ?');
            values.push(params.pesoMinimo);
        }

        if (params.pesoMaximo) {
            conditions.push('peso <= ?');
            values.push(params.pesoMaximo);
        }
        
        if (params.tipo) {
            conditions.push('tipo = ?');
            values.push(params.tipo);
        }

        if (params.precioMinimo) {
            conditions.push('precio >= ?');
            values.push(params.precioMinimo);
        }

        if (params.precioMaximo) {
            conditions.push('precio <= ?');
            values.push(params.precioMaximo);
        }

        if (params.inventarioMinimo) {
            conditions.push('inventario >= ?');
            values.push(params.inventarioMinimo);
        }

        if (params.inventarioMaximo) {
            conditions.push('inventario <= ?');
            values.push(params.inventarioMaximo);
        }

        if (params.disponible) {
            conditions.push('disponible = (?)');
            values.push(params.disponible);
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
        const prod = req.body;
        const result = await conn.promise().execute(
            'INSERT INTO producto(nombre, color, peso, tipo, precio, inventario, disponible) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [prod.nombre, prod.color, prod.peso, prod.tipo, prod.precio, prod.inventario, prod.disponible]
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

productoRouter.route("/:codigo")
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

        const query = db.buildUpdate('producto', { name: 'codigo', value: req.params.codigo }, req.body);
        const result = await conn.promise().execute(query.query, query.values);
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'product updated successfully'
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

        const result = await conn.promise().execute('DELETE FROM producto WHERE codigo = ?', [req.params.codigo]);
        if (result[0].affectedRows == 1) {
            conn.commit();
            res.json({
                msg: 'product deleted successfully'
            });
        } else {
            conn.rollback();
            next(new Error('deletion error'));
        }
    })
}));

module.exports = productoRouter;