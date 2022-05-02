const { reject } = require('async');
const DireccionRepo = require('../repositories/direccion.repo');

function ReadById(tokenId, direccion_id) {
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' }) 

        if(!direccion_id) return reject({ msg:'Se requiere el ID de la direccion', type:'BadRequestException' }) 

        DireccionRepo.ReadById(tokenId, direccion_id)
            .then((direccion) => {
                return resolve(direccion);
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

function ReadAll(tokenId) {
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' }) 

        DireccionRepo.ReadAll(tokenId)
            .then((direcciones) => {
                return resolve(direcciones);
            })
            .catch(err =>{
                return reject(err);
            })

    })
}

function CrearDireccion(tokenId, body){
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' }) 

        if(!body.nombre) return reject({msg:'Falta el nombre de la Dirección a crear', type:'BadRequestException'})

        if(!body.apellidos) return reject({msg:'Faltan los apellidos de la Dirección a crear', type:'BadRequestException'})

        if(!body.email) return reject({msg:'Falta el email de la Dirección a crear', type:'BadRequestException'})

        if(!body.dni) return reject({msg:'Falta el dni de la Dirección a crear', type:'BadRequestException'})

        if(!body.fecha_nacimiento) return reject({msg:'Falta la fecha de nacimiento de la Dirección a crear', type:'BadRequestException'})
        
        if(!body.telefono) return reject({msg:'Falta el telefono de la Dirección a crear', type:'BadRequestException'})

        if(!body.direccion) return reject({msg:'Falta la direccion de la Dirección a crear', type:'BadRequestException'})

        if(!body.cp) return reject({msg:'Falta el cp de la Dirección a crear', type:'BadRequestException'})

        if(!body.poblacion) return reject({msg:'Falta la población de la Dirección a crear', type:'BadRequestException'})

        if(!body.provincia) return reject({msg:'Falta la provincia de la Dirección a crear', type:'BadRequestException'})

        DireccionRepo.CrearDireccion(tokenId, body)
            .then((direccion) => {
                return resolve(direccion);
            })
            .catch(err =>{
                return reject(err);
            })

    })
}

function ModificarDireccion(tokenId, body) {
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' }) 

        if(!body.nombre) return reject({msg:'Falta el nombre de la Dirección a crear', type:'BadRequestException'})

        if(!body.apellidos) return reject({msg:'Faltan los apellidos de la Dirección a crear', type:'BadRequestException'})

        if(!body.email) return reject({msg:'Falta el email de la Dirección a crear', type:'BadRequestException'})

        if(!body.dni) return reject({msg:'Falta el dni de la Dirección a crear', type:'BadRequestException'})

        if(!body.fecha_nacimiento) return reject({msg:'Falta la fecha de nacimiento de la Dirección a crear', type:'BadRequestException'})
        
        if(!body.telefono) return reject({msg:'Falta el telefono de la Dirección a crear', type:'BadRequestException'})

        if(!body.direccion) return reject({msg:'Falta la direccion de la Dirección a crear', type:'BadRequestException'})

        if(!body.cp) return reject({msg:'Falta el cp de la Dirección a crear', type:'BadRequestException'})

        if(!body.poblacion) return reject({msg:'Falta la población de la Dirección a crear', type:'BadRequestException'})

        if(!body.provincia) return reject({msg:'Falta la provincia de la Dirección a crear', type:'BadRequestException'})

        DireccionRepo.ModificarDireccion(tokenId, body)
            .then((direccion) => {
                return resolve(direccion);
            })
            .catch(err =>{
                return reject(err);
            })

    })
}

function BorrarDireccion(tokenId, direccion_id) {
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' }) 

        if(!direccion_id) return reject({ msg:'Se requiere el ID de la direccion', type:'BadRequestException' }) 
        
        DireccionRepo.BorrarDireccion(tokenId, direccion_id)
            .then((direccion) => {
                return resolve(direccion);
            })
            .catch((err) => {
                return reject(err)
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