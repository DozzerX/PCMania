const DireccionDomain = require('../domains/direccion.domain');
const errors = require('../utils/errors.util');

function ReadById(req, res) {
    DireccionDomain.ReadById(req.decodedToken.usuario_id, req.params.id)
        .then((direccion) => {
            return res.status(200).json(direccion);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function ReadAll(req, res) {
    DireccionDomain.ReadAll(req.decodedToken.usuario_id)
        .then((direcciones) => {
            return res.status(200).json(direcciones);

        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function CrearDireccion(req, res){
    DireccionDomain.CrearDireccion(req.decodedToken.usuario_id, req.body)
        .then((direccion) => {
            return res.status(200).json(direccion);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function ModificarDireccion(req, res) {
    DireccionDomain.ModificarDireccion(req.decodedToken.usuario_id, req.body)
        .then((direccion) => {
            return res.status(200).json(direccion);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function BorrarDireccion(req, res) {
    DireccionDomain.BorrarDireccion(req.decodedToken.usuario_id, req.params.id)
        .then((direccion) => {
            return res.status(200).json(direccion);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

module.exports = {
    ReadById,
    ReadAll,
    CrearDireccion,
    ModificarDireccion,
    BorrarDireccion
}