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

exports.getStatement = async function(userId, filterData){
    try {
        usersStatement = await reportsModel.getStatement(userId, filterData);
        let reportData = [];
        let totalInc = 0; let totalExp = 0; let balance = 0;
        for (let i=0; i<usersStatement.length; i++) {
            
            if (usersStatement[i].type ==='Income') {
                totalInc += parseFloat(usersStatement[i].amount);  
            }

            if (usersStatement[i].type ==='Expense') {
                totalExp += parseFloat(usersStatement[i].amount);  
            }

            reportData.push({
                'date': commonService.formatDate(usersStatement[i].date),
                'type': usersStatement[i].type,
                'amount': parseFloat(usersStatement[i].amount),
                'comments': usersStatement[i].comments, 
            });
        }

        response = {
            status: 'success',
            message: '',
            data: reportData,
            totalInc : totalInc,
            totalExp : totalExp,
            balance : parseFloat(totalInc) - parseFloat(totalExp)
        };

        return response;
    } catch(Exception) {
        response = {
            status: 'error',
            message: 'Something went wrong, please try again later.',
            data: ''
        };
        return response;
    }
}

exports.fetchOverAllReports = async function(userId, filterData, incomeSources) {
    try {
        let reportData = [];
        var totalInc=0; var totalExp=0; var balance=0;
        for(let i=0; i<incomeSources.length; i++) {
            overAllReports = await reportsModel.fetchOverAllReports(userId, filterData, incomeSources[i].id);
            var income=0; var expense=0; var _balance=0;
            for(let j=0; j<overAllReports.length; j++) {
                income = overAllReports[j].overall_income;
                expense = overAllReports[j].overall_expense;
                _balance = parseFloat(overAllReports[j].overall_income) - parseFloat(overAllReports[j].overall_expense); 
                totalInc += parseFloat(overAllReports[j].overall_income);
                totalExp += parseFloat(overAllReports[j].overall_expense);
            }

            reportData.push({
                'income_source': incomeSources[i].users_income_sources,
                'overall_income': income,
                'overall_expense': expense,
                'overall_balance': _balance
            });
        }

        response = {
            status: 'success',
            message: '',
            data: reportData,
            totalInc: totalInc,
            totalExp: totalExp,
            balance: parseFloat(totalInc) - parseFloat(totalExp)
        };
        return response;
    } catch(Exception) {
        response = {
            status: 'error',
            message: Exception,
            data: ''
        };
        return response;
    }    
}