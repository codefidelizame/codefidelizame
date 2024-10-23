const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado, se requiere token válido en el formato Bearer' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Asignar id y role del comercio al request
    req.comercioId = verified.id;  // Asegúrate de que "id" es el campo correcto
    req.role = verified.role;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'El token ha expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Token inválido' });
    }
    res.status(500).json({ message: 'Error en la verificación del token' });
  }
};

module.exports = authMiddleware;



