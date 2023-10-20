const fs = require('fs');
const pino = require('pino');

const logStream = fs.createWriteStream('./logs/app.log', { flags: 'a' });


const logger = pino({
  transport: {
    target: 'pino-pretty', 
    options: {
      sync: true 
    }
  } 
});

module.exports = logger;