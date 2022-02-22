<template>
	<el-row justify="center" >
		<el-col :sm="24" :md="17">
			<el-form :model="form" label-width="120px">
				<el-form-item label="标题">
					<el-input placeholder="请输入标题..." name="username" v-model="title"></el-input>
				</el-form-item>	

				<el-form-item label="上传图片">
					<picture-uploader :pictureGroupId="pictureGroupId"></picture-uploader>
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
import PictureUploader from './PictureUploader.vue'

export default {
    name: 'CreatePictureGroups',
	components: {PictureUploader},
	data(){
		return {
			title: "",
			pictureGroupId: null
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
            this.pictureGroupId = this.$route.params.pictureGroupId

			let vm = this
			let fillData = function(response){
                vm.title = response.data.title
			}
			axios.get("/api/picture-group/" + this.pictureGroupId).then(fillData)
		},

		upload(){
			//通知子组件上传图片
			this.$eventBus.emit('upload')
			
			//上传picture group信息
			let pictureGroup = {id: this.pictureGroupId, title: this.title}
			axios.post("/api/picture-group", pictureGroup)
		}
	}
}
</script>

<style>

</style>