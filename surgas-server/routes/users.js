const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const auth = require('../auth');
const db = require('../db');
const utils = require('../utils');
const mail = require('../com/mail');
const restoreView = require('../view/restoreView');
const verifyView = require('../view/verifyView');

const router = express.Router();
const pool = db.pool;
const poolPromise = pool.promise();
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

  const [results,] = await poolPromise.execute(query + conditions.join(' AND '), values);

  res.json(utils.parseToJSON(results));
}));

router.post('/signup', asyncHandler(async (req, res, next) => {
  const user = req.body;

  const hash = await bcrypt.hash(user.password, 10);

  await poolPromise.execute(
    "CALL proc_usuario_insertar(?, ?, ?, ?)",
    [user.username, user.email, hash, user.cliente]
  );

  res.json({
    success: true
  });
}));

router.post('/signup/client', asyncHandler(async (req, res, next) => {
  const data = req.body.user;
  const cliente = req.body.client;

  const hash = await bcrypt.hash(data.password, 10);

  const conn = await pool.getConnectionPromise();
  const connPromise = conn.promise();

  await connPromise.execute(
    'CALL proc_usuario_cliente_insertar(?, ?, ?, ?, ?, ?, ?)',
    [cliente.telefono, cliente.email, cliente.nombre, cliente.tipo, data.username, data.email, hash]
  );

  //Generating a verification token and Sending user verification mail
  try {
    let [resUser,] = await connPromise.execute('SELECT * FROM usuario WHERE username = ?', [data.username]);
    let user = utils.parseToJSON(resUser)[0];
    if (user) {
      isTokenNotUnique = true;
      let now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      var key = crypto.randomBytes(20).toString('hex');

      while (isTokenNotUnique) {
        var verification_token = now + ',' + key;
        var resUserByToken = await connPromise.execute('SELECT * FROM usuario WHERE verification_token = ?', [verification_token]);
        let userByToken = JSON.parse(JSON.stringify(resUserByToken[0]))[0];
        if (userByToken) {
          //the token allready exist
          key = crypto.randomBytes(20).toString('hex');
        }
        else {
          isTokenNotUnique = false;
          data.verify_token = verification_token;
          let result = await connPromise.execute('UPDATE usuario SET verification_token = ? WHERE username = ?', [verification_token, data.username]);
          if (result[0].affectedRows == 1) {
            connPromise.commit();
            res.json({
              msg: 'user updated successfully'
            });
          } else {
            connPromise.rollback();
            var err = new Error("user update failed successfully");
            err.statusCode = 500;
            throw err;
          }
        }

      }
      const verifyHTML = verifyView.verifyView(data);
      //sending email for user verification
      mailData = {
        host: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_SERVER_PORT,
        secure: false,
        //serverService: 'hotmail',
        serverMail: process.env.AUTH_EMAIL_USER,
        serverPassword: process.env.AUTH_EMAIL_PASSWORD,
        sender: '"Surgas de antioquia" <' + process.env.AUTH_EMAIL_USER + '>',
        receivers: user.email,
        subject: 'Verificacion de cuenta',
        text: '',
        html: verifyHTML
      };
      mail.mail(mailData);
      res.status(200);
    }
    else {
      var err = new Error("User does not exist");
      err.statusCode = 404;
      throw err;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }



  res.json({
    success: true
  });
}));

router.post('/login', auth.isVerified, auth.login, (req, res, next) => {
  if (req.body.remember) {
    req.session.cookie.expires = new Date(Date.now() + expires);
    req.session.cookie.maxAge = expires;
  }

  const user = req.user;

  /*try {
    await poolPromise.execute('INSERT INTO user_sessions VALUES(?, ?)', [req.sessionID, user.username]);
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
  const [results,] = await poolPromise.execute('CALL proc_usuario_current(?)', [req.user.username]);

  console.log(results);

  res.json(utils.parseToJSON(results)[0][0]);
}))
.put(asyncHandler(async (req, res, next) => {
  const conn = await pool.getConnectionPromise();
  const connPromise = conn;

  const query = db.buildUpdate('usuario', { name: 'username', value: req.user.username }, req.body);
  await connPromise.execute(query.query, query.values);

  const [results,] = await connPromise.execute('SELECT * FROM usuario WHERE username = ?', [req.user.username]);
  const user = utils.parseToJSON(results)[0];

  conn.release();

  req.login(user, (err) => {
    next(err);
  });
}));

router.get('/check-client/:telefono', asyncHandler(async (req, res, next) => {
  const [results,] = await poolPromise.execute('SELECT * FROM usuario WHERE cliente = ?', [req.params.telefono]);

  res.json({
    'found': results.length > 0
  });
}));

router.route('/account')
.all(auth.isAuthenticated)
.get(asyncHandler(async (req, res, next) => {
  const user = req.user;

  const conn = await pool.getConnectionPromise();
  const connPromise = conn.promise();

  let [results,] = await connPromise.execute(
    'SELECT * FROM empleado WHERE id = ?',
    [user.empleado]
  );
  const empleado = utils.parseToJSON(results)[0];

  [results,] = await connPromise.execute(
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

  const conn = await pool.getConnectionPromise();
  const connPromise = conn.promise();

  await connPromise.beginTransaction();

  try {
    let query = db.buildUpdate('cliente', { name: 'telefono', value: user.cliente }, body.cliente);
    await connPromise.execute(query.query, query.values);

    query = db.buildUpdate('empleado', { name: 'id', value: user.empleado }, body.empleado);
    await connPromise.execute(query.query, query.values);
    
    query = db.buildUpdate('usuario', { name: 'username', value: user.username }, body.usuario);
    await connPromise.execute(query.query, query.values);

    await connPromise.commit();
    conn.release();

    res.json({
      success: true
    });
  } catch (error) {
    connPromise.rollback();
    conn.release();
    next(error);
  }
}));

router.post('/restorepassword', asyncHandler(async (req, res, next) => {

  const data = req.body;

  const conn = await pool.getConnectionPromise();
  const connPromise = conn.promise();
    //Generating a restore password token and Sending password restore mail
    try {
      let [resUser,] = await connPromise.execute('SELECT * FROM usuario WHERE username = ?', [data.username]);
      let user = utils.parseToJSON(resUser)[0];
      if (user) {
        isTokenNotUnique = true;
        let now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        var key = crypto.randomBytes(20).toString('hex');

        while (isTokenNotUnique) {
          var restore_password_token = now + ',' + key;
          var resUserByToken = await connPromise.execute('SELECT * FROM usuario WHERE restore_password_token = ?', [restore_password_token]);
          let userByToken = JSON.parse(JSON.stringify(resUserByToken[0]))[0];
          if (userByToken) {
            //the token allready exist
            key = crypto.randomBytes(20).toString('hex');
          }
          else {
            isTokenNotUnique = false;
            data.restore_password_token = restore_password_token;
            let result = await connPromise.execute('UPDATE usuario SET restore_password_token = ? WHERE username = ?', [restore_password_token, data.username]);
            if (result[0].affectedRows == 1) {
              connPromise.commit();
              res.json({
                msg: 'user updated successfully'
              });
            } else {
              connPromise.rollback();
              var err = new Error("user update failed successfully");
              err.statusCode = 500;
              throw err;
            }
          }

        }
        const restoreHTML = restoreView.restoreView(data);
        //sending email for user verification
        mailData = {
          host: process.env.EMAIL_SERVER,
          port: process.env.EMAIL_SERVER_PORT,
          secure: false,
          //serverService: 'hotmail',
          serverMail: process.env.AUTH_EMAIL_USER,
          serverPassword: process.env.AUTH_EMAIL_PASSWORD,
          sender: '"Surgas de antioquia" <' + process.env.AUTH_EMAIL_USER + '>',
          receivers: user.email,
          subject: 'Restauracion de contraseña',
          text: '',
          html: restoreHTML
        };
        mail.mail(mailData);
        res.status(200);
        /*res.json({
          success: true
        });*/
      }
      else {
        var err = new Error("User does not exist");
        err.statusCode = 404;
        throw err;
      }
    } catch (error) {
      console.log(error);
      next(error);
    }

    res.json({
      success: true
    });
}));

