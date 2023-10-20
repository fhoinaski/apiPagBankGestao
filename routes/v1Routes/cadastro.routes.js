const express = require('express');
const router = express.Router();
const cadastroController = require('../../controllers/cadastro.controllers'); 


router.post('/usuario', cadastroController.registrarUsuario);
router.post('/novastaxas', cadastroController.cadastrarNovasTaxas);


module.exports = router;
