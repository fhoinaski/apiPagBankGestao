const dotenv = require('dotenv');
const schema = require('./schema');

dotenv.config();

const { error, value } = schema.validate(process.env, {
    stripUnknown: true 
  });

if (error) {
  throw new Error(`Invalid env variables: ${error.message}`);
}

const config = {
  // redis
  redisHost: value.REDIS_HOST,
  redisPort: value.REDIS_PORT,

  // postgres
  postgres: {
    host: value.POSTGRES_HOST,
    port: value.POSTGRES_PORT,
    user: value.POSTGRES_USER,
    password: value.POSTGRES_PASSWORD,
    database: value.POSTGRES_DATABASE,
  },

  // Auth 
  auth: {
    username: value.GESTAO_USERNAME, 
    password: value.GESTAO_PASSWORD,
  },

  // JWT
  jwtSecret: value.JWT_SECRET,

  // API
  apiUrl: value.API_URL,

  // Server
  port: value.PORT,
}

module.exports = config;