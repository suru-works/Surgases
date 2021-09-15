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
            values.push(`%${params.codigo}%`);
        }

        if (params.nombre) {
            conditions.push('nombre LIKE ?');
            values.push(`%${params.nombre}%`);
        }

        if (params.color) {
            conditions.push('color LIKE ?');
            values.push(`%${params.color}%`);
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
            values.push(parseInt(params.disponible));
        }

        if (params.iva_incluido) {
            conditions.push('iva_incluido = (?)');
            values.push(parseInt(params.iva_incluido));
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

productoRouter.route('/:codigo/cliente/:telefono')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}, auth.isAuthenticated)
.get(asyncHandler(async (req, res, next) => {
    const params = req.params;

    const [result,] = await pool.execute(
        'SELECT descuento, iva_incluido FROM clientexproducto WHERE cliente = ? AND producto = ?',
        [params.telefono, params.codigo]
    );
    
    res.json(utils.parseToJSON(result))[0];
}))
.post(auth.isEmployee, asyncHandler(async (req, res, next) => {
    const { codigo, telefono } = req.params;
    const { descuento, iva_incluido } = req.body;

    await pool.execute(
        'INSERT INTO clientexproducto VALUES (?, ?, ?, ?)',
        [telefono, codigo, descuento, iva_incluido]
    );

    res.json({
        success: true
    });
}))
.put(auth.isEmployee, asyncHandler(async (req, res, next) => {
    const params = req.params;
    const body = req.body;

    let changes = [];
    let values = [];

    if (body.descuento) {
        changes.push('descuento = ?');
        values.push(body.descuento);
    }

    if (body.iva_incluido !== undefined) {
        changes.push('iva_incluido = ?');
        values.push(body.iva_incluido ? 1 : 0);
    }

    values.push(params.telefono);
    values.push(params.codigo);

    await pool.execute(
        `UPDATE clientexproducto SET ${changes.join(', ')} WHERE cliente = ? AND producto = ?`,
        values
    );

    res.json({
        success: true
    });
}));

module.exports = productoRouter;