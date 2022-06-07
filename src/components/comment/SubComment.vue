<template>
  <div class="sub-comment-view">
    <!--头像-->
    <div style="text-align: center">
      <el-image class="avatar" :fit="fill" shape="square" :src="getAvatarUri(comment.authorId)"/>
    </div>

    <!--回复-->
    <div>
      <!--回复内容-->
      <div class="comment-content">
        <span class="small-text">
          {{comment.authorUser.username}}
          <span v-if="comment.repliedId != comment.parentId">回复 <span style="color: pink">{{comment.repliedUser.username}}</span></span>
          :{{comment.content}}
        </span>
      </div>

      <!--时间\按钮条-->
      <div class="bottom-bar">
        <span class="small-text">{{comment.updateTime}}</span>
        <span class="small-text" style="color: blue">举报</span>
        <span class="small-text" style="color: blue" @click="replyDialogVisible = true">
          回复
        </span>
        <span 
          class="small-text" style="color: blue" 
          @click="deleteComment(comment.id)"
          v-if="currentUser.id == comment.authorId"
        >
          删除
        </span>
        <span v-if="!liked" class="small-text" style="color: blue" @click="like()">点赞: {{likeCount}}</span>
        <span v-if="liked" class="small-text" style="color: pink" @click="undoLike()">已赞: {{likeCount}}</span>
      </div>

      <!--回复弹窗-->
      <el-dialog v-model="replyDialogVisible" :title="'回复' + comment.authorUser.username">
        <el-input v-model="replyContent"></el-input>
        <el-button style="margin-top: 1rem" @click="reply">发送</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import commentApi from "@/api/CommentApi"
import store from "@/store"
import userApi from "@/api/UserApi"

export default {
  name: "SubComment",
  props: ["comment"],
  data(){
    return {
      //回复
      replyDialogVisible: false,
      replyContent: "",

      //否点赞、点赞数状态
      liked: false,
      likeCount: 0,

      currentUser: store.state.currentUser
    }
  },

  created(){
    this.liked = this.comment.liked
    this.likeCount = this.comment.likeCount
  },

  methods:{
    //回复一个一级评论
    reply(){
      let commentAdd = {
        content: this.replyContent,
        pictureGroupId: this.comment.pictureGroupId,
        replyTo: this.comment.id
      }

      commentApi.addComment(commentAdd).then(
        ()=>{
          this.replyDialogVisible = false
          //通知父组件重新拉取数据
          this.$parent.fetchData()
        }
      )
    },

    deleteComment(commentId){
      commentApi.deleteComment(commentId).then(
        this.$parent.fetchData()
      )
    },

    getAvatarUri(userId){
      return userApi.getAvatarUri(userId)
    },

    like(){
      commentApi.likeComment(this.comment.pictureGroupId, this.comment.id).then(
        ()=>{
          this.liked = true
          this.likeCount++
        }
      )
    },

    undoLike(){
      commentApi.undoLikeComment(this.comment.pictureGroupId, this.comment.id).then(
        ()=>{
          this.liked = false
          this.likeCount--
        }
      )
    }
  }
}
</script>

<style scoped>
.sub-comment-view{
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 100%;
}

.small-text{
  font-size: 13px;
  margin: 1px;
}

.comment-content{
  color: var(--el-text-color-regular);
  font-size: 15px;
  margin: 5px;
}

.avatar{
  margin: 5px;
  height: 32px;
  width: 32px;
}

.bottom-bar{
  display: flex;
  justify-content: flex-end;
}
</style>