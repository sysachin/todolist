var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var mongoose =require("mongoose");

var frontend = require('./routes/frontend');
var backend = require('./routes/backend');

var app = express();

const db = require('./config/keys').mongoURI;
mongoose.set('useFindAndModify', false);
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true}).then(function(){
  //console.log('mongodb connected')
}).catch(function(err){
  console.log(err)
});

// view engine setup
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', frontend);
app.use('/',backend);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.listen(3000,function(){
  console.log("listening to port");
})

module.exports = app;
