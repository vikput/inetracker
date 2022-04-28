const commonModel = require('../models/commonModel');
const configObj = require('../config/config')


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

exports.formatDate = function(date) {
    let dateObj = new Date(date),
        month = '' + (dateObj.getMonth() + 1),
        day = '' + dateObj.getDate(),
        year = dateObj.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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

exports.currencySymbol = function(amount) {
 return "<span>&#x20B9<span>"+amount;
}

//Escape html and script tags in javascript
exports.escapeHtml = function (text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

exports.balance = async function (data) {
    try {
        let response = await commonModel.getUsersBalanceCount(data);
        if (parseInt(response.data) > 0 ) {
            setTimeout(updateExistingBalanceEntry, 2000, data);
        } else {
            setTimeout(makeNewBalanceEntry, 2000, data);
        }
    } catch(Exception) {
        //Exception
    }
}

async function makeNewBalanceEntry(param) {
    try{
        //Get current balance
        let balanceResult = await getBalance(param);
        
        if (param[5] === configObj.transaction_type.income) { //Update entry of income & balance column.
            let _balance = parseFloat(balanceResult[2]) + parseFloat(param[7]);
            let data = [
                   param[0], param[1], param[2], param[3], param[7], _balance
                ];

            let query = 'INSERT INTO users_ine_balance(user_id, uis_id, ie_year, ie_month, income, balance) VALUES(?, ?, ?, ?, ?, ?)';
            makeCalculation(query, data);
            //if () {} //If refunded then update expense & balance column
        } else {
            let _balance = parseFloat(balanceResult[2]) - parseFloat(param[7]);
            let data = [
                   param[0], param[1], param[2], param[3], param[7], _balance
                ];
            let query = 'INSERT INTO users_ine_balance(user_id, uis_id, ie_year, ie_month, expense, balance) VALUES(?, ?, ?, ?, ?, ?)';
            makeCalculation(query, data);   
        }

    }catch(Exception){
        //Exception
    }
}

async function updateExistingBalanceEntry(param) {
    try{
        let balanceResult = await getBalance(param);
        
        if (param[5] === configObj.transaction_type.expense) {
            //Get current balance
            let expense = parseFloat(balanceResult[1]) + parseFloat(param[7])
            let _balance = parseFloat(balanceResult[2]) - parseFloat(param[7]);
            let data = [
                expense, _balance, param[0], param[1], param[2], param[3]
            ];
            
            let query = 'UPDATE users_ine_balance SET expense=?, balance=? WHERE user_id=? AND uis_id=? AND ie_year=? AND ie_month=?';
            makeCalculation(query, data);
        } else {
            //Get current balance
            let income = parseFloat(balanceResult[0]) + parseFloat(param[7])
            let _balance = parseFloat(balanceResult[2]) + parseFloat(param[7]);
            let data = [
                income, _balance, param[0], param[1], param[2], param[3]
            ];
            
            let query = 'UPDATE users_ine_balance SET income=?, balance=? WHERE user_id=? AND uis_id=? AND ie_year=? AND ie_month=?';
            makeCalculation(query, data);
        }
    }catch(Exception){
        //Exception
    }
}

async function getBalance(param){
    let response = await commonModel.getUsersBalance(param);
    let income = (response.data.length > 0) ? response.data[0] : 0;
    let expense = (response.data.length > 0) ? response.data[1] : 0;
    let balance = (response.data.length > 0) ? response.data[2] : 0;
    let data = [
        income, expense, balance
    ];
    return data;
}

function makeCalculation(query, data){
    try{
        commonModel.makeCalculation(query, data);
    }catch(Exception){
        //Exception
    }
}