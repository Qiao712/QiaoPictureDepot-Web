<template>
  <el-dialog v-model="isVisible" title="通知" v-infinite-scroll="" class="infinite-list" style="overflow: auto; height: 100px">
    <message v-for="(message,index) in messages" :key="index" :message="message"></message>
    <el-pagination background layout="prev, pager, next" :current-page="pageNo" @current-change="handlePageChange" :page-size="pageSize" :total="total"></el-pagination>
  </el-dialog>
</template>

<script>
import messageApi from '@/api/MessageApi'
import Message from './Message.vue'

export default {
  name: "MessageList",
  components:{
    Message
  },
  data(){
    return {
      isVisible: false,
      pageNo: 1,
      pageSize: 10,
      messages: []
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    fetchData(){
      messageApi.getMessages(this.pageNo, this.pageSize).then(
        response=>{
          this.messages = response.data.list
          this.total = response.data.total
        }
      )
    },

    //显示开关
    showOrHide(){
      if(this.isVisible){
        this.isVisible = false
      }else{
        this.fetchData()
        this.isVisible = true
      }
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
    },
  },
}
</script>

<style>

</style>