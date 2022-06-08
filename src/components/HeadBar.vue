<template>
  <div class="head-bar">
    <!--菜单-->
    <div class="left">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <p style="margin-left: 10px">PictureDepot</p>
        <el-menu-item index="albums">相册</el-menu-item>
        <el-menu-item index="friends">好友</el-menu-item>
      </el-menu>
    </div>

    <!--右边栏 用户信息头像-->
    <div class="right" @click="$router.push({name: 'userspace'})">
      <div class="user-info" v-if="store.currentUser != null">
        <img v-if="store.currentUser != null" :src="getAvatarUri(store.currentUser.id)" class="user-avatar">
        <span style="margin: 5px">{{store.currentUser.username}}</span>

        <!--角色信息-->
        <span v-if="store.currentUser.rolename == 'ROLE_ADMIN'" style="margin: 5px; color: blue; front-size: 15px">管理员</span>
        <span v-if="store.currentUser.rolename == 'ROLE_NORMAL'" style="margin: 5px; color: grey; front-size: 15px">普通用户</span>
        <span v-if="store.currentUser.rolename == 'ROLE_VIP'" style="margin: 5px; color: pink; front-size: 15px">VIP</span>
        <span v-if="store.currentUser.rolename == 'ROLE_SVIP'" style="margin: 5px; color: red; front-size: 15px">SVIP</span>
      </div>
    </div>
  </div>

  <message-list ref="messageList"></message-list>
</template>

<script>
import MessageList from "./message/MessageList.vue"
import userApi from "@/api/UserApi"
import store from "@/store.js"

export default {
  name: "HeadBar",
  components:{
    MessageList, 
  },
  data(){
    return {
      activeIndex: 1,

      //全局状态
      store: store.state
    }
  },
  methods:{
    handleSelect(key){
      switch (key) {
        case "albums":
          this.$router.push({name: "albums", query: {pageNo: 1}})
          break	

        case "friends":
          this.$router.push({name: "friends"})
          break

        default:
          break
      }
    },

    showMessage(){
      this.$refs.messageList.showOrHide()
    },

    getAvatarUri(userId){
      return userApi.getAvatarUri(userId)
    }
  }
}
</script>

<style scoped>
.head-bar{
  display: grid;
  grid-template-columns: 80% 20%;
}

.user-avatar{
  height: 32px;
  width: 32px;
}

.right{
  /* 上下左右居中 */
  display:flex;
  justify-content:center;
  align-items:center;
}

.right-side{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
}

.user-info{
  display: flex;
  justify-content:center;

  font-size: 16px;
}
</style>