var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport')
var expressSession = require("express-session")
var cors = require('cors')
var fileUpload = require('express-fileupload');

var config = require('./config')

//Routes
var index = require('./src/home/routes');
var users = require('./src/user/routes');

var passportConfig = require('./auth/passport-config')
passportConfig();

mongoose.connect(config.mongoUri);



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(expressSession(
//     {
//       secret: 'laziness in the time of emergency',
//       saveUninitialized: false,
//       resave: false
//     }
//   ))

//CORS
app.use(cors())

//File upload
app.use(fileUpload())



app.use(passport.initialize())
app.use(passport.session())

app.use('/', index);
app.use('/users', users);


app.use(passport.authenticate('jwt', {session: false})) // Authentication is mandatory for the proceeding routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
