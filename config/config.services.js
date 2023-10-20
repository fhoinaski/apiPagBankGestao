const { loadFromEnv } = require("./environment");


class ConfigService {
  constructor() {
    this.env = loadFromEnv();
  }

  getValue(key) {
    if (!this.env[key]) {
      throw new Error(`Config error - missing env.${key}`);
    }

    return this.env[key];
  }

  getNumber(key) {
    const value = this.getValue(key);
    const num = parseInt(value, 10);

    if (isNaN(num)) {
      throw new Error(`Invalid number env var: ${key}`);
    }

    return num;
  }

  getPort() {
    return this.getValue('port');
  }

  getRedisConfig() {
    return {
      host: this.getValue('redisHost'),
      port: this.getValue('redisPort'),
      password: this.getValue('redisPassword'),
    };
  }

  getPostgressConfig() {
    return {
      host: this.getValue('postgressHost'),
      port: this.getValue('postgressPort'),
      user: this.getValue('postgressUser'),
      password: this.getValue('postgressPassword'),
      database: this.getValue('postgressDataBase'), 
    };
  }

  getGestaoConfig() {
    return {
      username: this.getValue('gestaoUsername'), 
      password: this.getValue('gestaoPassword'), 
    };
  }

  getJwtSecret() {
    return this.getValue('jwtSecret');
  }

  getApiUrl() {
    return this.getValue('apiUrl'); 
  }
}

const configService = new ConfigService();

module.exports = configService;

