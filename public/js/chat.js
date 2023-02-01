const socket=io();


socket.on('welcome',(message)=>{
    console.log(message);
})



document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
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