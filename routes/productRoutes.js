const express = require('express');
const router = express.Router();

const productController = require('../dao/controllers/productsController');
const checkProductPermission = require('../dao/middlewares/'); 

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', checkProductPermission, productController.deleteProduct);

module.exports = router;
