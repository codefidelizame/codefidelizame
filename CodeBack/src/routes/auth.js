const express = require('express');
const { register, login, getAllComercios } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);


router.post('/login', login);

router.get('/comercios',authMiddleware,  getAllComercios)

module.exports = router;