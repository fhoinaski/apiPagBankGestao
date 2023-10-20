
const configService = require('./config.services');
const config = require('./config');

const postgress= config.postgres

// const postgress = configService.getPostgressConfig();


module.exports = {
  dialect: "postgres", 
  host: postgress.host, 
  username: postgress.user, 
  password: postgress.password, 
  database: postgress.database,
  port: postgress.port, 
  define: {
    underscored: true,
    underscoredAll: true
  }
};


