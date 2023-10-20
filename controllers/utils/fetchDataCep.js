const axios = require('axios');

const fetchDataCep = async (cep) => {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await axios.get(url);
    const data = response.data;
    return {
      status: response.status,
      data: data,

    };
  } catch (error) {
    return {
      status: error.response.status,
    }
   
  }
}

module.exports = { fetchDataCep };
