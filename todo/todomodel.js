var mongoose = require('mongoose');

mongoose.connect('localhost');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({

	task: {
		type: String,
		required: true
	},

	date_time: {
		type: Date,
		default: Date.now
	},



});


var Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;