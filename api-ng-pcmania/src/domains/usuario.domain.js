const UsuarioRepo = require('../repositories/usuario.repo')


function GetUserById(tokenId, paramsId){
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' }) 

        if(!paramsId) return reject({ msg:'Se requiere el ID del usuario a modificar', type:'BadRequestException' }) 

        if(tokenId != paramsId) return reject({ msg:'No tienes autorización para realizar esta acción!', type:'ForbiddenException' })

        UsuarioRepo.GetUserById(paramsId)
            .then((usuario) =>{
                return resolve(usuario);
            })
            .catch(err =>{
                return reject(err);
            })
    })
    
}

function ModificarUsuario(usuario_id, body) {
    return new Promise((resolve, reject) => {
        if(!usuario_id) return reject({msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException'})

        if(!body.nombre) return reject({msg:'Falta el nombre del Usuario a modificar', type:'BadRequestException'})

        if(!body.apellidos) return reject({msg:'Faltan los apellidos del Usuario a modificar', type:'BadRequestException'})

        if(!body.email) return reject({msg:'Falta el email del Usuario a modificar', type:'BadRequestException'})

        UsuarioRepo.ModificarUsuario(usuario_id, body)
            .then((usuario) =>{
                return resolve(usuario);
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

function ModificarPassword(usuario_id, body) {
    return new Promise((resolve, reject) => {
        if(!usuario_id) return reject({msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException'})

        if(!body.current_password) return reject({msg:'Falta proporcionar la contraseña actual', type:'BadRequestException'})

        if(!body.new_password) return reject({msg:'Falta proporcionar una contraseña nueva', type:'BadRequestException'})

        UsuarioRepo.ModificarPassword(usuario_id, body.current_password, body.new_password)
            .then((passwordResponce) => {
                return resolve(passwordResponce);
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

module.exports = {
    GetUserById,
    ModificarUsuario,
    ModificarPassword
}