const userNameNode=document.getElementById("username");
const submitUserNameNode=document.getElementById("submitusername");
const userNickNameNode=document.getElementById("nick");
const page=document.getElementById("frm");
const ele=document.getElementById("chatOption");
ele.style.display='none';
const chatButton=document.getElementById("sbm");
const privateChat=document.getElementById("privateChat");
const chatRoom=document.getElementById("chatRoom");
const findPrivateFriend=document.getElementById("frndNickName");
const chatRoomNumber=document.getElementById("chatRoomNumber");
const findFriend=document.getElementById("findFriend");
const findRoom=document.getElementById("findRoom");
privateChat.style.display="none";
chatRoom.style.display="none";

// hiding chatbox
const chatOption=document.getElementById("chat");
// const chatButton=document.getElementById("")
let chatB=document.getElementById("ch")
chatB.style.display="none";

let chatC=document.getElementById("ch2");
chatC.style.display="none";
var socket = io();
submitUserNameNode.addEventListener("click",function() {
    const username=userNameNode.value;
    const nickname=userNickNameNode.value;
    console.log(username);

    socket.emit("connect user",username,nickname);
});

// const frnd=document.getElementById("search");
// const search=document.getElementById("sr");
findFriend.addEventListener("click",function() {
  const frndName=findPrivateFriend.value;
  socket.emit("search",frndName);
});

findRoom.addEventListener("click",function() {
  const roomName=chatRoomNumber.value;
  socket.emit("joinRoom",roomName);
});

// let chatButton=document.getElementById("")

chatButton.addEventListener("click",function() {
  let chat=chatOption.value;
  if(chat=="Private"){
    privateChat.style.display="block";
  }else{
    chatRoom.style.display="block";
  }
});


socket.on("roomJoined",function(room){
  const ele=document.getElementById("chatR");
  ele.innerText=room;
  chatC.style.display='block';
});








 
  socket.on('chat from server', function(msg) {
    console.log("bhai ne msg kiya");
  });
  socket.on('connect',function(){
    console.log("bhai aa gya");
  });
  socket.on('disconnect',function(){
    console.log("bhai chala gya");
  });


  socket.on("user updated",function(userData,userName){
    console.log(userData);
    ele.style.display='block';
  
    const currUser=document.getElementById("currUser");
   
    currUser.innerText=userName;


  });
  



  socket.on('user_connected', function(message) {
    console.log(message);
    // Display the user connected message to the users
  });
  
  socket.on('user_disconnected', function(message) {
    console.log(message);
    // Display the user disconnected message to the users
  });


  socket.on("after search",function(check,friend){
    if(!check){
      let srlabel=document.getElementById("foundFriend");
      srlabel.innerText=" Your Friend is not Available";
    }else{
      const receiver=document.getElementById("reciever");
      receiver.innerText=friend;
      
      chatB.style.display='block';

    }
  });








  // chat Section
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  let messages = document.getElementById('messages');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const sender=document.getElementById('currUser').innerText;
    const reciever=document.getElementById('reciever').innerText;

    const currentDate = new Date();

    // Get the current year, month, day, hour, minute, and second
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: months are zero-based, so add 1 to get the correct month.
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    
    // Formatting the date and time as a string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    if (input.value) {
      var item = document.createElement('li');
      item.textContent = input.value+"("+formattedDateTime+")";
      messages.appendChild(item);
      item.style.textAlign="right";
      window.scrollTo(0, document.body.scrollHeight);
      socket.emit('chat message', input.value,sender,reciever,formattedDateTime);
      input.value = '';
    }

  });



  socket.on('private message', function(sender,msg,time) {
    var item = document.createElement('li');
    item.textContent = sender+":"+msg+"("+time+")";
    messages.appendChild(item);
    item.style.textAlign="left";
    window.scrollTo(0, document.body.scrollHeight);
  });




  //Chat Room Management
let message2 = document.getElementById("messages2");
  var cform = document.getElementById('Rform');
  var cinput = document.getElementById('Rinput');
  
  cform.addEventListener('submit', function(e) {
    e.preventDefault();
    const sender=document.getElementById('currUser').innerText;
    const reciever=document.getElementById('chatR').innerText;

    const currentDate = new Date();

    // Get the current year, month, day, hour, minute, and second
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: months are zero-based, so add 1 to get the correct month.
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    
    // Formatting the date and time as a string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    if (cinput.value) {
      var item = document.createElement('li');
      item.textContent = cinput.value+"("+formattedDateTime+")";
      messages2.appendChild(item);
      item.style.textAlign="right";
      window.scrollTo(0, document.body.scrollHeight);
      socket.emit('room messageSent', cinput.value,sender,reciever,formattedDateTime);
      cinput.value = '';
    }

  });



  socket.on('room message', function(sender,msg,time) {
    var item2 = document.createElement('li');
    item2.textContent = sender+":"+msg+"("+time+")";
    messages2.appendChild(item2);
    item.style.textAlign="left";
    window.scrollTo(0, document.body.scrollHeight);
  });