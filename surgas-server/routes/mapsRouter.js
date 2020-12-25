const { map } = require('mysql2/lib/constants/charset_encodings');

const mapsRouter = require('express').Router();
mapsRouter.use(require('body-parser').json());

mapsRouter.get('/', (req, res, next) => {
    res.json({
        key: process.env.MAPS_KEY
    });
});

module.exports = mapsRouter;