const UsuarioDomain = require('../domains/usuario.domain')
const errors = require('../utils/errors.util')

function GetUserById(req, res){
    UsuarioDomain.GetUserById(req.decodedToken.usuario_id, req.params.id)
        .then((usuario) => {
            return res.status(200).json(usuario);
        })
        .catch((err) =>{
            errors.checkErrorType(err, res);
        })
}

function ModificarUsuario(req, res) {
    UsuarioDomain.ModificarUsuario(req.decodedToken.usuario_id, req.body)
        .then((usuario) => {
            return res.status(200).json(usuario);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function ModificarPassword(req, res) {
    UsuarioDomain.ModificarPassword(req.decodedToken.usuario_id, req.body)
        .then((passwordResponse) => {
            return res.status(200).json(passwordResponse);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

module.exports = {
    GetUserById,
    ModificarUsuario,
    ModificarPassword
}