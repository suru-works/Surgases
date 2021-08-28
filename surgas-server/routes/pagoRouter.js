const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');
const { parseToJSON } = require('../utils');

const pool = db.pool;

const pagoRouter = require('express').Router();
pagoRouter.use(require('body-parser').json());

pagoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
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

        if (params.registrador) {
            conditions.push('registrador LIKE ?');
            values.push(`%${params.registrador}%`);
        }

        if (params.beneficiario) {
            conditions.push('beneficiario LIKE ?');
            values.push(`%${params.beneficiario}%`);
        }
    }

    const [results,] = await pool.execute(query + conditions.join(' AND '), values);

    res.json(parseToJSON(results));
}))
.post(auth.isAuthenticated, auth.isEmployee, asyncHandler(async (req, res, next) => {
    await pool.execute(
        'INSERT INTO pago(fechaHora, monto, registrador, beneficiario) VALUES (?, ?, ?, ?)',
        [pago.fechaHora, pago.monto, req.user.empleado, pago.beneficiario]
    );

    res.json({
        success: true
    });
}));

pagoRouter.route("/:codigo")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.put(auth.isAuthenticated, auth.isEmployee, asyncHandler(async (req, res, next) => {
    const query = db.buildUpdate('pago', { name: 'codigo', value: req.params.codigo }, req.body);
    await pool.execute(query.query, query.values);

    res.json({
        success: true
    });
}))
.delete(auth.isAuthenticated, auth.isEmployee, asyncHandler(async (req, res, next) => {
    await pool.execute('DELETE FROM pago WHERE codigo = ?', [req.params.codigo]);

    res.json({
        success: true
    });
}));

module.exports = pagoRouter;