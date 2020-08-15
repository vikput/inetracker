const express = require('express')//Express module
const router = express.Router();//Create router class instance

//Inculed controller modules
registration_controller = require('../controllers/registrationController');
login_controller = require('../controllers/loginController');


//Registration routes
router.get('/', registration_controller.index);
router.post('/save', registration_controller.add_user);

//Login routes
router.get('/login', login_controller.login)

module.exports = router;