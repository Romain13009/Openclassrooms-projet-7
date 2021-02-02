//Imports
const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const comment = require('../models/comment');


const JWT_CLE_SECRETE = '1azenh44e2r5v8b7n4h5t65dvvvtyu5i1f6cc7cn';


//Controllers ##############################################################################################################

//CREER UN POST
exports.createPost = (req, res, next) => {
    //paramètres
    var content = req.body.content;
    var image;

    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse

    
    //On vérifie que le content n'est pas null
    if(content == null && req.file == undefined) {
        return res.status(401).json({ error: 'Contenu du post vide' });
    }

    models.User.findOne({
        where: { id: userId }
    })
        .then((userFound) => {
            if (userFound != null) {
         
                if (req.file != undefined) {
                image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } else { image == null }
               
                const newPost = new models.Post({
                    UserId: userFound.id,
                    content: content,
                    image: image,
                    likes: 0,
                    username: userFound.username,
                    avatar: userFound.avatar
                });
                newPost.save()
                    .then(() => res.status(201).json(newPost))
                    .catch(function(error){
                        return res.status(500).json(error);
                    })

            } else {
                return res.status(404).json({ error: 'error' });
            }
            
        })
        .catch(function(){
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        })
};


//AFFICHER LES POSTS
exports.showPost = (req, res, next) => {
    var fields = req.query.fields;

    models.Post.findAll({
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        order: [['CreatedAt', 'DESC']],
        include: [{
            model: models.User,
            attributes : ['username']
        }],
        limit: 10
    })
        .then(function(posts) {
            if (posts.length > null) {
                res.status(201).json(posts)
            } else {
                return res.status(404).json({ error: 'Aucune publication' });
            }
        })
        .catch(function(){
            return res.status(404).json({ error: 'error' });
        })
}


//SUPPRIMER UN POST
exports.deletePost = (req, res, next) => {
    //Paramètres
    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse
    const idPost = req.body.id
    
    console.log(req.body.id)
    models.Post.findOne({
        attributes: ['id', 'content', 'image', 'UserId'],
        where: { id: idPost}
    })
        .then(function(postFound) {
            models.User.findOne({
                attributes: ['id', 'isAdmin'],
                where: { id: userId }
            })
            .then(function(userFound){
                models.Like.destroy({
                    where: {
                        postId: idPost
                    }
                })
                .then(() => {
                    if ( userFound.isAdmin == true || userFound.id == postFound.UserId ) {
                        if (postFound.image) {
                            const filename = postFound.image.split('/images/')[1]
                            fs.unlink(`images/${filename}`, () => {
                                models.Post.destroy({ 
                                    where: { id: idPost}
                                })
                                    .then(() => res.status(200).json({ message: 'Publication et image supprimées' }))
                                    .catch(error => res.status(400).json({ error }));
                            });
                        } else {
                            models.Post.destroy({
                            where: { id: idPost }
                            })
                                .then(() => res.status(200).json({ message: 'Publication supprimée' }))
                                .catch(error => res.status(400).json({ error }));
                        } 
                    } else {
                        return res.status(500).json({ error: 'action non autorisée' });
                    }
                })
                .catch(function(){
                    return res.status(404).json({ error: 'Utilisateur introuvable ou action non autorisée' });
                })
            })
            .catch(function(){
                return res.status(404).json({ error: 'Problème base de données' });
            })
        }) 
        .catch(function(){
            return res.status(404).json({ error: 'Publication introuvable' });
        })
}


