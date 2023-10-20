const associateClientFee = require('../services/associateClientFee');
const registration = require('../services/customerRegistration/registrationPagseguro');


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
      const {promotionName,promotionId,pagseguroId} = req.body;
      
      const result = await associateClientFee(parseInt(pagseguroId), parseInt(promotionId), promotionName);
     res.status(200).json(result);
    } catch (error) {
       
      res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
  }

module.exports = {
  registrarUsuario,
  cadastrarNovasTaxas
}
