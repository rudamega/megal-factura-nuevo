const { Router } = require('express');
const {
    articuloAdd,
    articuloQuery,
    articuloList,
    articuloUpdate,
    articuloRemove,
    articuloActivate,
    articuloDeactivate
} = require('../controllers/ArticuloController');

const router = Router();

router.post("/add", articuloAdd);
router.get("/:id", articuloQuery);
router.get("/", articuloList);
router.put("/:id", articuloUpdate);
router.delete("/:id", articuloRemove);
router.put("/activate/:id", articuloActivate);
router.put("/deactivate/:id", articuloDeactivate);

module.exports = router;