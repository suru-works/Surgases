const cliente = require("./cliente");
const empleado = require("./empleado");
const maps = require('./maps');
const pedido = require('./pedido');

module.exports = {
    paths: {
        ...cliente,
        ...empleado,
        ...maps,
        ...pedido
    }
}