const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport');
const isLoggedIn = require('./middleware/auth.js')
require('./passport')
app.use(cookieSession({
  name: 'facebook-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
   res.redirect('/');
});

app.get('/',isLoggedIn,(req,res)=>{
  res.send(`Hello world ${req.user.displayName}`)
})
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})
app.listen(8000,()=>{
  console.log('Serve is up and running at the port 8000')
})

//GOOGLE>>>
// const express = require('express')
// const app = express()
// const passport = require('passport');
// require('./passport');
// const cookieSession = require('cookie-session')
// app.use(cookieSession({
//   name: 'google-auth-session',
//   keys: ['key1', 'key2']
// }))
// app.use(passport.initialize());
// app.use(passport.session());
// //Routes
// app.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/error', (req, res) => res.send('Unknown Error'))
// app.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );
// app.get('/', (req, res) => res.send(`Welcome ${req.user.displayName}!`))
// app.listen(8000,()=>{
//   console.log('Serve is up and running at the port 8000')
// })

// const isLoggedIn = require('./Middleware/auth')
// app.get('/', isLoggedIn,(req, res) => res.send(`Welcome ${req.user.displayName}!`))
// app.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// })

//INSTAGRAM>>>>
// app.use(cookieSession({
//     name: 'instagram-auth-session',
//     keys: ['key1', 'key2']
//   }))
//   app.use(passport.initialize());
//   app.use(passport.session());

// app.get('/auth/instagram',
//   passport.authenticate('instagram'));

// app.get('/auth/instagram/callback', 
//   passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function(req, res) {
//    res.redirect('/');
//   });
//   app.get('/', (req, res) => res.send(`Welcome ${req.user.displayName}!`))
// app.listen(8000,()=>{
//   console.log('Serve is up and running at the port 8000')
// })

// const isLoggedIn = require('./Middleware/auth')
// app.get('/', isLoggedIn,(req, res) => res.send(`Welcome ${req.user.displayName}!`))
// app.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// })