//MODIFIER UN POST
exports.updatePost = (req, res, next) => {
    //Paramètres
    var content = req.body.content;
    var image;

    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse
    const idPost = req.body.id
    

    models.Post.findOne({
        attributes: ['id', 'content', 'UserId'],
        where: { id: idPost}
    })
        .then(function(postFound) {
            models.User.findOne({
                attributes: ['id', 'isAdmin'],
                where: { id: userId }
            })
                .then(user => {
                    if ( user.isAdmin == true || user.id == postFound.UserId ) {
                        if (req.file != undefined) {
                            image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            const filename = postFound.image.split('/images/')[1]
                            fs.unlink(`images/${filename}`, () => {
                                postFound.update({ 
                                    content: (content ? content: post.found.content),
                                    image: image
                                })
                                    .then(() => res.status(200).json({ message: 'Publication et image modifiées' }))
                                    .catch(error => res.status(400).json({ error }));
                            });
                        } else {
                            postFound.update({
                                    content: (content ? content: post.found.content)    
                                })
                                .then(() => res.status(200).json({ message: 'Publication modifiée' }))
                                .catch(error => res.status(400).json({ error }));
                        }
                    } else {
                        return res.status(500).json({ error: 'action non autorisée' });
                    }
                })
                .catch(function(){
                    return res.status(404).json({ error: 'Utilisateur introuvable ou action non autorisée' });
                })
        }) 
        .catch(function(){
            return res.status(404).json({ error: 'Publication introuvable' });
        })
}


//LIKER UN POST
exports.likePost = (req, res, next) => {
        //Paramètres
        var postId = req.body.id;

        const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
        const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
        const userId = decodedToken.userId; //On récupère l'id de la réponse

        if (postId <= 0) {
            return res.status(400).json({ 'error': 'postId invalide'})
        }

        models.Post.findOne({
            where: { id: postId}
        })
            .then(function(postFound){ //On cherche le post
                models.User.findOne({
                    where: {id: userId}
                })
                .then(function(userFound){
                    models.Like.findOne({ //On cherche l'utilisateur
                        where: {
                            userId: userId,
                            postId: postId
                        }
                    })
                    .then(function(userLiked){ //On cherche leurs correspondances dans la table like
                        if(!userLiked) {
                            postFound.addUser(userFound)
                            .then(function(){
                                postFound.update({
                                    likes: postFound.likes + 1,
                                })
                                .then(()=> res.status(201).json(postFound))
                                .catch(function(){
                                    return res.status(500).json({ error: 'ajout du like impossible' });
                                })
                            })
                            .catch(function(){
                                return res.status(500).json({ error: 'erreur' });
                            })
                        } else {
                            return res.status(400).json({ error: 'Vous avez déjà liké cette publication' });
                        }
                    })
                    .catch(function(){
                        return res.status(400).json({ error: 'Erreur de vérification' });
                    })
                })
                .catch(function(){
                    return res.status(404).json({ error: 'Utilisateur introuvable' });
                })
            })
            .catch(function(){
                return res.status(404).json({ error: 'Publication introuvable ou inéxistante' });
            })
}


//DISLIKER UN POST
exports.dislikePost = (req, res, next) => {
    //Paramètres
    var postId = req.body.id;

    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse

    if (postId <= 0) {
        return res.status(400).json({ 'error': 'postId invalide'})
    }

    models.Post.findOne({ //On cherche le post
        where: { id: postId}
    })
        .then(function(postFound){ 
            models.User.findOne({//On cherche l'utilisateur
                where: {id: userId}
            })
            .then(function(){
                models.Like.findOne({ 
                    where: {
                        userId: userId,
                        postId: postId
                    }
                })
                .then(function(userLiked){ //On cherche leurs correspondances dans la table like
                    if(userLiked) {
                        userLiked.destroy()
                        .then(function(){
                            postFound.update({
                                likes: postFound.likes - 1,
                            })
                            .then(()=> res.status(201).json(postFound))
                            .catch(function(){
                                return res.status(500).json({ error: 'ajout du dislike impossible' });
                            })
                        })
                        .catch(function(){
                            return res.status(500).json({ error: 'erreur' });
                        })
                    } else {
                        return res.status(400).json({ error: 'Vous ne pouvez pas disliker cette publication' });
                    }
                })
                .catch(function(){
                    return res.status(400).json({ error: 'Erreur de vérification' });
                })
            })
            .catch(function(){
                return res.status(404).json({ error: 'Utilisateur introuvable' });
            })
        })
        .catch(function(){
            return res.status(404).json({ error: 'Publication introuvable ou inéxistante' });
        })
}

