const UsuarioPf = require("./UsuarioPf");
const UsuarioPj = require("./UsuarioPj");
const PagSeguroAPI = require("../../api/PagSeguroAPI");


async function registration(dadosPaylaod) {

  const usuarioPf = new UsuarioPf(dadosPaylaod);
  const usuarioPj = new UsuarioPj(dadosPaylaod);
 
  const api = new PagSeguroAPI();

  const tipoRegistro = dadosPaylaod.type === "pf" ? usuarioPf : usuarioPj;

  const payload = await tipoRegistro.getPayload()

  
  try {
    const data = await api.postRegistrationData(payload);

    if (data.errors) {
      return {
        code: "404",
        status: "NOK",
        statusRegistro: "Erro ao cadastrar",
      };
    }

    const dadoPagseguro = data.data.postRegistrationData;
 

    if (dadoPagseguro.waitingForAnalysis) {
      return {
        code: "204",
        status: "NOK",
        email: payload.variables.input.user.email,
        statusRegistro: "Aguardando análise",
      };
    }

    if (dadoPagseguro.effectiveRegistration) {
      // const acesso = await primeiroAcesso(payload.variables.input.user.email, dadosPaylaod.user.email);

      return {
        code: "200",
        status: "OK",
        // acessofeito: acesso,
        email: payload.variables.input.user.email,
        statusRegistro: acesso ? "Cadastro efetuado com sucesso" : "Cadastro efetuado",
      };
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = registration;
