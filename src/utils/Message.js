import { ElMessage } from 'element-plus'

export default{
    message(isSuccessful){
        ElMessage({
            showClose: true,
            message: isSuccessful ? '操作成功' : '操作失败',
            type: isSuccessful ? 'success' : 'error',
            duration: 1000
        })
    }
}