console.log('start config server');
const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

const PORT = 9000;

app.set('port', PORT);

app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
    console.log('on method post');
    res.send('in method next');
});

const server = app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});

const io = socketIO(server);
io.on('connection', () => {
    console.log('init connection');
})
//io.sockets.emit()