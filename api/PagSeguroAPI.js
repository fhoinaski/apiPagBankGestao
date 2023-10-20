const axios = require("axios");
const TokenService = require('../token/tokenServices'); 
const redisClient = require("../redis/connectRedis");
const configService = require('../config/config.services');
const config = require('../config/config');
const tokenService = new TokenService(redisClient);

class PagSeguroAPI {
  constructor() {
    this.url = config.apiUrl;
    
  }

  async executeApiRequest(payload) {

    try {
      const token = await tokenService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
        Origin: "https://gestaocomercial.pagseguro.com.br",
        Referer: "https://gestaocomercial.pagseguro.com.br/",
        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      };
    
      const response = await axios.post(this.url, payload, { headers });
      
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      
    }
  }

  async listaMaquinas(idOrder) {
    const token = await tokenService.getToken();

    try {

      const url = `https://ws.gestaocomercial.pagseguro.com.br/order/cart/${idOrder}/list?type=LENDING_WITH_FEE`;
  
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Origin': 'https://gestaocomercial.pagseguro.com.br',
          'Referer': 'https://gestaocomercial.pagseguro.com.br/',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
  
     
      return response.data;
    } catch (error) {
     
      return error;
    }
}
}

module.exports = PagSeguroAPI;
