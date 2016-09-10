/**
 * Created on 9/9/2016.
 */

/**
 * Setup IO server
 */

var chatServer = function(server) {
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('a user connected');

        // On disconnect
        socket.on('disconnect', function(){
            console.log('a user disconnected');
        });

        // On message send
        socket.on('chat message', function(msg) {
            io.emit('chat message', msg);
        });

        socket.on('echo', function(msg) {
            socket.emit('echo', msg);
        });
    });
};

module.exports = chatServer;