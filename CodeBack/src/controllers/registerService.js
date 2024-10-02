const { User, Client, Service, Receipt } = require('../data');  // Importar los modelos

exports.registerServiceForClient = async (req, res) => {
    const userId = req.userId;   // Supone que tienes autenticación del comercio (userId)
    const { clientId, serviceName, price, serviceDate } = req.body; // Datos del servicio
  
  try {
    // Verificar si el cliente existe y está asociado al comercio
    const user = await User.findByPk(userId);
    const client = await Client.findByPk(clientId);
    
    if (!client || !(await user.hasClient(client))) {
      return res.status(404).json({ message: 'Cliente no encontrado en este comercio' });
    }
 // 2. Registrar el nuevo servicio
 const newService = await Service.create({
    serviceName,
    price,
    clientId: client.id,
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
  if (client.totalServices % 5 === 0) {
    newService.bonificado = true; // Marcar el servicio como bonificado
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
//     // Incrementar el número de servicios
//     client.totalServices += 1;

//     // Verificar si el cliente ha alcanzado 5 servicios para uno bonificado
//     let bonusService = false;
//     if (client.totalServices % 5 === 0) {
//       bonusService = true;  // Indicar que el próximo servicio es bonificado
//     }

//     // Guardar los cambios en la base de datos
//     await client.save();

//     // Devolver la información actualizada del cliente y el estado del servicio bonificado
//     res.status(200).json({
//       message: 'Servicio registrado exitosamente',
//       client,
//       bonusService: bonusService ? '¡Tienes un servicio bonificado!' : 'No hay bonificación aún'
//     });
//   } catch (error) {
//     console.error('Error al registrar servicio:', error);
//     res.status(500).json({ message: 'Error al registrar servicio', error: error.message });
//   }
// };
