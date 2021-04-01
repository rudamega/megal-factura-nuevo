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
const categoriaQuery = (req, res = response) => {
    res.json({
        msg: "query"
    })
};
const categoriaList = (req, res = response) => {
    res.json({
        msg: "list"
    })
};

const categoriaUpdate = (req, res = response) => {
    res.json({
        msg: "update"
    })
};

const categoriaRemove = (req, res = response) => {
    res.json({
        msg: "remove"
    })
};

const categoriaActivate = (req, res = response) => {
    res.json({
        msg: "Activate"
    })
};
const categoriaDeactivate = (req, res = response) => {
    res.json({
        msg: "Deactivate"
    })
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