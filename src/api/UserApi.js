import request from '../utils/request'

export default{
  login(loginForm){
    return request({
      url: "/login",
      method: "POST",
      data: loginForm
    })
  },

  register(registerRequest){
    return request({
      url: "/users/register",
      method: "POST",
      data: registerRequest
    })
  },

  uploadAvatar(imgFile){
    return request({
      url: "/users/avatar",
      method: "POST",
      data: imgFile
    })
  },

  getAvatar(userId){
    return request({
      url: ["/users", userId, "avatar"].join('/'),
      method: "GET"
    })
  },

  getAvatarUri(userId){
    //暂时硬编码
    return ["http://localhost:8081/api/users", userId, "avatar"].join('/')
  },

  getUserBaseInfo(userId){
    return request({
      url: ["/users", userId].join('/'),
      mehtod: "GET"
    })
  },

  getCurrentUser(){
    return request({
      url: "/users/myself",
      method: "GET"
    })
  }
}