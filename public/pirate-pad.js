// make connection
const socket = io(); // variable for a front-end
// pass data to the server
$('textarea').on('input', () => {
    // emit event
    socket.emit('newText', $('textarea').val());
});
// receive data and output it to the screen
socket.on('refreshText', data => {
    $('textarea').val(data);
});
