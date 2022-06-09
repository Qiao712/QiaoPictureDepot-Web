<template>
  <div class="user-info" v-if="user != null">
    <img :src="getAvatarUri(user.id)" class="user-avatar">
    <span style="margin: 5px">{{user.username}}</span>

    <!--角色信息-->
    <span v-if="user.rolename == 'ROLE_ADMIN'" style="margin: 5px; color: blue; front-size: 15px">管理员</span>
    <span v-if="user.rolename == 'ROLE_NORMAL'" style="margin: 5px; color: grey; front-size: 15px">普通用户</span>
    <span v-if="user.rolename == 'ROLE_VIP'" style="margin: 5px; color: pink; front-size: 15px">VIP</span>
    <span v-if="user.rolename == 'ROLE_SVIP'" style="margin: 5px; color: red; front-size: 15px">SVIP</span>
  </div>
</template>

<script>
import userApi from "@/api/UserApi"

export default {
  name: "UserInfo",
  props: ["user"],

  methods: {
    getAvatarUri(userId){
      return userApi.getAvatarUri(userId)
    }
  }
}
</script>

<style scoped>
.user-avatar{
  height: 32px;
  width: 32px;
}

.user-info{
  display: flex;
  justify-content:center;

  font-size: 16px;
}
</style>