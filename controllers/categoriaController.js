const { response } = require("express");
const models = require('../models')

const categoriaAdd = async(req, res = response) => {
    try {
        const reg = await models.Categoria.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error al intentar agregar categoria"
        });
        console.log(error);
        next(error);
    }
};
const categoriaQuery = async(req, res = response) => {
    const { id } = req.params;

    try {
        const reg = await models.Categoria.findById(id)
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
const categoriaList = async(req, res = response) => {
    try {
        const reg = await models.Categoria.find({});
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};

const categoriaUpdate = async(req, res = response, next) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Categoria.findByIdAndUpdate(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const categoriaRemove = async(req, res = response) => {
    const { id } = req.params;
    // const rest = req.body.nombre;
    // // const categoria = models.Categoria.findById(id)
    // res.json(id)
    try {
        const reg = await models.Categoria.findByIdAndDelete(id, req.body);
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};

const categoriaActivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Categoria.findByIdAndUpdate(id, { estado: 1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const categoriaDeactivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Categoria.findByIdAndUpdate(id, { estado: 0 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};





module.exports = {
    categoriaAdd,
    categoriaQuery,
    categoriaList,
    categoriaUpdate,
    categoriaRemove,
    categoriaDeactivate,
    categoriaActivate
}