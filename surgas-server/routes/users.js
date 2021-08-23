const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const auth = require('../auth');
const db = require('../db');
const utils = require('../utils');
const restoreView = require('../view/restoreView');
const verifyView = require('../view/verifyView');

const router = express.Router();
const pool = db.pool;
const expires = 54000000;

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

router.get('/', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  const params = req.query;
  let query = 'SELECT * FROM usuario';
  let conditions = [];
  let values = [];

  if (Object.keys(params).length !== 0) {
    query = query + ' WHERE ';

    if (params.username) {
      conditions.push("username LIKE ?");
      values.push('%' + params.username + '%');
    }

    if (params.email) {
      conditions.push("email LIKE ?");
      values.push('%' + params.email + '%');
    }

    if (params.verificado) {
      conditions.push("verificado = (?)");
      values.push(params.verificado ? '1' : '0');
    }

    if (params.admin) {
      conditions.push("es_admin = (?)");
      values.push(params.admin ? '1' : '0');
    }

    if (params.cliente) {
      conditions.push('cliente = ?');
      values.push(params.cliente);
    }

    if (params.empleado) {
      conditions.push('empleado = ?');
      values.push(params.empleado);
    }
  }

  const [results,] = await pool.execute(query + conditions.join(' AND '), values);

  res.json(utils.parseToJSON(results));
}));

router.post('/signup', asyncHandler(async (req, res, next) => {
  const user = req.body;

  const hash = await bcrypt.hash(user.password, 10);

  await pool.execute(
    "CALL proc_usuario_insertar(?, ?, ?, ?)",
    [user.username, user.email, hash, user.cliente]
  );

  res.json({
    success: true
  });
}));

router.post('/signup/client', asyncHandler(async (req, res, next) => {
  const usuario = req.body.user;
  const cliente = req.body.client;

  const hash = await bcrypt.hash(usuario.password, 10);

  const conn = await pool.getConnection();

  await conn.beginTransaction();

  try {
    await conn.execute(
      'CALL proc_usuario_cliente_insertar(?, ?, ?, ?, ?, ?, ?)',
      [cliente.telefono, cliente.email, cliente.nombre, cliente.tipo, usuario.username, usuario.email, hash]
    );
  
    usuario.verify_token = await auth.generateToken('verification_token', conn, usuario.username);

    await conn.commit();
    conn.release();
    
    utils.sendEmail(usuario.email, 'Verificación de Cuenta', verifyView.verifyView(usuario));

    res.json({
      success: true
    });
  } catch (err) {
    await conn.rollback();
    conn.release();

    next(err);
  }  
}));

router.post('/login', auth.isVerified, auth.login, (req, res, next) => {
  if (req.body.remember) {
    req.session.cookie.expires = new Date(Date.now() + expires);
    req.session.cookie.maxAge = expires;
  }

  const user = req.user;

  /*try {
    await pool.execute('INSERT INTO user_sessions VALUES(?, ?)', [req.sessionID, user.username]);
  } catch (err) {
    req.logout();
    next(err);
  }*/

  res.json({
    username: user.username,
    email: user.email
  });
});

router.post('/logout', auth.isAuthenticated, (req, res, next) => {
  req.logout();
  req.session.destroy();

  res.json({
    success: true
  });
});

router.route('/current')
.all(auth.isAuthenticated)
.get(asyncHandler(async (req, res, next) => {
  const [results,] = await pool.execute('CALL proc_usuario_current(?)', [req.user.username]);

  res.json(utils.parseToJSON(results)[0][0]);
}))
.put(asyncHandler(async (req, res, next) => {
  const conn = await pool.getConnection();

  const query = db.buildUpdate('usuario', { name: 'username', value: req.user.username }, req.body);
  await conn.execute(query.query, query.values);

  const [results,] = await conn.execute('SELECT * FROM usuario WHERE username = ?', [req.user.username]);
  const user = utils.parseToJSON(results)[0];

  conn.release();

  req.login(user, (err) => {
    next(err);
  });
}));

router.get('/check-client/:telefono', asyncHandler(async (req, res, next) => {
  const [results,] = await pool.execute('SELECT * FROM usuario WHERE cliente = ?', [req.params.telefono]);

  res.json({
    'found': results.length > 0
  });
}));

