const express = require('express');
const { 
  register, 
  login, 
  getAllComercios, 
  getComercioById, 
  deleteComercio, 
  updateComercio,
  sendPasswordResetEmail,  
  resetPassword          
} = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Rutas de autenticación y administración
router.post('/register', register);
router.post('/login', login);
router.get('/comercios', getAllComercios);
router.get('/comercios/:id', getComercioById);
router.delete('/comercios/:id', authMiddleware, adminMiddleware, deleteComercio);
router.put('/comercios/:id', authMiddleware, adminMiddleware, updateComercio);

router.post('/password-reset', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);

module.exports = router;
