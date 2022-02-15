import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import UserSpace from '../components/UserSpace.vue'
import HelloWorld from '../components/HelloWorld.vue'
import CreatePictureGroups from '../components/CreatePictureGroups.vue'
import Albums from '../components/Albums.vue'
import Test from '../components/Test.vue'
import PictureGroups from '../components/PictureGroups.vue'
import PictureViewer1 from '../components/PictureViewers/PictureViewer1.vue'

let routes = [
    { path: '/test', component: Test},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/user', component: UserSpace},
    { path: '/hello', component: HelloWorld},
    { path: '/upload', component: CreatePictureGroups},

    { name: 'albums', path: '/albums/:pageNo', component: Albums},
    { name: 'album', path: '/album/:albumId/:pageNo', component: PictureGroups},
    { name: 'pictures', path: '/pictures/:pictureGroupId', component: PictureViewer1}
];

let router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;