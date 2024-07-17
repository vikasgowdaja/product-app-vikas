const companyModel = require('../models/companyModel');

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await companyModel.getAllCompanies();
    res.json(companies);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCompanies,
};
