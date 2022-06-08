import request from '../utils/request'

export default{
  getMessages(pageNo, pageSize){
    return request({
      url: "messages",
      method: "GET",
      params: {
        pageNo,
        pageSize
      }
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