// let app = require('express')();
// let http = require('http').Server(app);
// let io = require('socket.io')(http);
var app = require('express')();
var server = app.listen(3000);

// app.get('/', (req, res) => {
//     res.send('<h1>hi<h1>');
// });


// http.listen(3000, () => {
//     console.log('Connect');
// })
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log('There is connection');

    socket.on('disconnect', () => {
        console.log('There is disconnection');
    })

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data))
    })
})