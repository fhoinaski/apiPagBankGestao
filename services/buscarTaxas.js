const fs = require('fs');
const data = require('../data.json'); // substitua pelo caminho do seu arquivo JSON
const PagseguroGets = require('./pagSeguroGets');

const pagSeguroGets = new PagseguroGets();

async function processPromotions() {
  let results = {};

  try{
    for (let promotion of data.getMobilePromotionList) {
      let code = promotion.code;
      let result = await pagSeguroGets.getSumaryConditions(code);
      results[code] = result;
    }
  
    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = processPromotions;
