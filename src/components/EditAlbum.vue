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
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
    name: "CreateAlbum",
    data(){
        return{
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
			{ immediate: true }
		)
	},
    methods:{
        fetchData(){
            this.albumId = Number(this.$route.params.albumId)
			if(!isNaN(this.albumId)){
				let vm = this
				let fillData = function(response){
					vm.albumName = response.data.albumName;
                    vm.isPublic = response.data.public;
				}
				axios.get("/api/albums/" + this.albumId).then(fillData)
			}
		},

        submit(){
            let album = {
                id : this.albumId,
                albumName : this.albumName,
                public : this.isPublic          //isPublic -> public
            }

            axios.put("/api/albums", album).then(this.message)
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