const axios = require('axios');

const API_BASE_URL = 'https://json-server.bytexl.app';

const getCategories = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

module.exports = { getCategories };
