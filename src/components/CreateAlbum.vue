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
import axios from 'axios'
import { ElMessage } from 'element-plus'

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
                albumName : this.albumName,
                isPublic : this.isPublic
            }

            axios.post("/api/albums", album).then(this.message)
        },

        //提示信息
        message(response){
            ElMessage({
                showClose: true,
                message: response.status == 200 ? '操作成功' : '操作失败',
                type: response.status == 200 ? 'success' : 'error',
                duration: 2000
            })
            this.$router.back()
        }

    }
}
</script>

<style>

</style>