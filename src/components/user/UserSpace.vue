<template>
  <div class="info">
    <!--用户信息-->
    <div class="user-info">
      <el-avatar class="big-avatar" shape="square" :size="80" :src="getAvatarUri(user.id)"/>
      <div class="username-text">{{user.username}}</div>
      <div style="width: 1rem"></div>

      <!--角色信息-->
      <div class="username-text">
        <span v-if="user.rolename == 'ROLE_ADMIN'" style="margin: 5px; color: blue; front-size: 15px">管理员</span>
        <span v-if="user.rolename == 'ROLE_NORMAL'" style="margin: 5px; color: grey; front-size: 15px">普通用户</span>
        <span v-if="user.rolename == 'ROLE_VIP'" style="margin: 5px; color: pink; front-size: 15px">VIP</span>
        <span v-if="user.rolename == 'ROLE_SVIP'" style="margin: 5px; color: red; front-size: 15px">SVIP</span>
      </div>
    </div>


    <!--使用情况统计-->
    <div class="usage-info">
      <div>
        储存空间: {{user.spaceUsage / 1024 / 1024}} MiB / {{spaceLimit}}
      </div>
      <div>
        相册数量: {{user.albumCount}} / {{albumNumLimit}}
      </div>
      <div>
        图组数量: {{user.pictureGroupCount}}
      </div>
      <div>
        图片数量: {{user.pictureCount}}
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/UserApi"

export default {
  name: 'UserSpace',
  data(){
    return{
      user: {},
    }
  },

  created(){
    this.fetchData()
  },

  computed:{
    spaceLimit(){
      return this.user.pictureStorageLimit == -1 ? "∞ MiB" : (this.user.pictureStorageLimit / 1024 / 1024) + " MiB"
    },

    albumNumLimit(){
      return this.user.albumNumLimit == -1 ? "∞" : this.user.albumNumLimit
    }
  },

  methods:{
    fetchData(){
      userApi.getCurrentUser().then(
        (response)=>{
          this.user = response.data
        }
      )
    },

    getAvatarUri(userId){
      return userApi.getAvatarUri(userId)
    }
  }
}
</script>

<style scoped>
.info{
  display: grid;
  grid-template-columns: 50% 50%;

  margin: 20px;
}

.user-info{
	display: flex;
	align-items: center;
}

.usage-info{
  
}

.el-avatar{
	margin: 10px;
}

.username-text{
	font-size: 16px;
}
</style>
