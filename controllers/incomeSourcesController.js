const incService = require('../services/incomesService');

exports.index = function(req, res){
	res.render('pages/incomes/addIncomeSources', {
		title : 'Income-Sources',
		username : req.session.userData.username,
		csrfToken : req.csrfToken()
	})
}

exports.save = async function(req, res){
	userId = req.session.userData.userid;
	response = await saveData(userId, req.body)
	res.json({'data':response});
}

async function saveData(userId, postData){
	try {
		let data = [
			userId,
			postData.incomesource,
			parseFloat(postData.annuallincome)
		]
		response = await incService._saveData(data)
		return response;
	} catch(Exception) {
		return Exception;
	}
}
