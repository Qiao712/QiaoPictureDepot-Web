import request from '../utils/request'

export default{
  getMessages(){
    return request({
      url: "messages",
      method: "GET"
    })
  },

  getUnacknowledgedMessageCount(){
    return request({
      url: "/messages/unacknowledged-message-count",
      method: "GET"
    })
  },

  acknowledgedMessage(){
    return request({
      url: "/messages/acknowledge",
      method: "POST"
    })
  }
}