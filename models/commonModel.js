const mysqldb = require('../config/mysqldb')

exports.checkUsername = function(userId=null, userName, callback){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    
    let query = 'SELECT username FROM users WHERE 1=1';
    if (userId) {
        query += 'id!=?';
    }
    conn.end();
    return callback(query);
}
