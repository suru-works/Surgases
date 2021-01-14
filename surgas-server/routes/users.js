const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const cors = require('./cors');
const db = require('../db');
const { concat } = require('mysql2/lib/constants/charset_encodings');

const crypto = require("crypto");
const CryptoJS = require('crypto-js');

const mail = require('../com/mail');
const restoreView = require('../view/restoreView');

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

    if (params.nombre) {
      conditions.push("nombre LIKE ?");
      values.push('%' + params.nombre + '%');
    }

    if (params.email) {
      conditions.push("email LIKE ?");
      values.push('%' + params.email + '%');
    }

    if (params.tipo) {
      conditions.push('tipo = ?');
      values.push(params.tipo);
    }
  }

  const results = await pool.promise().execute(query + conditions.join(' AND '), values);
  if (results) {
    res.json(JSON.parse(JSON.stringify(results[0])))
  } else {
    throw {
      status: 500
    };
  }
}));

router.get('/current', auth.isAuthenticated, (req, res, next) => {
  const user = req.user;
  res.json({
    username: user.username,
    nombre: user.nombre,
    email: user.email,
    tipo: user.tipo
  });
});

router.post('/signup/client', asyncHandler(async (req, res, next) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);

  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    let result = await conn.promise().execute(
      "INSERT INTO usuario VALUES (?, ?, ?, ?, ?, b'0')",
      [user.username, user.email, hash, user.nombre, user.tipo]
    );

    if (result[0].affectedRows == 1) {
      if (user.tipoCl == 'empresarial') {
        result = await conn.promise().execute('SELECT descuento FROM static');
        user.descuento = JSON.parse(JSON.stringify(result[0]))[0].descuento;
      } else {
        user.descuento = 0.0;
      }

      result = await conn.promise().execute(
        'INSERT INTO cliente VALUES(?, ?, ?, ?, 0, ?, ?, NULL, NULL, 0, ?)',
        [user.telefono, user.email, user.nombre, user.fecha_registro, user.descuento, user.tipoCl, user.username]
      );

      if (result[0].affectedRows == 1) {
        conn.commit();

        res.json({
          username: user.username,
          nombre: user.nombre,
          tipo: user.tipo,
          email: user.email
        });
      } else {
        conn.rollback();
        next(new Error('insertion error'));
      }
    } else {
      conn.rollback();
      next(new Error('insertion error'));
    }
  });
}));

router.post('/signup/employee', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);

  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    let result = await conn.promise().execute(
      "INSERT INTO usuario VALUES (?, ?, ?, ?, ?, b'0')",
      [user.username, user.email, hash, user.nombre, user.tipo]
    );

    if (result[0].affectedRows == 1) {
      result = await conn.promise().execute(
        'INSERT INTO empleado VALUES (?, ?, ?, ?, ?, ?)',
        [user.id, user.nombre, user.direccion, user.telefono, user.estado, user.username]
      );

      if (result[0].affectedRows == 1) {
        conn.commit();

        res.json({
          username: user.username,
          nombre: user.nombre,
          tipo: user.tipo,
          email: user.email
        });
      } else {
        conn.rollback();
        next(new Error('insertion error'));
      }
    } else {
      conn.rollback();
      next(new Error('insertion error'));
    }
  });
}));

router.post('/signup', asyncHandler(async (req, res, next) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);

  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    let result = await conn.promise().execute(
      "INSERT INTO usuario(username, email, password_hash, nombre, tipo, verificado) VALUES (?, ?, ?, ?, ?, b'0')",
      [user.username, user.email, hash, user.nombre, user.tipo]
    );

    if (result[0].affectedRows == 1) {
      conn.commit();

      res.json({
        username: user.username,
        nombre: user.nombre,
        tipo: user.tipo,
        email: user.email
      });
    } else {
      conn.rollback();
      next(new Error('insertion error'));
    }
  });
}));

router.post('/login', auth.login, (req, res, next) => {
  if (req.body.remember) {
    // PERSISTENCIA
    req.session.cookie.expires = new Date(Date.now() + expires);
    req.session.cookie.maxAge = expires;
  }
  const user = req.user;

  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      next(err);
    }

    const result = await conn.promise().execute('INSERT INTO user_sessions VALUES(?, ?)', [req.sessionID, user.username]);
    if (result[0].affectedRows == 1) {
      conn.commit();
      
      let resp = {
        username: user.username,
        nombre: user.nombre,
        email: user.email,
        tipo: user.tipo
      }
      const tipos = user.tipo.split(',');
      if (tipos.indexOf('cliente') != -1) {
        result = await pool.execute('SELECT * FROM cliente WHERE username = ?', [user.username]);
        if (JSON.parse(JSON.stringify(result[0]))[0]) {
          resp.existeCliente = true;
        } else {
          resp.existeCliente = false;
        }
      } else {
        resp.existeCliente = true;
      }
      if (tipos.indexOf('vendedor') != -1 || tipos.indexOf('administrador') != -1 || tipos.indexOf('repartidor') != -1) {
        result = await pool.execute('SELECT * FROM empleado WHERE username = ?', [user.username]);
        if (JSON.parse(JSON.stringify(result[0]))[0]) {
          resp.existeEmpleado = true;
        } else {
          resp.existeEmpleado = false;
        }
      } else {
        resp.existeEmpleado = true;
      }
      res.json(resp);
    } else {
      conn.rollback();
      next(new Error('update error'));
    }
  });
});

