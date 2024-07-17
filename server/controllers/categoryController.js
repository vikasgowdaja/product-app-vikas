const categoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
};
