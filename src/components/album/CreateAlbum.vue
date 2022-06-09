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
  name: "CreateAlbum",
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

  created(){
    this.fetchData()
  },

  methods: {
    fetchData() {
      friendApi.getFriendGroups().then(
        (response)=>{
          this.friendGroups = response.data
        }
      )
    },

    submit() {
      let album = {
        name: this.albumName,
        accessPolicy: this.accessPolicy,
        description: this.description,
        //拥有访问权的好友分组
        friendGroupIdsGranted: this.friendGroupIdsSelected,
      }

      albumApi.addAlbum(album).then(
        ()=>{
          this.$router.back()
        }
      )
    },
  }
}
</script>

<style>

</style>