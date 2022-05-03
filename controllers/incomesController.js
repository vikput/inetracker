const incService = require('../services/incomesService');
const configObj = require('../config/config');


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
			configObj.transaction_type.income,
			postData.comments,
			parseFloat(postData.monthlyincome),
      ('refund' in postData)
		]

		response = await incService._saveIncomes(data)
		return response;
	} catch(Exception) {
		return Exception;
	}
}

exports.view = async function(req, res){
  res.render('pages/incomes/viewIncomes', {
    title : 'Incomes',
    username : req.session.userData.username,
    csrfToken : req.csrfToken()
  });
}

exports.fetchIncomes = async function(req, res){
    userId = req.session.userData.userid;
    let start = req.query.start;
	let limit = req.query.length;
	let orderBy = req.query.order;
    let sortByArr = [];let orderByArr = [];
	for(let i=0; i<orderBy.length; i++){
        sortByArr.push(orderBy[i].column);
        orderByArr.push(orderBy[i].dir);
	}

    data = await fetchUsersIncomes(userId, start, limit, sortByArr, orderByArr);
    let recordsTotal = await incService.getUsersTotalIncCount([userId, configObj.transaction_type.income]);
    let recordsFiltered = data.length;
    let response = {
      "draw": req.query.draw,
      "recordsTotal": parseInt(recordsTotal),
      "recordsFiltered": parseInt(recordsFiltered),
      "data": data
    };
  res.json(response);
}

fetchUsersIncomes = async function (userid, start, limit, sortByArr, orderByArr){
  try {
        let data = [
          userid,
          configObj.transaction_type.income
      ];

      return await incService.fetchUsersIncomes(data, start, limit, sortByArr, orderByArr);
  } catch(Exception) {
        return Exception;
  }
}