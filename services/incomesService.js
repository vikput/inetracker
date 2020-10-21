const incSModel = require('../models/incomeSourcesModel');

exports._saveData = async function(data){
	return await incSModel.saveData(data);
}

exports.getUsersIncomeSources = async function(data){
	return await incSModel.getUsersIncomeSources(data);
}
