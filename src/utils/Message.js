import { ElMessage } from 'element-plus'

export function successMessage(message){
  ElMessage({
    showClose: true,
    type: "success",
    message: message,
    duration: 1000
  })
}