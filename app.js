const connection = require('./model');
var createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session  = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ctgps', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection

//var indexController = require('./controllers/index');
var userController = require('./controllers/user');
var loginController = require('./controllers/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(session({
	name: 'ctgps',
	secret: 'sdfsde345345sf234wfr234',
	resave: false,
	saveUninitialized: true,
	store: new mongoStore({ mongooseConnection: db })
}));

if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	sess.cookie.secure = true // serve secure cookies
}

//app.use('/', indexController);
app.use('/user', userController);
app.use('/login', loginController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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