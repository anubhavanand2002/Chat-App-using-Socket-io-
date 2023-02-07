const socket=io();

const $messageForm=document.querySelector('#message-form');
const $messageFormInput=$messageForm.querySelector('input');
const $messageFormButton=$messageForm.querySelector('button');
const $messages=document.querySelector('#messages')

//choosing the 
const messageTemplate=document.querySelector('#message-template').innerHTML





socket.on('welcome',(message)=>{
    console.log(message);
    const html=Mustache.render(messageTemplate,{
        message
    });
    $messages.insertAdjacentHTML("beforeend",html);

})



$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // $messageFormButton.setAttribute('disabled','disabled');
    const msg=document.querySelector('input').value;
    // const msg=e.target.elements.message.value;
    socket.emit('messages',msg,(m)=>{
        if(m)
        {
            console.log(m);
        }
        else{
            console.log("The message has sent successfully");
        }
    });
})

document.querySelector('#send_location').addEventListener('click',()=>{
   if(!navigator.geolocation)
   {
    return alert("sorry geolocation is not supported by your browser");
   }
   navigator.geolocation.getCurrentPosition((position)=>{
    //   console.log(position);
    socket.emit('send-location',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    });
   })
})

socket.on('countUpdated',(count)=>{
    console.log("The count has been updated",count);
})

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('Clicked');
//     socket.emit('increment');
// })