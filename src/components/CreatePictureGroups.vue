<template>
	<el-row justify="center" >
		<el-col :sm="24" :md="17">
			<el-form :model="form" label-width="120px">
				<el-form-item label="标题">
					<el-input placeholder="请输入标题..." name="username"></el-input>
				</el-form-item>	

				<el-form-item label="上传图片">
					<picture-upload></picture-upload>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="create">完成创建</el-button>
					<el-checkbox name="type" label="是否公开" style="margin-left: 50px"></el-checkbox>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
import PictureUpload from './common/PictureUpload.vue'

export default {
    name: 'CreatePictureGroups',
	components: {PictureUpload},

	data(){
		return {
			dialogImageUrl: "",
			dialogVisible: false,
			disabled: false
		}
	},
	methods:{

		handleRemove(file){
			console.log(file)
		},

		handlePictureCardPreview(file){
			this.dialogImageUrl.value = file.url
			this.dialogVisible.value = true
		},

		handleDownload(file){
			console.log(file)
		}	
	}
}
</script>

<style>

</style>