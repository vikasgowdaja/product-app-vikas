const axios = require('axios');
const BASE_URL = 'https://json-server-c67opnddza-el.a.run.app';

const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

module.exports = {
  getAllCategories,
};
