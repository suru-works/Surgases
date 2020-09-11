// default express imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

// route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pedidoRouter = require('./routes/pedidoRouter');
const empleadoRouter = require('./routes/empleadoRouter');

// authentication imports
const passport = require('passport');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// using default express packages
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// configuring environment variables
require('dotenv').config();

// authentication settings
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({}, require('./db').pool.promise());
app.use(session({
  cookie: {
    httpOnly: true,
    sameSite: true
  },
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// using routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pedidos', pedidoRouter);
app.use('/empleados', empleadoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status ? err.status : 500);
  res.render('error');
});

module.exports = app;