const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const utils = require('./utils');
const mail = require('./com/mail');

const pool = require('./db').pool;
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, cb) => {
    cb(null, user.username);
});

passport.deserializeUser(async (username, cb) => {
    try {
        const [results,] = await pool.execute('SELECT * FROM usuario WHERE username = ?', [username]);
        if (results.length == 0) {
            throw new Error('user does not exist');
        }
        const user = utils.parseToJSON(results)[0];

        cb(null, user);
    } catch (err) {
        return cb(err);
    }
});

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const [results,] = await pool.execute('SELECT * FROM usuario WHERE username = ?', [username]);
        if (results.length == 0) {
            return done(null, false, {
                message: 'user does not exist'
            });
        }
        const user = utils.parseToJSON(results)[0];

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

module.exports.isVerified = async (req, res, next) => {
    try {
        const [results,] = await pool.execute(
            'SELECT * FROM usuario WHERE username = ? AND verificado = (1)',
            [req.body.username]
        );
        if (results.length == 0) {
            mail.sendVerifyMail(req.body.username);
            let err = new Error('user is not verified');
            err.status = 403;
            next(err);
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user.es_admin.data[0] == 1) {
        next();
    } else {
        let err = new Error('not authorized');
        err.status = 403;
        next(err);
    }
}

module.exports.generateToken = async (field, conn, username) => {
    let token, userByToken;

    do {
        let now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        token = now + ',' + crypto.randomBytes(20).toString('hex');

        let [result,] = await conn.execute(`SELECT * FROM usuario WHERE ${field} = ?`, [token]);
        userByToken = utils.parseToJSON(result)[0];
    } while (userByToken);

    await conn.execute(`UPDATE usuario SET ${field} = ? WHERE username = ?`, [token, username]);

    return token;
}

module.exports.validateToken = (token) => {
    const tokenTokens = token.split(',');
    const now = new Date();
    const exp = Date.parse(tokenTokens[0]);
    return now < exp;
}