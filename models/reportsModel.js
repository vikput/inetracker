const mysqldb = require('../config/mysqldb');
const configObj = require('../config/config');

exports.getIncomes = function(userId, filterData){
	return new Promise(function(resolve, reject){
		let dbObj = new mysqldb();
		let conn = dbObj.connect();
		conn.connect();

		let response = {};
		let query = 'SELECT inc.id AS id, inc.in_year AS `year`, inc.in_month AS `month`, inc.in_date AS `in_date`, inc.income AS amount, inc.in_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_income AS inc, users_income_sources AS incs';
		query += ' WHERE inc.user_id = ? AND inc.uis_id = ? AND inc.uis_id=incs.id';

		let data = [
		    userId
		];

		data.push(parseInt(filterData.inCsrc));

		if(filterData.year && filterData.month) {
			data.push(filterData.year);
			data.push(filterData.month);
			query +=' AND inc.in_ex_year = ? AND inc.in_ex_month = ?';
		}

		if(filterData.fromDate && filterData.toDate){
		    data.push(filterData.fromDate);
		    data.push(filterData.toDate);
		    query +=' AND inc.in_ex_date BETWEEN ? AND ?';
		}

		query += ' ORDER BY inc.in_ex_month ASC';

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


exports.getExpenses = function(userId, filterData){
	return new Promise(function(resolve, reject){
		let dbObj = new mysqldb();
		let conn = dbObj.connect();
		conn.connect();

		let response = {};
		let query = 'SELECT ex.id AS id, ex.ex_year AS `year`, ex.ex_month AS `month`, ex.ex_date AS `ex_date`, ex.ex_amount AS amount, ex.ex_comment AS comments, incs.users_income_sources AS income_sources FROM users_monthly_expenses AS ex, users_income_sources AS incs';
		query += ' WHERE ex.user_id = ? AND ex.uis_id = ? AND ex.uis_id=incs.id';

		let data = [
		    userId
		];

		data.push(parseInt(filterData.inCsrc));

		if(filterData.year && filterData.month) {
			data.push(filterData.year);
			data.push(filterData.month);
			query +=' AND ex.ex_year = ? AND ex.ex_month = ?';
		}

		if(filterData.fromDate && filterData.toDate){
		    data.push(filterData.fromDate);
		    data.push(filterData.toDate);
		    query +=' AND ex.ex_date BETWEEN ? AND ?';
		}

		query += ' ORDER BY ex.ex_month ASC';

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

exports.getStatement = function(userId, filterData){
	return new Promise(function(resolve, reject){
		let dbObj = new mysqldb();
		let conn = dbObj.connect();
		conn.connect();

		let response = {};

		let query = 'SELECT ie.in_ex_date AS `date`,ie.in_ex_type AS `type`, ie.in_ex_amount AS `amount`, ie.in_ex_comment AS comments';
		query += ' FROM users_monthly_in_ex AS ie, users_income_sources AS incs WHERE ie.user_id = ? AND ie.uis_id = ? AND ie.uis_id=incs.id';

		let data = [
		    userId
		];

		data.push(parseInt(filterData.inCsrc));

		if(filterData.year && filterData.month) {
			data.push(filterData.year);
			data.push(filterData.month);
			query +=' AND ie.in_ex_year = ? AND ie.in_ex_month = ?';
		}

		if(filterData.fromDate && filterData.toDate){
		    data.push(filterData.fromDate);
		    data.push(filterData.toDate);
		    query +=' AND ie.in_ex_date BETWEEN ? AND ?';
		}

		query += ' ORDER BY ie.in_ex_month, ie.in_ex_date DESC';

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

exports.fetchOverAllReports = function(userId, filterData, incsId) {
	return new Promise(function(resolve, reject){
        let dbObj = new mysqldb();
		let conn = dbObj.connect();
		conn.connect();

		let response = {};

        let queryFilter;
		if(filterData.year) {
			//data.push(filterData.year);
			let year = filterData.year;
			queryFilter =' AND in_ex_year = "'+year+'"';
		}

		if(filterData.month) {
			//data.push(filterData.month);
			let month = filterData.month;
			queryFilter +=' AND in_ex_month = "'+month+'"';
		}

		let incomeQuery = 'SELECT SUM(in_ex_amount) FROM users_monthly_in_ex';
		incomeQuery += ' WHERE user_id = '+userId+' AND uis_id = '+incsId+''; 
		incomeQuery += ' AND in_ex_type="'+configObj.transaction_type.income+'"';
		incomeQuery += queryFilter;

		let expenseQuery = 'SELECT SUM(in_ex_amount) FROM users_monthly_in_ex';
		expenseQuery += ' WHERE user_id = '+userId+' AND uis_id = '+incsId+'';
		expenseQuery += ' AND in_ex_type="'+configObj.transaction_type.expense+'"';
		expenseQuery += queryFilter;
		
		let query = 'SELECT ('+incomeQuery+') AS overall_income, ('+expenseQuery+') AS overall_expense';
		query +=' FROM users_monthly_in_ex where user_id = '+userId+' AND uis_id = '+incsId+'';
		query += queryFilter;
		query += ' GROUP BY uis_id';

        /*let data = [
		    userId,
		    incsId
		];*/

		conn.query(query, function(err, result){
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