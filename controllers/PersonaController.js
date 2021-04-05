const { response } = require("express");
const models = require('../models')

const personaAdd = async(req, res = response, next) => {
    try {
        const reg = await models.Persona.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error al intentar agregar persona"
        });
        console.log(error);
        next(error);
    }
};
const personaQuery = async(req, res = response, next) => {
    const { id } = req.params;

    try {
        const reg = await models.Persona.findById(id)
        if (!reg) {
            res.status(404).send({
                message: "El registro no existe"
            });
        } else {
            res.status(200).json(reg);
        }
    } catch (error) {
        res.status(500).json({
            meg: "Error en catch"
        });
        next(error);
    }
}
const List = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Persona.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { crearedAt: 0 })
            .sort({ 'createdAt': -1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};
const ListClientes = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Persona.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }], "tipo_persona": "CLIENTE" }, { crearedAt: 0 })
            .sort({ 'createdAt': -1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};
const ListProveedores = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Persona.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }], "tipo_persona": "PROVEEDORES" }, { crearedAt: 0 })
            .sort({ 'createdAt': -1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};

const personaUpdate = async(req, res = response, next) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Persona.findByIdAndUpdate(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const personaRemove = async(req, res = response, next) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Persona.findByIdAndDelete(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};

const personaActivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Persona.findByIdAndUpdate(id, { estado: 1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const personaDeactivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Persona.findByIdAndUpdate(id, { estado: 0 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }

};

module.exports = {
    personaAdd,
    personaQuery,
    List,
    ListClientes,
    ListProveedores,
    personaUpdate,
    personaRemove,
    personaDeactivate,
    personaActivate
}