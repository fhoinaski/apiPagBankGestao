const getToken = require("./getToken");

class TokenService {
  constructor(redisClient) {
    if (!redisClient) {
      throw new Error("O objeto redisClient é obrigatório.");
    }
    this.redisClient = redisClient;
    this.tokenCacheKey = "token";
  }

  async getToken() {
    const cachedToken = await this.getCachedToken();
    if (cachedToken && !(await this.isTokenExpired(cachedToken))) {
      return cachedToken.token.id;
    }

    const newToken = await this.generateNewToken();
    await this.cacheToken(newToken);
    return newToken.token.id;
  }

  async getCachedToken() {
    try {
      const data = await this.redisClient.get(this.tokenCacheKey);
      return JSON.parse(data);
    } catch (error) {
      console.error(`Erro ao obter o token do cache: ${error.message}`);
      return null;
    }
  }

  async generateNewToken() {
    try {
      const token = await getToken();
      const date = new Date();
      return { token, date };
    } catch (error) {
      console.error(`Erro ao gerar um novo token: ${error.message}`);
      throw error;
    }
  }

  async cacheToken(token) {
    try {
      await this.redisClient.set(this.tokenCacheKey, JSON.stringify(token));
    } catch (error) {
      console.error(`Erro ao armazenar o token em cache: ${error.message}`);
    }
  }
  async updateTokenCache() {
    try {
        const token = await this.generateNewToken();
        await this.cacheToken(token);
        return token.token.id;
        } catch (error) {
        console.error(`Erro ao atualizar o token em cache: ${error.message}`);
        }
    }


  async isTokenExpired(token) {
    const dataToken = new Date(token.date);
    const tempoAtual = new Date();

    const isExpired =
      tempoAtual.getTime() > dataToken.getTime() + token.token.expiresIn * 1000;

    return isExpired;
  }
}

module.exports = TokenService;
