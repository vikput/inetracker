const incSModel = require('../models/incomeSourcesModel');
const incModel = require('../models/incomesModel');
const commonService = require('./commonService');

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
    let results = await incSModel.getUsersIncomeSourcesListView(data, start, limit, search, sortBy, orderBy);
    let incSourceData = [];
    for(let i=0; i<results.length; i++){
        incSourceData.push({
            'income_sources': commonService.escapeHtml(results[i].users_income_sources),
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
    let response = await incModel.saveIncomes(data);
    if (response.status === 'success') {
        setTimeout(commonService.balance, 2000, data);
    }
    return response;
}

/**
   Get total records count
*/
exports.getUsersTotalIncCount = async function(data){
    results =  await incModel.getUsersTotalIncCount(data);
    return results.data;
}

/**
    Fetch users monthly income data
*/
exports.fetchUsersIncomes = async function(data, start, limit, sortByArr, orderByArr){
    results = await incModel.fetchUsersIncomes(data, start, limit, sortByArr, orderByArr);
    incomes = [];
    for (let i=0; i<results.length; i++){
        incomes.push({
            'year': results[i].year,
            'month': results[i].month,
            'date': commonService.formatDate(results[i].in_ex_date),
            'amount': commonService.currencySymbol(results[i].amount),
            'comments': commonService.escapeHtml(results[i].comments),
            'action': results[i].in_ex_type,
        });
    }

    return incomes;
}
