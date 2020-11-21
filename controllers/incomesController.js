const incService = require('../services/incomesService');


exports.index = async function(req, res){
	userId = req.session.userData.userid
	response = await getUsersIncomeSources(userId)
	res.render('pages/incomes/addIncomes', {
		title : 'Incomes',
		username : req.session.userData.username,
		csrfToken : req.csrfToken(),
		incomeSources : response
	})
}

getUsersIncomeSources = async function(userId){
	try{
		let data = [
			userId
		]
		
		response = await incService.getUsersIncomeSources(data)
	    return response;
	}catch (Exception){
		return Exception;
	}
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
			parseInt(postData.incomesources),
			postData.inyear,
			postData.inmonth,
			postData.indate,
			postData.comments,
			parseFloat(postData.monthlyincome)
		]

		response = await incService._saveIncomes(data)
		return response;
	} catch(Exception) {
		return Exception;
	}
}