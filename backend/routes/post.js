//routes de la partie post
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes
router.post('/new/', auth, multer, userCtrl.createPost);
router.get('/', auth, multer,userCtrl.showPost);

module.exports = router;