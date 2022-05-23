import request from '../utils/request'

export default{
  getComments(pictureGroupId, pageNo, pageSize){
    return request({
      url: ["/picture-groups", pictureGroupId, "comments"].join('/'),
      method: "GET",
      params: {
        pageNo,
        pageSize
      }
    })
  },

  getSubComments(pictureGroupId, parentCommentId, pageNo, pageSize){
    return request({
      url: ["/picture-groups", pictureGroupId, "comments", parentCommentId, "sub-comments"].join('/'),
      method: "GET",
      params: {
        pageNo,
        pageSize
      }
    })
  },

  addComment(commentAdd){
    return request({
      url: "/picture-groups/comments",
      method: "POST",
      data: commentAdd
    })
  }
}