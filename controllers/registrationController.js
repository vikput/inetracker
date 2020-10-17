const commonService = require('../services/commonService')
const configObj = require('../config/config')
const passwordHash = require('password-hash')
const registrationModel = require('../models/registrationModel')


exports.index = function(req, res) {
    registrationModel.getSecurityQuestions(function(securityQuestions){
        res.render('pages/register/register', {
            title : 'Registration',
            securityQuestions: securityQuestions,
            csrfToken : req.csrfToken()
        });
    });
}

exports.addUser = function(req, res) {
    save(req.body, function(response){
        res.json({'data':response});
    });
}

save = function(postData, callback){
    let usersData = [
        postData.firstname,
        postData.lastname,
        postData.username,
        passwordHash.generate(postData.password)
    ]

    let securityData = [
        parseInt(postData.securityquestion),
        postData.securityanswer
    ]

    registrationModel.saveUser(usersData, function(response){
        if (response.status === configObj.success.status) {
            securityArray = [];
            securityArray[0] = response.data.insertId;
            for (let i = 0; i < securityData.length; i++) {
                securityArray.push(securityData[i]) 
            }
            
            registrationModel.saveSecurityData(securityArray, function(response){
                return callback(response);
            });
        } else {
            return callback(response);            
        }
    });
}

exports.checkUsername = function(req, res) {
    userName = req.body.username;
    commonService.checkUsername(null, userName, function(response){
        res.json(response);
    });
}
