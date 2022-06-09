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
    <div class="right">
      <div style="height: 32px; width: 64px" @click="showMessageList()">
        <bell style="height: 100%; width: 50%"></bell>
      </div>

      <user-info :user="store.currentUser"  @click="$router.push({name: 'userspace'})"></user-info>
    </div>
  </div>

  <message-list ref="messageList"></message-list>
</template>

<script>
import MessageList from "./message/MessageList.vue"
import UserInfo from "./user/UserInfo.vue"
import userApi from "@/api/UserApi"
import store from "@/store.js"
import {Bell} from '@element-plus/icons-vue'

export default {
  name: "HeadBar",
  components:{
    MessageList, 
    UserInfo,
    Bell
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

    showMessageList(){
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