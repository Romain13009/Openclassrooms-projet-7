//routes de la partie post
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes
router.post('/new/', auth, multer, postCtrl.createPost);
router.get('/', auth, multer, postCtrl.showPost);
router.delete('/delete', auth, postCtrl.deletePost);

module.exports = router;