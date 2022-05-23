<template>
  <!--根据消息类型，分派到响应的组件-->
  <new-friend-message v-if="message.messageType == 'NewFriend'" :message="message"></new-friend-message>
  <reply-message v-if="message.messageType == 'Reply'" :message="message"></reply-message>
</template>

<script>
import NewFriendMessage from './NewFriendMessage.vue'
import ReplyMessage from './ReplyMessage.vue'
export default {
  name: "Message",
  props: ['message'],
  components: {
    NewFriendMessage,
    ReplyMessage
  }
}
</script>

<style>

</style>