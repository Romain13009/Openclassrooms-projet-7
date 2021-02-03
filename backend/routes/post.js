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
router.put('/update', auth, postCtrl.updatePost);
router.post('/posts/like', auth, postCtrl.likePost);
router.post('/posts/dislike', auth, postCtrl.dislikePost);
router.post('/posts/comment', auth, multer, postCtrl.commentPost);
router.get('/posts/getcomment', auth, postCtrl.getComment);
router.delete('/posts/deletecomment', auth, postCtrl.deleteComment);
router.put('/posts/updatecomment', auth, postCtrl.updateComment);

module.exports = router;