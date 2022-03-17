var exports = module.exports = {}
 
exports.signup = (req, res) => {
    res.render("signup.hbs");
};
exports.signin = function(req, res) {
    res.render('signin.hbs');
};
exports.dashboard = function(req, res) {
    res.render('dashboard.hbs');
};
