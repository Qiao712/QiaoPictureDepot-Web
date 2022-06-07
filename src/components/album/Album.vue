<template>
  <div style="margin: 10px">
    <el-row justify="start">
      <el-button @click="createPictureGroup">新建图组</el-button>
      <el-button @click="editAlbum">编辑相册</el-button>
    </el-row>

    <el-row :gutter="5">
      <el-col v-for="pictureGroup in pictureGroups" :key="pictureGroup.id" :span="6" style="text-align: center">
        <router-link :to="{name: 'pictureGroup', params: {pictureGroupId: pictureGroup.id}}">  <!--转到展示该图组的页面-->
          <el-image
            :src="getFirstPictureUrl(pictureGroup)"
            fit="contain"
            :lazy="true"
          >
          </el-image>
          <p> 
            {{pictureGroup.title}} 
            <el-tag>{{pictureGroup.pictureCount}}张</el-tag>
            <el-tag>{{pictureGroup.likeCount}}👍</el-tag>
          </p>
        </router-link>

        <!-- 删除按钮 -->
        <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="red"
          title="是否删除?"
          @confirm="deletePictureGroup(pictureGroup.id)"
        >
          <template #reference>
            <el-button size="small" circle>
              <delete style="width: 100%"></delete>
            </el-button>
          </template>
        </el-popconfirm>

        <!--编辑按钮-->
        <el-button size="small" @click="editPictureGroup(pictureGroup.id)" circle>
          <edit style="width: 100%"/>
        </el-button>
      </el-col>
    </el-row>

    <el-row justify="center">
      <el-pagination background layout="prev, pager, next" :current-page="pageNo" @current-change="handlePageChange" :page-size="pageSize" :total="total"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import pictureApi from "@/api/PictureApi"
import {Delete, Edit} from '@element-plus/icons-vue'
import {showSuccessMessage} from "@/utils/Message"

export default {
  name: "Album",
  components:{
    Delete, Edit
  },
  data(){
    return {
      albumId: -1,
      pageNo: 1,
      pageSize: 12,
      total: 0,
      pictureGroups: [],
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
    //拉取picture groups
    fetchData(){
      //注意类型：el-nagination的current-page必须接收number
      this.pageNo = Number(this.$route.query.pageNo)
      this.albumId = Number(this.$route.params.albumId)
      this.pageNo = isNaN(this.pageNo) ? 1 : this.pageNo
      if(isNaN(this.albumId)) return

      let pictureGroupQuery = {
        albumId: this.albumId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orderBy: "createTime",
        desc: false
      }

      pictureApi.getPictureGroups(pictureGroupQuery).then(
        (response)=>{
          this.total = response.data.total
          this.pictureGroups = response.data.list
        }
      )
    },

    handlePageChange(pageNo){
      this.$router.push({name: "album", params: {albumId: this.albumId}, query: {pageNo: pageNo}})
    },

    //获取首张图组首张图片的url
    getFirstPictureUrl(pictureGroup){
      if(pictureGroup.firstPictureRefId != null)
        return ["/api/picture-groups", pictureGroup.id, "pictures" ,pictureGroup.firstPictureRefId].join('/')
      else
        return ""
    },

    createPictureGroup(){
      this.$router.push({name: "createPictureGroup", params: {albumId: this.albumId}})
    },
    
    editPictureGroup(pictureGroupId){
      this.$router.push({name: "editPictureGroup", params: {pictureGroupId: pictureGroupId}})
    },
    
    editAlbum(){
      this.$router.push({name: "editAlbum", params: {albumId: this.albumId}})
    },

    deletePictureGroup(pictureGroupId){
      pictureApi.deletePictureGroup(pictureGroupId).then(
        ()=>{
          showSuccessMessage()
          this.fetchData()
        }
      )
    }
  }
}
</script>

<style scoped>
.el-image {
  height: 20vh;
  margin-top: 10px;
  border-radius: 4px;
  border: 2px solid var(--el-border-color-base);
}
</style>