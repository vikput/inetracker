const incService = require('../services/incomesService');

exports.index = function(req, res){
	res.render('pages/incomes/addIncomeSources', {
		title : 'Income-Sources',
		username : req.session.userData.username,
		csrfToken : req.csrfToken()
	});
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

exports.checkIncomeSource = async function(req, res){
	try{
		let data = [
			req.session.userData.userid,
			req.body.insource
		]
		response = await incService.checkIncomeSource(data);
		res.json(response);
	} catch(Exception) {
		res.json(Exception);
	}
}

exports.view = async function(req, res){
	res.render('pages/incomes/viewIncomeSources', {
		title : 'Income-Sources',
		username : req.session.userData.username,
		csrfToken : req.csrfToken()
	});
}

exports.fetchIncomeSources = async function(req, res){
	console.log(req.query);
	let userId = req.session.userData.userid;
	let start = req.query.start;
	let limit = req.query.length;
	let sortBy = req.query.order[0].column;
	let orderBy = req.query.order[0].dir;
	console.log(sortBy);
	console.log(orderBy);
	let columns = req.query.columns;
	let search = [];

	columns.forEach(function(value, key){
		if (value.search.value) {
            let sKey = value.name;
            let sValue = value.search.value;
            search.push({[sKey]: sValue});
		}
	});
    
    let data = await getUsersIncomeSourcesListView(userId, start, limit, search, sortBy, orderBy);
    let recordsTotal = await incService.getUsersTotalIncScount([userId]);
    let recordsFiltered = data.length;
	response = {
	    "draw" : req.query.draw, 
	    "recordsTotal": parseInt(recordsTotal), 
	    "recordsFiltered": parseInt(recordsFiltered), 
	    "data" : data
	};
	res.json(response);
}

getUsersIncomeSourcesListView = async function(userId, start, limit, search, sortBy, orderBy){
	try{
		let data = [
			userId
		];

		response = await incService.getUsersIncomeSourcesListView(data, start, limit, search, sortBy, orderBy);
	    return response;
	}catch (Exception){
		console.log(Exception);
		return Exception;
	}
}
