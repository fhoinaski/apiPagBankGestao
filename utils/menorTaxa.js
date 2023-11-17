const fs = require('fs');
const stringSimilarity = require('string-similarity');

const data = JSON.parse(fs.readFileSync('../data.json'));

function getIdsWithLowerTaxes(data, processor, min, max) {
  let lowerTaxes = Array(1).fill(Infinity);
  let lowerTaxIds = Array(1).fill(null);

  for (const id in data) {
    const summary = data[id].data.getSummaryConditions;

    if (summary) {
      for (const captureMethod of (summary.captureMethods || [])) {
        for (const paymentMethod of captureMethod.paymentMethods) {
          if (paymentMethod.name === 'CREDIT_CARD') {
            for (const constraint of paymentMethod.constraints) {
              if (constraint.escrow === 0 || constraint.escrow === 0) {
                if (constraint.paymentProcessors.some(p => p.name === processor)) {
                  for (const tax of constraint.taxes) {
                    if (tax.min >= min && tax.max <= max) {
                      const taxValue = parseFloat(tax.valueFormatted.replace(',', '.').replace('%', ''));
                      for (let i = 0; i < lowerTaxes.length; i++) {
                        if (taxValue < lowerTaxes[i]) {
                          lowerTaxes.splice(i, 0, taxValue);
                          lowerTaxIds.splice(i, 0, id);
                          lowerTaxes.pop();
                          lowerTaxIds.pop();
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return lowerTaxIds;
}

// console.log(getIdsWithLowerTaxes(data, 'VISA', 13, 18));

async function getCodeByName(name) {
  const data = fs.readFileSync("../data/codeTaxas.json", "utf8");
  const json = JSON.parse(data);
  let item = json.getMobilePromotionList.find((i) => i.name === name);

  if (!item) {
    const names = json.getMobilePromotionList.map(i => i.name);
    const bestMatch = stringSimilarity.findBestMatch(name, names);
    item = json.getMobilePromotionList[bestMatch.bestMatchIndex];
  }

  return item ? item.code : { error: "Nome não encontrado." };
}

getCodeByName("parceriasriopretocredacademias").then(code => {
  console.log(code);
});