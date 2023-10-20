const express = require("express");
const cors = require("cors");
// const { connect } = require("./database/connect");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec, uiConfig } = require("./swaggerConfig");
const configService = require("./config/config.services");


const port = configService.getPort();


class Server {
  constructor(server = express()) {
    this.middlewares(server);
    // this.database();
    this.todasRotas(server);
    this.start(server);
  }

  async middlewares(app) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiConfig));
    app.use(cors(
      {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }
    ));
    app.use(express.json());
  }

  // async database() {
  //   try {
  //     await connect.authenticate();
  //     console.log("Conexão estabelecida com sucesso.");
  //   } catch (error) {
  //     console.error("Não foi possível conectar ao banco de dados:", error);
  //     throw error;
  //   }
  // }

  async start(app) {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  async todasRotas(app) {
    app.use(router);
  }
}


module.exports = { Server };
