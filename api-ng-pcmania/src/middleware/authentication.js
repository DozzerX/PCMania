'use strict';

const jwt = require('jsonwebtoken');

exports.ensureAuth = function(req, res, next)
{
    if (!req.headers.authorization)
    {
        return res.status(403).send({ mensaje: 'La cabecera no contiene autorización' });
    } else 
    {
        jwt.verify(req.headers.authorization, process.env.SEED, (err, decodedToken) => {
            if (err || !decodedToken) return res.status(403).send({ mensaje: 'El token no es válido', error: err });
            
            req.decodedToken = decodedToken; // se queda almacenado en el objeto request para poder consultarlo

            db.query('SELECT * from usuarios u where u.usuario_id ='+ decodedToken.usuario_id, (err, rows) =>
            {
                if (err) return res.status(500).json({error: err});

                if (rows.length != 1) return res.status(404).json({ error: 'No se ha encontrado ningun usuario con el token especificado' });
                
                req.authenticatedUser = rows[0];
                delete req.authenticatedUser.password;

                next();
            });

        });
    }
};