const incSModel = require('../models/incomeSourcesModel');
const reportsModel = require('../models/reportsModel');

exports.getDetailedReports = async function(userId, filterData){
	try {
        usersIncomes = await reportsModel.getIncomes(userId, filterData);
        console.log(usersIncomes);

        usersExpenses = await reportsModel.getExpenses(userId, filterData);
        console.log(usersExpenses);

	} catch(Exception){
		console.log(Exception);
	}
}