import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//axios
import axios from 'axios' 
//mitt
import mitt from 'mitt'

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');

//事件总线
app.config.globalProperties.$eventBus = new mitt()

//为axios添加拦截器-------------------------------------------
axios.interceptors.response.use(null, function (error) {
    //若未认证则跳转到登录界面
    if(error.response.status == 401) router.push("/login")
    return Promise.reject(error);
});