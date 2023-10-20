const validateDocument = require("./utils/validateDocument");
const queries = require("../../queries/queries");
const PagSeguroAPI = require("../../api/PagSeguroAPI");
const { default: axios } = require("axios");

class DocumentDataFetcher {

    constructor() {
        this.api = new PagSeguroAPI();
    }
  
    async fetchCnpjData(cnpj) {
        try {
          
          
          if (!validateDocument(cnpj)) {
              throw new Error('CNPJ inválido');
          }
      
          const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
          const data = response.data;
          return data;
        } catch (error) {
      
          throw new Error('Erro ao buscar dados do CNPJ: ' + error.message);
        }
      }
  
    async fetchCpfData(document, documentType) {
        const QUERY_GET_SELLER = queries.getSeller;
        const QUERY_GET_ENTERPRISE = queries.getEnterprise;
                   
        const payload = {
          operationName: documentType === 'cpf' ? QUERY_GET_SELLER.operationName : QUERY_GET_ENTERPRISE.operationName,
          variables: {
            input: {
              document: document
            }
          },
          query: documentType === 'cpf' ? QUERY_GET_SELLER.query : QUERY_GET_ENTERPRISE.query
        };
      
        try {
          const response = await this.api.executeApiRequest(payload); 
        
      
          const data = response.data;
          
      
          if (documentType === 'cpf' && data?.getSeller) {
            return data.getSeller;
          } else if (documentType === 'cnpj' && data?.getEnterprise) {
            return data.getEnterprise;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
          return null;
        }
      }
  
  }

    module.exports = DocumentDataFetcher;
  
  