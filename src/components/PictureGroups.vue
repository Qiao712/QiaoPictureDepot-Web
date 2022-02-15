<template>
	<div style="margin: 10px">
		<el-row :gutter="5">
			<el-col v-for="pictureGroup in pictureGroups" :key="pictureGroup.id" :span="6" style="text-align: center">
				<router-link :to="{name: 'pictures', params: {pictureGroupId: pictureGroup.id}}">	<!--转到展示该图组的页面-->
					<el-image
						:src="getFirstPictureUrl(pictureGroup)"
						fit="contain"
						lazy="true"
					>
					</el-image>
					<p> {{pictureGroup.title}} <el-tag>{{pictureGroup.pictures.length}}</el-tag></p>
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
	name: "PictureGroups",
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
			this.pageNo = Number(this.$route.params.pageNo)
			this.albumId = Number(this.$route.params.albumId)

			let vm = this
			let fillData = function(response){
				vm.pageCount = response.data.pageCount
				vm.pictureGroups = response.data.itemsOfCurrentPage
			}
			
			var url = ["/api/album", this.albumId, this.pageNo].join('/')
			axios.get(url).then(fillData)
		},

		handlePageChange(pageNo){
			var url = ["/api/album", this.albumId, pageNo].join('/')
			this.$router.push(url)
		},

		//获取首张图组首张图片的url
		getFirstPictureUrl(pictureGroup){
			if(pictureGroup.pictures.length > 0)
				return "/api/picture/" + (pictureGroup.pictures[0].id)
			else
				return "/api/picture/-1"
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