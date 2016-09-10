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

        client.once("connect", function() {
            client.once("echo", function(msg) {
                msg.should.equal("Hello World");
                client.disconnect();
                done();
            });
        });

        client.emit("echo", "Hello World");
    });
});