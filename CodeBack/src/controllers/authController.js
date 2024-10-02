const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../data');  // Modelo de administrador
require('dotenv').config();  // Para usar las variables de entorno

// Registrar un administrador
exports.register = async (req, res) => {
    const { name, email, password, role} = req.body;
  

  
    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Contraseña hasheada:', hashedPassword);
  
      // Crear el nuevo administrador en la base de datos
      const newAdmin = await User.create({ name, email, role, password: hashedPassword });
      console.log('Admin creado:', newAdmin);
  
      res.status(201).json({ message: 'Admin registrado con éxito', admin: newAdmin });
    } catch (error) {
      console.error('Error en el registro:', error);  // Log del error en la consola
      res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
  };

// Iniciar sesión (login)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión', error });
  }
};