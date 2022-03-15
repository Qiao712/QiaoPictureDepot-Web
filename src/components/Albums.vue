<template>
  <div style="margin: 10px">
    <el-row justify="start">
      <el-button @click="$router.push({name: 'createAlbum'})">新建相册</el-button>
    </el-row>

    <el-row :gutter="5">
      <el-col v-for="album in albums" :key="album.id" :span="6" style="text-align: center">
        <router-link :to="{name: 'album', params: {albumId: album.id, pageNo: 1}}">  <!---->
          <el-image
            :src="require(`../assets/albums.jpg`)"
            fit="contain"
            :lazy="true"
          ></el-image>
          <p>{{album.name}}</p>
        </router-link>

        <!-- 删除按钮 -->
        <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="red"
          title="是否删除?"
          @confirm="deleteAlbum(album.id)"
        >
          <template #reference>
            <el-button size="small" circle>
              <delete style="width: 100%"></delete>
            </el-button>
          </template>
        </el-popconfirm>

        <!--编辑按钮-->
        <el-button size="small" @click="editAlbum(album.id)" circle>
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
import axios from 'axios'
import {Delete, Edit} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'Albums',
  components:{
    Delete, Edit
  },
    data(){
    return {
      pageNo: 1,
      pageSize: 12,
      total: 0,
      albums: [],
    }
  },
  created() {
    // watch 路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.query,
      () => {
        this.fetchData()
      },
      { immediate: true }
    )
  },
  methods: {
    //拉取album信息
    fetchData(){
      //注意类型：el-nagination的current-page必须接收number
      this.pageNo = Number(this.$route.query.pageNo)
      
      let vm = this
      let fillData = function(response){
        vm.albums = response.data.list
        vm.total = response.data.total
      }
      axios.get("/api/albums/", {params: {pageNo: this.pageNo, pageSize: 12}}).then(fillData)
    },

    handlePageChange(pageNo){
      this.$router.push({ name: 'albums', query: { pageNo: pageNo } })
    },

    deleteAlbum(albumId){
      axios.delete("/api/albums/" + albumId).then(this.message)
    },

    editAlbum(albumId){
      this.$router.push({name: "editAlbum", params: {albumId: albumId}})
    },

    //提示信息
        message(response){
            ElMessage({
                showClose: true,
                message: response.status == 200 ? '操作成功' : '操作失败',
                type: response.status == 200 ? 'success' : 'error',
                duration: 2000
            })
      
      //重新拉取数据
      this.fetchData()
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