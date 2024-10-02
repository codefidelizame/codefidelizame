const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, se requiere token' });
  }

  try {
    // Extraer y verificar el token
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);

    // Asignar el userId al request
    req.userId = verified.id;  // Asegúrate de que "id" es el campo correcto
    
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;


