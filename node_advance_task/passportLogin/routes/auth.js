var authController = require('../contrellers/authcontroller');
 
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard', authController.dashboard);
    app.post('/signup', passport.authenticate('local', {
        successRedirect: '/dashboard',
    
        failureRedirect: '/signup',
        failureMessage: true
    }
    
    ));
}
