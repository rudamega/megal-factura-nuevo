const { Router } = require('express');
const { check } = require('express-validator');
const {
    personaAdd,
    personaQuery,
    List,
    ListClientes,
    ListProveedores,
    personaUpdate,
    personaRemove,
    personaDeactivate,
    personaActivate
} = require('../controllers/PersonaController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post("/add", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", 'El correo no es valido').isEmail(),
    validarCampos
], personaAdd);
router.get("/:id", personaQuery);
router.get("/", [], List);
router.get("/clientes", [
    validarJWT
], ListClientes);
router.get("/proveedores", [
    validarJWT
], ListProveedores);
router.put("/:id", personaUpdate);
router.delete("/:id", personaRemove);
router.put("/activate/:id", personaActivate);
router.put("/deactivate/:id", personaDeactivate);

module.exports = router;