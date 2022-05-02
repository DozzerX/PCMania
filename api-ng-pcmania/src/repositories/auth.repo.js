const bcrypt = require('bcrypt');


function Register(body) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(body.password.toString('utf8'), 10 , (err, hash) => {
            if (err) return reject(err);
            
            delete body.password
            body.password = hash;

            db.query('INSERT INTO usuarios SET ?', [body], (err, result) => {
                if(err) return reject(err);

                db.query('SELECT * FROM usuarios where usuario_id = ?', result.insertId, (err, rows) => {
                    if(err) return reject(err);

                    delete rows[0].password;

                    return resolve(rows[0]);
                })
            })
        })
    })
}

function Login(email, password) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM usuarios u where u.email = ${db.escape(email)}`, (err, rows) =>{ 
            if (err) return reject(err);
            
            if (rows.length == 0) return reject('El Usuario no existe');

            if (bcrypt.compareSync(password.toString('utf8'), rows[0].password.toString('utf8'))) {
                // Login correcto
                return resolve(rows[0]);
            } else {
                // Login incorecto
                return reject('Contraseña incorecta');
            }
        })
    })
}

module.exports = {
    Register,
    Login
}