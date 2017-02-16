var express = require("express"),
	chai = require('chai'),
	todomodel = require('./todomodel'),
	assert = chai.assert;


var route = express.Router();

route.route('/')
	.get(function(req, res, next) {
		todomodel.find({}, function(err, todos) {
			if(todos.length == 0) { return next(new Error("No tasks found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);
			
		});
	})
	.post(function(req, res, next) {
		todomodel.create(req.body, function(err, todo) {
			if(err){ return next(err); }
			res.status(200).json(todo);
		});

	})
	.delete(function(req, res, next) {
		todomodel.remove({}, function(err, todos) {
			if(todos.length == 0) { return next(new Error("No tasks found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);

		});
	})

// Routes that take id as a parameter

route.route('/:id')
	.get(function(req, res, next) {
		todomodel.findOne({_id: req.params.id}, function(err, todos){
			if(!todos) { return next(new Error("No task found by id")); }
			if(err){ return next(err); }
			res.status(200).json(todos);

		});
	})
	.put(function(req, res, next){
		todomodel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, todos){
			if(!todos) { return next(new Error("couldnt update, id not found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);
		});
	})
	.delete(function(req, res, next) {
		todomodel.findOneAndRemove({_id: req.params.id}, req.body, function(err, todos) {
			if(!todos) { return next(new Error("couldnt delete, id not found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);
		});
	})



/*route.get('/', function(req, res, next){
	res.status(200).json({msg: "it worked"});
})*/


module.exports = route;