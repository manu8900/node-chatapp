var socket=io();//starts web socket connection to server//

    socket.on('connect',function(){//listens to the event//
     console.log('connected to server');

//    socket.emit('createEmail',{//Custom event emitter created//
//    to:'mgeorge@mail.com',
//    subject:'open message',
//    text:'hello Amigo'
// })
    //   socket.emit('createMessage',{
    //       from:'manu',
    //       text:'checking acknowledgment'
    //   },function(data){//a function is created for acknowledgment from server//
    //       console.log('Got it',data)
    //   })

jQuery('#message-form').on('submit',function(e){
    var messagetextbox = jQuery('[name=message]');
 e.preventDefault();//here e is event & preventDefault function prevents the message getting appended to url//
socket.emit('createMessage',{
    from:'User',
    text:messagetextbox.val()//takes the text value from textbox//
},function(){
messagetextbox.val('')//this will clear the text to empty//
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
    var formattedtime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();//html() returns the html element fom the index.hml file of the provided id in jquery//
    var html= Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedtime
    });//Mustache.render() renders the html element//
    jQuery('#messages').append(html);
    // console.log('New message',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message. from} ${formattedtime}: ${message.text}`);

    // jQuery('#messages').append(li);
})
socket.on('newlocationMessage',function(message){
    var locationtime = moment(message.createdAt).format('h:mm a');
    var template=jQuery('#location-message-template').html();
    var html=Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:locationtime
    })
    // var li=jQuery('<li></li>');
    // var a =jQuery('<a target="_blank">My current location</a>')//target=_blank so that link open in new tab of browser//
    // li.text(`${message.from} ${locationtime}:`)
    // a.attr('href',message.url);
    // li.append(a);
    jQuery('#messages').append(html);//if used commented code it would append(li)//
})
var locationbutton = jQuery('#sendlocation');
locationbutton.on('click',function(){
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser');
    }
    locationbutton.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationbutton.removeAttr('disabled').text('Sending Locaion');
    socket.emit('createlocationmessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    })
},function(){
    locationbutton.removeAttr('disabled').text('Sending Location');
alert('Unable to fetch location')
    
});
})