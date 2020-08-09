//Node/Express packages
const express = require('express')//Express module
require('dotenv').config()//Read .env file properties

//Custom packages

const app = express()//Create instance of express


app.get('/hello_world', function (req, res) {
  res.send('Hello World')
})

module.exports = app;

