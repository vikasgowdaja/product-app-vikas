const { fetchAllProducts, fetchProductById, modifyProduct } = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await fetchProductById(id);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;
    const updatedProduct = await modifyProduct(id, updatedProductData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
};
