//Imports
const models = require('../models');
const fs = require('fs');

//Controllers ##############################################################################################################

//CREER UN POST
exports.createPost = (req, res, next) => {
    //paramètres
    var content = req.body.content;

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
                    idUSERS: userFound.id,
                    content: content,
                    image: image,
                    likes: 0
                });
                newPost.save()
                    .then(() => res.status(201).json(newPost))
                    .catch(function(){
                        return res.status(401).json(newPost);
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
        include: [{ //Relation avec l'autre table pour afficher des éléments
            model: models.User,
            attributes: ['username']
        }]
    })
        .then(function(posts) {
            if (posts.lenght > null) {
                res.status(201).json(posts)
            } else {
                return res.status(404).json({ error: 'Aucune publication' });
            }
        })
        .catch(function(){
            return res.status(404).json({ error: 'error' });
        })
}