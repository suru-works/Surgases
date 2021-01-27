const cors = require('cors');

var corsOptions = {
    origin: 'localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);