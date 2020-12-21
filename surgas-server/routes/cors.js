const cors = require('cors');

const whitelist = [
    'https://www.surgasdeantioquia.com/',
    'https://api.surgasdeantioquia.com/',
    'http://localhost:3000/',
    'http://localhost:3001/'
];

var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}

/*var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true,
                        methods: ['GET', 'PUT', 'POST'],
                        credentials: true
                     };
    }
    else {
        corsOptions = { origin: false,
                        methods: ['GET', 'PUT', 'POST'] 
                      };
    }
    callback(null, corsOptions);
};*/

exports.cors = cors();
//exports.corsWithOptions = cors();
//exports.corsWithOptions = cors(corsOptionsDelegate);
exports.corsWithOptions = cors(corsOptions);