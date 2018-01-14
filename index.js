const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3000, () => {
    console.log('Express is working at localhost:3000');
});

app.use(express.static('public'));

let currText = '';
// połączenie
io.on('connection', socket => {
    // wyświetlanie aktualnego tekstu na stronie
    socket.emit('refreshText', currText);
    // odebranie danych z strony
    socket.on('newText', data => {
        currText = data;
        // wysłanie danych na stronę
        io.emit('refreshText', currText);
    });
});
