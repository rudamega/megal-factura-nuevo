const { Router } = require('express');
const {
    categoriaAdd,
    categoriaQuery,
    categoriaList,
    categoriaUpdate,
    categoriaRemove,
    categoriaActivate,
    categoriaDeactivate
} = require('../controllers/categoriaController');

const router = Router();

router.post("/add", categoriaAdd);
router.get("/query", categoriaQuery);
router.get("/list", categoriaList);
router.put("/", categoriaUpdate);
router.delete("/", categoriaRemove);
router.put("/activate", categoriaActivate);
router.put("/deactivate", categoriaDeactivate);

module.exports = router;