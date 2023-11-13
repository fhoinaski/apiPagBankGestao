const axios = require("axios");
const verifyDocumentWithRetry = require("../services/documentConsult/verifyDocumentWithRetry ");
const validateDocument = require("../services/documentConsult/utils/validateDocument");
const { HTTP_STATUS } = require("./constants/httpStatus");
const ERROR_MESSAGES = require("./constants/errorMessages");
const { DATA_TYPES } = require("./constants/dataConstants");
const DocumentDataFetcher = require("../services/documentConsult/documentDataFetcher");
const PagseguroGets = require("../services/pagSeguroGets");
const { fetchDataCep } = require("./utils/fetchDataCep");
const dataValidate = require("./utils/dataValidate");

const pagSeguroGets = new PagseguroGets();
const fetch = new DocumentDataFetcher();

const validarCliente = async (req, res) => {
  try {
    const { document } = req.body;
    const documentVerify = await validateDocument(document);

    if (documentVerify.error) {
      logger.error(`Documento inválido:, ${JSON.stringify(documentVerify)}`);

      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: documentVerify.error });
      return;
    }
    {
      const resultData = await verifyDocumentWithRetry(
        documentVerify.value,
        documentVerify.documentType
      );
      res.status(HTTP_STATUS.OK).json(resultData);
    }
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SEVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const buscarCep = async (req, res) => {
  try {
    const { cep } = req.body;
    const cepVerify = await dataValidate.validateCep(cep);
    if (cepVerify.error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: cepVerify.error });
      return;
    }

    const resultFetchCep = await fetchDataCep(cepVerify);
    if (resultFetchCep.erro) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGES.INVALID_CEP });
      return;
    }
    res.status(HTTP_STATUS.OK).json(resultFetchCep);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

const consultarDocumento = async (req, res) => {
  try {
    const { document } = req.body;

    const documentVerify = await validateDocument(document);

    if (documentVerify.error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: documentVerify.error });
      return;
    }

    const documentFormat = documentVerify.value;

    let result;

    if (documentFormat.length === DATA_TYPES.CPF_LENGTH) {
      result = await fetch.fetchCpfData(documentFormat, DATA_TYPES.CPF);
    } else if (documentFormat.length === DATA_TYPES.CNPJ_LENGTH) {
      const resultData = await fetch.fetchCnpjData(documentFormat);

      result = {
        cnpj: documentFormat,
        companyName: resultData.razao_social,
        tradeName: resultData.nome_fantasia,
      };
    } else {
      logger.error(`Documento inválido:, ${JSON.stringify(result.document)}`);
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGES.INVALID_DOCUMENT });
      return;
    }

    return res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const obterClientePorId = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await pagSeguroGets.getCustomerById(id);
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar ID." });
  }
};

const obterDadosPorDocumento = async (req, res) => {
  try {
    const { document } = req.body;
    const dataValuesReturn = await pagSeguroGets.getDataByDocument(document);
    res.status(HTTP_STATUS.OK).json(dataValuesReturn);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar emails." });
  }
};

const obterClientePorEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pagSeguroGets.getClientByEmail(email);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar id." });
  }
};

const obterDetalhesCliente = async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "O campo customerId é obrigatório." });
      return;
    }
    const resultValidateCustomerId =
      dataValidate.validateCustomerId(customerId);
    if (resultValidateCustomerId.error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: resultValidateCustomerId.error });
      return;
    }

    const result = await pagSeguroGets.getCustomerDetails(customerId);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar id." });
  }
};
const listarPromocoes = async (req, res) => {
  try {
    const result = await pagSeguroGets.getPromotionList();
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar id." });
  }
};

const obterCondicoesResumidas = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send("Código é obrigatório");
  }

  const codeNum = Number(code);
  try {
    const result = await pagSeguroGets.getSumaryConditions(codeNum);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar id." });
  }
};
const validarEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email || email.includes("@") === false) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send(ERROR_MESSAGES.INVALID_EMAIL);
    }
    const result = await pagSeguroGets.verifyEmail(email);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar email." });
  }
};

const obterCodigoAtivacao = async (req, res) => {
  const { document, email } = req.body;
  try {
    let result;
  
    if (document) {
      result = await pagSeguroGets.getActivationCodeByDocument(document);
    } else if (email) {
      result = await pagSeguroGets.getActivationCodeByEmail(email);
    } else {
      // Se nenhum dos campos for enviado, retorna um erro
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Nenhum campo enviado." });
    }
  
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Erro ao consultar código.",
      cause: error,
    });
  }
};

const listarMaquinas = async (req, res) => {
  const { idOrder } = req.body;
  const result = await pagSeguroGets.listarMaquinas(parseInt(idOrder));
  try {
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao consultar email." });
  }
};

module.exports = {
  listarMaquinas,
  obterCodigoAtivacao,
  validarCliente,
  buscarCep,
  consultarDocumento,
  obterClientePorId,
  obterDadosPorDocumento,
  obterClientePorEmail,
  obterDetalhesCliente,
  listarPromocoes,
  obterCondicoesResumidas,
  validarEmail,
};
