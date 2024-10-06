const { Comercio, Client } = require('../data'); // Importar los modelos

exports.registerClient = async (req, res) => {
  const { name, email, phone } = req.body;
  const comercioId = req.comercioId;

  try {
    // Buscar si el cliente ya existe en la base de datos, incluyendo eliminados
    let client = await Client.findOne({ where: { email }, paranoid: false });

    if (client) {
      // Si el cliente existe y está eliminado, lo restauramos
      if (client.deletedAt) {
        client.name = name; // Actualizar el nombre si es necesario
        client.phone = phone; // Actualizar el teléfono si es necesario
        client.deletedAt = null; // Restaurar el cliente eliminando el valor de deletedAt
        await client.save(); // Guardar los cambios en el cliente restaurado

        // Verificar si este comercio ya está asociado con el cliente
        const comercio = await Comercio.findByPk(comercioId);
        if (!comercio) {
          return res.status(404).json({ message: 'Comercio no encontrado' });
        }

        const alreadyAssociated = await comercio.hasClient(client);
        if (alreadyAssociated) {
          return res.status(400).json({ message: 'Este cliente ya está registrado en su comercio' });
        }

        // Asociar el cliente restaurado con el comercio
        await comercio.addClient(client);
        return res.status(200).json({ message: 'Cliente restaurado exitosamente', client });
      }

      // Si el cliente ya existe y no está eliminado, enviar un mensaje
      return res.status(400).json({ message: 'El cliente ya está registrado' });
    }

    // Si el cliente no existe, crearlo
    client = await Client.create({ name, email, phone });

    // Verificar si este comercio ya está asociado con el cliente
    const comercio = await Comercio.findByPk(comercioId);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }

    // Asociar el nuevo cliente con el comercio
    await comercio.addClient(client);

    res.status(201).json({ message: 'Cliente registrado exitosamente', client });
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    res.status(500).json({ message: 'Error al registrar cliente', error: error.message });
  }
};

