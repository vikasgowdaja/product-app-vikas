const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'https://json-server.bytexl.app';

const constructUrl = (baseUrl, endpoint, queryParams) => {
  let url = `${baseUrl}${endpoint}`;
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }
  return url;
};

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const filterProducts = async (req, res) => {
  try {
    const {
      top,
      availability = 'All',
      minPrice = '0',
      maxPrice = '5000',
    } = req.query;

    const { category, company } = req.params;

    let endpoint = '/products';
    const queryParams = [];

    if (category) {
      endpoint = `/categories/${encodeURIComponent(category)}/products`;
    }
    if (company) {
      endpoint = `/companies/${encodeURIComponent(company)}/products`;
    }
    if (category && company) {
      endpoint = `/companies/${encodeURIComponent(company)}/categories/${encodeURIComponent(category)}/products`;
    }

    if (minPrice) {
      queryParams.push(`minPrice=${encodeURIComponent(Number(minPrice))}`);
    }
    if (maxPrice) {
      queryParams.push(`maxPrice=${encodeURIComponent(Number(maxPrice))}`);
    }
    if (availability && availability !== 'All') {
      queryParams.push(`availability=${encodeURIComponent(availability)}`);
    }
    if (top) {
      queryParams.push(`top=${encodeURIComponent(Number(top))}`);
    }

    const url = constructUrl(API_BASE_URL, endpoint, queryParams);
    const response = await axios.get(url);
    const filteredProducts = response.data;

    res.json(filteredProducts);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ error: 'Error filtering products' });
  }
};

module.exports = { getProducts, filterProducts };
