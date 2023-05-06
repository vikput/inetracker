const configObj = require('../config/config')

exports.getSecurityQuestions = function(callback){
    connectDB.query('SELECT id, questions FROM security_questions', function(err, res){
        if (err) {
            console.log(err)
        } else {
            return callback(res);
        }
    })
    //conn.end();
}

exports.saveUser = function(usersData, callback){
    let response = {};
    connectDB.query('INSERT INTO users(firstname, lastname, username, password) VALUES(?, ?, ?, ?)', usersData, function(err, res){
        if (err) {
            response.status = configObj.error.status;
            response.message = configObj.error.err1_message;
            //response.message = err;
            response.data = '';
            return callback(response);
        } else {
            response.status = configObj.success.status;
            response.message = '';
            response.data = res;
            return callback(response);
        }
    });
    //conn.end();
}

exports.saveSecurityData = function(securityData, callback){
    let response = {};
    connectDB.query('INSERT INTO users_security_answer(user_id, question_id, answer) VALUES(?, ?, ?)', securityData, function(err, res){
        if (err) {
            response.status = configObj.error.status;
            response.message = configObj.error.err1_message;
            //response.message = err;
            response.data = '';
            return callback(response)
        } else {
            response.status = configObj.success.status;
            response.message = configObj.success.succ1_message;
            response.data = '';
            return callback(response)
        }
    });
    //conn.end();
}
