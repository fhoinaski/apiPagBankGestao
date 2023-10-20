class EnvironmentSchema {
  constructor() {
    this.redisHost = "";
    this.redisPort = 0;
    this.redisPassword = "";

    this.postgressHost = 0;
    this.postgressPort = "";
    this.postgressUser = "";
    this.postgressPassword = "";
    this.postgressDataBase = "";

    this.gestaoUsername = "";
    this.gestaoPassword = "";

    this.jwtSecret = "";

    this.apiUrl = "";

    this.port = 0;
  }
}

const dotenv = require('dotenv');
dotenv.config();

function loadFromEnv(){
    const env = new EnvironmentSchema();
    env.redisHost = process.env.REDIS_HOST;
    env.redisPort = parseInt(process.env.REDIS_PORT);
    env.redisPassword = process.env.REDIS_PASSWORD;
    env.postgressHost = process.env.POSTGRES_HOST;
    env.postgressPort = parseInt(process.env.POSTGRES_PORT);
    env.postgressUser = process.env.POSTGRES_USER;
    env.postgressPassword = process.env.POSTGRES_PASSWORD;
    env.postgressDataBase = process.env.POSTGRES_DATABASE;
    env.gestaoUsername = process.env.GESTAO_USERNAME;
    env.gestaoPassword = process.env.GESTAO_PASSWORD;
    env.jwtSecret = process.env.JWT_SECRET;
    env.apiUrl = process.env.API_URL;
    env.port = parseInt(process.env.PORT);
    return env;
}

module.exports = {
  loadFromEnv,
};