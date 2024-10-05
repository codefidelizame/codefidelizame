const { Comercio, Client } = require('../data'); // Asegúrate de que la ruta sea correcta

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
