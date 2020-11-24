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

exports.getUsersIncomeSources = function(data){
	return new Promise(function(resolve, reject){
	    let dbObj = new mysqldb();
        let conn = dbObj.connect();
        conn.connect();
        let response = {};
        let query = 'SELECT id, users_income_sources FROM users_income_sources WHERE user_id=?';
	    conn.query(query, data, function(err, result){
	    	if (err) {
	    		response.status = configObj.error.status;
	            response.message = configObj.error.err1_message;
	            //response.message = err;
	            response.data = '';
	            reject(response);
	    	} else {
	    		resolve(result);
	    	}
	    });
	    conn.end();
	});
}

exports.checkIncomeSource = function(data){
	return new Promise(function(resolve, reject){
		let dbObj = new mysqldb();
        let conn = dbObj.connect();
        conn.connect();
        let response = {};
        let query = 'SELECT COUNT(id) as incs_count FROM users_income_sources WHERE user_id=? AND users_income_sources LIKE N?';
        conn.query(query, data, function(err, result){
        	if (err) {
                response.status = configObj.error.status;
	            response.message = configObj.error.err1_message;
	            //response.message = err;
	            response.data = '';
	            reject(response);
        	} else {
        		response.status = configObj.success.status;
	            if (result[0].incs_count > 0) {
	            	response.message = configObj.error.err4_message;	
	            } else {
	            	response.message = '';
	            }

                response.data = result[0].incs_count;
                resolve(response);
        	}
        });
        conn.end();
	});
}
