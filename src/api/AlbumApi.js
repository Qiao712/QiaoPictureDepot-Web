import request from '../utils/request'

export default{
  getAlbums(pageNo, pageSize, user){
    return request({
      url: "/albums",
      method: "GET",
      params: {
        pageNo,
        pageSize,
        user
      }
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
  }
}