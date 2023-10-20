const Joi = require('joi');

const schema = Joi.object({
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),

  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  
  GESTAO_USERNAME: Joi.string().required(),
  GESTAO_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  API_URL: Joi.string().uri().required(),

  PORT: Joi.number().default(3000)
})

module.exports = schema;