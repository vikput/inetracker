let config = {
	error: {
		status: 'error',
		err1_message: 'Something went wrong, please try again later.',
		err2_message: 'Username is already in use.',
		err3_message: 'Username or password is in-correct.',
		err4_message: 'Income source is already added by you.'
	},
	success: {
		status: 'success',
		succ1_message: 'Your account got created successfully.',
		succ2_message: 'Username is available.',
		succ3_message: 'User got authenticated successfully.',
		succ4_message: 'Your income source got added successfully.',
		succ5_message: 'Your income data got added successfully.',
		succ6_message: 'Your expense data got added successfully.'
	},
	transaction_type: {
		income: 'Income',
		expense: 'Expense'
	},
	vehical_earnings: {
		2314: {
			day: 300,
			week: 2100,
			month: 9000
		},
		9583: {
			day: 300,
			week: 2100,
			month: 9000
		},
		1048: {
			day: 400,
			week: 2800,
			month: 12000
		},
		2190: {
			day: 400,
			week: 2800,
			month: 12000
		},
		9743: {
			day: 400,
			week: 2800,
			month: 12000
		},
		xy: {
			x:'dqdq'
		}
	}
}

module.exports = config;