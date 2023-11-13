const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



async function registerUserNewTax(dataUser){
  //verifica se o email ja esta cadstrado
  const user = await prisma.user.findUnique({
    where: {
      email: dataUser.email
    }
  });
  // se ja esta cadastrado atualiza a taxa do cadastro
  if(user){
    const updateUser = await prisma.user.update({
     
      where: {
        email: dataUser.email
      },
      data: {
        taxaAntiga: dataUser.taxaAntiga,
        taxaNova: dataUser.taxaNova,
        restauradoTaxas: false
      }
    });
    return updateUser;
  }
  const createUser = await prisma.user.create({
    data: dataUser
  });

  return createUser;
}

module.exports = { registerUserNewTax };