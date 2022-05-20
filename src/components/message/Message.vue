<template>
  <new-friend-message v-if="message.messageType == 'NewFriend'" :message="message"></new-friend-message>
</template>

<script>
import NewFriendMessage from './NewFriendMessage.vue'

export default {
  name: "Message",
  props: ['message'],
  components: {
    NewFriendMessage
  }
}
</script>

<style>

</style>