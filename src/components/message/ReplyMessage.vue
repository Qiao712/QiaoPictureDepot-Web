<template>
  <div class="message" @click="$router.push()">
    <p>
      <span style="color: pink">{{message.messageBody.replierUsername}}</span>
      在<span style="color: blue">{{message.messageBody.pictureGroupTitle}}</span>中回评论: {{message.messageBody.comment}}
    </p>
  </div>
</template>

<script>
export default {
  name: "ReplyMessage",
  props: ["message"]
}
</script>

<style>
.message{
  border: 5px;
  border-color: black;
  border-radius: 0;
  font-size: 15px;
}
</style>