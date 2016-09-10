/**
 * Created on 9/9/2016.
 */

/**
 * Setup IO server
 */

var chatServer = function(server) {
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        var user = {'name': ""};
        console.log('a user connected');

        // On disconnect
        socket.on('disconnect', function(){
            console.log('a user disconnected');
        });

        // On message send
        socket.on('chat message', function(msg) {
            io.emit('chat message', {'content':msg, 'user':user});
        });

        // On simple echo test
        socket.on('echo', function(msg) {
            socket.emit('echo', msg);
        });

        // On name change
        socket.on('name change', function(newName){
            user.name = newName;
            socket.emit('name change', user.name);
        });
    });
};

module.exports = chatServer;