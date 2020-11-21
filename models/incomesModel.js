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