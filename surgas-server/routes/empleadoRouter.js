const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');

const pool = db.pool;
const poolPromise = pool.promise();

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

        if (params.tipo) {
            conditions.push('tipo = ?');
            values.push(params.tipo);
        }
    }

    const [results,] = await poolPromise.execute(query + conditions.join(' AND '), values);

    res.json(utils.parseToJSON(results));
}))
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    const empleado = req.body;

    await poolPromise.execute(
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
    await poolPromise.execute(query.query, query.values);

    res.json({
        success: true,
        msg: 'employee updated successfully'
    });
}))
.delete(asyncHandler(async (req, res, next) => {
    await poolPromise.execute('DELETE FROM empleado WHERE id = ?', [req.params.id]);

    res.json({
        success: true,
        msg: 'employee deleted successfully'
    });
}));

module.exports = empleadoRouter;