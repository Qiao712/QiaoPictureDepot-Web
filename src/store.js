import userApi from "@/api/UserApi"
import {reactive} from "vue"

/**
 * 储存当前缓存信息
 */
const store = {
    state: reactive({
        //当前登录的用户的基本信息
        currentUser: null
    }),

    setCurrentUser(user){
        this.state.currentUser = user
    },

    clearCurrentUser(){
        this.state.currentUser = null
    },

    //App创建时 或 登录时拉取当前用户信息
    fetchCurrentUser(){
        userApi.getCurrentUser().then(
            response=>{
                console.log("获取当前用户", response.data)
                this.setCurrentUser(response.data)
            }
        )
    }
}
export default store