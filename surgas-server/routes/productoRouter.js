const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');
const utils = require('../utils');

const pool = db.pool;

const productoRouter = require('express').Router();
productoRouter.use(require('body-parser').json());

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

        if (params.iva_incluido) {
            conditions.push('iva_incluido = (?)');
            values.push(params.iva_incluido);
        }
    }

    const [results,] = await pool.execute(query + conditions.join(' AND '), values);
    
    res.json(utils.parseToJSON(results));
}))
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    const producto = req.body;

    await pool.execute(
        'INSERT INTO producto(nombre, color, peso, tipo, precio, inventario, disponible, iva_incluido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [producto.nombre, producto.color, producto.peso, producto.tipo, producto.precio, producto.inventario, producto.disponible, producto.iva_incluido]
    )
    
    res.json(producto);
}));

productoRouter.route("/:codigo")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}, auth.isAuthenticated, auth.isAdmin)
.put(asyncHandler(async (req, res, next) => {
    const query = db.buildUpdate('producto', { name: 'codigo', value: req.params.codigo }, req.body);
    await pool.execute(query.query, query.values);

    res.json({
        success: true,
        msg: 'product updated successfully'
    });
}))
.delete(asyncHandler(async (req, res, next) => {
    await pool.execute('DELETE FROM producto WHERE codigo = ?', [req.params.codigo]);

    res.json({
        success: true,
        msg: 'product deleted successfully'
    });
}));

module.exports = productoRouter;