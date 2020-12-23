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
  const query = db.buildQuery('usuario', req.query, ['nick', 'nombre', 'administrador', 'comun']);
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
    username: user.nick,
    admin: user.administrador,
    comun: user.comun
  });
});

router.post('/signup', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);

  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    const result = await conn.promise().execute(
      'INSERT INTO usuario VALUES (?, ?, ?, ?, ?)',
      [user.nick, user.nombre, user.administrador, user.comun, hash]
    );

    if (result[0].affectedRows == 1) {
      conn.commit();
      res.json({
        nick: user.nick,
        nombre: user.nombre,
        administrador: user.administrador,
        comun: user.comun
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
  res.json({
    nick: req.user.nick
  });
});

router.post('/logout', auth.isAuthenticated, (req, res, next) => {
  req.logout();
  res.json({
    msg: 'logged out successfully'
  });
});

router.put('/:nick', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    const query = db.buildUpdate('usuario', { name: 'nick', value: req.params.nick }, req.body);
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

router.delete('/:nick', auth.isAuthenticated, auth.isAdmin, asyncHandler(async (req, res, next) => {
  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    const result = await conn.promise().execute('DELETE FROM usuario WHERE nick = ?', [req.params.nick]);
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
