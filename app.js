//Node/Express packages
const express = require('express')//Express module
require('dotenv').config()//Read .env file properties

const app = express()//Create instance of express class

//Custom packages

//Include routes
const routes = require('./routes/routes.js');


//Register routes in app contex
app.use('/', routes);


//Test route
/*app.get('/hello_world', function (req, res) {
  res.send('Hello World')
})*/

module.exports = app;

