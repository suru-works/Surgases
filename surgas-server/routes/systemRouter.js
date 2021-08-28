const asyncHandler = require('express-async-handler');
const childProcess = require('child_process');

const db = require('../db');
const auth = require('../auth');
const utils = require('../utils');

const pool = db.pool;

const systemRouter = require('express').Router();
systemRouter.use(require('body-parser').json());

systemRouter.route('/parameters/:codigo')
.all(auth.isAuthenticated, auth.isAdmin)
.get(asyncHandler(async (req, res, next) => {
    const [results,] = await pool.execute('SELECT * FROM static WHERE codigo = ?', [req.params.codigo]);
    
    res.json(utils.parseToJSON(results))[0];
}))
.put(asyncHandler(async (req, res, next) => {
    const query = db.buildUpdate('static', { name: 'codigo', value: req.params.codigo }, req.body);
    await pool.execute(query.query, query.values);

    res.json({
        success: true
    });
}));

systemRouter.get('/parameters/iva', auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    const [result,] = await pool.execute('SELECT iva_actual FROM static WHERE codigo = 1');

    res.json(utils.parseToJSON(result)[0]);
}))

systemRouter.post('/backup', auth.isAuthenticated, auth.isAdmin, (req, res, next) => {
    childProcess.exec(`"${__dirname}\\backup.bat" ${process.env.DATABASE_USER} ${process.env.DATABASE_PASSWORD} ${process.env.DATABASE}`, (err, stdout, stderr) => {
        if (err) {
            next(err);
        } else {
            next();
        }
    });
});

module.exports = systemRouter;