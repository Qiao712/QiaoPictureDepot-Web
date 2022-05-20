<template>
  <el-dialog v-model="isVisible" title="系统通知" v-infinite-scroll="load" class="infinite-list" style="overflow: auto; height: 100px">
    <message v-for="(message,index) in messages" :key="index" :message="message"></message>
  </el-dialog>
</template>

<script>
import messageApi from '@/api/MessageApi'
import Message from './message/Message.vue'

export default {
  name: "MessageList",
  components:{
    Message
  },
  data(){
    return {
      isVisible: false,
      messages: []
    }
  },
  created(){
    messageApi.getMessages().then(
      response=>{
        this.messages = response.data
      }
    )
  },
  methods:{
    showOrHide(){
      this.isVisible = !(this.isVisible)
    }
  },
}
</script>

<style>

</style>