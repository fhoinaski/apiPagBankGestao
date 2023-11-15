const fs = require('fs');

const data = JSON.parse(fs.readFileSync('../data.json'));

function getIdWithLowerTax(data, processor, min, max) {
  let lowerTax = null;
  let lowerTaxId = null;

  for (const id in data) {
    const summary = data[id].data.getSummaryConditions;

    if (summary) {
      for (const captureMethod of (summary.captureMethods || [])) {
        for (const paymentMethod of captureMethod.paymentMethods) {
          if (paymentMethod.name === 'CREDIT_CARD') {
            for (const constraint of paymentMethod.constraints) {
              if (constraint.escrow === 0 || constraint.escrow === 1) { // Adicionado esta condição
                if (constraint.paymentProcessors.some(p => p.name === processor)) {
                  for (const tax of constraint.taxes) {
                    if (tax.min === min && tax.max === max) {
                      if (lowerTax === null || tax.valueFormatted < lowerTax) {
                        lowerTax = tax.valueFormatted;
                        lowerTaxId = id;
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

  return lowerTaxId;
}

console.log(getIdWithLowerTax(data, 'VISA', 13, 18));