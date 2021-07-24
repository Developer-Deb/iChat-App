//in order to use this app you have to run this app.js file using node or nodemon command
//And to access the ui your pc must have visual studio live server plugin
//then you have to run the html file with go life plugin seperately

var express = require('express');
var app = express();
var http = require('http').createServer(app);


const io = require("socket.io")(http,{
    cors: {
        origin: "*"
    }
});

const users = {};

//creating a socket conection


http.listen(3000, ()=>{
    io.on('connection', socket => {
        socket.on('new-user-joined',name1 =>{
            //console.log(name1);
            users[socket.id] = name1;
            socket.broadcast.emit('user-joined', name1);
        });
    
        socket.on('send',message =>{
            socket.broadcast.emit('receive',{name1: users[socket.id],message: message })
        });

        socket.on('disconnect', () =>{
            socket.broadcast.emit('left',users[socket.id])
            delete users[socket.id];
        });
        
        
    });
});

