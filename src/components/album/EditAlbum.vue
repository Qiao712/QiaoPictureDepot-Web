<template>
  <el-row justify="center" style="margin-top: 10px">
    <el-col :sm="24" :md="17">
      <el-form label-width="120px">
        <el-form-item label="相册名称">
          <el-input placeholder="请输入相册名称..." v-model="albumName"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input placeholder="请输入简介信息..." v-model="description"></el-input>
        </el-form-item>

        <el-form-item>
          <el-radio-group v-model="accessPolicy">
            <el-radio :label="0">私用</el-radio>
            <el-radio :label="1">对部分好友可见</el-radio>
            <el-radio :label="2">对全部好友可见</el-radio>
            <el-radio :label="3">公开</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--对部分好友可见时-->
        <el-form-item label="选择好友分组" v-if="accessPolicy == 1">
          <el-checkbox-group v-model="friendGroupIdsSelected">
            <el-checkbox v-for="friendGroup in friendGroups" :key="friendGroup.id" :label="friendGroup.id">{{friendGroup.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">完成</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import albumApi from "@/api/AlbumApi"
import friendApi from "@/api/FriendApi"

export default {
  name: "EditAlbum",
  data() {
    return {
      albumId: null,
      albumName: "",
      //相册访问控制策略(可见性)
      accessPolicy: 0,
      description: "",

      //好友分组列表
      friendGroups: [],
      friendGroupIdsSelected: [],
    }
  },
  created() {
    // watch 路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      {immediate: true}
    )
  },
  methods: {
    fetchData() {
      this.albumId = Number(this.$route.params.albumId)
      if (isNaN(this.albumId)) return

      albumApi.getAlbum(this.albumId).then(
        response => {
          this.albumName = response.data.name
          this.accessPolicy = response.data.accessPolicy
          this.description = response.data.description
        }
      )

      friendApi.getFriendGroups().then(
        (response)=>{
          this.friendGroups = response.data
        }
      )

      albumApi.getGrantedFriendGroups(this.albumId).then(
        response => {
          this.friendGroupIdsSelected = response.data
        }
      )
    },

    submit() {
      //偷懒写法--没选择的统统revoke
      let friendGroupIdsSelectedSet = new Set(this.friendGroupIdsSelected)
      let friendGroupIdsRevoked = []
      if(this.accessPolicy == 1){
        this.friendGroups.forEach((friendGroup)=>{
          if(! friendGroupIdsSelectedSet.has(friendGroup.id)){
            friendGroupIdsRevoked.push(friendGroup.id)
          }
        })
      }

      let album = {
        id: this.albumId,
        name: this.albumName,
        accessPolicy: this.accessPolicy,
        description: this.description,
        //修改拥有访问权的好友分组
        friendGroupIdsGranted: this.friendGroupIdsSelected,
        friendGroupIdsRevoked
      }

      albumApi.updateAlbum(album).then(
        this.$router.back()
      )
    },
  }
}
</script>

<style>

</style>