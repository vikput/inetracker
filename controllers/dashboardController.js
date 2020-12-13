

exports.index = function(req, res) {
    res.render('pages/dashboard/dashboard', {
        title : 'Dashboard',
        username : req.session.userData.username,
        csrfToken : req.csrfToken()
    });
}

exports.test = function(req, res) {
    res.send('Dashboard data')
}

exports.logout = function(req, res) {
	req.session.destroy();
	req.session = null;
	res.redirect('/login');
}