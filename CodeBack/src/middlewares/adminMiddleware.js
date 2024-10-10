const adminMiddleware = (req, res, next) => {
    if (req.role === 'admin') {
      next();  // Si el usuario tiene el rol de administrador, continuar
    } else {
      res.status(403).json({ message: 'Acceso denegado: Solo los administradores pueden realizar esta acción' });
    }
  };
  
  module.exports = adminMiddleware;
  
  