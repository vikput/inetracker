const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')

exports.checkUsername = function(userId=null, userName, callback){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    let response = {};
    let query = 'SELECT COUNT(username) AS u_count FROM users WHERE username=?';
    if (userId) {
        query += ' AND id!=?';
    }
    conn.query(query, userName, function(err, result){
    	if (err) {
    		response.status = configObj.error.status;
            response.message = configObj.error.err1_message;
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
    conn.end();
}
