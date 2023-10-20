const PagSeguroApi = require("../api/PagSeguroAPI");
const queries = require("../queries/queries");

async function associateClientFee(pagseguroId, promotionId, promotionName) {
  const pagSeguroAPI = new PagSeguroApi();
  const QUERY_ASSOCIATE_MOBI_PROMOTION = queries.associateMobiPromotion;

  const payload = {
    operationName: QUERY_ASSOCIATE_MOBI_PROMOTION.operationName,
    variables: {
      input: {
        // hierarchyID: 22005,
        hierarchyID: 21706,
        promotion: promotionName,
        promotionId: promotionId,
        sellerId: pagseguroId,
        type: "PARTNER",
      },
    },
    query: QUERY_ASSOCIATE_MOBI_PROMOTION.query,
  };

    try {
        const response = await pagSeguroAPI.executeApiRequest(payload);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}

module.exports = associateClientFee;
