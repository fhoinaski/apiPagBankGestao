const axios = require('axios');
const pegarToken = require('./pegarToken');
require('dotenv').config();

async function verificarEmail(documento,email) {
  const URL = process.env.API_URL;


  const payload = {
    operationName: 'onboardingValidate',
    variables: {
      input: {
        document: documento,
        fields: email ? [
          { field: 'email', value: email },
          { field: 'network', value: 'false' }
        ] : []
      }
    },  
    query: `
      query onboardingValidate($input: InputOnboardingValidate) {
        onboardingValidate(input: $input) {
          status
          reason {
            code
            message
            __typename
          }
          description
          field
          __typename
        }
      }
    `
  };

  try {
    const token = await pegarToken();
    const response = await axios.post(URL, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
   

    if (data && data.data && data.data.onboardingValidate && data.data.onboardingValidate.length > 0) {
      const result = data.data.onboardingValidate[0];
      if (result.status === 'OK') {
        return {
          status: result.status,
          message: result.reason.message
        };
      } else if (result.status === 'NOK') {
        return {
          status: result.status,
          message: result.reason.message
        };
      } else {
        return {
          status: 'Invalid',
          message: 'Status inválido'
        };
      }
    } else {
      return {
        status: 'Invalid',
        message: 'Resposta inválida'
      };
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return {
      status: 'Error',
      message: 'Erro na requisição'
    };
  }
}

module.exports = verificarEmail;
