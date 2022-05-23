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
          <el-button type="primary" @click="submit">完成</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import albumApi from "@/api/AlbumApi"

export default {
  name: "CreateAlbum",
  data() {
    return {
      albumId: null,
      albumName: "",
      isPublic: false
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
          this.isPublic = response.data.public
        })
    },

    submit() {
      let album = {
        id: this.albumId,
        name: this.albumName,
        public: this.isPublic          //isPublic -> public
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