const db = require('../db');
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
    const query = db.buildQuery('empleado', req.query);
    const results = await pool.promise().execute(query.query, query.values);
    if (results) {
        res.json(JSON.parse(JSON.stringify(results))[0])
    } else {
        throw {
            status: 500
        };
    }
}))
.post(asyncHandler(async (req, res, next) => {
    pool.getConnection(async (err, conn) => {
        const emp = req.body;
        const result = await conn.promise().execute(
            'INSERT INTO empleado VALUES (?, ?, ?, ?, ?, ?, ?)',
            [emp.cedula, emp.nombre, emp.direccion, emp.telefono, '1', '0', '0']
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

module.exports = empleadoRouter;