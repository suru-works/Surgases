const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const bcrypt = require('bcrypt');
const auth = require('../auth');

const router = express.Router();
const pool = require('../db').pool.promise();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', asyncHandler(async (req, res, next) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);
  const result = await pool.execute(
    'INSERT INTO usuario VALUES (?, ?, ?, ?, ?)',
    [user.nick, user.nombre, user.administrador, user.comun, hash]
  );
  console.log(result);
  if (result[0].affectedRows == 1) {
    res.json({
      nick: user.nick,
      nombre: user.nombre,
      administrador: user.administrador,
      comun: user.comun,
      password_hash: hash
    });
  } else {
    next(new Error('insertion error'));
  }
}));

router.post('/login', auth.login, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
