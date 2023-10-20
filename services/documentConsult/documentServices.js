const PagSeguroAPI = require("../../api/PagSeguroAPI");
const DocumentDataFetcher = require("./documentDataFetcher");
const queries = require("../../queries/queries");

const fetch = new DocumentDataFetcher();

class GetDocumentServices {
  constructor(tipoDocumento) {
    this.tipoDocumento = tipoDocumento;
    this.pagSeguroAPI = new PagSeguroAPI();
  }

  async getDocumentServices(document) {
    try {
      const response = await this.verifyDocument(document);

      if (!response) return null;

      const data = response.data;

      if (data.errors) {
        if (this.handleExpiredTokenError(data.errors)) {
          await this.tokenService.updateTokenCache();
          return this.getDocumentServices(
            await this.tokenService.getToken(),
            document
          );
        }
        return this.handleInvalidResponseError(data.errors);
      }

      console.log("Resposta da requisição VerificarDocumento:", data.onboardingValidate[0]);
      const result = data.onboardingValidate[0];

      if (result.status === "OK") {
        return this.handleSuccessfulResponse(document, result);
      } else if (result.status === "NOK") {
        return this.handleFailedResponse(result.reason);
      } else {
        return this.handleInvalidResponse();
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async verifyDocument(document) {
    const QUERY_ONBOARDING_VALIDATE = queries.onboardingValidate;

    const payload = {
      operationName: QUERY_ONBOARDING_VALIDATE.operationName,
      variables: { 
        input: { 
          document: document, 
          fields: [] 
        }
         },

      query: QUERY_ONBOARDING_VALIDATE.query,
    };

    return await this.pagSeguroAPI.executeApiRequest(payload);
  }

  handleExpiredTokenError(errors) {
    return errors[0]?.extensions?.code === "UNAUTHENTICATED";
  }

  handleInvalidResponseError(errors) {
    return {
      code: "001",
      type: "NOK",
      status: "Invalid",
      messageError: errors,
      message: "Resposta inválida da requisição do token VerificarDocumento",
    };
  }

  async handleSuccessfulResponse(document, result) {
    let dados;
    if (this.tipoDocumento === "cpf") {
      dados = await this.getDataCpf(document, this.tipoDocumento);
    } else if (this.tipoDocumento === "cnpj") {
      try {
        const consultCnpjData = await this.getDataCnpj(document);
        dados = {
          cnpj: consultCnpjData.cnpj,
          companyName: consultCnpjData.razao_social,
          tradeName: consultCnpjData.nome_fantasia,
        };
      } catch (error) {
        console.error("Erro ao obter dados do CNPJ:", error);
      }
    }

    return {
      type: result.status,
      codeType: result.reason.code,
      message: result.reason.message,
      dados: dados,
    };
  }

  handleFailedResponse(reasonCode) {
    if (reasonCode.code === "3044") {
      return {
        type: "NOK",
        codeType: "3044",
        message: reasonCode.message,
      };
    } else if (reasonCode.code === "1054") {
      return {
        type: "NOK",
        codeType: "1054",
        message: reasonCode.message,
      };
    } else {
      return {
        code: "007",
        type: "NOK",
        status: "Invalid",
        message: "Status inválido na requisição VerificarDocumento",
      };
    }
  }

  async getDataCpf(document, tipoDocumento) {
    const dataCpf = await fetch.fetchCpfData(document, tipoDocumento);
    return dataCpf;
  }

  async getDataCnpj(document) {
    const dataCnpj = await fetch.fetchCnpjData(document);
    return dataCnpj;
  }
}

module.exports = GetDocumentServices;
