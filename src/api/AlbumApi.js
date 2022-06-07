import request from '../utils/request'

export default{
  getAlbums(albumQuery){
    return request({
      url: "/albums",
      method: "GET",
      params: albumQuery
    })
  },

  getAlbum(albumId){
    return request({
      url: ["/albums", albumId].join("/"),
      method: "GET"
    })
  },

  addAlbum(album){
    return request({
      url: "/albums",
      method: "POST",
      data: album
    })
  },

  updateAlbum(album){
    return request({
      url: "/albums",
      method: "PUT",
      data: album
    })
  },

  deleteAlbum(albumId){
    return request({
      url: ["/albums", albumId].join("/"),
      method: "DELETE"
    })
  },

  getGrantedFriendGroups(albumId){
    return request({
      url: ["/albums", albumId, "granted-friend-groups"].join("/"),
      method: "GET"
    })
  }
}