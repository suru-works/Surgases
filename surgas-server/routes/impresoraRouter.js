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

    await conn.execute('INSERT INTO impresora(descripcion) VALUES (?)', [req.body.descripcion]);

    const [result,] = await conn.execute('SELECT * FROM impresora WHERE descripcion = ?', [req.body.descripcion]);
    const printer = parseToJSON(result);

    conn.release();

    await fs.mkdir('Z:\\Unidades compartidas\\suru-works\\surgas\\Impresoras\\' + printer.codigo);

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
    await fs.rmdir('G:\\Unidades compartidas\\suru-works\\surgas\\Impresoras\\' + req.params.codigo, { recursive: true });
    
    await pool.execute('DELETE FROM impresora WHERE codigo = ?', [req.params.codigo]);

    res.json({
        success: true
    });
}));

module.exports = impresoraRouter;