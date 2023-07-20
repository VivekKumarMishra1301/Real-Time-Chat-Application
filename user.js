const userNames={};
function setUserNames(socket,userName,nickName){
    userNames[userName] = {
        data:{userName:userName,nickName:nickName},
        connection:socket,
    };
    return userNames[userName];
}
function getUser(userName){
    return userNames[userName];
}
module.exports={
    setUserNames:setUserNames,
    getUser:getUser,
}
module.exports.updateUser=function updateUser(userName,userData){
    const user=userNames[userName];
    console.log(userData);
    user.data.nickName=userData;
}

module.exports.search=function search(friend){
    for(let key in userNames){
        if(userNames[key].data.nickName==friend){
            return true;
        }
    }
    return false;
}