const express = require('express');
const { getCompanies } = require('../controllers/companyController');
const { filterProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/companies', getCompanies);
router.get('/companies/:company/products', filterProducts);
router.get('/companies/:company/categories/:category/products', filterProducts);

module.exports = router;
