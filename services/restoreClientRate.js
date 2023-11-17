const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const stringSimilarity = require('string-similarity');
const PagSeguroApi = require("../api/PagSeguroAPI");
const queries = require("../queries/queries");
const pagSeguroAPI = new PagSeguroApi();


const prisma = new PrismaClient();

async function getCodeByName(name) {
  const data = fs.readFileSync("./data/codeTaxas.json", "utf8");
  const json = JSON.parse(data);
  let item = json.getMobilePromotionList.find((i) => i.name === name);

  if (!item) {
    const names = json.getMobilePromotionList.map(i => i.name);
    const bestMatch = stringSimilarity.findBestMatch(name, names);
    item = json.getMobilePromotionList[bestMatch.bestMatchIndex];
  }

  return item ? item.code : { error: "Nome não encontrado." };
}

async function restoreClientRate(email) {
  const client = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!client) {
    return { error: "Cliente não encontrado para restaurar taxa verifique o email." };
  }
  let code;
  if(client.primeiraTaxa === "DEFAULT"){
    code = 724227
  }else{
    code = await getCodeByName(client.primeiraTaxa);
  }

  

  const payload = {
    selelerId: client.pagSeguroId,
    promotionId: code.error ? 724227 : code,
    promotionName: code.error ? "taxapadraosite" : client.primeiraTaxa,
  };

  try {
    const result = await associateClientFee(payload);
    return result;
  } catch (error) {
    console.log(error);
    return { error: "Erro ao restaurar taxas." };
  }

}

async function updateClientRate(payload) {

  const result = await prisma.user.update({
    where: {
      pagSeguroId: payload.pagSeguroId, 
    },
    data: payload
  });

  return result;
}

async function associateClientFee(dataAssociate) {
  const QUERY_ASSOCIATE_MOBI_PROMOTION = queries.associateMobiPromotion;
  
  const payload = {
    operationName: QUERY_ASSOCIATE_MOBI_PROMOTION.operationName,
    variables: {
      input: {
        // hierarchyID: 22005,
        hierarchyID: 21706,
        hierarchyID: 21700,
        promotion: dataAssociate.promotionName,
        promotionId: Number(dataAssociate.promotionId),
        sellerId: Number(dataAssociate.selelerId),
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
      pagSeguroId: dataAssociate.selelerId,
      taxaNova: dataAssociate.promotionName,
      restauradoTaxas: true,
    };
    await updateClientRate(dataUser);
    return response.data;
    
  } catch (error) {
    console.error("Erro na requisição:", error);
   return {error: error.message};
  }
}

module.exports = {
  restoreClientRate,
  updateClientRate  
};