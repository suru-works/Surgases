const passport = require('passport');
const bcrypt = require('bcrypt');

const pool = require('./db').pool.promise();
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, cb) => {
    cb(null, user.username);
});
passport.deserializeUser(async (username, cb) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM usuario WHERE username = ?', [username]);
        if (rows.length == 0) {
            throw new Error('user does not exist');
        }
        const user = JSON.parse(JSON.stringify(rows[0]));
        cb(null, user);
    } catch (err) {
        return cb(err);
    }
});

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM usuario WHERE username = ?', [username]);
        if (rows.length == 0) {
            return done(null, false, {
                message: 'user does not exist'
            });
        }
        const user = JSON.parse(JSON.stringify(rows[0]));
        const compHash = await bcrypt.compare(password, user.password_hash);
        if (compHash) {
            return done(null, user);
        } else {
            return done(null, false, {
                message: 'incorrect password'
            });
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports.login = passport.authenticate('local');

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        let err = new Error('not authenticated');
        err.status = 401;
        next(err);
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user.tipo.split(',').indexOf('administrador') != -1) {
        next();
    } else {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }
}