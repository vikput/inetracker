//Node/Express packages
const express = require('express')//Express module
const bodyParser = require('body-parser');//BodyParser
require('dotenv').config()//Read .env file properties

const app = express()//Create instance of express class

//Custom packages


//Set the view engine to ejs
app.set('view engine', 'ejs');

//Set path for static files
app.use(express.static('public'));

//Support parsing of application/json type post data
app.use(bodyParser.json());

//Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Include routes and register them in app context
const routes = require('./routes/routes.js');
app.use('/', routes);


//Test route
/*app.get('/hello_world', function (req, res) {
  res.send('Hello World')
})*/

module.exports = app;

