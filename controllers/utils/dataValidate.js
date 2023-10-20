const ERROR_MESSAGES = require("../constants/errorMessages");

const CUSTOMER_ID_PREFIX = "CUSTOMER:";

class DataValidate {
  validateCustomerId = (customerId) => {
    if (!customerId.startsWith(CUSTOMER_ID_PREFIX)) {
      return {
        error: "O customer ID deve conter o prefixo CUSTOMER: antes do token",
      };
    }

    return true;
  };
  validateCep = (cep) => {
   
    const cepValidate = cep.replace(/\D/g, "");

    if (cepValidate.length !== 8 || isNaN(cepValidate)) {
      
      return {
        error:ERROR_MESSAGES.INVALID_CEP,
      };
    }

    return cepValidate;
  };
}

const dataValidate = new DataValidate();

module.exports = dataValidate;
