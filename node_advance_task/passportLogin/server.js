var express = require('express');
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv');
const models = require("./models")
var exphbs = require('express-handlebars')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); 
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs.engine({
    layoutsDir: 'views/layouts/',
    defaultLayout: null,
    extname: 'handlebars'
  })
);

app.set('view engine', 'handlebars');
var authRoute = require('./routes/auth')(app,passport);
require('./config/passport/passport')(passport, models.user);

models.sequelize.sync().then(function() {
 
    console.log('Database connected..')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.listen(5000, function(err) {
 
    if (!err)
        console.log("Server running on 5000");
    else console.log(err)
 
});
