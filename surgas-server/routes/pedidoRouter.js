const db = require('../db');
const asyncHandler = require('express-async-handler');

const pedidoRouter = require('express').Router();
pedidoRouter.use(require('body-parser').json());
const pool = db.pool;

pedidoRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    const query = db.buildQuery('pedido', req.query);
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
    
}));

module.exports = pedidoRouter;