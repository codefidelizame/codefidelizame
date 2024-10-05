const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/serviceControllers/registerService')
const getAllService = require('../controllers/serviceControllers/getAllServices');
const getServicesByClient = require('../controllers/serviceControllers/getServicesByClient');

const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear un nuevo contacto
router.post('/',authMiddleware, servicesController.registerServiceForClient);

// Ruta para obtener todos los Servicios 
router.get('/', authMiddleware, getAllService.getAllServices);

// Ruta para obtener servicios por cliente (GET request)
router.get('/client/:clientId', authMiddleware, getServicesByClient.getServicesByClient);

// // Ruta para obtener todos los Servicios 
// router.get('/',authMiddleware, servicesController.getAllService);

// Ruta para obtener servicios por cliente (GET request)
// router.get('/client/:clientId',authMiddleware, servicesControllergetServicesByClient);

module.exports = router;
