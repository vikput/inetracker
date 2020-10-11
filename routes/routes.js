const express = require('express')//Express module
const router = express.Router();//Create router class instance

//Inculed controller modules
const registration_controller = require('../controllers/registrationController');
const login_controller = require('../controllers/loginController');
const dashboard_controller = require('../controllers/dashboardController');


//Registration routes
router.get('/', registration_controller.index);
router.post('/save-user', registration_controller.addUser);
router.post('/check-username', registration_controller.checkUsername)

//Login routes
router.get('/login', login_controller.index)
router.post('/login/authenticate', login_controller.authenticate)

//Dashboard routes
router.get('/dashboard', dashboard_controller.index)

module.exports = router;
