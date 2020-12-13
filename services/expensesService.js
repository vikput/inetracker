const expModel = require('../models/expensesModel');


exports._saveData = async function(data){
	console.log('service')
	return await expModel.saveData(data);
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
            'date': results[i].date,
            'amount': results[i].amount,
            'comments': results[i].comments,
            'action': 'Action'
        });
    }

    return expenses;
}