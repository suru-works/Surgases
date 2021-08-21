const cliente = require("./cliente");
const empleado = require("./empleado");
const maps = require('./maps');

module.exports = {
    paths: {
        ...cliente,
        ...empleado,
        ...maps
    }
}