router.post('/changePassword', async function (req, res, next) {
  poolPromise.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }
    try {
      const data = req.body;
      const token = data.token;
      const tokenTokens = token.split(',');

      const now = new Date();
      const exp = Date.parse(tokenTokens[0]);

      if (now > exp) {
        var err = new Error("The token has expired");
        err.statusCode = 401;
        throw err;
      }
      else {
        //actualizando la contraseña del usuario
        const hash = await bcrypt.hash(data.newPassword, 10);
        let result = await conn.execute('UPDATE usuario SET password_hash = ? WHERE restorePasswordToken = ?', [hash, token]);
        if (result[0].affectedRows == 1) {
          result = await poolPromise.execute('SELECT username FROM usuario WHERE restorePasswordToken = ?', [token]);
          const username = JSON.parse(JSON.stringify(result[0]))[0].username;
          result = await conn.execute('DELETE FROM sessions WHERE session_id IN (SELECT session_id FROM user_sessions WHERE username = ?)', [username]);
          result = await conn.execute('DELETE FROM user_sessions WHERE username = ?', [username]);
          conn.commit();
          res.json({
            msg: 'password updated successfully'
          });
        } else {
          conn.rollback();
          var err = new Error("password update failed successfully");
          err.statusCode = 500;
          throw err;
        }
      }

    } catch (error) {
      console.log(error);
      next(error);
    }
  });

});

router.post('/verify', asyncHandler(async function (req, res, next) {
  const data = req.body;
  const token = data.token;
  const tokenTokens = token.split(',');

  const now = new Date();
  const exp = Date.parse(tokenTokens[0]);

  if (now > exp) {
    var err = new Error("The token has expired");
    err.statusCode = 401;
    next(err);
  }
  else {
    //updating the user's verification state
    const conn = await pool.getConnectionPromise();
    const connPromise = conn.promise();

    let [result,] = await connPromise.execute('SELECT username FROM usuario WHERE verification_token = ?', [token]);

    if (result.length == 1) {
      const username = utils.parseToJSON(result)[0].username;

      await connPromise.execute('UPDATE usuario SET verificado = 1 WHERE username = ?', [username]);

      conn.release();

      res.json({
        msg: 'user verified successfully'
      });
    }
    else {
      conn.release();
      
      var err = new Error("The token is not valid");
      err.statusCode = 401;
      next(err);
    }
  }
}));

router.route('/:username')
.all(auth.isAuthenticated, auth.isAdmin)
.put(asyncHandler(async (req, res, next) => {
  const query = db.buildUpdate('usuario', { name: 'username', value: req.params.username }, req.body);
  await poolPromise.execute(query.query, query.values);

  res.json({
    success: true,
    msg: 'user updated successfully'
  });
}))
.delete(asyncHandler(async (req, res, next) => {
  await poolPromise.execute('DELETE FROM usuario WHERE username = ?', [req.params.username]);

  res.json({
    success: true,
    msg: 'user deleted successfully'
  });
}));

module.exports = router;
