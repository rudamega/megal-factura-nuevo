const { Router } = require('express');
const {
    ventaAdd,
    ventaQuery,
    ventaList,
    ventaActivate,
    ventaDeactivate
} = require('../controllers/VentaController');

const router = Router();

router.post("/add", ventaAdd);
router.get("/:id", ventaQuery);
router.get("/", ventaList);
router.put("/activate/:id", ventaActivate);
router.put("/deactivate/:id", ventaDeactivate);

module.exports = router;