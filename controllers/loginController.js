const commonService = require('../services/commonService')
const configObj = require('../config/config')
const passwordHash = require('password-hash');
const loginModel = require('../models/loginModel');

exports.index = function(req, res) {
    res.render('pages/login/login', {
    	title : 'Login',
    	csrfToken : req.csrfToken()
    });
}

exports.authenticate = function(req, res) {
	userName = req.body.username
	password = req.body.password
	commonService.checkUsername(null, userName, function(response){
		if (parseInt(response.data) === 1) {
			loginModel.getUsersAuthDetails(userName, function(response){
				if (passwordHash.verify(password, response.data[0].password)) {
					response.data = '/dashboard';
					res.json(response);
				} else {
					response.status = configObj.error.status;
					response.message = configObj.error.err3_message;
					response.data = '';
					res.json(response);
				}
			});
		} else {
			response.status = configObj.error.status;
			response.message = configObj.error.err3_message;
			response.data = '';
			res.json(response);
		}
	});
}