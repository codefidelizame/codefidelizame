const { Comercio, Client, Service, Receipt } = require('../../data');  // Importar los modelos

exports.registerServiceForClient = async (req, res) => {
  const comercioId = req.comercioId;   // Supone que tienes autenticación del comercio (userId)
  const { clientId, serviceName, price, serviceDate } = req.body; // Datos del servicio

  try {
    // Verificar si el cliente existe
    const comercio = await Comercio.findByPk(comercioId);
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Verificar si el cliente está asociado al comercio usando la tabla intermedia
    const clienteAsociado = await comercio.hasClient(client);
    if (!clienteAsociado) {
      return res.status(404).json({ message: 'Cliente no asociado a este comercio' });
    }

    // 2. Registrar el nuevo servicio incluyendo comercioId
    const newService = await Service.create({
      serviceName,
      price,
      clientId: client.id,
      comercioId: comercio.id, // Asegurarte de asignar el comercioId aquí
    });

    // 3. Generar recibo por el servicio
    const receipt = await Receipt.create({
      receiptNumber: `REC-${Date.now()}`,  // Generar un número de recibo único
      serviceDate,
      serviceId: newService.id,
    });

    // 4. Incrementar la cantidad de servicios del cliente
    client.totalServices += 1;

    // 5. Bonificar el siguiente servicio si llega a 5
    // Bonificar el siguiente servicio si llega a 5
    if (client.totalServices % 5 === 0) {
      newService.bonificado = true; // Marcar el servicio como bonificado
      await newService.save(); // Guardar el cambio en la base de datos
    }

    // Guardar los cambios en el cliente
    await client.save();

    // Responder con el servicio y recibo generados
    res.status(201).json({
      message: 'Servicio registrado exitosamente',
      service: newService,
      receipt,
      client: {
        id: client.id,
        totalServices: client.totalServices,
        bonificado: newService.bonificado,
      }
    });

  } catch (error) {
    console.error('Error al registrar el servicio:', error);
    res.status(500).json({ message: 'Error al registrar el servicio', error: error.message });
  }
};
