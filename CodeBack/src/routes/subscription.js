const express = require('express');
const router = express.Router();
const {
    createSubscription,
    updateSubscription,
    getSubscriptionsByComercioId,
    getSubscriptionById,
    updateSubscriptionByCommerce
  } = require ("../controllers/subscriptionController")





router.post('/', createSubscription);

// Ruta para obtener todos los Servicios 
router.get('/:comercioId',  getSubscriptionsByComercioId);

// Ruta para obtener servicios por cliente (GET request)
router.get('/:id', getSubscriptionById);

router.put('/put/:id', updateSubscription)

router.put('/comercio/:comercioId/:subscriptionId', updateSubscriptionByCommerce)


module.exports = router;