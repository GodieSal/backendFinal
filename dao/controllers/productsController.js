exports.renderRegister = (req, res) => {
    res.render('register'); 
};

exports.handleRegister = (req, res) => {
};

exports.renderLogin = (req, res) => {
    res.render('login'); 
};

exports.handleLogin = (req, res) => {
};

exports.handleLogout = (req, res) => {
    req.session.destroy(); 
    res.redirect('/login');
};
