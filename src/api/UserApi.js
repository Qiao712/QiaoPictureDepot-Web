import request from '../utils/request'

export default{
  login(loginForm){
    return request({
      url: "/login",
      method: "POST",
      data: loginForm
    })
  },

  register(username, password){
    return request({
      url: "/register",
      method: "POST",
      params:{
        username,
        password,
        invitationCode: "123456"
      }
    })
  },
}