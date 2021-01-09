const reportService = require('../services/reportsService');
const incService = require('../services/incomesService');

/*exports.incomesReports = function(req, res){
	userId = req.session.userData.userid
	//response = await getUsersIncomeSources(userId)
	res.render('pages/reports/reports', {
		title : 'Reports',
		username : req.session.userData.username,
		csrfToken : req.csrfToken(),
		//incomeSources : response
	});
}

exports.expensesReports = function(req, res){
	userId = req.session.userData.userid
	//response = await getUsersIncomeSources(userId)
	res.render('pages/reports/reports', {
		title : 'Reports',
		username : req.session.userData.username,
		csrfToken : req.csrfToken(),
		//incomeSources : response
	});
}*/

exports.detailedReports = async function(req, res){
	userId = req.session.userData.userid
	response = await incService.getUsersIncomeSources([userId])
	res.render('pages/reports/reports', {
		title : 'Reports',
		username : req.session.userData.username,
		csrfToken : req.csrfToken(),
		incomeSources : response
	});
}

exports.fetchDetailedReports = async function(req, res){
	filterData = req.body;
	userId = req.session.userData.userid;
     
    let response = await getDetailedReports(userId, filterData);

    res.render('pages/reports/partials/reportsAjaxResponse');

    /*let response = {
    	'data': view 
    };*/
	//res.json('pages/reports/partials/reportsAjaxResponse');
}

getDetailedReports = async function(userId, filterData){
    await reportService.getDetailedReports(userId, filterData);
}