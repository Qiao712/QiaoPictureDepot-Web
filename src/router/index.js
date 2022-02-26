import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import UserSpace from '../components/UserSpace.vue'
import ModifyPictureGroup from '../components/ModifyPictureGroup.vue'
import CreatePictureGroup from '../components/CreatePictureGroup.vue'
import Albums from '../components/Albums.vue'
import PictureGroups from '../components/PictureGroups.vue'
import PictureViewer1 from '../components/PictureViewers/PictureViewer1.vue'


let routes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/user', component: UserSpace},
    
    { name: 'modify', path: '/modify/:pictureGroupId', component: ModifyPictureGroup},
    { name: 'create', path: '/add-picture-group/:albumId', component: CreatePictureGroup},
    { name: 'albums', path: '/albums/:pageNo', component: Albums},
    { name: 'album', path: '/album/:albumId/:pageNo', component: PictureGroups},
    { name: 'pictures', path: '/pictures/:pictureGroupId', component: PictureViewer1}
];

let router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;