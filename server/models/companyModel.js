const axios = require('axios');
const BASE_URL = 'https://json-server-c67opnddza-el.a.run.app';

const getAllCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/companies`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching companies');
  }
};

module.exports = {
  getAllCompanies,
};
