const express=require('express');//gives the power to solve the problem of the routing and middleware
const app = express();
const fs=require('fs');
const http=require('http');
const { Server } = require("socket.io");

const userBase = require("./user.js");
const server=http.createServer(app);
const socketServer = new Server(server);




app.get("/script.js",function(req,res){
   res.sendFile(__dirname+"/script.js");
})



app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
});


app.get("/about",function(req,res){
   res.send("About");
});

app.get("/contact",function(req,res){
   res.send("contact");
});


server.listen(3000,()=>{
   console.log('server on at  port 3000');
});


socketServer.on('connection', function(socket) {
   console.log("a user connected");
   socket.broadcast.emit('user_connected', 'A new user has connected.');

  // Handle disconnect event
  socket.on('disconnect', function() {
   console.log(" a user disconnected")
    socket.broadcast.emit('user_disconnected', 'A user has disconnected.');
  });



   socket.on("connect user",function(userName){
      // console.log(userName);
      updateConnectedUser(socket,userName);
   });
   
   socket.on("update user",function(userName,nickName){
      console.log(userName,nickName);
      updateConnectedUserNickName(socket,userName,nickName);
   });

   socket.on("search",function(friend){
      findFriend(socket,friend);
   });


//Managing Chats

socket.on("chat message",function(msg){
   socket.broadcast.emit('chat from server', msg);
   console.log("message:"+msg);
   //receiving message fro the client
   // socketServer.emit("chat message",msg);
   // //broadcasting to all online client
   // socketServer.emit("chat from server",msg);
});









});

 function updateConnectedUser (socket,userName){
   console.log(userName);
   
    let userData=userBase.getUser(userName);

    if(!userData){
      
      userData=userBase.setUserNames(socket,userName);
    }

    socket.emit("user updated",userData.data);

 
}
function updateConnectedUserNickName(socket,userName,nickName){
   // console.log(nickName);
      userBase.updateUser(userName,nickName);
}

 

function findFriend(socket,friend){
   let val=userBase.search(friend);
   socket.emit("after search",val);
}




 //learn event driven programming