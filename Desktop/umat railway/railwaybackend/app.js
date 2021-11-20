var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const config = require("config");

//Import Mongoose.
const mongoose = require("mongoose");

const adminAuth = require('./routes/admin/auth');
const vacancies = require('./routes/admin/vacancies');
const newsandevent = require('./routes/admin/newsandevents');
const manageusers = require('./routes/admin/manageusers');
const courses = require('./routes/admin/courses');
const carousel = require('./routes/admin/carousel');
const public = require('./routes/publicview/public');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth/admin', adminAuth);
app.use('/api/admin/vacancy', vacancies);
app.use('/api/admin/users', manageusers);
app.use('/api/admin/newsandevent', newsandevent);
app.use('/api/admin/courses', courses);
app.use('/api/admin/carousel', carousel);
app.use('/api/public', public);

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

//Connect to MongoDB 
try {
  mongoose.connect('mongodb://localhost:27017/raillway' , {
  useNewUrlParser: true,
  useUnifiedTopology: true}, (err)=>{
    if(err){
      console.log({error: err.message});
    }else{
    console.log("Database Connection Successful");
    }
  })
} catch (error) {
console.log(error);
}

module.exports = app;
