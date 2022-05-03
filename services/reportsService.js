const incSModel = require('../models/incomeSourcesModel');
const reportsModel = require('../models/reportsModel');
const commonService = require('./commonService');
const configObj = require('../config/config');
const ff = require('../config/featureflag');

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
            status: configObj.error.status,
            message: configObj.error.err1_message,
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
            
            if (usersStatement[i].type === configObj.transaction_type.income) {
                totalInc += parseFloat(usersStatement[i].amount);  
            }

            if (usersStatement[i].type === configObj.transaction_type.expense) {
                totalExp += parseFloat(usersStatement[i].amount);  
            }

            reportData.push({
                'date': commonService.formatDate(usersStatement[i].date),
                'income': (usersStatement[i].type === configObj.transaction_type.income) ? usersStatement[i].type : '-',
                'expense': (usersStatement[i].type === configObj.transaction_type.expense) ? usersStatement[i].type : '-',
                'amount': parseFloat(usersStatement[i].amount).toLocaleString('en-IN'),
                'comments': usersStatement[i].comments, 
            });
        }
        
        response = {
            status: 'success',
            message: '',
            data: reportData,
            totalInc : totalInc.toLocaleString('en-IN'),
            totalExp : totalExp.toLocaleString('en-IN'),
            balance : (parseFloat(totalInc) - parseFloat(totalExp)).toLocaleString('en-IN')
        };

        return response;
    } catch(Exception) {
        response = {
            status: configObj.error.status,
            message: configObj.error.err1_message,
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
                income = (overAllReports[j].income) ? overAllReports[j].income : 0;
                expense = (overAllReports[j].expense) ? overAllReports[j].expense : 0;
                _balance = (overAllReports[j].balance) ? overAllReports[j].balance : 0; 
                totalInc += parseFloat(income);
                totalExp += parseFloat(expense);
            }

            reportData.push({
                'income_source': incomeSources[i].users_income_sources,
                'overall_income': income.toLocaleString('en-IN'),
                'overall_expense': expense.toLocaleString('en-IN'),
                'overall_balance': _balance.toLocaleString('en-IN')
            });
        }
        
        response = {
            status: 'success',
            message: '',
            data: reportData,
            totalInc: totalInc.toLocaleString('en-IN'),
            totalExp: totalExp.toLocaleString('en-IN'),
            balance: (parseFloat(totalInc) - parseFloat(totalExp)).toLocaleString('en-IN')
        };
        return response;
    } catch(Exception) {
        response = {
            status: configObj.error.status,
            message: configObj.error.err1_message,
            data: ''
        };
        return response;
    }    
}

exports.getAutoShipReport = async function(userId, filterData) {
    try {
        autoShipReport = await reportsModel.getAutoShipReport(userId, filterData);
        let reportData = [];
        let totalInc = 0; let totalExp = 0; let balance = 0; let pending = 0;
        for (let i=0; i<autoShipReport.length; i++) {
            
            if (autoShipReport[i].type === configObj.transaction_type.income) {
                totalInc += parseFloat(autoShipReport[i].amount);  
            }

            if (autoShipReport[i].type === configObj.transaction_type.expense) {
                totalExp += parseFloat(autoShipReport[i].amount);  
            }

            reportData.push({
                'date': commonService.formatDate(autoShipReport[i].date),
                'income': (autoShipReport[i].type === configObj.transaction_type.income) ? autoShipReport[i].type : '-',
                'expense': (autoShipReport[i].type === configObj.transaction_type.expense) ? autoShipReport[i].type : '-',
                'amount': parseFloat(autoShipReport[i].amount).toLocaleString('en-IN'),
                'comments': autoShipReport[i].comments, 
            });
        }

        let key = filterData.vehical.split('MH-');
        let expected = configObj.vehical_earnings[key[1]];

        balance = parseFloat(totalInc) - parseFloat(totalExp);
        pending = parseFloat(expected.month) - parseFloat(balance);
        
        response = {
            status: 'success',
            message: '',
            data: reportData,
            totalInc: totalInc.toLocaleString('en-IN'),
            totalExp: totalExp.toLocaleString('en-IN'),
            balance: (balance).toLocaleString('en-IN'),
            pending: (pending).toLocaleString('en-IN'),
            expected: expected
        };

        return response;
    } catch(Exception) {
        response = {
            status: configObj.error.status,
            message: configObj.error.err1_message,
            data: ''
        };
        return response;
    }
}