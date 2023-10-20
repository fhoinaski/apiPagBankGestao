const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Minha API",
      description: "Documentação da minha API",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/api",
    schemes: ["http"],
    paths: {
      "/cadastro/usuario": {
        post: {
          tags: ["Cadastro"],
          summary: "Cadastra um novo usuário",
          description: "Rota para cadastrar um novo usuário na aplicação",
          parameters: [
            {
              name: "body",
              in: "body",
              description: "Dados para um novo cadastro",
              required: true,
              schema: {
                $ref: "#/definitions/Usuario",
              },
            },
          ],
          responses: {
            200: {
              description: "Usuário registrado com sucesso",
            },
            500: {
              description: "Erro ao registrar usuário",
            },
          },
        },
      },
      "/cadastro/novastaxas": {
        post: {
          tags: ["Cadastro"],
          summary: "Cadastra novas taxas",
          parameters: [
            {
              in: "body",
              name: "body",
              schema: {
                type: "object",
                properties: {
                  promotion: {
                    description: "Nome da condição de taxas",
                    type: "string",
                  },
                  promotionId: {
                    description: "ID da condição de taxas",
                    type: "string",
                  },
                  sellerId: {
                    description: "ID do cliente",
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Taxas cadastradas",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/cep": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta CEP",
          description: "Retorna os dados de endereçamento a partir de um CEP",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  cep: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Dados do CEP",
            },
            500: {
              description: "Erro na consulta do CEP",
            },
          },
        },
      },
      "/consulta/documento": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta documento",
          description: "Retorna os dados de um CPF ou CNPJ",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  document: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Dados do documento",
            },
            400: {
              description: "Documento inválido",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/validar-email": {
        post: {
          tags: ["Consulta"],
          summary: "Validar e-mail",
          description:
            "Retorna se email ja esta cadastrado ou não na pagseguro",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Consulta efetuada com sucesso",
            },
            400: {
              description: "Dados enviados são invalidos",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/emails-por-documento": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta e-mails por documento",
          description: "Retorna os e-mails de um cliente por CPF ou CNPJ",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  document: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "E-mails do cliente",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/cliente-por-email": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta cliente por e-mail",
          description: "Retorna os dados de um cliente por seu e-mail",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Dados do cliente",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/detalhes-cliente": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta detalhes do cliente",
          description: "Retorna os detalhes de um cliente por ID",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  customerId: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Detalhes do cliente",
            },
            400: {
              description: "customerId é obrigatório",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/cliente-por-id": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta cliente por ID",
          description: "Retorna os dados de um cliente por seu ID",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Dados do cliente",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/listar-promocoes": {
        get: {
          tags: ["Consulta"],
          summary: "Lista todos os planos de taxas disponiveis",
          description: "Retorna as promoções disponíveis",
          responses: {
            200: {
              description: "Promoções",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/consulta/condicoes-resumidas": {
        post: {
          tags: ["Consulta"],
          summary: "Consulta condições resumidas",
          description:
            "Retorna as condições resumidas de uma condição de taxas",
          parameters: [
            {
              name: "body",
              in: "body",
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Condições resumidas",
            },
            400: {
              description: "Codigo da condição é obrigatório",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
      "/validar-cliente": {
        post: {
          tags: ["Consulta"],
          summary: "Valida se cliente pode ser cadastrado na pagseguro",
          description:
            "Verifica se um CPF/CNPJ corresponde a um cliente válido",
          parameters: [
            {
              name: "body",
              in: "body",
              "x-examples": {
                "application/json": {
                  document: "12345678901",
                },
              },
              schema: {
                type: "object",
                properties: {
                  document: {
                    type: "string",
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: "Consulta realizada com sucesso",
            },
            400: {
              description: "Documento inválido",
            },
            500: {
              description: "Erro no servidor",
            },
          },
        },
      },
    },

    definitions: {
      Usuario: {
        type: "object",
        properties: {
          address: {
            $ref: "#/definitions/Address",
          },
          business: {
            $ref: "#/definitions/Business",
          },
          document: {
            description: "CPF ou CNPJ do usuário",
            type: "string",
          },
          email: {
            description: "Email principal do usuário",
            type: "string",
          },
          info: {
            $ref: "#/definitions/Info",
          },
          type: {
            description: "Tipo de usuário obrigatorio",
            type: "string",
            enum: ["pf", "pj"],
          },
        },
      },

      Address: {
        type: "object",
        properties: {
          address: {
            description: "Endereço do usuário",
            type: "string",
          },
          addressNumber: {
            description: "Número do endereço do usuário",
            type: "string",
          },
          city: {
            description: "Cidade do usuário",
            type: "string",
          },
          districtID: {
            description: "ID do bairro do usuário",
            type: "string",
          },
          districtName: {
            description: "Nome do bairro do usuário",
            type: "string",
          },
          federationUnit: {
            description: "UF do usuário",
            type: "string",
          },
          postalAreaCode: {
            description: "CEP do usuário",
            type: "string",
          },
          addressComplement: {
            description: "Complemento do endereço do usuário",
            type: "string",
          },
        },
      },

      Business: {
        type: "object",
        properties: {
          productMainCategoryId: {
            description: "ID do produto do tipo de negocio do usuário",
            type: "string",
          },
          mobiPromotionId: {
            description: "ID da taxa promocional aplicada ao usuario",
            type: "string",
          },
          mobiPromotionName: {
            description: "Codigo/Nome da taxa promocional aplicada ao usuario",
            type: "string",
          },
        },
      },

      Info: {
        type: "object",
        properties: {
          birthDate: {
            description: "Data de nascimento do usuário",
            type: "string",
          },
          celAreaCode: {
            description: "DDD do celular do usuário",
            type: "string",
          },
          celPhoneNumber: {
            description: "Número do celular do usuário sem o DDD",
            type: "string",
          },
          cnpj: {
            description:
              "CNPJ do usuário se for cadastro PJ deve ser envio obrigatório",
            type: "string",
          },
          companyName: {
            description:
              "Nome social da empresa do usuário se for cadastro PJ deve ser envio obrigatório",
            type: "string",
          },
          cpf: {
            description:
              "CPF do usuário obrigatório tanto para cadastro PF quanto PJ",
            type: "string",
          },
          motherName: {
            description: "Nome da mãe do usuário",
            type: "string",
          },
          monthlyRevenue: {
            description: "Renda mensal do usuário",
            type: "number",
          },
          name: {
            description: "Nome do usuário",
            type: "string",
          },
          netWorth: {
            description: "Patrimônio do usuário",
            type: "number",
          },
          trademark: {
            description: "Nome fantasia da empresa do usuário",
            type: "string",
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
const uiConfig = {
  authorizedApiKey: "Bearer <token>",
  authorizations: {
    bearer: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};
module.exports = {
  swaggerSpec,
  uiConfig,
};
