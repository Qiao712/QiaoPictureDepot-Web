import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/user/Login.vue'
import Register from '../components/user/Register.vue'
import UserSpace from '../components/user/UserSpace.vue'
import EditPictureGroup from '../components/picture-group/EditPictureGroup.vue'
import CreatePictureGroup from '../components/picture-group/CreatePictureGroup.vue'
import Albums from '../components/album/Albums.vue'
import Album from '../components/album/Album.vue'
import EditAlbum from '../components/album/EditAlbum.vue'
import CreateAlbum from '../components/album/CreateAlbum.vue'
import PictureGroup from '../components/picture-group/PictureGroup.vue'
import FriendList from '../components/user/FriendList.vue'


let routes = [
    { path: '/', redirect: '/albums'},

    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/user', component: UserSpace},
    
    { name: 'albums', path: '/albums', component: Albums},
    { name: 'album', path: '/albums/:albumId', component: Album},
    { name: 'createAlbum', path: '/albums/create', component: CreateAlbum},
    { name: 'editAlbum', path: '/albums/:albumId/edit', component: EditAlbum},

    { name: 'editPictureGroup', path: '/picture-groups/:pictureGroupId/edit', component: EditPictureGroup},
    { name: 'createPictureGroup', path: '/album/:albumId/create', component: CreatePictureGroup},
    { name: 'pictureGroup', path: '/picture-groups/:pictureGroupId', component: PictureGroup},

    { name: 'friends', path: '/friends', component: FriendList},
];

let router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;