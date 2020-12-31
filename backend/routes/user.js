//routes de la partie user
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Routes post car le frontend va envoyer des informations (email, password)
router.post('/users/signup/', userCtrl.signup);
router.post('/users/login/', userCtrl.login);
router.get('/users/profile/', auth, userCtrl.getUserProfile);
router.put('/users/profile/', auth, userCtrl.modifyUserProfile);

module.exports = router;