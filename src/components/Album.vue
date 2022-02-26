<template>
	<div style="margin: 10px">
		<el-row justify="start">
			<el-button @click="createPictureGroup">新建</el-button>
		</el-row>

		<el-row :gutter="5">
			<el-col v-for="pictureGroup in pictureGroups" :key="pictureGroup.id" :span="6" style="text-align: center">
				<router-link :to="{name: 'pictureGroup', params: {pictureGroupId: pictureGroup.id}}">	<!--转到展示该图组的页面-->
					<el-image
						:src="getFirstPictureUrl(pictureGroup)"
						fit="contain"
						:lazy="true"
					>
					</el-image>
					<p> {{pictureGroup.title}} <el-tag>{{pictureGroup.pictureCount}}</el-tag></p>
				</router-link>
			</el-col>
		</el-row>

		<el-row justify="center">
			<el-pagination background layout="prev, pager, next" :current-page="pageNo" @current-change="handlePageChange" :page-count="pageCount"></el-pagination>
		</el-row>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: "Album",
	data(){
		return {
			albumId: -1,
			pageNo: 1,
			pageCount: 0,
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
		//拉取album信息
		fetchData(){
			//注意类型：el-nagination的current-page必须接收number
			this.pageNo = Number(this.$route.query.pageNo)
			this.albumId = Number(this.$route.params.albumId)
			this.pageNo = isNaN(this.pageNo) ? 1 : this.pageNo

			let vm = this
			let fillData = function(response){
				vm.pageCount = response.data.pageCount
				vm.pictureGroups = response.data.itemsOfCurrentPage
			}
			
			var url = ["/api/albums", this.albumId, "picture-groups"].join('/')
			axios.get(url, {params: {pageNo: this.pageNo, pageSize: 12}}).then(fillData)
		},

		handlePageChange(pageNo){
			this.$router.push({name: "album", params: {albumId: this.albumId}, query: {pageNo: pageNo}})
		},

		//获取首张图组首张图片的url
		getFirstPictureUrl(pictureGroup){
			if(pictureGroup.firstPicture != null)
				return ["/api/picture-groups", pictureGroup.id, "pictures" ,pictureGroup.firstPicture].join('/')
			else
				return ""
		},

		createPictureGroup(){
			this.$router.push({name: "createPictureGroup", params: {albumId: this.albumId}})
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