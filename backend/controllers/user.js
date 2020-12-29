//Imports
const bcrypt = require('bcrypt'); //Notre système de cryptage
const jwt = require('jsonwebtoken'); //permet de créer et de vérifier des tokens d'auth
const models = require('../models');

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
                            .catch(error => res.status(400).json({ error: 'Utilisateur ne peut pas etre créé' }));
                    })
                } else {
                    return res.status(401).json({ error: 'Utilisateur déjà existant' });
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
};

exports.login = (req, res, next) => {
};