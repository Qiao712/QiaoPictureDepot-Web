/**
 * 封装请求方法
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'

//axios实例
const service = axios.create({
  baseURL : "http://localhost:8080/api"
})

//设置request拦截器
// service.interceptors.request.use(

// )

//设置response拦截器
let handleErrorResponse = error => {
  //优先使用错误返回对象中的status
  let status = error.response.data.status
  let message = error.response.data.message
  switch(status){
    case 401:{
      ElMessage({
        message: "未登录. 正跳转至登录界面...",
        type: 'error',
        duration: 2000,
        onClose: () => { router.push('/login') } //跳转到登录界面 
      })
      break
    }

    case 403:{
      ElMessage({
        message: "访问被禁止.",
        type: 'error',
        duration: 2000,
        onClose: () => { router.back() } //向后跳转
      })
      break
    }

    default:{
      ElMessage({
        message: message,
        type: 'error',
        duration: 2000
      })
      break
    }
  }
  return Promise.reject(error)
}

service.interceptors.response.use(null, handleErrorResponse)

export default service