const express = require('express');
const { getProducts, getOneProduct, createProduct, deleteProduct, updateProduct } = require('../controllers/product');
const router = express.Router();

// GET /products - Get all products
router.get('/', getProducts);

// GET /products/:id - Get one product by ID
router.get('/:id', getOneProduct);

// POST /products - Create product
router.post('/', createProduct);

// DELETE /products/:id - Delet one product by ID
router.delete('/:id', deleteProduct);

//PUT /products/:id - Update one product by ID
router.put('/:id', updateProduct);

module.exports = router;