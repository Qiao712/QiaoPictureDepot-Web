<template>
  <div class="message">
      <p><span style="color:blue">{{message.messageBody.applicantUsername}}</span> 申请加为好友。验证消息: {{message.messageBody.applicationMessage}}</p>
      <el-button @click="newFriendDialogVisible = true">查看</el-button>
  </div>

  <el-dialog v-model="newFriendDialogVisible" title="好友申请" style="align-text: center">
    <p>新朋友: {{message.messageBody.applicantUsername}}</p>
    <p>验证消息: {{message.messageBody.applicationMessage}}</p>
    <el-button @click="acceptDialogVisible = true">同意</el-button>
    <el-button @click="rejust">拒绝</el-button>
  </el-dialog>

  <el-dialog v-model="acceptDialogVisible" title="同意好友申请" style="align-text: center">
      <p>好友分组:</p>
      <el-input v-model="friendGroupName"/>
      <p/>
      <el-button @click="accept">确定</el-button>
      <el-button @click="acceptDialogVisible=false">取消</el-button>
  </el-dialog>
</template>

<script>
import friendApi from "@/api/FriendApi"

export default {
  name: "NewFriendMessage",
  props: ['message'],
  data(){
    return {
      newFriendDialogVisible: false,
      acceptDialogVisible: false,
      friendGroupName: "",
      friendGroupNames: [],
    }
  },

  methods:{
    accept(){
      friendApi.acceptNewFriend(this.message.id, this.friendGroupName).then(
        this.acceptDialogVisible = false
      )
    },
    
    rejust(){
      friendApi.rejectNewFriend(this.message.id).then(
        this.newFriendDialogVisible = false
      )
    },
  }
}
</script>

<style>
.message{
  border: 1px;
  border-color: black;
  border-radius: 0;
}
</style>