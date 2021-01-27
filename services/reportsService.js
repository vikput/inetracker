const incSModel = require('../models/incomeSourcesModel');
const reportsModel = require('../models/reportsModel');
const commonService = require('./commonService');

exports.getDetailedReports = async function(userId, filterData){
	try {
        usersIncomes = await reportsModel.getIncomes(userId, filterData);

        usersExpenses = await reportsModel.getExpenses(userId, filterData);
        
        reportData = [];

        let grandTotal = 0;
        for (let i=0; i<usersIncomes.length; i++) {
            let balance = 0;
        	let expenses = [];
	        let totalExpenses = 0;
        	for (let j=0; j<usersExpenses.length; j++) {
                if (usersIncomes[i].year === usersExpenses[j].year && usersIncomes[i].month === usersExpenses[j].month && usersIncomes[i].income_sources === usersExpenses[j].income_sources) {
                    totalExpenses += parseFloat(usersExpenses[j].amount);
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
            
            balance = parseFloat(usersIncomes[i].amount) - parseFloat(totalExpenses);
            balance = balance > 0 ? balance : 0;
            grandTotal += balance; 	
            reportData.push({
    	    	'in_type': 'Income',
                'in_year': usersIncomes[i].year,
    	        'in_month': usersIncomes[i].month,
    	        'in_date': commonService.formatDate(usersIncomes[i].in_date),
    	        'amount': parseFloat(usersIncomes[i].amount),
    	        'comments': usersIncomes[i].comments,
    	        'expenses': expenses,
                'balance': balance 
           });
        }

        response = {
        	status: 'success',
        	message: '',
        	data: reportData,
            total: grandTotal
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