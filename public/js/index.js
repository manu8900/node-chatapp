var socket=io();//starts web socket connection to server//

    socket.on('connect',function(){//listens to the event//
     console.log('connected to server');

//    socket.emit('createEmail',{//Custom event emitter created//
//    to:'mgeorge@mail.com',
//    subject:'open message',
//    text:'hello Amigo'
// })
      socket.emit('createMessage',{
          from:'manu',
          text:'checking acknowledgment'
      },function(data){//a function is created for acknowledgment from server//
          console.log('Got it',data)
      })

jQuery('#message-form').on('submit',function(e){
 e.preventDefault();//here e is event & preventDefault function prevents the message getting appended to url//
socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()//takes the text value from textbox//
},function(){

})
})

    });
socket.on('disconnect',function(){
    console.log('disconected from server');
});
// socket.on('newEmail',function(email){
//     console.log('New Email',email);//Custom event created,listener event new email//0
// });
socket.on('newMessage',function(message){
    console.log('New message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
})