

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
    req.session.destroy(function (err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
        //res.clearCookie('connect.sid', {path: '/'}).end();
    });
}