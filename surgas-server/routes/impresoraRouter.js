const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');

const auth = require('../auth');
const { pool } = require('../db');
const { parseToJSON } = require('../utils');

const impresoraRouter = require('express').Router();
impresoraRouter.use(require('body-parser').json());

impresoraRouter.route('/')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const [results,] = await pool.execute('SELECT * FROM impresora');

    res.json(parseToJSON(results));
}))
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    const conn = await pool.getConnection();

    const [result,] = await conn.execute('CALL proc_impresora_insertar (?)', [req.body.descripcion]);

    const printer = parseToJSON(result[0]);

    conn.release();

    await fs.mkdir(`${process.env.PRINTERS_PATH}\\` + printer[0].id);

    res.json({
        success: true
    });
}));

impresoraRouter.route('/:codigo')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const [result,] = await pool.execute('SELECT * FROM impresora WHERE codigo = ?', req.params.codigo);

    res.json(parseToJSON(result));
}))
.put(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    await pool.execute(
        'UPDATE impresora SET descripcion = ? WHERE codigo = ?',
        [req.body.descripcion, req.params.codigo]
    );

    res.json({
        success: true
    });
}))
.delete(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    await fs.rmdir(`${process.env.PRINTERS_PATH}\\` + req.params.codigo, { recursive: true });
    
    await pool.execute('DELETE FROM impresora WHERE codigo = ?', [req.params.codigo]);

    res.json({
        success: true
    });
}));

module.exports = impresoraRouter;   