const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(400).json({
            msg: "No hay token en la petición"
        })
    }
    try {
        const { _id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // Find usuario
        const usuario = await Usuario.findById(_id);

        if (!usuario) {
            return res.status(401).json({
                msg: "Usuario no existe"
            })
        }

        if (usuario.estado === 0) {
            return res.status(401).json({
                msg: "Usuario desactivado"
            })
        }

        if (usuario.rol == 'ADMINISTRADOR' || usuario.rol == "VENDEDOR" || usuario.rol == "ALMACENERO") {
            req._id = usuario
            next();
        } else {
            return res.status(401).json({
                msg: "Usuario no tiene rol autorizado"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}
const verifyAdministrador = async(req, res = response, next) => {
    // Find usuario
    const usuario = await Usuario.findById(req.usuario);

    if (usuario.rol == 'ADMINISTRADOR') {
        next();
    } else {
        return res.status(401).json({
            msg: "Usuario no autorizado"
        })
    }

}

const verifyAlmacenero = async(req, res = response, next) => {
    // Find usuario
    const usuario = await Usuario.findById(req.usuario);

    if (usuario.rol == 'ADMINISTRADOR' || usuario.rol == "ALMACENERO") {
        next();
    } else {
        return res.status(401).json({
            msg: "Usuario no autorizado"
        })
    }

}
const verifyVendedor = async(req, res = response, next) => {
    // Find usuario
    const usuario = await Usuario.findById(req.usuario);

    if (usuario.rol == 'ADMINISTRADOR' || usuario.rol == "VENDEDOR") {
        next();
    } else {
        return res.status(401).json({
            msg: "Usuario no autorizado"
        })
    }

}

module.exports = {
    validarJWT,
    verifyAdministrador,
    verifyAlmacenero,
    verifyVendedor
}