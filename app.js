//Node/Express packages
const express = require('express')//Express module
const bodyParser = require('body-parser');//BodyParser
require('dotenv').config()//Read .env file properties
const session = require('express-session');//Session
const csrf = require('csurf');//CSRF
const mysqldb = require('./config/mysqldb');//Mysql db connection

const app = express()//Create instance of express class

//Custom packages

//Make database connection global
let dbObj = new mysqldb();
let conn = dbObj.connect();
global.connectDB = conn;

//Set the view engine to ejs
app.set('view engine', 'ejs');

//Set path for static files
app.use(express.static('public'));

//Support parsing of application/json type post data
app.use(bodyParser.json());

//Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Intialize session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
	secret: process.env.SESSION_SECRET, //Random unique string used to authenticate session.
	saveUninitialized: true,
  cookie: { maxAge: oneDay }, //Set cookie expiration time one day
  resave: false
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

module.exports = app;

