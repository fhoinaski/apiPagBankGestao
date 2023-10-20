const IORedis = require('ioredis');
const configService = require('../config/config.services');



const redisConfig = configService.getRedisConfig();

const redis = new IORedis({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
});

setInterval(() => {
  redis.ping(); 
}, 20000); 
// 
module.exports = redis;
