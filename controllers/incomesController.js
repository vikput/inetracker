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