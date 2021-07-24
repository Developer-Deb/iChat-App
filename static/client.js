
var socket = io('http://127.0.0.1:3000');

const form =  document.getElementById('send-container');
const messageinput  = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('../static/tone.mp3');
const append = (message,position) =>{
    const messegeElement = document.createElement('div');
    messegeElement.innerText = message;
    messegeElement.classList.add('message');
    messegeElement.classList.add(position);
    messageContainer.append(messegeElement);
    if(position=='left')
    {
        audio.play();
    }
    

}

const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined', name1);

//sending the message
form.addEventListener('submit',(e)=>{
    e.preventDefault()//page wont reload
    const message = messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageinp.value = '';
})

//joining user event
socket.on('user-joined', name1 =>{
    append(`${name1} joined the chat`, 'right');

});

//message receive for othe user event after sending
socket.on('receive', data =>{
    append(`${data.name1}:${data.message}`, 'left');

});

socket.on('left', name1 =>{
    append(`${name1} left the chat`, 'left');

});

