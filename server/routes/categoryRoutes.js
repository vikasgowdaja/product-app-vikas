const express = require('express');
const { getCategories } = require('../controllers/categoryController');
const { filterProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:category/products', filterProducts);

module.exports = router;
