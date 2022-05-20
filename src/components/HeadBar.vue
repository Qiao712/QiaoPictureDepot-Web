<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <p style="margin-left: 10px">QiaoPictureDepot</p>
    <el-menu-item index="albums">相册</el-menu-item>
    <el-menu-item index="friends">好友</el-menu-item>
    <el-menu-item index="message" @click="showMessage">消息</el-menu-item>
    <el-menu-item index="user">用户名</el-menu-item>
  </el-menu>

  <message-list ref="messageList"></message-list>
</template>

<script>
import MessageList from './MessageList.vue'

export default {
  name: "HeadBar",
  components:{
    MessageList
  },
  data(){
    return {
      activeIndex: 1
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
    }
  }
}
</script>

<style>
.right-side{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
}
</style>