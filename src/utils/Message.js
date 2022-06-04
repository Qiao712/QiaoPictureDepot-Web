import { ElMessage } from 'element-plus'

export function showSuccessMessage(message){
  ElMessage({
    showClose: true,
    type: "success",
    message: message == undefined ? "操作成功" : message,
    duration: 1000
  })
}

export function showFailureMessage(message){
  ElMessage({
    showClose: true,
    type: "failure",
    message: message == undefined ? "操作失败" : message,
    duration: 1000
  })
}
