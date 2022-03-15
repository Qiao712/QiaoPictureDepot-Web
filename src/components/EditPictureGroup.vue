<template>
  <el-row justify="center" >
    <el-col :sm="24" :md="17">
      <el-form label-width="120px">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题..." name="username" v-model="title"></el-input>
        </el-form-item>	

        <el-form-item label="上传图片">
          <picture-group-uploader
            :pictureGroupId="pictureGroupId"
            :albumId="albumId"
            :title="title"
            :isUpdate="true">
          </picture-group-uploader>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="upload">完成创建</el-button>
          <el-checkbox name="type" label="是否公开" style="margin-left: 50px"></el-checkbox>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import PictureGroupUploader from './PictureGroupUploader.vue'

export default {
    name: 'EditPictureGroup',
  components:{
    PictureGroupUploader
  },
  data(){
    return {
      pictureGroupId: null,
      title: "",
      albumId: null,
    }
  },
  created() {
    // watch 路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      { immediate: true }
    )
  },
  methods:{
    fetchData(){
            this.pictureGroupId = Number(this.$route.params.pictureGroupId)
      if(this.pictureGroupId != null){
        let vm = this
        let fillData = function(response){
          let pictureGroup = response.data
          vm.pictureGroupId = pictureGroup.id
          vm.albumId = pictureGroup.albumId
          vm.title = pictureGroup.title
        }
        axios.get("/api/picture-groups/" + this.pictureGroupId).then(fillData)
      }
    },
    upload(){
      //通知pictureGroupUploader上传
      this.$eventBus.emit('upload')
    }
  }
}
</script>

<style>
.small_img{
  height: 150px;
  width: 150px;
  background-color: aliceblue;
  border: 2px solid var(--el-border-color-base);
}
.delete-button{
  z-index: 999;
  margin-right: 8px;
  position: absolute;
  right: 0px;
  bottom: 15px;
}
</style>