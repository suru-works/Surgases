const info = require('./info')
const clientes = require('./clientes');

module.exports = {
    ...info,
    ...clientes
};