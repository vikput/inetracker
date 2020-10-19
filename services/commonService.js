const commonModel = require('../models/commonModel')


exports.checkUsername = function(userId=null, username, callback) {
    commonModel.checkUsername(userId, username, function(response){
        return callback(response);
    });
}

exports.getCurrentDateTime = function(){
    let dateObj = new Date();
    let year = dateObj.getFullYear() 
    let month = ((dateObj.getMonth()+1) < 10) ? '0'+(dateObj.getMonth()+1) : (dateObj.getMonth()+1)
    let date = (dateObj.getDate() < 10) ? '0'+dateObj.getDate() : dateObj.getDate()
    let hours = (dateObj.getHours() < 10) ? '0'+dateObj.getHours() : dateObj.getHours()
    let minutes = (dateObj.getMinutes() < 10) ? '0'+dateObj.getMinutes() : dateObj.getMinutes()
    let seconds = (dateObj.getSeconds() < 10) ? '0'+dateObj.getSeconds() : dateObj.getSeconds()

    let datetime = year +'-'
    +month +'-'
    +date +' '
    +hours +':'
    +minutes +':'
    +seconds         
    return datetime;
}

//Before login session check if users logs-out or closes tab and tries to access register/login page.
exports.isNotActive = function(req, res, next) {
    if (req.session.userData) {
        res.redirect('/dashboard')
    } else {
        next();
    }
}

//After login session check if users closes the tab and again tries to access after login pages.
exports.isActive = function(req, res, next) {
    if (!req.session.userData) {
        res.redirect('/login')
    } else {
        next();
    }
}