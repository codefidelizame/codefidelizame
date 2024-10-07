const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Comercio} = require('../data');  // Modelo de administrador
require('dotenv').config();  // Para usar las variables de entorno

// Registrar un Comercio
exports.register = async (req, res) => {
    const { name, email, password, role} = req.body;
  

  
    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Contraseña hasheada:', hashedPassword);
  
      // Crear el nuevo administrador en la base de datos
      const newAdmin = await Comercio.create({ name, email, role, password: hashedPassword });
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
    // Buscar el usuario en la base de datos por email
    const admin = await Comercio.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token JWT, incluyendo el id y el rol en el token
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Enviar información adicional junto con el token
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: admin.id,        // ID del usuario
        name: admin.name,    // Nombre del usuario
        email: admin.email,  // Email del usuario
        role: admin.role,    // Rol del usuario (Admin, User, etc.)
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);  // Log del error en la consola
    res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
  }
};
//traer todos los comercios
exports.getAllComercios = async (req, res) => {
  try {
    const comercios = await Comercio.findAll();  // Obtener todos los comercios de la base de datos
    res.status(200).json(comercios);  // Devolver los comercios encontrados
  } catch (error) {
    console.error('Error al obtener comercios:', error);  // Log del error en la consola
    res.status(500).json({ message: 'Error al obtener comercios', error: error.message });
  }
};