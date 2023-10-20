const { cpf, cnpj } = require('cpf-cnpj-validator');

function validateDocument(document) {
  let formatted = document.replace(/\D/g, '');
  let error;
  let documentType;

  if (formatted.length === 11) {
    if (!cpf.isValid(formatted)) {
      error = 'CPF inválido';
    }
    documentType = 'cpf';
  } else if (formatted.length === 14) {
    if (!cnpj.isValid(formatted)) {
      error = 'CNPJ inválido';
    }
    documentType = 'cnpj';
  } else {
    error = 'Documento inválido';
  }

  return {
    error, 
    value: formatted,
    documentType
  };
}

module.exports = validateDocument;