router.post('/logout', auth.isAuthenticated, (req, res, next) => {
  req.logout();
  res.json({
    msg: 'logged out successfully'
  });
});

router.put('/current', auth.isAuthenticated, asyncHandler(async (req, res, next) => {
  if (req.body.tipo && req.user.tipo.split(',').indexOf('administrador') == -1) {
    let error = new Error('not authorized');
    error.status = 403;
    throw error;
  } else {
    pool.getConnection(async (err, conn) => {
      if (err) {
        console.log(err);
        return;
      }

      const query = db.buildUpdate('usuario', { name: 'username', value: req.user.username }, req.body);
      let result = await conn.promise().execute(query.query, query.values);
      if (result[0].affectedRows == 1) {
        conn.commit();

        result = await pool.promise().execute('SELECT * FROM usuario WHERE username = ?', [req.user.username]);
        const user = JSON.parse(JSON.stringify(result[0]))[0];
        req.login(user, (err) => {
          next(err);
        });
        /*res.json({
          msg: 'user updated successfully'
        });*/
      } else {
        conn.rollback();
        next(new Error('update error'));
      }
    });
  }
}));

router.put('/:username', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    const query = db.buildUpdate('usuario', { name: 'username', value: req.params.username }, req.body);
    const result = await conn.promise().execute(query.query, query.values);
    if (result[0].affectedRows == 1) {
      conn.commit();
      res.json({
        msg: 'user updated successfully'
      });
    } else {
      conn.rollback();
      next(new Error('update error'));
    }
  });
}));

router.delete('/:username', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    const result = await conn.promise().execute('DELETE FROM usuario WHERE username = ?', [req.params.username]);
    if (result[0].affectedRows == 1) {
      conn.commit();
      res.json({
        msg: 'user deleted successfully'
      });
    } else {
      conn.rollback();
      next(new Error('deletion error'));
    }
  });
}));

router.post('/restorepassword', asyncHandler(async (req, res, next) => {

  const data = req.body;

  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    try {
      let resUser = await conn.promise().execute('SELECT * FROM usuario WHERE username = ?', [data.username]);
      let user = JSON.parse(JSON.stringify(resUser[0]))[0];
      if (user) {
        isTokenNotUnique = true;
        let now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        var key = crypto.randomBytes(20).toString('hex');

        while (isTokenNotUnique) {
          var restorePasswordToken = now + ',' + key;
          var resUserByToken = await conn.promise().execute('SELECT * FROM usuario WHERE restorePasswordToken = ?', [restorePasswordToken]);
          let userByToken = JSON.parse(JSON.stringify(resUserByToken[0]))[0];
          if (userByToken) {
            //the token allready exist
            key = crypto.randomBytes(20).toString('hex');
          }
          else {
            isTokenNotUnique = false;
            data.restorePasswordToken = restorePasswordToken;
            let result = await conn.promise().execute('UPDATE usuario SET restorePasswordToken = ? WHERE username = ?', [restorePasswordToken, data.username]);
            if (result[0].affectedRows == 1) {
              conn.commit();
              res.json({
                msg: 'user updated successfully'
              });
            } else {
              conn.rollback();
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
  }
  );
}));

router.post('/changePassword', async function (req, res, next) {
  pool.getConnection(async (err, conn) => {
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
        let result = await conn.promise().execute('UPDATE usuario SET password_hash = ? WHERE restorePasswordToken = ?', [hash, token]);
        if (result[0].affectedRows == 1) {
          result = await pool.promise().execute('SELECT username FROM usuario WHERE restorePasswordToken = ?', [token]);
          const username = JSON.parse(JSON.stringify(result[0]))[0].username;
          result = await conn.promise().execute('DELETE FROM sessions WHERE session_id IN (SELECT session_id FROM user_sessions WHERE username = ?)', [username]);
          result = await conn.promise().execute('DELETE FROM user_sessions WHERE username = ?', [username]);
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

module.exports = router;
