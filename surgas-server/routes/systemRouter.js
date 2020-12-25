const db = require('../db');
const auth = require('../auth');
const asyncHandler = require('express-async-handler');
const exec = require('child_process').exec;

const systemRouter = require('express').Router();
systemRouter.use(require('body-parser').json());

systemRouter.get('/parameters/:codigo', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    const query = db.buildQuery('static', { codigo: req.params.codigo }, ['*']);
    const results = await db.pool.promise().execute(query.query, query.values);
    if (results) {
        res.json(JSON.parse(JSON.stringify(results[0])));
    } else {
        throw {
            status: 500
        };
    }
}));

systemRouter.post('/backup', auth.isAuthenticated, auth.isAdmin, (req, res, next) => {
    exec(__dirname + '\\backup.bat', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            throw {
                status: 500
            };
        }

        console.log(stdout);

        res.json({
            msg: 'backup successful'
        });
    });
});

module.exports = systemRouter;