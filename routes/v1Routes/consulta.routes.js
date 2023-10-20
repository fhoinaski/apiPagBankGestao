const express = require('express');
const router = express.Router();

const consultaController = require('../../controllers/consulta.controllers');


router.post('/cep', consultaController.buscarCep);

router.post('/documento', consultaController.consultarDocumento);

router.post('/emails-por-documento', consultaController.obterDadosPorDocumento);

router.post('/cliente-por-email', consultaController.obterClientePorEmail);

router.post('/detalhes-cliente', consultaController.obterDetalhesCliente); 

router.post('/cliente-por-id', consultaController.obterClientePorId);

router.get('/listar-promocoes', consultaController.listarPromocoes);

router.post('/condicoes-resumidas', consultaController.obterCondicoesResumidas);

router.post('/codigo-ativacao', consultaController.obterCodigoAtivacao);

router.post('/listar-maquinas', consultaController.listarMaquinas);

module.exports = router;