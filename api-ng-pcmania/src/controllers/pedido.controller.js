const PedidoDomain = require('../domains/pedido.domain')
const errors = require('../utils/errors.util');

function CrearPedido(req, res){
    PedidoDomain.CrearPedido(req.decodedToken.usuario_id, req.body)
        .then((pedido) => {
            return res.status(200).json(pedido);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function GetAll(req, res){
    PedidoDomain.GetAll(req.decodedToken.usuario_id)
        .then((pedidos) => {
            return res.status(200).json(pedidos);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function ReadById(req, res){
    PedidoDomain.ReadById(req.decodedToken.usuario_id, req.params.id)
        .then((pedido) => {
            return res.status(200).json(pedido);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function GetFactura(req, res){
    PedidoDomain.GetFactura(req.decodedToken.usuario_id, req.params.id, res)
        .then((new_res) => {
            return new_res;
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

module.exports = {
    CrearPedido,
    GetAll,
    ReadById,
    GetFactura
}