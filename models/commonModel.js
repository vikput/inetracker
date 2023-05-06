const configObj = require('../config/config')

exports.checkUsername = function(userId=null, userName, callback){
    let response = {};
    let query = 'SELECT COUNT(username) AS u_count FROM users WHERE username=?';
    if (userId) {
        query += ' AND id!=?';
    }
    connectDB.query(query, userName, function(err, result){
    	if (err) {
    		response.status = configObj.error.status;
            response.message = configObj.error.err1_message;
            //response.message = err;
            response.data = '';
            return callback(response);
    	} else {
            response.status = configObj.success.status;
            if (result[0].u_count > 0) {
            	response.message = configObj.error.err2_message;	
            } else {
            	response.message = configObj.success.succ2_message;;
            }

            response.data = result[0].u_count;

    		return callback(response);
    	}
    });
    //conn.end();
}

exports.getUsersBalanceCount = function(params){
  return new Promise(function(resolve, reject){
    let response = {};

    let data = [
        params[0],
        params[1],
        params[2],
        params[3],
    ];
    
    let query = 'SELECT COUNT(id) as balance_count FROM users_ine_balance WHERE user_id=? AND uis_id=? AND ie_year=? AND ie_month=?';
    connectDB.query(query, data, function(err, result){
      if (err) {
        response.status = configObj.error.status;
        response.message = configObj.error.err1_message;
        //response.message = err;
        response.data = '';
        reject(response);
      } else {
        response.status = configObj.success.status;
        response.message = '';
        response.data = result[0].balance_count;
        resolve(response);
      }
    });
    //conn.end();
  });
}

exports.getUsersBalance = function(params){  
  return new Promise(function(resolve, reject){
    let response = {};
    let data = [
        params[0],
        params[1],
        params[2],
        params[3],
    ];
    
    let query = 'SELECT income, expense, balance FROM users_ine_balance WHERE user_id=? AND uis_id=? AND ie_year=? AND ie_month=?';
    connectDB.query(query, data, function(err, result){
      if (err) {
        response.status = configObj.error.status;
        response.message = configObj.error.err1_message;
        //response.message = err;
        response.data = '';
        reject(response);
      } else {
        response.status = configObj.success.status;
        response.message = '';
        response.data = (result.length) > 0 ? [result[0].income, result[0].expense, result[0].balance] : [];
        resolve(response);
      }
    });
    //conn.end();
  });
}

exports.makeCalculation = function(query, data){
  connectDB.query(query, data, function(err, res){
      if (err) {
          //Query execution failed.
      } else {
          //Query execution passed.
      }
  });
  //conn.end();
}