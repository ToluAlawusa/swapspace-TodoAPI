var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    todorouter = require('../todo/todoroutes');

// use of middlewares
// morgan for logging requests to the console
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mount routes
app.use('/todos', todorouter);


// express's automatic error handler middleware
app.use(function(err, req, res, next){

	res.status(501).json(err.message);

})

// serving public files from here
app.use(express.static(__dirname + '/public'));


module.exports = app;