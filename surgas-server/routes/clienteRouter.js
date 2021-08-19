const asyncHandler = require('express-async-handler');

const db = require('../db');
const auth = require('../auth');
const utils = require('../utils');

const pool = db.pool;
const poolPromise = pool.promise();

const clienteRouter = require('express').Router();
clienteRouter.use(require('body-parser').json());

clienteRouter.route("/")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(asyncHandler(async (req, res, next) => {
    //const query = db.buildQuery('producto', req.query);
    let query = 'SELECT  FROM cliente';
    const params = req.query;
    let conditions = [];
    let values = [];

    if (Object.keys(params).length !== 0) {
        query = query + ' WHERE ';

        if (params.telefono) {
            conditions.push('telefono = ?');
            values.push(params.telefono);
        }

        if (params.email) {
            conditions.push('email LIKE ?');
            values.push('%' + params.email + '%');
        }

        if (params.nombre) {
            conditions.push('nombre LIKE ?');
            values.push('%' + params.nombre + '%');
        }

        if (params.fechaRegistroMinima) {
            conditions.push('fecha_registro >= ?');
            values.push(params.fechaRegistroMinima);
        }

        if (params.fechaRegistroMaxima) {
            conditions.push('fecha_registro <= ?');
            values.push(params.fechaRegistroMaxima);
        }

        if (params.puntosMinimos) {
            conditions.push('puntos >= ?');
            values.push(params.puntosMinimos);
        }

        if (params.puntosMaximos) {
            conditions.push('puntos <= ?');
            values.push(params.puntosMaximos);
        }

        if (params.tipo) {
            conditions.push('tipo = ?');
            values.push(params.tipo);
        }

        if (params.fechaPedidoMinima) {
            conditions.push('fecha_pedido >= ?');
            values.push(params.fechaPedidoMinima);
        }

        if (params.fechaPedidoMaxima) {
            conditions.push('fecha_pedido <= ?');
            values.push(params.fechaPedidoMaxima);
        }

        if (params.numeroUltimoPedidoMinimo) {
            conditions.push('numero_ultimo_pedido >= ?');
            values.push(params.numeroUltimoPedidoMinimo);
        }

        if (params.numeroUltimoPedidoMaximo) {
            conditions.push('numero_ultimo_pedido <= ?');
            values.push(params.numeroUltimoPedidoMaximo);
        }

        if (params.numeroPedidosMinimo) {
            conditions.push('numero_pedidos >= ?');
            values.push(params.numeroPedidosMinimo);
        }

        if (params.numeroPedidosMaximo) {
            conditions.push('numero_pedidos <= ?');
            values.push(params.numeroPedidosMaximo);
        }
    }

    const [results,] = await poolPromise.execute(query + conditions.join(' AND '), values);

    res.json(utils.parseToJSON(results));
}))
.post(auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
    const cliente = req.body;
    
    await poolPromise.execute(
        'INSERT INTO cliente(telefono, email, nombre, fecha_registro, puntos, tipo, numero_pedidos) VALUES (?, ?, ?, DATE(NOW()), 0, ?, 0)',
        [cliente.telefono, cliente.email, cliente.nombre, cliente.tipo]
    );

    res.json(cliente);
}));

clienteRouter.route("/:telefono")
.all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}, auth.isAuthenticated, auth.isAdmin)
.put(asyncHandler(async (req, res, next) => {
    const query = db.buildUpdate('cliente', { name: 'telefono', value: req.params.telefono }, req.body);
    await poolPromise.execute(query.query, query.values);

    res.json({
        success: true,
        msg: 'client updated successfully'
    });
}))
.delete(asyncHandler(async (req, res, next) => {
    await poolPromise.execute('DELETE FROM cliente WHERE telefono = ?', [req.params.telefono]);

    res.json({
        success: true,
        msg: 'client deleted successfully'
    });
}));

clienteRouter.get('/check-client/:telefono', asyncHandler(async (req, res, next) => {
    const [results,] = await poolPromise.execute('SELECT * FROM cliente WHERE telefono = ?', [req.params.telefono]);

    res.json({
        'found': results.length > 0
    });
}));

clienteRouter.get('/:telefono/last_order', auth.isAuthenticated, asyncHandler(async (req, res, next) => {
    const conn = await pool.getConnectionPromise();
    const connPromise = conn.promise();

    let [results,] = await connPromise.execute(
        'CALL proc_cliente_consultar_ultimo_pedido(?)',
        [req.params.telefono]
    );
    const pedido = utils.parseToJSON(results)[0];

    [results,] = await connPromise.execute(
        'SELECT pr.nombre AS nombre, pr.color AS color, pr.peso AS peso, pr.tipo AS tipo, pp.precio_venta AS precio_venta, pp.unidades AS unidades FROM producto pr INNER JOIN pedidoxproducto pp ON pr.codigo = pp.producto WHERE pp.fecha_pedido = ? AND pp.numero_pedido = ?',
        [pedido.fecha, pedido.numero]
    );

    conn.release();

    res.json({
        pedido: pedido,
        productos: utils.parseToJSON(results)
    });
}));

module.exports = clienteRouter;