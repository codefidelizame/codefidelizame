const express = require('express');
const router = express.Router();
const clientController = require('../controllers/registerClient');
const allClientController = require('../controllers/allClientController')
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear un nuevo contacto
router.post('/',authMiddleware,  clientController.registerClient);

// Ruta para obtener todos los clientes (opcional)
router.get('/',authMiddleware, allClientController.getAllClients);
// Ruta para eliminar un cliente
router.delete('/:id', authMiddleware, allClientController.deleteClient);

// Ruta para actualizar un cliente
router.put('/:id', authMiddleware, allClientController.updateClient);

module.exports = router;
