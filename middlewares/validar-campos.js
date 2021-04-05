const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req, res = response, next) => {

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(404).json(erros);

    }

    next();

}



module.exports = {
    validarCampos
}