var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config()
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// Database Connection
const MONGOURI = process.env.mongo_uri;
// console.log("URI:", MONGOURI);
mongoose.connect( MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if(err){
    console.log(err);
  }
  else console.log("Connected to mongodb. Ok.")
});

app.use('/api', indexRouter)

app.use('*', express.static('./client/build'));

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
