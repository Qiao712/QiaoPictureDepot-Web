import request from '../utils/request'

export default{
  getPicture(pictureGroupId, prictureId){
    return request({
      url: ["/picture-groups", pictureGroupId, "pictures", prictureId].join("/"),
      method: "GET"
    })
  },

  getPicturesInfoByGroup(pictureGroupId){
    return request({
      url: ["/picture-groups", pictureGroupId, "pictures"].join("/"),
      method: "GET"
    })
  },

  getPictureGroups(pictureGroupQuery){
    return request({
      url: "/picture-groups",
      method: "GET",
      params: pictureGroupQuery
    })
  },

  getPictureGroup(pictureGroupId){
    return request({
      url: ["/picture-groups", pictureGroupId].join("/"),
      method: "GET"
    })
  },

  deletePictureGroup(pictureGroupId){
    return request({
      url: ["/picture-groups", pictureGroupId].join("/"),
      method: "DELETE"
    })
  },

  addPictureGroup(formData){
    return request({
      url: "/picture-groups",
      method: "POST",
      data: formData
    })
  },

  updatePictureGroup(formData){
    return request({
      url: "/picture-groups",
      method: "PUT",
      data: formData
    })
  }
}