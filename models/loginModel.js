const configObj = require('../config/config');

exports.getUsersAuthDetails = function(userName, callback) {
    let response = {};
    let query = 'SELECT id, username, password FROM users WHERE username=?';

    connectDB.query(query, userName, function(err, result){
    	if (err) {
    		response.status = configObj.error.status;
            //response.message = configObj.error.err1_message;
            response.message = err;
            response.data = '';
            return callback(response);
    	} else {
            response.status = configObj.success.status;
            response.message = configObj.success.succ3_message;;
            response.data = result;
    		return callback(response);
    	}
    });
    //conn.end();
}