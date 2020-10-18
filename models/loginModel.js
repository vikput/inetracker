const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')


exports.getUsersAuthDetails = function(userName, callback) {
	let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    let response = {};
    let query = 'SELECT id, username, password FROM users WHERE username=?';

    conn.query(query, userName, function(err, result){
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
    conn.end();
}