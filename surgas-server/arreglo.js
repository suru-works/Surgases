require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('./db').pool;

const fix = async function() {
    const [rows1, fields1] = await pool.promise().execute('SELECT * FROM usuario');
    let rows;
    let fields;
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < rows1.length; i++) {
            let user = JSON.parse(JSON.stringify(rows1[i]));
            let hash = await bcrypt.hash(user.pasword, 10);
            [rows, fields] = await conn.promise().execute('UPDATE usuario SET password_hash = ? WHERE nick = ?', [hash, user.nick]);
        }
        conn.commit();
        console.log('DONE');
    });
}

fix();