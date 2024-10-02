const express = require('express');
const router = express.Router();
// const clientController = require('../controllers/registerClient');
// const allClientController = require('../controllers/allClientController')
const servicesController = require('../controllers/registerService')
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear un nuevo contacto
router.post('/',authMiddleware, servicesController.registerServiceForClient);

// Ruta para obtener todos los clientes (opcional)
//router.get('/',authMiddleware, allClientController.getAllClients);

module.exports = router;
