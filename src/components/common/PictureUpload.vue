<template>
	<el-upload action="#" list-type="picture-card" :auto-upload="false" multiple="true" :file-list="files">
		<template #default>
			<el-icon><plus/></el-icon>
		</template>
		<template #file="{ file }">
			<div>
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
				<span class="el-upload-list__item-actions">
				<span
					class="el-upload-list__item-preview"
					@click="handlePictureCardPreview(file)"
				>
					<el-icon><zoom-in /></el-icon>
				</span>
				<span
					v-if="!disabled"
					class="el-upload-list__item-delete"
					@click="handleDownload(file)"
				>
					<el-icon><download /></el-icon>
				</span>
				<span
					v-if="!disabled"
					class="el-upload-list__item-delete"
					@click="handleRemove(file)"
				>
					<el-icon><delete /></el-icon>
				</span>
				</span>
			</div>
		</template>
	</el-upload>
	<!--预览-->
	<el-dialog v-model="dialogVisible">
		<img style="width: 100%" :src="dialogImageUrl" alt="" />
	</el-dialog>

	
</template>

<script>
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'

export default {
	name: 'PictureUpload',
	components: {Plus, ZoomIn, Download, Delete},
	data(){
		return {
			files : [],
			dialogImageUrl : "",
			dialogVisible : false,
			disabled : false
		}
	},

	methods:{
		handleRemove(file){
			console.info(file)
			console.info(this.files)
		},
		handlePictureCardPreview(file){
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
		handleDownload(file){
			console.log(file)
		},
		handleChange(file, fileList){
			console.info(file)
			console.log(fileList)
		}
	}
}
</script>

<style>

</style>