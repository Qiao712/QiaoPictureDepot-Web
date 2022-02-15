import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 

var app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
