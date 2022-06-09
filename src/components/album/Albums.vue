<template>
  <div style="margin: 10px">
    <el-row justify="start">
      <!--浏览自己的相册列表时-->
      <div v-if="ownerUsername == null">
        <el-button @click="$router.push({name: 'createAlbum'})">新建相册</el-button>
      </div>

      <!--浏览其他用户相册列表时-->
      <div v-if="ownerUsername != null">
        <span style="color: blue">{{ownerUsername}}</span>
        <span>的相册</span>
      </div>
    </el-row>

    <el-row :gutter="5">
      <el-col v-for="album in albums" :key="album.id" :span="6" style="text-align: center">
        <router-link :to="{name: 'album', params: {albumId: album.id, pageNo: 1}}">  <!---->
          <el-image
            :src="require(`../../assets/albums.jpg`)"
            fit="contain"
            :lazy="true"
          ></el-image>
          <p>{{album.name}}</p>
        </router-link>

        <!--浏览自己的相册时-->
        <!-- 删除按钮 -->
        <el-popconfirm
          v-if="ownerUsername == null"
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
        <el-button 
          size="small" 
          v-if="ownerUsername == null"
          @click="editAlbum(album.id)"
          circle
        >
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
import {Delete, Edit} from '@element-plus/icons-vue'
import albumApi from '@/api/AlbumApi'
import {showSuccessMessage} from '@/utils/Message'

export default {
  name: 'Albums',
  components:{
    Delete, Edit
  },
    data(){
    return {
      ownerUsername: null,  //拥有者用户名， 为空表示当前用户
      pageNo: 1,
      pageSize: 12,
      total: 0,
      orderBy: "createTime",
      desc: false,

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
      console.log("get albums")
      //注意类型：el-nagination的current-page必须接收number
      this.pageNo = Number(this.$route.query.pageNo)
      this.ownerUsername = this.$route.query.username
      if(isNaN(this.pageNo)) return

      let albumQuery = {
        ownerUsername: this.ownerUsername,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        desc: this.desc
      }

      albumApi.getAlbums(albumQuery).then(response=>{
        this.albums = response.data.list
        this.total = response.data.total
      })
    },

    handlePageChange(pageNo){
      this.$router.push({ name: 'albums', query: { pageNo: pageNo } })
    },

    deleteAlbum(albumId){
      albumApi.deleteAlbum(albumId).then(()=>{
        this.fetchData()
        showSuccessMessage("删除成功")
      })
    },

    editAlbum(albumId){
      this.$router.push({name: "editAlbum", params: {albumId: albumId}})
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