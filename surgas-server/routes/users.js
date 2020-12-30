const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const cors = require('./cors');
const db = require('../db');
const { concat } = require('mysql2/lib/constants/charset_encodings');

const router = express.Router();
const pool = db.pool;

const expires = 54000000;

router.get('/', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  const query = db.buildQuery('usuario', req.query, ['username', 'nombre', 'email', 'administrador', 'comun']);
  const results = await pool.promise().execute(query.query, query.values);
  if (results) {
    res.json(JSON.parse(JSON.stringify(results[0])));
  } else {
    throw {
      status: 500
    }
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

router.post('/login', auth.login, (req, res, next) => {
  if (req.body.remember) {
    // PERSISTENCIA
    req.session.cookie.expires = new Date(Date.now() + expires);
    req.session.cookie.maxAge = expires;
  }
  const user = req.user;
  res.json({
    username: user.username,
    nombre: user.nombre,
    email: user.email,
    administrador: user.administrador,
    comun: user.comun    
  });
});

router.post('/logout', auth.isAuthenticated, (req, res, next) => {
  req.logout();
  res.json({
    msg: 'logged out successfully'
  });
});

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

module.exports = router;
