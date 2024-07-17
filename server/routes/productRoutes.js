const express = require('express');
const { getProducts, filterProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/products', getProducts);
router.get('/filterProducts', filterProducts);

module.exports = router;
