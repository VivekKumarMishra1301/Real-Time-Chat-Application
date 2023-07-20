const userNameNode=document.getElementById("username");
const submitUserNameNode=document.getElementById("submitusername");
const userNickNameNode=document.getElementById("nick");

//hiding chatbox
let chatB=document.getElementById("ch")
chatB.style.display="none";

submitUserNameNode.addEventListener("click",function() {
    const username=userNameNode.value;
    console.log(username);
    socket.emit("connect user",username);
});

const frnd=document.getElementById("search");
const search=document.getElementById("sr");
sr.addEventListener("click",function() {
  const frndName=frnd.value;
  socket.emit("search",frndName);
});


// let chatButton=document.getElementById("")


var socket = io();
 
  socket.on('chat from server', function(msg) {
    console.log("bhai ne msg kiya");
  });
  socket.on('connect',function(){
    console.log("bhai aa gya");
  });
  socket.on('disconnect',function(){
    console.log("bhai chala gya");
  });
  socket.on("user updated",function(userData){
    console.log(userData);
    if(!userData.nickName){
      const nickName = prompt("enter your nickname");
      if(nickName){
        socket.emit("update user",userData.userName,nickName);
        userNickNameLabel.innerText=nickName;
      }
    }else{
      userNickNameLabel.innerText=userData.nickName;
    }
  });
  



  socket.on('user_connected', function(message) {
    console.log(message);
    // Display the user connected message to the users
  });
  
  socket.on('user_disconnected', function(message) {
    console.log(message);
    // Display the user disconnected message to the users
  });


  socket.on("after search",function(check){
    if(!check){
      let srlabel=document.getElementById("nahimila");
      srlabel.innerText=" Your Friend is not Available";
    }else{
      // let chat=document.getElementById("bate");
      // let nn=document.createElement("button");
      // nn.innerText="Baate shuru Kariye";
      // nn.setAttribute("id","startChat");
      // chat.append(nn);


      chatB.style.display='block';



    }
  });








  //chat Section
  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      var item = document.createElement('li');
      item.textContent = input.value;
      messages.appendChild(item);
      item.style.textAlign="right";
      window.scrollTo(0, document.body.scrollHeight);
      socket.emit('chat message', input.value);
      input.value = '';
    }




  });


  socket.on('chat from server', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    item.style.textAlign="left";
    window.scrollTo(0, document.body.scrollHeight);
  });