var express = require("express"),
	todomodel = require('./todomodel');


var route = express.Router();

route.route('/')
	.get(function(req, res, next) {
		todomodel.find({}, function(err, todo) {
			if(todo.length == 0) { return next(new Error("No tasks found")); }
			if(err){ return next(err); }
			res.status(200).json(todo);
			
		})
	})
	.post(function(req, res, next) {
		todomodel.create(req.body, function(err, todo) {
			if(err){ return next(err); }
			res.status(200).json(todo);
		})

	})



/*route.get('/', function(req, res, next){
	res.status(200).json({msg: "it worked"});
})*/


module.exports = route;