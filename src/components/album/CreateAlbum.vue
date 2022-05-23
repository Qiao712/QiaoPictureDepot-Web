<template>
  <el-row justify="center" style="margin-top: 10px">
    <el-col :sm="24" :md="17">
      <el-form label-width="120px">
        <el-form-item label="相册名称">
          <el-input placeholder="请输入相册名称..." name="title" v-model="albumName"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="isPublic">是否公开</el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submit">完成创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import albumApi from "@/api/AlbumApi"

export default {
  name: "CreateAlbum",
  data(){
    return{
      albumName: "",
      isPublic: false
    }
  },
  methods:{
    submit(){
      let album = {
        name : this.albumName,
        isPublic : this.isPublic
      }

      albumApi.addAlbum(album).then(
        this.$router.push({name: "albums", query:{pageNo: 1}})
      )
    },
  }
}
</script>

<style>

</style>