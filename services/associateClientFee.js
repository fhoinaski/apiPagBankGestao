const PagSeguroApi = require("../api/PagSeguroAPI");
const queries = require("../queries/queries");
const PagseguroGets = require("../services/pagSeguroGets");
const { registerUserNewTax } = require("./createUserDb");
const pagSeguroAPI = new PagSeguroApi();
const pagseguroGets = new PagseguroGets();

async function associateClientFee(dataAssociate) {
  const QUERY_ASSOCIATE_MOBI_PROMOTION = queries.associateMobiPromotion;
  const fecthPagsegurId = await pagseguroGets.getClientByEmail(
    dataAssociate.email
  );

  if(fecthPagsegurId.result === "NOK") return fecthPagsegurId;

  const pagseguroId = fecthPagsegurId.message.pagseguroId;
  const fectchDataTaxa = await pagseguroGets.userPromotion(fecthPagsegurId.message.customerId);

  const taxaAntiga = fectchDataTaxa.customer.promotion.currentMobiPromotion;


  const payload = {
    operationName: QUERY_ASSOCIATE_MOBI_PROMOTION.operationName,
    variables: {
      input: {
        // hierarchyID: 22005,
        hierarchyID: 21706,
        // promotion: dataAssociate.promotionName,
        promotionId: Number(dataAssociate.promotionId),
        sellerId: Number(pagseguroId),
        type: "PARTNER",
      },
    },
    query: QUERY_ASSOCIATE_MOBI_PROMOTION.query,
  };

  try {
    const response = await pagSeguroAPI.executeApiRequest(payload);
    if (!response.data.associateMobiPromotion.associated) {
      console.error("Erro na requisição:", response.data);
      throw new Error("Erro ao associar promoção.");
    }
    const dataUser = {
      email: dataAssociate.email,
      taxaNova: dataAssociate.promotionName,
      taxaAntiga: taxaAntiga,
      pagSeguroId: pagseguroId,
      primeiraTaxa:taxaAntiga
    };
    await registerUserNewTax(dataUser);
    return response.data;
    
  } catch (error) {
    console.error("Erro na requisição:", error);
   return {error: error.message};
  }
}

module.exports = associateClientFee;
