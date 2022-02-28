const express = require('express');//Express module
const router = express.Router();//Create router class instance
const isActive = require('../services/commonService');//Common services

//Inculed controller modules
const registration_controller = require('../controllers/registrationController');
const login_controller = require('../controllers/loginController');
const dashboard_controller = require('../controllers/dashboardController');
const income_sources_controller = require('../controllers/incomeSourcesController');
const incomes_controller = require('../controllers/incomesController');
const expenses_controller = require('../controllers/expensesController');
const reports_controller = require('../controllers/reportsController');


//Registration routes
router.get('/', isActive.isNotActive, registration_controller.index);
router.post('/save-user', registration_controller.addUser);
router.post('/check-username', registration_controller.checkUsername);

//Login routes
router.get('/login', isActive.isNotActive, login_controller.index);
router.post('/login/authenticate', login_controller.authenticate);

//Dashboard routes
router.get('/dashboard', isActive.isActive, dashboard_controller.index);
router.get('/dashboard/test', isActive.isActive, dashboard_controller.test);
router.get('/logout', dashboard_controller.logout);

//Income sources modules routes
router.get('/income/add-income-sources', isActive.isActive, income_sources_controller.index);
router.post('/income/save-income-sources', income_sources_controller.save);
router.post('/income/check-income-sources', income_sources_controller.checkIncomeSource);
router.get('/income/view-income-sources', isActive.isActive, income_sources_controller.view);
router.get('/income/fetch-income-sources', isActive.isActive, income_sources_controller.fetchIncomeSources);

//Income modules routes
router.get('/income/add-incomes', isActive.isActive, incomes_controller.index);
router.post('/income/save-incomes', isActive.isActive, incomes_controller.save);
router.get('/income/view-incomes', isActive.isActive, incomes_controller.view);
router.get('/income/fetch-incomes', isActive.isActive, incomes_controller.fetchIncomes);

//Expenses modules routes
router.get('/expense/add-expenses', isActive.isActive, expenses_controller.index);
router.post('/expense/save-expenses', isActive.isActive, expenses_controller.save);
router.get('/expense/view-expenses', isActive.isActive, expenses_controller.view);
router.get('/expense/fetch-expenses', isActive.isActive, expenses_controller.fetchExpenses);

//Reports modules routes
router.get('/report/detailed-report', isActive.isActive, reports_controller.detailedReports);
router.post('/report/fetch-detailed-report', isActive.isActive, reports_controller.fetchDetailedReports);
router.get('/report/overall-report', isActive.isActive, reports_controller.overAllReports);
router.post('/report/fetch-overall-report', isActive.isActive, reports_controller.fetchOverAllReports);

module.exports = router;
