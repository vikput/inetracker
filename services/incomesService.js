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
	return await incSModel.checkIncomeSource(data);
}

/**
   Income sources list view
*/
exports.getUsersIncomeSourcesListView = async function(data, start, limit, search, sortBy, orderBy){
    results = await incSModel.getUsersIncomeSourcesListView(data, start, limit, search, sortBy, orderBy);
    incSourceData = [];
    for(let i=0; i<results.length; i++){
    	incSourceData.push({
    		'income_sources': results[i].users_income_sources,
    		'action': 'Action'
    	}); 
    }
    return incSourceData;
}

/**
   Get total records count
*/
exports.getUsersTotalIncScount = async function(data){
	results =  await incSModel.getUsersTotalIncScount(data);
	return results.data;
}

/*
	Save users incomes data 
*/
exports._saveIncomes = async function(data){
	return await incModel.saveIncomes(data);
}
