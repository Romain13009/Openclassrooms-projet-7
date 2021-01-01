const express = require('express'); //on importe le framework express
const bodyParser = require('body-parser'); //on importe body-parser pour transformer le corps en json
const path = require('path');
//const helmet = require('helmet'); //sécurise les headers HTTP

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //on permet l'accés a notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajout des headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //permet l'envoi des requête
    next();
});

//Body-Parser config
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//app.use(helmet());

app.use('/api/auth', userRoutes); //pour la routes auth on utilise le router userRoutes
app.use('/api/wall', postRoutes); //pour cette route on utilise le router postsRoutes

module.exports = app; //exporter notre app