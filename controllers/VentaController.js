const { response } = require("express");
const models = require('../models')

const aumentarStock = async(articulo, cantidad) => {
    const { stock } = await models.Articulo.findOne(articulo);
    const nuevoStock = parseInt(stock) + parseInt(cantidad);
    const registro = await models.Articulo.findByIdAndUpdate(articulo, { stock: nuevoStock });

};


const disminuirStock = async(articulo, cantidad) => {
    const { stock } = await models.Articulo.findOne(articulo);
    const nuevoStock = parseInt(stock) - parseInt(cantidad);
    const registro = await models.Articulo.findByIdAndUpdate(articulo, { stock: nuevoStock });
};

const ventaAdd = async(req, res = response, next) => {
    try {
        const reg = await models.Venta.create(req.body);
        // actualizar stock
        const detalles = req.body.detalles;
        detalles.map((art) => {
            disminuirStock(art._id, art.cantidad);
        });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error al intentar agregar un venta"
        });
        console.log(error);
        next(error);
    }
};
const ventaQuery = async(req, res = response, next) => {
    const { id } = req.params;

    try {
        const reg = await models.Venta.findById(id)
            .populate('usuario', { nombre: 1 })
            .populate('persona', { nombre: 1 })
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
const ventaList = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Venta.find({ $or: [{ 'num_comprobante': new RegExp(valor, 'i') }, { 'serie_comprobante': new RegExp(valor, 'i') }] }, { crearedAt: 0 })
            .populate('usuario', { nombre: 1 })
            .populate('persona', { nombre: 1 })
            .sort({ 'createdAt': -1 });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en la lista"
        });
        next(error);
    }
};

// const ingresoUpdate = async(req, res = response, next) => {
//     const { id } = req.params;
//     // const rest = req.body.nombre;
//     // // const categoria = models.Categoria.findById(id)
//     // res.json(id)
//     try {
//         const reg = await models.Categoria.findByIdAndUpdate(id, req.body);
//         res.status(200).json(reg)
//     } catch (error) {
//         res.status(500).json({
//             meg: "Error en el query"
//         });
//         next(error);
//     }
// };
// const ingresoRemove = async(req, res = response, next) => {
//     const { id } = req.params;
//     // const rest = req.body.nombre;
//     // // const categoria = models.Categoria.findById(id)
//     // res.json(id)
//     try {
//         const reg = await models.Categoria.findByIdAndDelete(id, req.body);
//         res.status(200).json(reg)
//     } catch (error) {
//         res.status(500).json({
//             meg: "Error en el query"
//         });
//         next(error);
//     }
// };

const ventaActivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Ingreso.findByIdAndUpdate(id, { estado: 1 });
        // actualizar stock
        const detalles = reg.detalles;
        detalles.map((art) => {
            disminuirStock(art._id, art.cantidad);
        });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};
const ventaDeactivate = async(req, res, next) => {
    const { id } = req.params;
    try {
        const reg = await models.Ingreso.findByIdAndUpdate(id, { estado: 0 });
        const detalles = reg.detalles;
        detalles.map((art) => {
            aumentarStock(art._id, art.cantidad);
        });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).json({
            meg: "Error en el query"
        });
        next(error);
    }
};





module.exports = {
    ventaAdd,
    ventaQuery,
    ventaList,
    ventaDeactivate,
    ventaActivate
}