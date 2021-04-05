const { Router } = require('express');
const {
    categoriaAdd,
    categoriaQuery,
    categoriaList,
    categoriaUpdate,
    categoriaRemove,
    categoriaActivate,
    categoriaDeactivate,
    categoriaPrint
} = require('../controllers/CategoriaController');

const router = Router();

router.post("/add", categoriaAdd);
router.post("/print", categoriaPrint);
router.get("/:id", categoriaQuery);
router.get("/", categoriaList);
router.put("/:id", categoriaUpdate);
router.delete("/:id", categoriaRemove);
router.put("/activate/:id", categoriaActivate);
router.put("/deactivate/:id", categoriaDeactivate);


module.exports = router;