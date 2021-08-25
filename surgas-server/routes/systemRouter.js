const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');
const utils = require('../utils');

const exec = require('child_process').exec;
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

systemRouter.post('/backup', auth.isAuthenticated, auth.isAdmin, (req, res, next) => {
    exec(__dirname + '\\backup.bat', (err, stdout, stderr) => {
        if (err) {
            next(err);
        }

        res.json({
            msg: 'backup successful'
        });
    });
});

module.exports = systemRouter;