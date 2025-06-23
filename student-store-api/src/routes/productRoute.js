const express = require('express');
const router = express.Router();
const productController = require('../controlers/productControler.js');

router.post('/create', productController.createProduct);
router.get("/",productController.getProduct)
router.put('/:id/update',productController.updateProduct)
router.delete('/:id/delete',productController.deleteProduct)

module.exports = router;