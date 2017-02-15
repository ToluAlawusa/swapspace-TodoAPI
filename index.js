var app = require('./server/server'),
	PORT = 3000;


// this starts the app
app.listen(PORT, function(){
	console.log('Express Server Started on port '+ PORT +'!');
});