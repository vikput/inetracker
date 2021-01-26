const incSModel = require('../models/incomeSourcesModel');
const reportsModel = require('../models/reportsModel');
const commonService = require('./commonService');

exports.getDetailedReports = async function(userId, filterData){
	try {
        usersIncomes = await reportsModel.getIncomes(userId, filterData);

        usersExpenses = await reportsModel.getExpenses(userId, filterData);
        
        reportData = [];
        for (let i=0; i<usersIncomes.length; i++) {
        	console.log(usersIncomes[i].year+'-'+usersIncomes[i].month+'-'+usersIncomes[i].in_date+'-'+usersIncomes[i].amount);
        	let expenses = [];
        	for (let j=0; j<usersExpenses.length; j++) {
                if (usersIncomes[i].year === usersExpenses[j].year && usersIncomes[i].month === usersExpenses[j].month && usersIncomes[i].income_sources === usersExpenses[j].income_sources) {
	                expenses.push({
	                	'ex_type': 'Expenses',
	                    'ex_year': usersExpenses[j].year,
	        	        'ex_month': usersExpenses[j].month,
	        	        'ex_date': commonService.formatDate(usersExpenses[j].ex_date),
	        	        'ex_amount': parseFloat(usersExpenses[j].amount),
	        	        'ex_comments': usersExpenses[j].comments 
	                });	
               }
        	}
    	    reportData.push({
    	    	'in_type': 'Income',
                'in_year': usersIncomes[i].year,
    	        'in_month': usersIncomes[i].month,
    	        'in_date': commonService.formatDate(usersIncomes[i].in_date),
    	        'amount': parseFloat(usersIncomes[i].amount),
    	        'comments': usersIncomes[i].comments,
    	        'expenses': expenses 
           });
        }
        
        response = {
        	status: 'success',
        	message: '',
        	data: reportData
        };
        return response;
	} catch(Exception){
		response = {
        	status: 'error',
        	message: 'Something went wrong, please try again later.',
        	data: ''
        };
        return response;
	}
}