const { Subscription, Comercio } = require('../data'); // Ajusta la ruta según tu estructura de proyecto

// Crear una nueva suscripción
const createSubscription = async (req, res) => {
  try {
    const { comercioId, startDate, endDate } = req.body;
    
    // Verificar que el comercio existe
    const comercio = await Comercio.findByPk(comercioId);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    
    const subscription = await Subscription.create({
      comercioId,
      startDate,
      endDate
    });
    
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una suscripción existente
const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params; // ID de la suscripción a actualizar
    const { startDate, endDate, active } = req.body;

    const subscription = await Subscription.findByPk(id);
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    await subscription.update({
      startDate,
      endDate,
      active
    });

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubscriptionByCommerce = async (req, res) => {
  const { comercioId, subscriptionId } = req.params; // Obtener los parámetros de la URL
  const { active, startDate, endDate } = req.body; // Datos a actualizar

  try {
    // Buscar la suscripción por ID de comercio y ID de suscripción
    const subscription = await Subscription.findOne({
      where: {
        id: subscriptionId,
        comercioId: comercioId, // Verificar que la suscripción pertenece al comercio
      },
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    // Actualizar los campos si se envían en el body
    subscription.active = active !== undefined ? active : subscription.active;
    subscription.startDate = startDate || subscription.startDate;
    subscription.endDate = endDate || subscription.endDate;

    // Guardar los cambios en la base de datos
    await subscription.save();

    res.status(200).json({ message: 'Suscripción actualizada con éxito', subscription });
  } catch (error) {
    console.error('Error al actualizar suscripción:', error);
    res.status(500).json({ message: 'Error al actualizar la suscripción', error: error.message });
  }
};

// Obtener todas las suscripciones de un comercio
const getSubscriptionsByComercioId = async (req, res) => {
  try {
    const { comercioId } = req.params; // ID del comercio

    const subscriptions = await Subscription.findAll({
      where: { comercioId },
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener detalles de una suscripción específica
const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params; // ID de la suscripción

    const subscription = await Subscription.findByPk(id);
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubscription,
  updateSubscription,
  getSubscriptionsByComercioId,
  getSubscriptionById,
  updateSubscriptionByCommerce
}