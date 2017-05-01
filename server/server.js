const path = require('path');//we have no need to install path we can directly use it to define paths in node js//
const express = require('express');
const http = require('http');//required when we use socket.io & its builtin no need to install//
const socketIO = require('socket.io');//in terminal->npm  socket.io(Used for client server interaction ) //
const port = process.env.PORT||3000;//used for deploying in heroku//
const publicpath=path.join(__dirname,'../public');//path.join () includes the file from other folders//
var app = express();
var server = http.createServer(app);//required when using socketio , functions similar to app.listen()//
var io = socketIO(server);//creating web socket for emiting and listening to events//
app.use(express.static(publicpath));
io.on('connection',(socket)=>{//enables events and provide socket connection to individual users & socket arguement returns value of socket variale in index.html file//
console.log('new user connected');
socket.on('createEmail',(newmail)=>{//here custom event listener is created//
    console.log('Create email',newmail);
})
socket.on('createMessage',(newmessage)=>{
    console.log('Create message',newmessage);
})
socket.emit('newMessage',{
  from:'Alex',
  text:'Hi meet u tomorrow',
  createdAt:2530  
});
socket.emit('newEmail',{//here an object is emitted with the event
from:'manu@mail.com',
text:'hello',
createat:123
});//emiting the custom event newEmail//
socket.on('disconect',()=>{
    console.log('user was disconnected');
})
})
server.listen(port,()=>{
    console.log(`Server running at ${port}`);//value of port is transferred to `${port}`///
});//since we have passed http.createServer metho in server variable & used when using socket.io//