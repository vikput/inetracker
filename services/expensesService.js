const expModel = require('../models/expensesModel');
const commonService = require('./commonService');
const ff = require('../config/featureflag');

exports._saveData = async function(data){
	let response = await expModel.saveData(data);
    if (ff.ieImprovement && response.status === 'success') {
        setTimeout(commonService.balance, 2000, data);
    }
    return response;
}

/**
   Get total records count
*/
exports.getUsersTotalExpCount = async function(data){
    results =  await expModel.getUsersTotalExpCount(data);
    return results.data;
}

/**
    Fetch users monthly income data
*/
exports.fetchUsersExpenses = async function(data, start, limit, sortByArr, orderByArr){
    results = await expModel.fetchUsersExpenses(data, start, limit, sortByArr, orderByArr);
    expenses = [];
    for (let i=0; i<results.length; i++){
        expenses.push({
            'year': results[i].year,
            'month': results[i].month,
            'date': commonService.formatDate(results[i].in_ex_date),
            'amount': commonService.currencySymbol(results[i].amount),
            'comments': commonService.escapeHtml(results[i].comments),
            'action': results[i].in_ex_type
        });
    }

    return expenses;
}