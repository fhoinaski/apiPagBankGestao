const express = require('express');
const router = express.Router();

const consultaRouter = require('./v1Routes/consulta.routes');
const cadastroRoutes = require('./v1Routes/cadastro.routes');
const validarDadosRoutes = require('./v1Routes/validar-dados.routes');


router.use('/api/consulta',consultaRouter);
router.use('/api/cadastro', cadastroRoutes);
router.use('/api/', validarDadosRoutes);

module.exports = router;
