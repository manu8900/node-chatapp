var socket=io();//starts web socket connection to server//

    socket.on('connect',function(){//listens to the event//
     console.log('connected to server');

   socket.emit('createEmail',{//Custom event emitter created//
   to:'mgeorge@mail.com',
   subject:'open message',
   text:'hello Amigo'
})


    });
socket.on('disconnect',function(){
    console.log('disconected from server');
});
socket.on('newEmail',function(email){
    console.log('New Email',email);//Custom event created,listener event new email//0
});
socket.on('newMessage',function(message){
    console.log('New message',message);
})