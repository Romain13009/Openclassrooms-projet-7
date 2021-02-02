//routes de la partie user
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes
router.post('/users/signup/', multer, userCtrl.signup);
router.post('/users/login/', userCtrl.login);
router.get('/users/profile/', auth, multer, userCtrl.getUserProfile);
router.put('/users/profile/', auth, userCtrl.modifyUserProfile);
router.delete('/users/delete/', auth, userCtrl.deleteUserProfile);

module.exports = router;