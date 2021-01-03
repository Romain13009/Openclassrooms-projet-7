//Imports
const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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

    //On vérifie que le content contient au moins 2 caractères
    if(content.length <= 2) {
        return res.status(401).json({ error: 'Contenu du post doit faire au moins 2 caractères' });
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
                    likes: 0
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
    models.Post.findAll({
        order: [['CreatedAt', 'DESC']],
        include: [{
            model: models.User,
            attributes: [ 'username']
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
            return res.status(404).json({ error: 'Publication introuvable' });
        })
}