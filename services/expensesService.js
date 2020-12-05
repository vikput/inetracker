const expModel = require('../models/expensesModel');


exports._saveData = async function(data){
	console.log('service')
	return await expModel.saveData(data);
}