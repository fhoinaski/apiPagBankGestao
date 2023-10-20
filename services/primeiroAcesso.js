const axios = require('axios');
const https = require('https');
require('dotenv').config();

async function primeiroAcesso(emailAcesso, emailCliente) {
  const payload = {
    emailAcesso: emailAcesso,
    emailCliente: emailCliente
  };


  try {
    // Configuração sem verificação do certificado do servidor
   
    const response = await axios.post(process.env.API_URL_ACESSO + '/acessopagbank', payload, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // Não verificar o certificado
      })
    });

    if (response.data.code === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    return false;
  }
}

module.exports = primeiroAcesso;
