const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const exec = require('child_process').exec;

const pool = db.pool;

const impresoraRouter = require('express').Router();
impresoraRouter.use(require('body-parser').json());

impresoraRouter.route('/')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const results = await pool.promise().execute('SELECT * FROM impresora');
    res.json(JSON.parse(JSON.stringify(results[0])));
}))
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    pool.getConnection(async (err, conn) => {
        let result = await conn.promise().execute('INSERT INTO impresora(descripcion) VALUES (?)', [req.body.descripcion]);

        if (result[0].affectedRows == 1) {
            conn.commit();

            result = await pool.promise().execute('SELECT * FROM impresora WHERE descripcion = ?', [req.body.descripcion]);
            const printer = JSON.parse(JSON.stringify(result[0]))[0];
            fs.mkdir('G:\\Unidades compartidas\\suru-works\\surgas\\Impresoras\\' + printer.codigo, (err) => {
                if (err) {
                    next(err);
                }

                res.json(printer);
            });
        } else {
            conn.rollback();
            throw {
                status: 500
            }
        }
    });
}));

impresoraRouter.route('/:codigo')
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const results = await pool.promise().execute('SELECT * FROM impresora WHERE codigo = ?', req.params.codigo);
    res.json(JSON.parse(JSON.stringify(results[0])));
}))
.put(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    pool.getConnection(async (err, conn) => {
        const result = await conn.promise().execute(
            'UPDATE impresora SET descripcion = ? WHERE codigo = ?',
            [req.body.descripcion, req.params.codigo]
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
}))
.delete(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    fs.rmdir(
        'G:\\Unidades compartidas\\suru-works\\surgas\\Impresoras\\' + req.params.codigo,
        {
            recursive: true
        },
        (err) => {
            if (err) {
                next(err);
            }

            pool.getConnection(async (err, conn) => {
                const result = await conn.promise().execute('DELETE FROM impresora WHERE codigo = ?', [req.params.codigo]);
        
                if (result[0].affectedRows == 1) {
                    conn.commit();
                    
                    res.json({
                        msg: 'impresora eliminada'
                    });
                } else {
                    conn.rollback();
                    throw {
                        status: 500
                    }
                }
            });
        }
    );
    
}));

module.exports = impresoraRouter;