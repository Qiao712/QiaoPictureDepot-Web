import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import UserSpace from '../components/UserSpace.vue'
import ModifyPictureGroup from '../components/ModifyPictureGroup.vue'
import CreatePictureGroup from '../components/CreatePictureGroup.vue'
import Albums from '../components/Albums.vue'
import Album from '../components/Album.vue'
import PictureGroup from '../components/PictureGroup.vue'


let routes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/user', component: UserSpace},
    
    { name: 'albums', path: '/albums', component: Albums},
    { name: 'album', path: '/albums/:albumId', component: Album},

    { name: 'modifyPictureGroup', path: '/modify/:pictureGroupId', component: ModifyPictureGroup},
    { name: 'createPictureGroup', path: '/album/:albumId/create', component: CreatePictureGroup},
    { name: 'pictureGroup', path: '/picture-groups/:pictureGroupId', component: PictureGroup}
];

let router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;