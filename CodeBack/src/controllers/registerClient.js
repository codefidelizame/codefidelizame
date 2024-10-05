const { Comercio, Client } = require('../data');  // Importar los modelos

exports.registerClient = async (req, res) => {
  const { name, email, phone } = req.body;
  const comercioId = req.comercioId; 

  try {
    // Buscar si el cliente ya existe en la base de datos
    let client = await Client.findOne({ where: { email } });

    if (!client) {
      // Si el cliente no existe, crearlo
      client = await Client.create({ name, email, phone });
    }

    // Verificar si este comercio ya está asociado con el cliente
    const comercio = await Comercio.findByPk(comercioId);

    if (!comercio) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const alreadyAssociated = await comercio.hasClient(client);

    if (alreadyAssociated) {
      return res.status(400).json({ message: 'Este cliente ya está registrado en su comercio' });
    }

    // Asociar el cliente con el comercio (User)
    await comercio.addClient(client);

    res.status(201).json({ message: 'Cliente registrado exitosamente', client });
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    res.status(500).json({ message: 'Error al registrar cliente', error: error.message });
  }
};


  

