const { Comercio, Client, ClientComercio } = require('../data'); // Asegúrate de que la ruta sea correcta

exports.getAllClients = async (req, res) => {
  const comercioId = req.comercioId;   // Obtén el ID del comercio desde la autenticación
    
    try {
      // Encuentra el usuario (comercio) por su ID e incluye los clientes asociados
      const comercio = await Comercio.findByPk(comercioId, {
        include: { model: Client }
      });
  
      if (!comercio) {
        return res.status(404).json({ message: 'Comercio no encontrado' });
      }
  
      // Devuelve los clientes del comercio
      res.status(200).json({ clients: comercio.Clients });
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
  };

// Controlador para eliminar un cliente
exports.deleteClient = async (req, res) => {
  const clientId = req.params.id; // ID del cliente que deseas eliminar
  const comercioId = req.comercioId; // Obtener el ID del comercio desde la autenticación

  try {
    // Elimina la relación del cliente con el comercio
    const deletedRelationship = await ClientComercio.destroy({
      where: { ClientId: clientId, ComercioId: comercioId }
    });

    if (deletedRelationship === 0) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    // Luego, puedes eliminar el cliente
    const deletedClient = await Client.destroy({
      where: { id: clientId }
    });

    if (!deletedClient) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
  }
};


exports.updateClient = async (req, res) => {
  const clientId = req.params.id; // ID del cliente que deseas actualizar
  const comercioId = req.comercioId; // Obtener el ID del comercio desde la autenticación
  const { name, email, phone, totalServices } = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    // Verifica si el cliente existe
    const client = await Client.findOne({
      where: { id: clientId }
    });

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Actualiza los datos del cliente
    const updatedClient = await Client.update(
      { name, email, phone, totalServices }, // Incluye totalServices
      { where: { id: clientId } }
    );

    if (!updatedClient) {
      return res.status(500).json({ message: 'Error al actualizar el cliente' });
    }

    res.status(200).json({ message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
  }
};
