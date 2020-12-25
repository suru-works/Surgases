const db = require('../db');
const asyncHandler = require('express-async-handler');

const municipioRouter = require('express').Router();
municipioRouter.use(require('body-parser').json());
const pool = db.pool;

municipioRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const query = db.buildQuery('municipio', req.query);
    const results = await pool.promise().execute(query.query, query.values);
    if (results) {
        res.json(JSON.parse(JSON.stringify(results[0])));
    } else {
        throw {
            status: 500
        };
    }
}));

module.exports = municipioRouter;