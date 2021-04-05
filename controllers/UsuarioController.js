const { response } = require("express");
const bcryptjs = require('bcryptjs');
const models = require('../models');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../services/jwt");

const usuarioAdd = async(req, res = response, next) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
        const reg = await models.Usuario.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error al intentar agregar categoria"
        });
        console.log(error);
        next(error);
    }
};
const usuarioQuery = async(req, res = response, next) => {
    const { id } = req.params;

    try {
        const reg = await models.Usuario.findById(id)
        if (!reg) {
            res.status(404).send({
                message: "El registro no existe"
            });
        } else {
            res.status(200).json(reg);
        }
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
}
const usuarioList = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Usuario.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { crearedAt: 0 })
            .sort({ 'createdAt': -1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};

const usuarioUpdate = async(req, res = response, next) => {
    const { id } = req.params;
    if (req.body.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
    }
    const { estado, ...resto } = req.body;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Usuario.findByIdAndUpdate(id, resto);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const usuarioRemove = async(req, res = response, next) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Usuario.findByIdAndDelete(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};

const usuarioActivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Usuario.findByIdAndUpdate(id, { estado: 1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const usuarioDeactivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Usuario.findByIdAndUpdate(id, { estado: 0 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }

};
const usuarioLogin = async(req, res = response, next) => {


    const { email, password } = req.body;


    try {
        // verficar si el email existe
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario/Password incorrectos  - Usuario"
            });
        }

        // verificar si el usuario esta activo

        if (!usuario.estado === 1) {
            return res.status(400).json({
                msg: "Usuario no tiene acceso al sistema"
            });
        }

        //verificar la sena

        const validPassaword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassaword) {
            return res.status(400).json({
                msg: "Usuario/Password incorrectos  - Password"
            });
        }

        // generar token
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el Admin"
        });
    }

    // let user = await models.Usuario.findOne({ email: req.body.email });
    // res.json(user);
    // // if (!user) {
    // //     // El user no existe
    // //     res.status(404).send({
    // //         message: "No existe el usuario"
    // //     });
    // // }

    // try {
    //     let user = await models.Usuario.findOne({ email: req.body.email });
    //     if (user) {
    //         // el usario existe
    //         let match = await bcryptjs.compare(req.body.password, user.password);
    //         if (match) {
    //             // res.json("Password correcto")
    //             // generar token
    //             let tokenReturn = await encode(user.id);
    //             // res.status(200).json({ tokenReturn });
    //             // return res.status(200).json("comparo bien")
    //         } else {
    //             res.status(404).send({
    //                 message: "Password incorrecto"
    //             });
    //         }
    //     } else {
    //         // El user no existe
    //         res.status(404).send({
    //             message: "No existe el usuario"
    //         });
    //     }

    // } catch (error) {

    // }
};




module.exports = {
    usuarioAdd,
    usuarioQuery,
    usuarioList,
    usuarioUpdate,
    usuarioRemove,
    usuarioDeactivate,
    usuarioActivate,
    usuarioLogin
}