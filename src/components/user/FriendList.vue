<template>
  <el-card class="box-card">
    <div v-for="friendGroup in friendGroups" :key="friendGroup.id" class="text item">
      <h4>{{friendGroup.name}}</h4>
      <div v-for="friend, index in friendGroup.friendships" :key="index">
        <div>
          <p> > {{friend.friendUsername}} </p>
          <!-- 私信按钮 -->
          <el-button size="small" @click="showFriendInfoDialog(friend, friendGroup.name)" circle>
            <message style="width: 100%"/>
          </el-button>
          <!-- 编辑好友按钮 -->
          <el-button size="small" @click="showFriendInfoDialog(friend, friendGroup.name)" circle>
            <edit style="width: 100%"/>
          </el-button>
        </div>
      </div>
    </div>

    <el-button style="margin-top: 10px" @click="applyFriendDialog = true">添加好友</el-button>

  <!-- 添加好友对话框 -->
    <el-dialog v-model="applyFriendDialog" title="添加好友">
      <p>用户名:</p>
      <el-input v-model="newFriendApplication.friendUsername"/>
      <p>加入分组:</p>
      <el-input v-model="newFriendApplication.friendGroupName"/>
      <p>验证消息:</p>
      <el-input v-model="newFriendApplication.applicationMessage"/>
      <p/>
      <el-button @click="applyFriend">发送申请</el-button>
    </el-dialog>

  <!-- 好友信息名片对话框 -->
  <el-dialog v-model="friendInfoDialog" title="好友信息">
    <p>用户名: {{selectedFriend.friendUsername}}</p>
    <!-- 好友分组 -->
    <p>分组: </p>
    <el-select
      v-model="selectedFriendGroupName"
      filterable
      allow-create
      default-first-option
    >
      <el-option
        v-for="friendGroup in friendGroups"
        :key="friendGroup.id"
        :label="friendGroup.name"
        :value="friendGroup.name"
      />
    </el-select>
    <p/>
    <el-button @click="deleteFriend()">删除好友</el-button>
    <el-button @click="updateFriend()">确认修改</el-button>
  </el-dialog>
  </el-card>
</template>

<script>
import friendApi from '../../api/FriendApi'
import {Edit, Message} from '@element-plus/icons-vue'

export default {
  name: "FriendList",
  components:{
    Edit, Message
  },
  data(){
    return {
      friendGroups: null,

      //添加好友对话框
      applyFriendDialog: false,
      newFriendApplication: {
        friendUsername: "",
        friendGroupName: "",
        applicationMessage: ""
      },

      //好友信息名片对话框
      friendInfoDialog: false,
      selectedFriend: null,
      selectedFriendGroupName: null
    }
  },

  created(){
    this.fetchFriendList()
  },

  methods:{
    fetchFriendList(){
      friendApi.getFriendList().then(response => {
        this.friendGroups = response.data
        console.log(this.friendGroups)
      })
    },

    applyFriend(){
      friendApi.applyNewFriend(this.newFriendApplication).then(()=>{
        this.applyFriendDialog = false
      })
    },

    showFriendInfoDialog(friend, friendGroupName){
      this.selectedFriend = friend
      this.selectedFriendGroupName = friendGroupName
      this.friendInfoDialog = true
    },

    deleteFriend(){
      if(this.selectedFriend != null && this.selectedFriend.friendUserId != null)
        friendApi.deleteFriend(this.selectedFriend.friendUserId)
    },

    updateFriend(){
      if(this.selectedFriend != null && this.selectedFriend.id != null){
        friendApi.updateFriend(this.selectedFriend.friendUserId, this.selectedFriendGroupName)
      }
    },
  }
}
</script>

<style>

</style>