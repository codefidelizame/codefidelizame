const { Comercio, Client, Service, Receipt } = require('../../data');  // Importar los modelos

exports.registerServiceForClient = async (req, res) => {
  const comercioId = req.comercioId;   // Supone que tienes autenticación del comercio (userId)
  const { clientId, serviceName, price, serviceDate, bonificado,bonificacion, imageUrl } = req.body; // Datos del servicio

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
      serviceDate,
      clientId: client.id,
      comercioId: comercio.id,
      bonificado: bonificado || false, 
      bonificacion:bonificado ? bonificacion : null,
      imageUrl: imageUrl || null,
    });

    // 3. Generar recibo por el servicio
    const receipt = await Receipt.create({
      receiptNumber: `REC-${Date.now()}`,  // Generar un número de recibo único
      serviceDate,
      serviceId: newService.id,
    });

    // 4. Incrementar la cantidad de servicios del cliente
    if (newService.bonificado) {
      client.totalServices = 0; // Reiniciar los servicios si es bonificado
    } else {
      client.totalServices += 1; // Incrementar si no es bonificado
    }
    await client.save();

    // Responder con el servicio y recibo generados
    res.status(201).json({
      message: 'Servicio registrado exitosamente',
      service: newService,
      price: newService.price,
      bonificado: newService.bonificado,
      bonificacion:newService.bonificacion,
      imageUrl: newService.imageUrl,
      receipt,
      client: {
        id: client.id,
        totalServices: client.totalServices,
        
      }
    });

  } catch (error) {
    console.error('Error al registrar el servicio:', error);
    res.status(500).json({ message: 'Error al registrar el servicio', error: error.message });
  }
};
