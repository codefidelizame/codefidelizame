const adminMiddleware = (req, res, next) => {
  if (req.role === 'admin') {
    next();  // Si el usuario tiene el rol de administrador, continuar
  } else if (!req.role) {
    return res.status(400).json({ message: 'Error en la autenticación, no se encontró el rol del usuario' });
  } else {
    res.status(403).json({ message: 'Acceso denegado: Solo los administradores pueden realizar esta acción' });
  }
};

module.exports = adminMiddleware;

  
  