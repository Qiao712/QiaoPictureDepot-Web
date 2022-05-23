<template>
  <div class="sub-comment-view">
    <!--头像-->
    <div style="text-align: center">
      <el-image class="avatar" :fit="fill" shape="square" :src="0"/>
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
        <span class="small-text" style="color: blue" @click="replyDialogVisible = true">回复</span>
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
export default {
  name: "SubComment",
  props: ["comment"],
  data(){
    return {
      //回复
      replyDialogVisible: false,
      replyContent: "",
    }
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
}

.bottom-bar{
  display: flex;
  justify-content: flex-end;
}
</style>