router.route('/account')
.all(auth.isAuthenticated)
.get(asyncHandler(async (req, res, next) => {
  const user = req.user;

  const conn = await pool.getConnection();

  let [results,] = await conn.execute(
    'SELECT * FROM empleado WHERE id = ?',
    [user.empleado]
  );
  const empleado = utils.parseToJSON(results)[0];

  [results,] = await conn.execute(
    'SELECT telefono, email, nombre, fecha_registro, puntos, tipo FROM cliente WHERE telefono = ?',
    [user.cliente]
  );
  const cliente = utils.parseToJSON(results)[0];

  conn.release();

  res.json({
    usuario: {
      username: user.username,
      email: user.email,
      es_admin: user.es_admin
    },
    cliente: cliente,
    empleado: empleado
  });
}))
.put(asyncHandler(async (req, res, next) => {
  const user = req.user;
  const body = req.body;

  if (!user.cliente && body.cliente) {
    let err = new Error('El usuario no es un cliente');
    err.statusCode = 403;
    next(err);
  }

  if (!user.empleado && body.empleado) {
    let err = new Error('El usuario no es un empleado');
    err.statusCode = 403;
    next(err);
  }

  const conn = await pool.getConnection();

  await conn.beginTransaction();

  try {
    let query = db.buildUpdate('cliente', { name: 'telefono', value: user.cliente }, body.cliente);
    await conn.execute(query.query, query.values);

    query = db.buildUpdate('empleado', { name: 'id', value: user.empleado }, body.empleado);
    await conn.execute(query.query, query.values);
    
    query = db.buildUpdate('usuario', { name: 'username', value: user.username }, body.usuario);
    await conn.execute(query.query, query.values);

    await conn.commit();
    conn.release();

    res.json({
      success: true
    });
  } catch (error) {
    await conn.rollback();
    conn.release();
    next(error);
  }
}));

router.post('/verify', asyncHandler(async function (req, res, next) {
  const token = req.body.token;
  
  if (auth.validateToken(token)) {
    const conn = await pool.getConnection();

    const [result,] = await conn.execute('SELECT username FROM usuario WHERE verification_token = ?', [token]);
    const user = utils.parseToJSON(result)[0];

    if (user) {
      await conn.execute('UPDATE usuario SET verificado = 1, verification_token = NULL WHERE username = ?', [user.username]);

      conn.release();

      res.json({
        success: true
      });
    } else {
      conn.release();

      let err = new Error("The token does not exist");
      err.statusCode = 404;
      next(err);
    }
  } else {
    let err = new Error("The token has expired");
    err.statusCode = 403;
    next(err);
  }
}));

router.post('/restorepassword', asyncHandler(async (req, res, next) => {
  const data = req.body;
  const username = data.username;

  const conn = await pool.getConnection();
  
  let [result,] = await conn.execute('SELECT * FROM usuario WHERE username = ?', [username]);
  const user = utils.parseToJSON(result)[0];

  if (user) {
    data.restore_password_token = await auth.generateToken('restore_password_token', conn, username);

    conn.release();

    utils.sendEmail(user.email, 'Restauración de Contraseña', restoreView.restoreView(data));

    res.json({
      success: true
    });
  } else {
    conn.release();
    
    let err = new Error("User does not exist");
    err.statusCode = 404;
    next(err);
  }
}));

router.post('/changePassword', asyncHandler(async (req, res, next) => {
  const data = req.body;
  const token = data.token;
  
  if (auth.validateToken(token)) {
    const hash = await bcrypt.hash(data.newPassword, 10);

    await pool.execute('CALL proc_usuario_cambiar_password(?, ?)', [token, hash]);

    res.json({
      success: true
    });
  } else {
    let err = new Error("The token has expired");
    err.statusCode = 403;
    next(err);
  }
}));

router.route('/:username')
.all(auth.isAuthenticated, auth.isAdmin)
.put(asyncHandler(async (req, res, next) => {
  const body = req.body;

  let changes = []
  let values = []

  if (body.email) {
    changes.push('email = ?');
    values.push(body.email);
  }

  if (body.es_admin !== undefined) {
    changes.push['es_admin = ?'];
    values.push[body.es_admin ? '1' : '0'];
  }

  if (body.cliente) {
    changes.push('cliente = ?');
    values.push(body.cliente);
  }

  if (body.empleado) {
    changes.push('empleado = ?');
    values.push(body.empleado);
  }

  values.push(req.params.username);

  await pool.execute(
    `UPDATE usuario SET ${changes.join(', ')} WHERE username = ?`,
    [values]
  );

  res.json({
    success: true
  });
}))
.delete(asyncHandler(async (req, res, next) => {
  await pool.execute('DELETE FROM usuario WHERE username = ?', [req.params.username]);

  res.json({
    success: true,
    msg: 'user deleted successfully'
  });
}));

module.exports = router;
