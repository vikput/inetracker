const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')

exports.saveData = function(expenseData){
	console.log('model')
	return new Promise(function(resolve, reject){
	    let dbObj = new mysqldb();
	    let conn = dbObj.connect();
	    let response = {};
	    conn.connect();
	    conn.query('INSERT INTO users_monthly_expenses(user_id, uis_id, ex_year, ex_month, ex_date, ex_comment, ex_amount) VALUES(?, ?, ?, ?, ?, ?, ?)', expenseData, function(err, res){
	        if (err) {
	            response.status = configObj.error.status;
	            response.message = configObj.error.err1_message;
	            //response.message = err;
	            response.data = '';
	            reject(response);
	        } else {
	            response.status = configObj.success.status;
	            response.message = configObj.success.succ6_message;
	            response.data = '';
	            resolve(response);
	        }
	    });
	    conn.end();
	});
}