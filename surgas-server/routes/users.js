const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const authenticate = require('../authenticate');

const router = express.Router();
const pool = require('../db').pool.promise();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', authenticate.login, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
