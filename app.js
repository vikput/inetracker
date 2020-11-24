//Node/Express packages
const express = require('express')//Express module
const bodyParser = require('body-parser');//BodyParser
require('dotenv').config()//Read .env file properties
const session = require('express-session');//Session
const csrf = require('csurf');//CSRF

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

//Intialize session
app.use(session({
	secret: 'ine-tracker',
	resave: false,
	saveUninitialized: true
}));

//CSRF protection middleware.
app.use(csrf());
//Custom error handling for CSRF
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  // handle CSRF token errors here
  res.status(403);
  res.send('There was some issue with this request, please refresh the page and try again.');
});

//Include routes and register them in app context
const routes = require('./routes/routes.js');
app.use('/', routes);


//Test route
/*app.get('/hello_world', function (req, res) {
  res.send('Hello World')
})*/

module.exports = app;

