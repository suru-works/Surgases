const cors = require('cors');

var corsOptions = {
    origin: 'https://www.surgasdeantioquia.com',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);