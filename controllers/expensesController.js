const incService = require('../services/incomesService');
const expService = require('../services/expensesService');


exports.index = async function(req, res){
	userId = req.session.userData.userid
	response = await getUsersIncomeSources(userId)
	res.render('pages/expenses/addExpenses', {
		title : 'Expenses',
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
			postData.exyear,
			postData.exmonth,
			postData.exdate,
			postData.comments,
			parseFloat(postData.monthlyexpense)
		]
        console.log('controller')
		response = await expService._saveData(data)
		return response;
	} catch(Exception) {
		return Exception;
	}
}