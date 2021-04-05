const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuarioAdd,
    usuarioQuery,
    usuarioList,
    usuarioUpdate,
    usuarioRemove,
    usuarioActivate,
    usuarioDeactivate,
    usuarioLogin
} = require('../controllers/UsuarioController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post("/add", [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", 'El correo no es valido').isEmail(),
    validarCampos
], usuarioAdd);
router.get("/:id", usuarioQuery);
router.get("/", [
    validarJWT
], usuarioList);
router.post("/login", [
    check("email", 'El correo no es valido').isEmail(),
    check("password", "La contrasena es obligatoria").notEmpty(),
    validarCampos
], usuarioLogin);
router.put("/:id", usuarioUpdate);
router.delete("/:id", usuarioRemove);
router.put("/activate/:id", usuarioActivate);
router.put("/deactivate/:id", usuarioDeactivate);

module.exports = router;