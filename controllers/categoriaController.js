const { response } = require("express");
const models = require('../models')
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;


const categoriaPrint = async(req, res = response, next) => {
    try {
        console.log(req.body.pedido);
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: 'tcp://192.168.0.80:9100'
        });

        let isConnected = await printer.isPrinterConnected();
        if (isConnected) {
            printer.print(req.body.pedido); // Append text
            // printer.println("Hello World"); // Append text with new line
            // printer.openCashDrawer(); // Kick the cash drawer
            printer.cut(); // Cuts the paper (if printer only supports one mode use this)
            // printer.partialCut(); // Cuts the paper leaving a small bridge in middle (if printer supports multiple cut modes)
            printer.beep(); // Sound internal beeper/buzzer (if available)
            // printer.upsideDown(true); // Content is printed upside down (rotated 180 degrees)
            printer.setCharacterSet("SLOVENIA"); // Set character set - default set on init
            printer.setPrinterDriver(Object) // Set printer drive - default set on init
            let execute = await printer.execute();
        }
        res.status(200).json(isConnected);
    } catch (error) {
        res.status(500).json({
            meg: "Error al intentar agregar categoria"
        });
        console.log(error);
        next(error);
    }
};
const categoriaAdd = async(req, res = response, next) => {
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
const categoriaQuery = async(req, res = response, next) => {
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
const categoriaList = async(req, res = response, next) => {
    try {
        const valor = req.query.valor;
        const reg = await models.Categoria.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }] }, { crearedAt: 0 })
            .sort({ 'createdAt': -1 });
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
const categoriaRemove = async(req, res = response, next) => {
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
    categoriaActivate,
    categoriaPrint
}