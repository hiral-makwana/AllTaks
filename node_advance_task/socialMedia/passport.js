//FACEBOOK>>>>
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
  clientID: "1059815144571650",
  clientSecret: "c594690577d840fea5e836df2f14065c",
  callbackURL: "http://localhost:8000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
 //DATABASE>>>
  // const { email, first_name, last_name } = profile._json;
  // const userData = {
  //   email,
  //   firstName: first_name,
  //   lastName: last_name
  // };
  // new userModel(userData).save();
  return done(null, profile);
}
));

//INSTAGRAM>>>
// const passport = require('passport');
// const InstagramStrategy = require('passport-instagram').Strategy;
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.use(new InstagramStrategy({
//     clientID: "327554106018666",
//     clientSecret: "ff768b2f2fa4000110511a1b1b33166c",
//     callbackURL: "http://localhost:8000/auth/instagram/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ instagramId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
