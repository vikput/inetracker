const incSModel = require('../models/incomeSourcesModel');
const incModel = require('../models/incomesModel');

/*
	Save users income sources data 
*/
exports._saveData = async function(data){
	return await incSModel.saveData(data);
}

/*
	Get users income sources
*/
exports.getUsersIncomeSources = async function(data){
	return await incSModel.getUsersIncomeSources(data);
}

/*
	Check if income source is already exists
*/
exports.checkIncomeSource = async function(data){
	return await incSModel.checkIncomeSource(data)
}

/*
	Save users incomes data 
*/
exports._saveIncomes = async function(data){
	return await incModel.saveIncomes(data);
}
