// const {config} = require('dotenv');
// const {verify} = require('jsonwebtoken');
// config();

// async function auth(req, res, next) {
//     try{
//         const authorization = req.headers.authorization.split(' ')[1];
//         if(!authorization) return res.status(401).json({
//             status: 'NOK',
//             error: 'Token não informado'
//         });

//         const decodificar = verify(authorization, process.env.JWT_SECRET);
//         req.userId = decodificar.id;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             status: 'NOK',
//             error: 'Não autorizado - Token inválido'
//         });
//     }
// }

// module.exports = auth;

async function auth(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send({
          message: "Autenticação Falhou",
          cause: "Token não informado ou em formato inválido",
        });
      }
      const token = authorization.slice(7); // Remove o prefixo "Bearer " do token
      req.headers.authorization = token; // Atribui o token JWT ao cabeçalho "Authorization"
      req.payload = verify(token, process.env.SECRET_JWT);
      console.log(req.payload);
      next();
    } catch (error) {
      return res.status(401).send({
        message: "Autenticação Falhou",
        cause: error.message,
      });
    }
  }
  
  module.exports = { auth };