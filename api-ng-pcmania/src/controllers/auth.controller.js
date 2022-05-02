'use strict';

const jwt = require('jsonwebtoken');

const AuthRepo = require('../repositories/auth.repo');

function Register(req, res) {
    var body = req.body;

    if(!body.nombre) { return res.status(400).json({ error: 'Nombre es requerido'})}

    if(!body.apellidos) { return res.status(400).json({ error: 'Apellidos son requeridos'})}

    if(!body.email) { return res.status(400).json({ error: 'Email es requerido'})}

    if(!body.password ) { return res.status(400).json({ error: 'Contraseña es requerida'})}

    AuthRepo.Register(body)
        .then((user) => {
            var token = jwt.sign({
                usuario_id: user.usuario_id,
                email: user.email,
                name: user.nombre
            }, process.env.SEED /*, { expiresIn: 60 * 60 * 48 }*/);

            user.token = token;

            return res.status(201).json(user)
        })
        .catch((error) =>{
            if (error.code == 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    error: 'Ya existe un usuario con ese mismo email'
                });
            }
            return res.status(400).json({
                error
            });
        });
}

function Login(req, res) {
    var body = req.body;

    if(!body.email) { return res.status(400).json({ error: 'Email es requerido'})}

    if(!body.password) { return res.status(400).json({ error: 'Contraseña es requerida'})}

    AuthRepo.Login(body.email, body.password)
        .then((user) => {
            delete user.password;

            var token = jwt.sign({
                usuario_id: user.usuario_id,
                email: user.email,
                name: user.nombre
            }, process.env.SEED /*, { expiresIn: 60 * 60 * 48 }*/);

            user.token = token;

            return res.status(200).json(user);
        })
        .catch((error) => {
            return res.status(400).json({
                error
            });
        });
}


module.exports = {
    Register,
    Login
    
}
