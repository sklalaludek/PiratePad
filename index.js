const express = require('express');
// app setup
const app = express();
const http = require('http').Server(app);
http.listen(3000, () => {
    console.log('Express is working at localhost:3000');
});
// static files
app.use(express.static('public'));
// socket setup
const io = require('socket.io')(http);

let currText = '';
// listen for a connection
io.on('connection', socket => {
    // emit the current text
    socket.emit('refreshText', currText);
    // listen for a new text from the client
    socket.on('newText', data => {
        currText = data;
        // send it out to different clients
        io.emit('refreshText', currText);
    });
});
