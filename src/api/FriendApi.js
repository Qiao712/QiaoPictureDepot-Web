import request from '../utils/request'

export default{
  getFriendList(){
    return request({
      url: "/friends",
      method: "GET"
    })
  },
  
  getFriendGroupNames(){
    return request({
      url: "/friend-groups",
      method: "GET"         
    })
  },
  
  acceptNewFriend(systemMessageId, friendGroupName){
    return request({
      url: "/friends/accept",
      method: "POST",
      data:{
        newFriendMessageId: systemMessageId,
        friendGroupName: friendGroupName
      }
    })
  },
  
  rejectNewFriend(systemMessageId){
    return request({
      url: ["/friends/reject", systemMessageId].join("/"),
      method: "POST",
    })
  },
  
  applyNewFriend(application){
    console.info(application)
    return request({
      url: "/friends/apply",
      method: "POST",
      data: application
    })
  },
  
  deleteFriend(friendUserId){
    return request({
      url: ["/friends", friendUserId].join("/"),
      method: "DELETE"
    })
  },
  
  updateFriend(friendUserId, friendGroupName){
    return request({
      url: "/friends/info",
      method: "PUT",
      data: {
        friendUserId,
        friendGroupName
      }
    })
  },
  
  updateFriendGroup(friendGroupId, name){
    return request({
      url: "/friend-groups",
      method: "PUT",
      data:{
        id: friendGroupId,
        name
      }
    })
  }
}