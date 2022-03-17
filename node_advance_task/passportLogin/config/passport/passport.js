var bCrypt = require('bcrypt');

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
    function(req, email, password, done) {
        var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
            where: {
                email: email
            }
            }).then(function(user) {
            if (user)
            {
                return done(null, false, {
                    message: 'That email is already taken'
                });
            } else
            {
            var userPassword = generateHash(password);
            var data = { 
                email: email, 
                password: userPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname
                };
                User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                        }
                    if (newUser) {
                        return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });
    passport.deserializeUser(function(id, done) {
 
        User.findByPk(id).then(function(user) {
     
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
     
        });
     
    });
}