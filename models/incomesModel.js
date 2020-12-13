const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')

exports.saveIncomes = function(incomesData){
	return new Promise(function(resolve, reject){
	    let dbObj = new mysqldb();
	    let conn = dbObj.connect();
	    let response = {};
	    conn.connect();
	    conn.query('INSERT INTO users_monthly_income(user_id, uis_id, in_year, in_month, in_date, in_comment, income) VALUES(?, ?, ?, ?, ?, ?, ?)', incomesData, function(err, res){
	        if (err) {
	            response.status = configObj.error.status;
	            response.message = configObj.error.err1_message;
	            //response.message = err;
	            response.data = '';
	            reject(response);
	        } else {
	            response.status = configObj.success.status;
	            response.message = configObj.success.succ5_message;
	            response.data = '';
	            resolve(response);
	        }
	    });
	    conn.end();
	});
}

exports.fetchUsersIncomes = function(data){
  return new Promise(function(resolve, reject){
      let dbObj = new mysqldb();
        let conn = dbObj.connect();
        conn.connect();
        let response = {};
        let query = 'SELECT inc.id AS id, inc.in_year AS `year`, inc.in_month AS `month`, inc.in_date AS `in_date`, inc.income AS amount, inc.in_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_income AS inc, users_income_sources AS incs WHERE inc.user_id = ? AND inc.uis_id=incs.id';
      conn.query(query, data, function(err, result){
        if (err) {
          response.status = configObj.error.status;
              //response.message = configObj.error.err1_message;
              response.message = err;
              response.data = '';
              reject(response);
        } else {
          resolve(result);
        }
      });
      conn.end();
  });
}

exports.getUsersTotalIncCount = function(data){
  return new Promise(function(resolve, reject){
    let dbObj = new mysqldb();
        let conn = dbObj.connect();
        conn.connect();
        let response = {};
        let query = 'SELECT COUNT(id) as inc_count FROM users_monthly_income WHERE user_id=?';
        conn.query(query, data, function(err, result){
          if (err) {
                response.status = configObj.error.status;
              response.message = configObj.error.err1_message;
              //response.message = err;
              response.data = '';
              reject(response);
          } else {
            response.status = configObj.success.status;
                response.message = '';
                response.data = result[0].inc_count;
                resolve(response);
          }
        });
        conn.end();
  });
}