const axios = require('axios');
require('dotenv').config();
const queries = require('../queries/queries');


const URL = process.env.API_URL;

const config = {
  url: URL,
  headers: {
    Referer: 'https://gestaocomercial.pagseguro.com.br/',
    'Content-Type': 'application/json',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  },
};

async function getToken() {
  const { url, headers } = config;
  const QUERY_AUTHENTICATE = queries.authenticate;

  const payload = {
    operationName: QUERY_AUTHENTICATE.operationName,
    variables: {
      input: {
        username: process.env.GESTAO_USERNAME,
        password: process.env.GESTAO_PASSWORD,
        uolEmployee: false,
        recaptchaToken: 'false',
      },
    },
    query: QUERY_AUTHENTICATE.query,
    
  };

  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.post(url, payload, { headers });
      // console.log(response.data.data.authenticate.user.hierarchyID);

      return response.data.data.authenticate.accessToken;
    } catch (error) {
      console.error('Erro ao obter token:', error.message);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error('Falha na obtenção do token após várias tentativas');
}

module.exports = getToken;
