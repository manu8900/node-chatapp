const path = require('path');//we have no need to install path we can directly use it to define paths in node js//
const express = require('express');
const http = require('http');//required when we use socket.io & its builtin no need to install//
const socketIO = require('socket.io');//in terminal->npm i socket.io(Used for client server interaction ) //
const port = process.env.PORT||3000;//used for deploying in heroku//
const publicpath=path.join(__dirname,'../public');//path.join () includes the file from other folders//
const {generatemessage,generatelocationmessage}=require('./utils/message');//using custom utility generatemessage// 
var app = express();
var server = http.createServer(app);//required when using socketio , functions similar to app.listen()//
var io = socketIO(server);//creating web socket for emiting and listening to events//
app.use(express.static(publicpath));
io.on('connection',(socket)=>{//enables events and provide socket connection to individual users & socket arguement returns value of socket variale in index.html file//
console.log('new user connected');
// socket.on('createEmail',(newmail)=>{//here custom event listener is created//
//     console.log('Create email',newmail);
// })
socket.emit('newMessage',generatemessage('admin','Welcome To Chat App!'));

socket.broadcast.emit('newMessage',generatemessage('admin','New User Joined!'));

socket.on('createMessage',(newmessage,callback)=>{
    console.log('Create message',newmessage);
    io.emit('newMessage',generatemessage(newmessage.from,newmessage.text));//to emit event to every user//
    // socket.broadcast.emit('newMessage',{//using this method the user who created msg will not get it but everybody else connected does//
    //     from:newmessage.from,
    //     text:newmessage.text,
    //     createdAt:new Date().getTime()
    // })
    
callback();
})
socket.on('createlocationmessage',(coords)=>{
    io.emit('newlocationMessage',generatelocationmessage('Admin',coords.latitude,coords.longitude))
})
// socket.emit('newEmail',{//here an object is emitted with the event
// from:'manu@mail.com',
// text:'hello',
// createat:123
// });//emiting the custom event newEmail//
// socket.on('disconect',()=>{
//     console.log('user was disconnected');
// })
})
server.listen(port,()=>{
    console.log(`Server running at ${port}`);//value of port is transferred to `${port}`///
});//since we have passed http.createServer metho in server variable & used when using socket.io//