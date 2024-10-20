const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Comercio, Subscription } = require("../data"); // Modelo de administrador
require("dotenv").config(); // Para usar las variables de entorno

// Registrar un Comercio
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    images,
    instagram,
    facebook,
    tiktok,
    whatsapp,
  } = req.body;

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Contraseña hasheada:", hashedPassword);

    // Crear el nuevo administrador en la base de datos
    const newAdmin = await Comercio.create({
      name,
      email,
      role,
      password: hashedPassword,
      images,
      instagram,
      facebook,
      tiktok,
      whatsapp,
    });
    console.log("Admin creado:", newAdmin);

    res
      .status(201)
      .json({ message: "Admin registrado con éxito", admin: newAdmin });
  } catch (error) {
    console.error("Error en el registro:", error); // Log del error en la consola
    res
      .status(500)
      .json({ message: "Error en el registro", error: error.message });
  }
};

// Iniciar sesión (login)


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const trimmedPassword = password.trim();

  try {
    // Buscar el usuario en la base de datos por email
    const admin = await Comercio.findOne({ where: { email } });
    console.log("Usuario encontrado:", admin); // Log del usuario encontrado

    if (!admin) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(trimmedPassword, admin.password);
    console.log("Contraseña proporcionada:", trimmedPassword); // Log de la contraseña proporcionada
    console.log("Hash almacenado:", admin.password); // Log del hash almacenado
    console.log("Resultado de la comparación de contraseñas:", isMatch); // Resultado de la comparación

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Crear el token JWT, incluyendo el id y el rol en el token
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Enviar información adicional junto con el token
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        images: admin.images,
        instagram: admin.instagram,
        facebook: admin.facebook,
        tiktok: admin.tiktok,
        whatsapp: admin.whatsapp,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión", error: error.message });
  }
};



//traer todos los comercios
exports.getAllComercios = async (req, res) => {
  try {
    const comercios = await Comercio.findAll({
      include: {
        model: Subscription, // Incluir suscripciones
        attributes: ["id","active", "startDate", "endDate"], // Los campos que quieras mostrar
      },
    });
    res.status(200).json(comercios); // Devolver los comercios con sus suscripciones
  } catch (error) {
    console.error("Error al obtener comercios:", error);
    res
      .status(500)
      .json({ message: "Error al obtener comercios", error: error.message });
  }
};

exports.getComercioById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del comercio de los parámetros

  try {
    const comercio = await Comercio.findByPk(id, {
      include: {
        model: Subscription, // Incluir suscripciones
        attributes: ["active", "startDate", "endDate"], // Los campos que quieras mostrar
      },
    });

    if (!comercio) {
      return res.status(404).json({ message: "Comercio no encontrado" });
    }

    res.status(200).json(comercio); // Devolver el comercio con sus suscripciones
  } catch (error) {
    console.error("Error al obtener comercio:", error);
    res
      .status(500)
      .json({ message: "Error al obtener comercio", error: error.message });
  }
};

// Eliminar un comercio por ID
exports.deleteComercio = async (req, res) => {
  const { id } = req.params; // Obtener el ID del comercio desde los parámetros de la URL

  try {
    const comercio = await Comercio.findByPk(id); // Buscar el comercio por ID en la base de datos
    if (!comercio) {
      return res.status(404).json({ message: "Comercio no encontrado" }); // Si no se encuentra, devuelve un 404
    }

    await comercio.destroy(); // Eliminar el comercio de la base de datos
    res.status(200).json({ message: "Comercio eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar comercio:", error); // Log del error en la consola
    res
      .status(500)
      .json({ message: "Error al eliminar comercio", error: error.message });
  }
};

// Actualizar un comercio por ID
exports.updateComercio = async (req, res) => {
  const { id } = req.params; // Obtener el ID del comercio desde los parámetros de la URL
  const {
    name,
    email,
    role,
    images,
    instagram,
    facebook,
    tiktok,
    whatsapp,
  } = req.body; // Campos a actualizar (excluyendo password)

  try {
    const comercio = await Comercio.findByPk(id); // Buscar el comercio por ID
    if (!comercio) {
      return res.status(404).json({ message: "Comercio no encontrado" }); // Si no se encuentra, devuelve un 404
    }

    // Actualizar los campos del comercio (sin modificar la contraseña)
    comercio.name = name || comercio.name;
    comercio.email = email || comercio.email;
    comercio.role = role || comercio.role;
    comercio.images = images || comercio.images;
    comercio.instagram = instagram || comercio.instagram;
    comercio.facebook = facebook || comercio.facebook;
    comercio.tiktok = tiktok || comercio.tiktok;
    comercio.whatsapp = whatsapp || comercio.whatsapp;

    await comercio.save(); // Guardar los cambios en la base de datos

    res.status(200).json({ message: "Comercio actualizado con éxito", comercio });
  } catch (error) {
    console.error("Error al actualizar comercio:", error); // Log del error en la consola
    res.status(500).json({ message: "Error al actualizar comercio", error: error.message });
  }
};

