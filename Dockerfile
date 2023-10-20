FROM node:18-alpine


WORKDIR /home/node/app

# Copiar arquivos de dependência e instalar pacotes
COPY package*.json ./

# Instalar as dependências, somente se o Puppeteer não estiver instalado
RUN npm install 

# Copiar o restante do código-fonte
COPY --chown=node:node . .

ENV HOST=docker-apicadastro
# Expor a porta que a aplicação está escutando
EXPOSE 4000

# Iniciar o servidor
CMD [ "npm", "start" ]