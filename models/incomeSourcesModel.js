const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')

exports.saveData = function(incomeSourceData){
	return new Promise(function(resolve, reject){
	    let dbObj = new mysqldb();
	    let conn = dbObj.connect();
	    let response = {};
	    conn.connect();
	    conn.query('INSERT INTO users_income_sources(user_id, users_income_sources, anuall_amount) VALUES(?, ?, ?)', incomeSourceData, function(err, res){
	        if (err) {
	            response.status = configObj.error.status;
	            response.message = configObj.error.err1_message;
	            //response.message = err;
	            response.data = '';
	            reject(response);
	        } else {
	            response.status = configObj.success.status;
	            response.message = configObj.success.succ4_message;
	            response.data = '';
	            resolve(response);
	        }
	    });
	    conn.end();
	});
}
