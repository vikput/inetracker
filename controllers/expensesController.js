const incService = require('../services/incomesService');
const expService = require('../services/expensesService');
const configObj = require('../config/config');


exports.index = async function(req, res){
	userId = req.session.userData.userid
	response = await getUsersIncomeSources(userId)
	res.render('pages/expenses/addExpenses', {
		title : 'Expenses',
		username : req.session.userData.username,
		csrfToken : req.csrfToken(),
		incomeSources : response
	});
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
			configObj.transaction_type.expense,
			postData.comments,
			parseFloat(postData.monthlyexpense)
		];

		response = await expService._saveData(data);
		return response;
	} catch(Exception) {
		return Exception;
	}
}

exports.view = async function(req, res){
  res.render('pages/expenses/viewExpenses', {
    title : 'Expenses',
    username : req.session.userData.username,
    csrfToken : req.csrfToken()
  });
}

exports.fetchExpenses = async function(req, res){
    userId = req.session.userData.userid;
    let start = req.query.start;
	let limit = req.query.length;
	let orderBy = req.query.order;
    let sortByArr = [];let orderByArr = [];
	for(let i=0; i<orderBy.length; i++){
        sortByArr.push(orderBy[i].column);
        orderByArr.push(orderBy[i].dir);
	}
    
    data = await fetchUsersExpenses(userId, start, limit, sortByArr, orderByArr);
    let recordsTotal = await expService.getUsersTotalExpCount([userId, configObj.transaction_type.expense]);
    //let recordsFiltered = await expService.getUsersTotalExpCount([userId, 'Expense']);
    let recordsFiltered = data.length;
    let response = {
      "draw": req.query.draw,
      "recordsTotal": parseInt(recordsTotal),
      "recordsFiltered": parseInt(recordsFiltered),
      "data": data
    };
  res.json(response);
}

fetchUsersExpenses = async function (userid, start, limit, sortByArr, orderByArr){
  try {
        let data = [
          userid,
          configObj.transaction_type.expense
      ];

      return await expService.fetchUsersExpenses(data, start, limit, sortByArr, orderByArr);
  } catch(Exception) {
        return Exception;
  }
}