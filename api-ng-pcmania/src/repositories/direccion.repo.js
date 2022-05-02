
function ReadById(tokenId, direccion_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM direcciones where direccion_id = ? and fk_usuario_id = ?', [direccion_id, tokenId], (err, rows) => {
            if(err) return reject(err);

            if(rows.length == 0) return reject({ msg:'No existen direcciones con este ID', type:'NotFoundException' })

            if(rows.length == 1) return resolve(rows[0]);
            else return reject({msg:'Existen mas de una dirección con este ID', type:'DataLayerException' })
            
        })
    })
}

function ReadAll(tokenId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM direcciones where fk_usuario_id = ?', [tokenId], (err, rows) => {
            if(err) return reject(err);
            
            return resolve(rows);
        })
    })
}

function CrearDireccion(usuario_id, direccion){
    return new Promise((resolve, reject) => {
        direccion.fk_usuario_id = usuario_id;

        db.query('INSERT INTO direcciones SET ?', [direccion], (err, result) => {
            if(err) return reject(err);

            return resolve({msg: true})
        })
    })
}

function ModificarDireccion(tokenId, direccion) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE direcciones SET ? WHERE direccion_id = ? and fk_usuario_id = ?', [direccion, direccion.direccion_id, tokenId], (err, result) => {
            if(err) return reject(err);

            if (result.affectedRows == 0) return reject({ msg: 'Error al actualizar la dirección', type: "DataLayerException" })
            else return resolve(ReadById(tokenId, direccion.direccion_id));
        })
    })
}

function BorrarDireccion(tokenId, direccion_id) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM direcciones WHERE direccion_id = ? and fk_usuario_id = ?', [direccion_id, tokenId], (err, result) => {
            if(err) return reject(err);

            else return resolve({msg: true})
        })
    })
}



module.exports = {
    ReadById,
    ReadAll,
    CrearDireccion,
    ModificarDireccion,
    BorrarDireccion
}