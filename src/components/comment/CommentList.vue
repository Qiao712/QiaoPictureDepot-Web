<template>
  <!--输入评论-->
  <el-input type="textarea" v-model="commentContent"></el-input>
  <el-button @click="submitComment">发布</el-button>

  <!--评论列表-->
  <div class="comment-box" v-for="comment in comments" :key="comment.id">
    <comment :comment="comment"></comment>
  </div>
  
  <div>
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
</template>

<script>
import commentApi from "@/api/CommentApi"
import Comment from "./Comment.vue"

export default {
  name: "CommentList",
  props: {
    pictureGroupId : Number
  },

  components:{
    Comment
  },

  data(){
    return {
      pageSize: 15,
      pageNo: 1,
      total: 0,
      comments: [],

      //输入评论内容
      commentContent: ""
    }
  },

  created(){
    this.fetchData()
  },

  methods:{
    fetchData(){
      commentApi.getComments(this.pictureGroupId, this.pageNo, this.pageSize).then(
        response=>{
          this.comments = response.data.list
          this.total = response.data.total
        }
      )
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.fetchData()
    },

    submitComment(){
      let commentAdd = {
        content: this.commentContent,
        pictureGroupId: this.pictureGroupId,
      }

      commentApi.addComment(commentAdd).then(
        ()=>{
          this.commentContent = ""
          this.fetchData()
        }
      )
    }
  }
}
</script>

<style>
.comment-box{
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 0.5rem;
}
</style>