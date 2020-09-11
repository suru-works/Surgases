const db = require('../db');
const asyncHandler = require('express-async-handler');

const empleadoRouter = require('express').Router();
empleadoRouter.use(require('body-parser').json());
const pool = db.pool.promise();

empleadoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const query = db.buildQuery('empleado', req.query);
    const results = await pool.execute(query.query, query.values);
    if (results) {
        res.json(JSON.parse(JSON.stringify(results))[0])
    } else {
        throw {
            status: 500
        };
    }
}))
.post(asyncHandler(async (req, res, next) => {
    const result = await pool.execute(
        'INSERT INTO empleado VALUES (?, ?, ?, ?, ?, ?, ?)',
        [req.body.cedula, req.body.nombre, req.body.direccion, req.body.telefono, '1', '0', '0']
    );
    if (result[0].affectedRows == 1) {
        res.json(req.body);
    } else {
        throw {
            status: 500
        }
    }
}));

module.exports = empleadoRouter;