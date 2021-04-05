const { Router } = require('express');
const {
    ingresoAdd,
    ingresoQuery,
    ingresoList,
    ingresoActivate,
    ingresoDeactivate
} = require('../controllers/IngresoController');

const router = Router();

router.post("/add", ingresoAdd);
router.get("/:id", ingresoQuery);
router.get("/", ingresoList);
router.put("/activate/:id", ingresoActivate);
router.put("/deactivate/:id", ingresoDeactivate);

module.exports = router;