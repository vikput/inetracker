const reportService = require('../services/reportsService');
const incService = require('../services/incomesService');

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
    
    res.render('pages/reports/partials/reportsAjaxResponse', {
    	title: 'Reports',
    	reportsData: response
    });
}

getDetailedReports = async function(userId, filterData){
    return await reportService.getStatement(userId, filterData);
}

exports.overAllReports = async function(req, res) {
	userId = req.session.userData.userid
	res.render('pages/reports/overallReports', {
		title : 'Reports',
		username : req.session.userData.username,
		csrfToken : req.csrfToken()
	});
}

exports.fetchOverAllReports = async function(req, res) {
    filterData = req.body;
	userId = req.session.userData.userid;
	incomeSources = await incService.getUsersIncomeSources([userId])
	let response = await getOverAllReports(userId, filterData, incomeSources);
	res.render('pages/reports/partials/overAllReportsAjaxResponse', {
    	title: 'Reports',
    	reportsData: response
    });	
}

getOverAllReports = async function(userId, filterData){
    return await reportService.fetchOverAllReports(userId, filterData, incomeSources);
}

exports.autoShipReport = async function(req, res) {
	userId = req.session.userData.userid
	res.render('pages/reports/auto-shipReport', {
		title : 'Reports',
		username : req.session.userData.username,
		csrfToken : req.csrfToken(),
	});
}

exports.fetchAutoShipReport = async function(req, res) {
    filterData = req.body;
    userId = req.session.userData.userid;
    let response = await getAutoShipReport(userId, filterData);
    res.render('pages/reports/partials/autoshipReportsAjaxResponse', {
    	title: 'Reports',
    	reportsData: response
    });
}

getAutoShipReport = async function(userId, filterData){
    return await reportService.getAutoShipReport(userId, filterData);
}

