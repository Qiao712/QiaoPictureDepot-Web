<template>
  <div class="reply-view">
    <div class="user-bar">
      <img class="avatar" :src="getAvatarUri(comment.authorId)"/>
      <p class="small-text">{{comment.authorUser.username}}</p>
    </div>

    <div class="reply-content">
      <!--回复内容-->
      <div class="reply-content">
        {{comment.content}}
      </div>

      <!--按钮条-->
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

      <!--子回复-->
      <div v-if="subComments.length > 0" class="sub-reply">
        <!--子回复1-->
        <sub-comment v-for="comment in subComments" :key="comment.commentId" :comment="comment"></sub-comment>
        <!--分页-->
        <el-pagination
          :current-page="pageNo"
          :page-size="pageSize"
          :total="total"
          :pager-count="5"
          @current-change="handlePageChange"
          layout="prev, pager, next"
          style="background-color: white;"
        />
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
import SubComment from "./SubComment.vue"
import commentApi from "@/api/CommentApi"
import store from "@/store"
import userApi from "@/api/UserApi"

export default {
  name: "CommentView",
  props: ["comment"],
  components: {
    SubComment
  },

  data(){
    return {
      pageSize: 15,
      pageNo: 1,
      total: 0,

      subComments: [],

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
    this.fetchData()
  },

  methods:{
    fetchData(){
      //获取二级回复
      commentApi.getSubComments(this.comment.pictureGroupId, this.comment.id, this.pageNo, this.pageSize).then(
        response=>{
          this.subComments = response.data.list
          this.total = response.data.total
        }
      )
    },

    //回复一个一级评论
    reply(){
      if(this.replyContent == "") return

      let commentAdd = {
        content: this.replyContent,
        pictureGroupId: this.comment.pictureGroupId,
        replyTo: this.comment.id
      }

      commentApi.addComment(commentAdd).then(
        ()=>{
          this.replyDialogVisible = false
          //重新拉取子评论
          this.fetchData()
        }
      )
    },

    deleteComment(commentId){
      commentApi.deleteComment(commentId).then(
        this.$parent.fetchData()
      )
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.fetchData()
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
.reply-content{
  color: var(--el-text-color-regular);
  font-size: 16px;
}

.sub-reply{
  margin: 15px;
  box-shadow: var(--el-box-shadow-light)
}

.small-text{
  font-size: 15px;
  margin: 10px;
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