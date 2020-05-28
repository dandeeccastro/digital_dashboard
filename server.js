const express = require('express')
const http = require('http')

const app = express()
const io = require('socket.io');

const server = http.Server(app)
const socket = io(server)

const fs = require('fs')

// Serves static files such as css and vue minified
app.use(express.static('public'));

// Shows the webpage
app.get('/',(req,res) => {
	res.sendFile(__dirname + '/views/index.html')
});

// Handles socket updates and logging
app.post('/:type/:status', (req, res) => {

	console.log('[server.js] > Sent update event of type ' + req.params.type + ' and status ' + req.params.status)

	socket.emit('update',{
		'type': req.params.type, 
		'status': req.params.status
	});	

	// Logs everything on server.log
	var logString = "Task " + req.params.type + " set " + (req.params.status == '1' ? "active" : "inactive") + " on " + new Date(Date.now()) + "\n";
	fs.writeFileSync('server.log', logString, {'flag':'a+'})
	
	// Sends an acknowledgement that it received the request
	res.send('ack')

})

server.listen(3000,function(){

	console.log('[server.js] > Listening...')

});

