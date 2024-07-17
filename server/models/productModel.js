const axios = require('axios');
const JSON_SERVER_URL = 'https://json-server-c67opnddza-el.a.run.app'; // Replace with your JSON server URL

const fetchAllProducts = async () => {
  const response = await axios.get(`${JSON_SERVER_URL}/products`);
  return response.data;
};

const fetchProductById = async (id) => {
  const response = await axios.get(`${JSON_SERVER_URL}/products/${id}`);
  return response.data;
};

const modifyProduct = async (id, updatedProductData) => {
  const response = await axios.put(`${JSON_SERVER_URL}/products/${id}`, updatedProductData);
  return response.data;
};

module.exports = {
  fetchAllProducts,
  fetchProductById,
  modifyProduct,
};
