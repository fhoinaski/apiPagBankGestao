const associateClientFee = require('../services/associateClientFee');
const registration = require('../services/customerRegistration/registrationPagseguro');
const { restoreClientRate } = require('../services/restoreClientRate');


  const registrarUsuario = async (req, res) => {
    try {
      const dados = req.body;


      const retorno = await registration(dados);

      res.status(200).json(retorno);
    } catch (error) {
 
      res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
  }
  const cadastrarNovasTaxas = async (req, res) => {
    try {
      const {promotionName,promotionId,email} = req.body;
      const dataAssociate = {
        promotionName,
        promotionId,
        email
      }

      
      const result = await associateClientFee(dataAssociate);
     res.status(200).json(result);
    } catch (error) {
      console.log(error);
       
      res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
    
  }
  const restaurarTaxas = async (req, res) => {
    try {
      const email = req.query.email;
      const result = await restoreClientRate(email);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao restaurar taxas.' });
    }
  }


module.exports = {
  registrarUsuario,
  cadastrarNovasTaxas,
  restaurarTaxas
}
