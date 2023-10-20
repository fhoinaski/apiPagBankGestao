const express = require('express');
const router = express.Router();

const consultaController = require('../../controllers/consulta.controllers');




router.post('/validar-cliente', consultaController.validarCliente);

router.post('/validar-email', consultaController.validarEmail);


module.exports = router;