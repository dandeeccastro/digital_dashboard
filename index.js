const express = require('express')
const http = require('http')

const app = express()
const io = require('socket.io');

const server = http.Server(app)
const socket = io(server)

app.use(express.static('public'));

app.get('/',(req,res) => {

	res.sendFile(__dirname + '/views/index.html')
	
});

app.post('/:type/:status', (req, res) => {

	console.log('[server.js] > ' + req.params.type + ' ' + req.params.status)

	socket.emit('update',{
		'type': req.params.type, 
		'status': req.params.status
	});	

	res.send("Ack")

})

server.listen(3000,function(){

	console.log('[server.js] > Listening...')

});

