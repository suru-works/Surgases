const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const cors = require('./cors');

const router = express.Router();
const pool = require('../db').pool;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/current', auth.isAuthenticated, (req, res, next) => {
  const user = req.user;
  res.json({
    username: user.nick,
    admin: user.administrador
  });
});

router.post('/signup', asyncHandler(async (req, res, next) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);

  console.log("SOLICITUD");
  console.log(req.body);

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
        comun: user.comun,
        password_hash: hash
      });
    } else {
      conn.rollback();
      next(new Error('insertion error'));
    }
  });
}));

router.post('/login', auth.login, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
