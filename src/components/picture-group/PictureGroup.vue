<template>
  <!--标题-->
  <el-row justify="center">
    <el-col :sm="24" :md="18" :lg="12">
      <div class="title">
        {{pictureGroup.title}}
      </div>
    </el-col>
  </el-row>

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

  <!--信息-->
  <el-row justify="center">
    <el-col :sm="24" :md="18" :lg="12">
      <div>
        {{pictureGroup.description}}
      </div>
      <div class="picture-group-info">
        <span>{{pictureGroup.title}}</span>
        <div style="width: 32px"></div>
        <span style="color: grey">创建于: {{pictureGroup.createTime}}</span>
        <div style="width: 32px"></div>
        <el-button v-if="!pictureGroup.liked" @click="like()">点赞 {{pictureGroup.likeCount}}</el-button>
        <el-button v-if="pictureGroup.liked" @click="undoLike()">已赞 {{pictureGroup.likeCount}}</el-button>
      </div>
    </el-col>
  </el-row>

  <!-- 评论 -->
  <el-row justify="center">
    <el-col :sm="24" :md="18" :lg="12">
      <p>评论:</p>
      <comment-list :pictureGroupId="pictureGroupId"></comment-list>
    </el-col>
  </el-row>
  
  <el-backtop /> 	<!--回到顶部-->
</template>

<script>
import pictureApi from "@/api/PictureApi"
import CommentList from "@/components/comment/CommentList.vue"

export default {
  name: "PictureGroup",
  components: {
    CommentList
  },
  data(){
    return {
      pictureGroupId: null,
      pictureGroup: {},
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

      pictureApi.getPictureGroup(this.pictureGroupId).then(
        response=>{
          this.pictureGroup = response.data
        }
      )

      pictureApi.getPicturesInfoByGroup(this.pictureGroupId).then(
        response=>{
          this.pictures = response.data
        }
      )
    },

    getPictureUrl(pictureId){
      return ["/api/picture-groups", this.pictureGroupId, "pictures", pictureId].join('/')
    },

    like(){
      pictureApi.likePictureGroup(this.pictureGroupId).then(
        ()=>{
          this.pictureGroup.liked = true
          this.pictureGroup.likeCount++
        }
      )
    },

    undoLike(){
      pictureApi.undoLikePictureGroup(this.pictureGroupId).then(
        ()=>{
          this.pictureGroup.liked = false
          this.pictureGroup.likeCount--
        }
      )
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 20px;
  margin: 5px;
}

.picture-group-info{
  font-size: 18px;
  margin: 5px;
  display: flex;
  align-items: center;
}
</style>