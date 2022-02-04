const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')

exports.saveData = function(expenseData){
  return new Promise(function(resolve, reject){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    let response = {};
    conn.connect();
    //'INSERT INTO users_monthly_expenses(user_id, uis_id, ex_year, ex_month, ex_date, ex_comment, ex_amount) VALUES(?, ?, ?, ?, ?, ?, ?)'
    conn.query('INSERT INTO users_monthly_in_ex(user_id, uis_id, in_ex_year, in_ex_month, in_ex_date, in_ex_type, in_ex_comment, in_ex_amount) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', expenseData, function(err, res){
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

exports.fetchUsersExpenses = function(data, start, limit, sortByArr, orderByArr){
  return new Promise(function(resolve, reject){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    let orderByArray = ['in_ex_year', 'in_ex_month'];
    let response = {};
    //'SELECT ex.id AS id, ex.ex_year AS `year`, ex.ex_month AS `month`, ex.ex_date AS `date`, ex.ex_amount AS amount, ex.ex_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_expenses AS ex, users_income_sources AS incs WHERE ex.user_id = ? AND ex.uis_id=incs.id';
    let query = 'SELECT ie.id AS id, ie.in_ex_year AS `year`, ie.in_ex_month AS `month`, ie.in_ex_date AS `in_ex_date`, ie.in_ex_type, ie.in_ex_amount AS amount, ie.in_ex_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_in_ex AS ie, users_income_sources AS incs WHERE ie.user_id = ? AND ie.in_ex_type=? AND ie.uis_id=incs.id';
    query += ' ORDER BY ';
    for(let i=0; i<sortByArr.length; i++){
        query+= orderByArray[sortByArr[i]]+' '+orderByArr[sortByArr[i]];
        if (i < (sortByArr.length - 1)){
        	query +=' ,';
        }
    }
    query += ' LIMIT '+ start+', '+limit;
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

exports.getUsersTotalExpCount = function(data){
  return new Promise(function(resolve, reject){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    let response = {};
    let query = 'SELECT COUNT(id) as ex_count FROM users_monthly_in_ex WHERE user_id=? AND in_ex_type=?';
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
            response.data = result[0].ex_count;
            resolve(response);
      }
    });
    conn.end();
  });
}