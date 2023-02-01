const express=require('express')
const app=express()
const path=require('path')
const http=require('http')
const socketIo=require('socket.io');
const Filter=require('bad-words')
//i m checking for second time pushing to github
const port=process.env.port||3000
const publicDirectoryPath=path.join(__dirname,'../public');
const server=http.createServer(app);
const io=socketIo(server);


app.use(express.static(publicDirectoryPath));

let count=0;


//server emits --->clients recieved ---->countUpdated
//client emits ----> server received ----> increament




io.on('connection',(socket)=>{

    console.log("New websocket connection has established");
    socket.emit('welcome',"Welcome new user");
    
    //broadcasting a message to all user if any new user joined the chat except that user itself
    socket.broadcast.emit('welcome',"A new user has joined the chat say hi to him!");

    socket.on('messages',(data,callback)=>{
        
        const filter=new Filter();
        if(filter.isProfane(data))
        {
            return callback("Sorry Server will not allow to forward it to other clients because Bad words are not allowed!Please don't use such words in this public chat!");
        }
        io.emit('welcome',data);
        callback();
    })
   
    socket.on('send-location',(coords)=>{
         io.emit('welcome',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    })
    //if any user will disconnected then we have to inform to all other users
    socket.on('disconnect',()=>{
        io.emit('welcome',"A user has disconnected from the chat");
    })


   
})

server.listen(port,()=>{
    console.log("Server is running at port number 3000");
})

// process for establishing a web socket connection
// 1.make a express server
// 2.make a http server
// 3.create a socket server which uses http
// 4.then io.on function i have to write
// 5.then in index.html i have to add two script files one which includes only io() and one which include information needed to connect frontend and backend
// then run

//important note
//io.on() function will run as many times as any client is connected to server









 // socket.emit('countUpdated',count);

    // socket.on('increment',()=>{
    //     count++;
    //     //socket.emit('countUpdated',count);
    //     io.emit('countUpdated',count);
    // })