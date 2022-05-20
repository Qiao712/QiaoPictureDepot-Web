import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//mitt
import mitt from 'mitt'
    
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');

//事件总线
app.config.globalProperties.$eventBus = new mitt()