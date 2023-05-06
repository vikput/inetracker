const configObj = require('../config/config')

exports.saveData = function(incomeSourceData){
	return new Promise(function(resolve, reject){
	    let response = {};
	    connectDB.query('INSERT INTO users_income_sources(user_id, users_income_sources, anuall_amount) VALUES(?, ?, ?)', incomeSourceData, function(err, res){
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
	    //conn.end();
	});
}

exports.getUsersIncomeSources = function(data){
	return new Promise(function(resolve, reject){
        let response = {};
        let query = 'SELECT id, users_income_sources FROM users_income_sources WHERE user_id=?';
	    connectDB.query(query, data, function(err, result){
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
	    //conn.end();
	});
}

exports.getUsersIncomeSourcesListView = function(data, start, limit, search, sortBy, orderBy){
	return new Promise(function(resolve, reject){
		let orderByArray = ['users_income_sources'];
        let response = {};
        let query = 'SELECT id, users_income_sources FROM users_income_sources WHERE user_id=?';
        if (search.length > 0) {
        	for(let i=0; i<search.length; i++){
        	    for (let value of Object.values(search[i])) {
                   data.push(value);
                }
                for (let key of Object.keys(search[i])) {
                    query +=' AND '+key+' LIKE '+conn.escape('%'+data[1]+'%')+'';
                }
        	}
        }

        query += ' ORDER BY '+orderByArray[sortBy]+' '+orderBy;
        //query += ' LIMIT '+limit+','+start; 
	    connectDB.query(query, data, function(err, result){
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
	    //conn.end();
	});
}

exports.checkIncomeSource = function(data){
	return new Promise(function(resolve, reject){
        let response = {};
        let query = 'SELECT COUNT(id) as incs_count FROM users_income_sources WHERE user_id=? AND users_income_sources LIKE N?';
        connectDB.query(query, data, function(err, result){
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
        //conn.end();
	});
}

exports.getUsersTotalIncScount = function(data){
	return new Promise(function(resolve, reject){
        let response = {};
        let query = 'SELECT COUNT(id) as incs_count FROM users_income_sources WHERE user_id=?';
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
                response.data = result[0].incs_count;
                resolve(response);
        	}
        });
        //conn.end();
	});
}
