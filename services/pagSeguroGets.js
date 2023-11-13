const PagSeguroAPI = require("../api/PagSeguroAPI");
const queries = require("../queries/queries");

class PagseguroGets {
  constructor() {
    this.api = new PagSeguroAPI();
  }

  async getCustomerById(id) {
    const QUERY_GET_CUSTOMER_DATA_BY_ID = queries.getCustomerById;
    const payload = {
      operationName: QUERY_GET_CUSTOMER_DATA_BY_ID.operationName,
      variables: { input: { safePayUserId: id } },
      query: QUERY_GET_CUSTOMER_DATA_BY_ID.query,
    };

    try {
      const response = await this.api.executeApiRequest(payload);

      const data = response.data;
      if (data?.getCustomerLegacy) {
        const customer = await this.getCustomerDetails(
          data.getCustomerLegacy.customerId
        );

        return {
          userId: data.getCustomerLegacy.safepayUserId,
          details: customer,
        };
      } else if (data?.errors) {
        console.error("Erro na requisição:", data.errors);
        return null;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  async getCustomerDetails(customId) {
    const QUERY_GET_CUSTOMER_DETAILS = queries.getCustomerDetails;
    const payload = {
      operationName: QUERY_GET_CUSTOMER_DETAILS.operationName,
      variables: { id: customId },
      query: QUERY_GET_CUSTOMER_DETAILS.query,
    };

    try {
      const response = await this.api.executeApiRequest(payload);
      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  async getClientByEmail(email) {
    const QUERY_GET_CLIENTE_BY_EMAIL = queries.getClientByEmail;
    const payload = {
      operationName: QUERY_GET_CLIENTE_BY_EMAIL.operationName,
      variables: { input: { email: email } },
      query: QUERY_GET_CLIENTE_BY_EMAIL.query,
    };
    try {
      const result = await this.api.executeApiRequest(payload);
      const resultClient = result.data.getClients[0];
      if (!resultClient) {
        return {
          result: "NOK",
          message: "Email não encontrado na base de dados",
        };
      }
      return {
        result: "OK",
        message: resultClient,
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  async getDataByDocument(document) {
    const QUERY_CUSTOMER_EMAILS_BY_DOCUMENT = queries.getClientsByDocument;
    const RETRY_DELAY_MS = 1000;
    const MAX_RETRY_ATTEMPTS = 3;
    let tentativas = 0;

    while (tentativas < MAX_RETRY_ATTEMPTS) {
      const payload = {
        operationName: QUERY_CUSTOMER_EMAILS_BY_DOCUMENT.operationName,
        variables: { input: { document: document } },
        query: QUERY_CUSTOMER_EMAILS_BY_DOCUMENT.query,
      };
      try {
        const response = await this.api.executeApiRequest(payload);

        const dataValuesReturn = response.data.getClients.map((client) => {
          return {
            pagseguroId: client.pagseguroId,
            hashPsId: client.hashPsId,
            customerId: client.customerId,
            email: client.email,
          };
        });
    
        
        return dataValuesReturn;
      } catch (error) {
        console.error("Erro na requisição:", error);
        tentativas++;

        if (tentativas < MAX_RETRY_ATTEMPTS) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }

    return [];
  }
  async getPromotionList() {
    const QUERY_GET_PROMOTION_LIST = queries.getPromotionList;
    const payload = {
      operationName: QUERY_GET_PROMOTION_LIST.operationName,
      variables: {
        hType: "PARTNER",
        hierarchyId: 21000,
      },
      query: QUERY_GET_PROMOTION_LIST.query,
    };

    try {
      const response = await this.api.executeApiRequest(payload);
      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }
  async getSumaryConditions(promotionPsId) {
    const QUERY_GET_SUMARY_CONDITIONS = queries.getSumaryConditions;
    
    const payload = {
      operationName: QUERY_GET_SUMARY_CONDITIONS.operationName,
      variables: {
        promotionPsId: promotionPsId,
        hType: "PARTNER",
        hierarchyId: 22000,
      },
      query: QUERY_GET_SUMARY_CONDITIONS.query,
    };

    try {
      const response = await this.api.executeApiRequest(payload);
      return response;
    } catch (error) {
      console.error("Erro na requisição:", error);
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
          fields: { field: "network", value: "false" },
        },
      },
      query: QUERY_ONBOARDING_VALIDATE.query,
    };

    return await this.pagSeguroAPI.executeApiRequest(payload);
  }
  async verifyEmail(email) {
    const QUERY_ONBOARDING_VALIDATE = queries.onboardingValidate;

    const payload = {
      operationName: QUERY_ONBOARDING_VALIDATE.operationName,
      variables: {
        input: {
          document: "00000000000",
          fields: [
            { field: "email", value: email },
            { field: "network", value: "false" },
          ],
        },
      },
      query: QUERY_ONBOARDING_VALIDATE.query,
    };

    const result = await this.api.executeApiRequest(payload);
    const resultOnboarding = result.data.onboardingValidate[0];
    return resultOnboarding;
  }
  async getActivationCodeByEmail(email) {
    const QUERY_GET_USER_ACTIVATION_CODE = queries.getUserActivationCode;

    const getCustomer = await this.getClientByEmail(email);
    const customerId = getCustomer.message.customerId;

    const payload = {
      operationName: QUERY_GET_USER_ACTIVATION_CODE.operationName,
      variables: { input: { codCustomer: customerId } },
      query: QUERY_GET_USER_ACTIVATION_CODE.query,
    };

    const result = await this.api.executeApiRequest(payload);

    const resultActivation = result.data.getUserActivationCode;
    return resultActivation.readerActivationCode;
  }
  async getActivationCodeByDocument(document) {
    const QUERY_GET_USER_ACTIVATION_CODE = queries.getUserActivationCode;

    const getCustomer = await this.getDataByDocument(document);
    const customerId = getCustomer.map((customer) => {
      return customer.customerId;
    });

    const activations = [];

    for(let customer of customerId) {
    const payload = {
      operationName: QUERY_GET_USER_ACTIVATION_CODE.operationName,
      variables: { input: { codCustomer: customer } },
      query: QUERY_GET_USER_ACTIVATION_CODE.query,
    };

    const result = await this.api.executeApiRequest(payload);

    activations.push(result.data.getUserActivationCode.readerActivationCode);
  }
    return activations;
  }

  async listarMaquinas(idOrder) {
   
    const result = await this.api.listaMaquinas(idOrder);

    return result;
  }
  async userPromotion(customerId) {
    const QUERY_USER_PROMOTION = queries.userPromotion;

    const payload = {
      operationName: QUERY_USER_PROMOTION.operationName,
      variables: { customerId: customerId },
      query: QUERY_USER_PROMOTION.query,
    };

    const result = await this.api.executeApiRequest(payload);

    return result.data;
  }
}

module.exports = PagseguroGets;
