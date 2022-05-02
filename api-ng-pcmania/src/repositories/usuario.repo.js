const bcrypt = require('bcrypt')


function GetUserById(id){
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM usuarios u WHERE u.usuario_id = ${db.escape(id)}`, (err, rows) => {
            if (err) return reject(err);

            if (rows.length == 0) return reject({ msg:'No existen usuarios con este ID', type:'NotFoundException' })

            delete rows[0].password;

            if (rows.length == 1) return resolve(rows[0])
            else return reject({ msg:'Existen mas de un usuario con este ID', type:'DataLayerException' })
        })
    })
}

function ModificarUsuario(usuario_id, body) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE usuarios u SET ? WHERE u.usuario_id = ?', [body, usuario_id], (err, result) => {
            if(err) return reject(err);
            
            if (result.affectedRows == 0) return reject({ msg: 'Error al actualizar el usuario', type: "DataLayerException" })
            else return resolve(GetUserById(usuario_id));
            
            
        })
    })
}

function ModificarPassword(usuario_id, current_pass, new_pass) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE usuario_id = ?', [usuario_id], (err, rows) => {
            if(err) return reject(err)

            if(bcrypt.compareSync(current_pass.toString('utf8'), rows[0].password.toString('utf8'))) {

                bcrypt.hash(new_pass.toString('utf8'), 10, (err, hash) => {
                    if (err) return reject(err);
                    db.query('UPDATE usuarios u SET u.password = ?', [hash], (err, result) => {
                        if(err) return reject(err)

                        if(result.affectedRows == 0) return reject({msg: 'Error al actualizar la contraseña', type: 'DataLayerException'})
                        return resolve({msg: true});
                    })

                })

            } else {
                return reject({msg: 'La contraseña no coincide con la base de datos!'})
            }
        })
    })
}

module.exports = {
    GetUserById,
    ModificarUsuario,
    ModificarPassword
}