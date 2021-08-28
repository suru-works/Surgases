const asyncHandler = require('express-async-handler');

const utils =  require('../utils');
const db = require('../db');
const auth = require('../auth');

const pool = db.pool;

const empleadoRouter = require('express').Router();
empleadoRouter.use(require('body-parser').json());

empleadoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    let query = 'SELECT * FROM empleado';
    const params = req.query;
    let conditions = [];
    let values = [];

    if (Object.keys(params).length !== 0) {
        query = query + ' WHERE ';

        if (params.id) {
            conditions.push('id = ?');
            values.push(params.id);
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

        query += conditions.join(' AND ');

        if (params.tipo) {
            query += ' (';
            const tipos = params.tipo.split(',');
            for (let i = 0; i < tipos.length; i++) {
                query += 'tipo = ?';
                values.push(tipos[i]);
                query += i < tipos.length - 1 ? ' OR ' : ')';
            }
        }
    }

    const [results,] = await pool.execute(query, values);

    res.json(utils.parseToJSON(results));
}))
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    const empleado = req.body;

    await pool.execute(
        "INSERT INTO empleado VALUES (?, ?, ?, ?, 'activo', ?)",
        [empleado.id, empleado.nombre, empleado.direccion, empleado.telefono, empleado.tipo]
    );

    res.json(empleado);
}));

empleadoRouter.route("/:id")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}, auth.isAuthenticated, auth.isAdmin)
.put(asyncHandler(async (req, res, next) => {
    const query = db.buildUpdate('empleado', { name: 'id', value: req.params.id }, req.body);
    await pool.execute(query.query, query.values);

    res.json({
        success: true,
        msg: 'employee updated successfully'
    });
}))
.delete(asyncHandler(async (req, res, next) => {
    await pool.execute('DELETE FROM empleado WHERE id = ?', [req.params.id]);

    res.json({
        success: true,
        msg: 'employee deleted successfully'
    });
}));

module.exports = empleadoRouter;