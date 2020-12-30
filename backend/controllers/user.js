//Imports
const bcrypt = require('bcrypt'); //Notre système de cryptage
const jwt = require('jsonwebtoken'); //permet de créer et de vérifier des tokens d'auth
const models = require('../models');

const JWT_CLE_SECRETE = '1azenh44e2r5v8b7n4h5t65dvvvtyu5i1f6cc7cn';

//Controllers
var regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
var regexEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z{2,8})(\.[a-z]{2,8})?$/;

exports.signup = (req, res, next) => {
    //Paramètres
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var description = req.body.description;

    if(email == null || username == null || password == null) {
        return res.status(401).json({ error: 'Email, username ou password manquant' });
    }

    if(((req.body.password).match(regexPassword))&&(req.body.email).match(regexEmail)) {
        models.User.findOne({
            attributes: ['email'],
            where: { email: email}
        })
            .then(function(userFound) {
                if(!userFound) {
                    bcrypt.hash(password, 10) //hashage du mdp, 10 répète l'algorythme de hashage
                    .then(hash => { //On récupère le hash du password et crée un nouvel utilisateur
                        const newUser = new models.User({
                            email: email,
                            username: username,
                            password: hash,
                            description: description,
                            isAdmin: 0
                        });
                        newUser.save() //cette méthode enregistre dans la bdd
                            .then(() => res.status(201).json({ message: 'Utilisateur créé.'}))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
                } else {
                    return res.status(401).json({ error: 'Utilisateur déjà existant' });
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
};



exports.login = (req, res, next) => {
    //paramètres
    var email = req.body.email;
    var password = req.body.password;

    if(email == null || password == null) {
        return res.status(401).json({ error: 'Email, username ou password manquant' });
    }

    models.User.findOne({
        where: { email: email}
    })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password) //On utilise bcrypt.compare pour comparer le mdp envoyé dans le corps de la requête avec le hash enregistrer dans notre doc user
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Email ou password incorrect' });
                        }
                        res.status(200).json({ //si le mdp correspond on retourne un objet json
                            userId: userFound.id,
                            token: jwt.sign({ //fonction sign pour encoder
                                userId: userFound.id,
                                isAdmin: userFound.isAdmin},//1er argument: ce qque l'on veut encoder
                                JWT_CLE_SECRETE, //2ème argument: clé secrète
                                { expiresIn: '8h' } //3ème argument: argument de configuration
                            )
                        });             
                    })
                    .catch(function(){
                        return res.status(401).json({ error });
                    })
            }else {
                return res.status(401).json({ error: 'Email ou password incorrect' });
            }
        })
        .catch(error => res.status(400).json({ error }));
};