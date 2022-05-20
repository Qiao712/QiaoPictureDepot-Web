<template>
  <el-row justify="center" v-for="picture in pictures" :key="picture.id">
    <el-col :sm="24" :md="18" :lg="12" style="text-align: center">
      <el-image 
        :src="getPictureUrl(picture.id)"
        fit="contain"
        :lazy="true"
      > 
      </el-image>
    </el-col>
  </el-row>

  <el-backtop /> 	<!--回到顶部-->
</template>

<script>
import pictureApi from "@/api/PictureApi"

export default {
  name: "PictureGroup",
  data(){
    return {
      pictureGroupId: null,
      pictures: []
    }
  }, 
  created(){
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
      if(isNaN(this.pictureGroupId)) return

      pictureApi.getPicturesInfoByGroup(this.pictureGroupId).then(
        response=>{
          this.pictures = response.data
        }
      )
    },

    getPictureUrl(pictureId){
      return ["/api/picture-groups", this.pictureGroupId, "pictures", pictureId].join('/')
    }
  }
}
</script>

<style scoped>

</style>