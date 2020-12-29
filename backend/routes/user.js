//routes de la partie user
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//Routes post car le frontend va envoyer des informations (email, password)
router.post('/users/signup/', userCtrl.signup);
router.post('/users/login/', userCtrl.login);

module.exports = router;