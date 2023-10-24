const express = require('express');
const router = express.Router();
const mockingProducts = require('./dao/mocks/mockingProducts');

const productController = require('../controllers/productController');
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
