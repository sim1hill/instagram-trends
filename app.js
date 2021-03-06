var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var routes = require('./routes/index');
var instagram = require('./routes/instagram');
var instagramAPI = require('./instagramAPI')
var requestify = require('requestify'); 

var app = express();

// my requests
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });



var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

//static files

app.use('/', express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.post('/instagram', function (req, res) {
  var linkArray = [];
  requestify.get("https://api.instagram.com/v1/tags/" + req.body.hashtag + "/media/recent?client_id=ADDCLIENTID&max_tag_id=10343103678223315303").then(function(response){
    var parsedResponse = response.getBody().data;
    parsedResponse.forEach(function(photo){
      linkArray.push(photo.link + "media");
    });
    res.send(linkArray);
  });
});

app.get('/test.json', function(req, res) {
  instagramAPI.apiRequest
  fs.readFile('test.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});


app.use('/', routes);
app.use('/instagram', instagram);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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


module.exports = app;
