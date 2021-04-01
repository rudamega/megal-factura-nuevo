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
router.get("/:id", categoriaQuery);
router.get("/", categoriaList);
router.put("/:id", categoriaUpdate);
router.delete("/:id", categoriaRemove);
router.put("/activate/:id", categoriaActivate);
router.put("/deactivate/:id", categoriaDeactivate);

module.exports = router;