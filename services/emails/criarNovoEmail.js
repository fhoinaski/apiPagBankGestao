const axios = require("axios");
require('dotenv').config();

async function criarNovoEmail(email) {
  const novoEmail = {
    email: email
  };

  try {
    const response = await axios.post(process.env.API_URL_ACESSO+"/criaremail", novoEmail, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });

    return response.data.email;
  } catch (error) {
    console.log("Erro ao criar o email com acesso a API de email");
    console.log(error);
    return error;
  }
}

module.exports = criarNovoEmail;
