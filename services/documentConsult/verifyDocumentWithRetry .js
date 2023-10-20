const GetDocumentServices = require('./documentServices');
const MAX_TENTATIVAS = 3;


async function verifyDocumentWithRetry (document, documentType) {
  const getDocumentServices = new GetDocumentServices(documentType);
  

  try {
 
    for (let tentativas = 0; tentativas < MAX_TENTATIVAS; tentativas++) {
      const resultado = await getDocumentServices.getDocumentServices(document);
      if (resultado) {
        return resultado;
      }
    }

    throw new Error(
      "Limite de tentativas alcançado na requisição VerificarDocumento"
    );
  } catch (error) {
    console.error({
      code: "008",
      type: "NOK",
      status: "Error",
      message: "Erro na requisição VerificarDocumento",
      error,
    });
    return {
      code: "008",
      type: "NOK",
      status: "Error",
      message: "Erro na requisição VerificarDocumento",
    };
  }
}


module.exports = verifyDocumentWithRetry ;
