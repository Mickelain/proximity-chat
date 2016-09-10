/**
 * Created on 9/9/2016.
 */
var io = require('../chat-server')(5000);
var should = require('should');
var ioc = require('socket.io-client');

var socketURL = 'http://localhost:5000';

var options ={
    transports: ['websocket'],
    'force new connection': true
};

var chatUser1 = {'name':'Calvin'};
var chatUser2 = {'name':'Olivia'};

describe('Chat server', function(){
    it("Should echo a message", function(done){
        var client = ioc.connect(socketURL, options);

        client.on("connect", function() {
            client.on("echo", function(echo) {
                echo.should.equal("Hello World");
                client.disconnect();
                done();
            });
        });

        client.emit("echo", "Hello World");
    });

    it("Should send message to other users", function(done){
        var client = ioc.connect(socketURL, options);

        client.on("connect", function() {
            var client2 = ioc.connect(socketURL, options);
            client2.on("connect", function() {
                client2.on('chat message', function(msg){
                    msg.content.should.equal('content');
                    client2.disconnect();
                    done()
                });
                client.emit('chat message', 'content');
                client.disconnect();
            });
        });

    });

    it("Should allow users to have names", function(done){
        var client = ioc.connect(socketURL, options);

        client.on("connect", function() {
            client.on("name change", function(confirmation) {
                confirmation.should.equal("Calvin");

                client.disconnect();
                done();
            })
        });

        client.emit("name change", "Calvin");
    });

    it("Should attach names to messages", function(done){
        var client = ioc.connect(socketURL, options);

        client.on("connect", function() {
            client.on("name change", function(confirmation) {
                confirmation.should.equal("Calvin");

                var client2 = ioc.connect(socketURL, options);
                client2.on('connect', function(){
                    client2.on('chat message', function(msg){
                        msg.user.name.should.equal("Calvin");
                        client2.disconnect();
                        done();
                    });
                    client.emit("chat message", "");
                    client.disconnect();
                });

            });
            client.emit("name change", "Calvin");
        });

    });
});