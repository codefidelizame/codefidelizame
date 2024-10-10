const express = require('express');
const { register, login, getAllComercios, deleteComercio, updateComercio } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware')
router.post('/register', register);


router.post('/login', login);

router.get('/comercios',authMiddleware,  getAllComercios)

// Ruta para eliminar un comercio por ID (requiere autenticación y rol de admin)
router.delete('/comercios/:id', authMiddleware, adminMiddleware, deleteComercio);

// Ruta para actualizar un comercio por ID (requiere autenticación y rol de admin)
router.put('/comercios/:id', authMiddleware, adminMiddleware, updateComercio);


module.exports = router;