const mysqldb = require('../config/mysqldb')
const configObj = require('../config/config')

exports.saveIncomes = function(incomesData){
	return new Promise(function(resolve, reject){
	    let dbObj = new mysqldb();
	    let conn = dbObj.connect();
	    let response = {};
	    conn.connect();
      //'INSERT INTO users_monthly_income(user_id, uis_id, in_year, in_month, in_date, in_comment, income) VALUES(?, ?, ?, ?, ?, ?, ?)'
	    conn.query('INSERT INTO users_monthly_in_ex(user_id, uis_id, in_ex_year, in_ex_month, in_ex_date, in_ex_type, in_ex_comment, in_ex_amount) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', incomesData, function(err, res){
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

exports.fetchUsersIncomes = function(data, start, limit, sortByArr, orderByArr){
  return new Promise(function(resolve, reject){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    let orderByArray = ['in_ex_year', 'in_ex_month'];
    let response = {};
    //SELECT inc.id AS id, inc.in_year AS `year`, inc.in_month AS `month`, inc.in_date AS `in_date`, inc.income AS amount, inc.in_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_income AS inc, users_income_sources AS incs WHERE inc.user_id = ? AND inc.uis_id=incs.id'
    let query = 'SELECT ie.id AS id, ie.in_ex_year AS `year`, ie.in_ex_month AS `month`, ie.in_ex_date AS `in_ex_date`, ie.in_ex_type, ie.in_ex_amount AS amount, ie.in_ex_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_in_ex AS ie, users_income_sources AS incs WHERE ie.user_id = ? AND ie.in_ex_type=? AND ie.uis_id=incs.id';
    query += ' ORDER BY ';
    console.log(query);
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

exports.getUsersTotalIncCount = function(data){
  return new Promise(function(resolve, reject){
    let dbObj = new mysqldb();
    let conn = dbObj.connect();
    conn.connect();
    let response = {};
    let query = 'SELECT COUNT(id) as inc_count FROM users_monthly_in_ex WHERE user_id=? AND in_ex_type=?';
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
        response.data = result[0].inc_count;
        resolve(response);
      }
    });
    conn.end();
  });
}