//COMMENTER UN POST
exports.commentPost = (req, res, next) => {
    //Paramètres
    var content = req.body.content;
    var postId = req.body.id;

    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse

    if (postId <= 0) {
        return res.status(400).json({ 'error': 'postId invalide'})
    }

    models.Post.findOne({//On cherche le post
        where: { id: postId}
    })
        .then(function(postFound){ //On cherche l'utilisateur
        if( postFound != null) {
            models.User.findOne({
                where: {id: userId}
                })
                .then(function(userFound){
                    if(userFound != null) {
                        const newComment = new models.Comment({
                            postId: postId,
                            content: content,
                            userId: userFound.id,
                            username: userFound.username,
                            avatar: userFound.avatar
                        })
                        newComment.save()
                            .then(() => res.status(201).json(newComment))
                            .catch(function(error){
                                return res.status(500).json(error);
                            })
                    }  
                })
                .catch(function(){
                    return res.status(404).json({ error: 'Utilisateur introuvable' });
                })    
        } 
        })
        .catch(function(){
            return res.status(404).json({ error: 'Publication introuvable ou inéxistante' });
        })
}

//AFFICHER LES COMMENTAIRES D'UN POST
exports.getComment = (req, res, next) => {
    var postId = req.body.id;
    var fields = req.query.fields;

    models.Comment.findAll({
        where: { postId: postId },
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        order: [['CreatedAt', 'DESC']],
        limit: 10
    })
        .then(function(comments) {
            console.log(1)
            if (comments.length > null) {
                console.log(2)
                res.status(201).json(comments)
            } else {
                return res.status(404).json({ error: 'Aucun commentaire' });
            }
        })
        .catch(function(error){
            return res.status(500).json(error)
        })
}

//SUPPRIMER UN COMMENTAIRE
exports.deleteComment = (req, res, next) => {
    //Paramètres
    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse
    const idComment = req.body.id
    
    models.Comment.findOne({
        attributes: ['id', 'userId'],
        where: { id: idComment}
    })
        .then(function(commentFound) {
            models.User.findOne({
                attributes: ['id', 'isAdmin'],
                where: { id: userId }
            })
            .then(function(userFound){
                if ( userFound.isAdmin == true || userFound.id == commentFound.userId ) {
                    models.Comment.destroy({
                    where: { id: idComment }
                    })
                        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
                        .catch(error => res.status(400).json({ error }));
                    
                } else {
                    return res.status(500).json({ error: 'action non autorisée' });
                }
            })
            .catch(function(){
                return res.status(404).json({ error: 'Utilisateur introuvable ou action non autorisée' });
            })
        }) 
        .catch(function(){
            return res.status(404).json({ error: 'Publication introuvable' });
        })
}

//MODIFIER UN COMMENTAIRE
exports.updateComment = (req, res, next) => {
    //Paramètres
    var content = req.body.content;

    const token = req.headers.authorization.split(' ')[1]; //On récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
    const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
    const userId = decodedToken.userId; //On récupère l'id de la réponse
    const commentId = req.body.id
    

    models.User.findOne({
        attributes: ['id', 'isAdmin'],
        where: { id: userId}
    })
        .then(function(userFound) {
            models.Comment.findOne({
                attributes: ['id', 'content', 'userId'],
                where: { id: commentId }
            })
                .then((commentFound) => {
                    if ( userFound.isAdmin == true || userFound.id == commentFound.userId ) {
                        models.Comment.update(
                        {content: (content ? content: commentFound.content)},
                        {where: { id: commentId }}
                        )
                            .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
                            .catch(() => res.status(400).json({error: 'Une erreur est survenue'}));
                    }else{
                        return res.status(500).json({ error: 'action non autorisée' }); 
                    }                    
                })
                .catch(function(){
                    return res.status(404).json({ error: 'Commentaire introuvable' });
                })
        }) 
        .catch(function(){
            return res.status(404).json({ error: 'Utilisateur introuvable ou action non autorisée' });
        })
}