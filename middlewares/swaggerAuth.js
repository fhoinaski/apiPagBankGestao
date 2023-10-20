// middleware/auth.js

const swaggerAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const [, token] = authHeader.split(' ');
  
    // Aqui, você pode adicionar a lógica de autenticação, como verificar um token JWT ou credenciais de usuário.
  
    // Exemplo de verificação simples (substitua por sua própria lógica):
    if (token !== 'seu_token_secreto') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Autenticação bem-sucedida
    next();
  };
  
  module.exports = swaggerAuth;
  