
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//var users = require('./routes/users');
var app = express();

//mongodb connection
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/dojugaad', ['postData']);
console.log(db);

//body parser statements
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/routes.js');
console.log(routes);
routes(app,db);
//////////////////////////////////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(express.bodyParser());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log('inside parser '+req.body.title) // populated!
  next()
})

var Routes = express.Router();

Routes.get('/',function(req,res){
   res.send('Hello');
});


app.use('/',Routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') == 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//app.listen(port);
var server = require("http").Server(app);

server.listen(8080, "127.0.0.1");

//console.log('Server running at '+ ipaddress + 'port:' + port);
//console.log("Listening to port 1234");

module.exports = app