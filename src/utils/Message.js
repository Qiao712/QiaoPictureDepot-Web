import { ElMessage } from 'element-plus'

export function showSuccessMessage(){
  ElMessage({
    showClose: true,
    type: "success",
    message: "操作成功",
    duration: 1000
  })
}

export function showFailureMessage(){
  ElMessage({
    showClose: true,
    type: "failure",
    message: "操作失败",
    duration: 1000
  })
}