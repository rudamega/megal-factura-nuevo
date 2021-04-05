const { response } = require("express");
const models = require('../models')


const articuloAdd = async(req, res = response, next) => {

    try {
        const reg = await models.Articulo.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error al intentar agregar articulo"
        });
        console.log(error);
        next(error);
    }
};
const articuloQuery = async(req, res = response, next) => {
    const { id } = req.params;

    try {
        const reg = await models.Articulo.findById(id)
            .populate('categoria', { nombre: 1 });
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
};

const articuloList = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Articulo.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }] }, { crearedAt: 0 })
            .populate('categoria', { nombre: 1 }).sort({ 'createdAt': -1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};

const articuloUpdate = async(req, res = response, next) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Articulo.findByIdAndUpdate(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const articuloRemove = async(req, res = response, next) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Articulo.findByIdAndDelete(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el remove"
        });
        next(error);
    }
};

const articuloActivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Articulo.findByIdAndUpdate(id, { estado: 1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const articuloDeactivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Articulo.findByIdAndUpdate(id, { estado: 0 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};





module.exports = {
    articuloAdd,
    articuloQuery,
    articuloList,
    articuloUpdate,
    articuloRemove,
    articuloDeactivate,
    articuloActivate
}