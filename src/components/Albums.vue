<template>
	<div style="margin: 10px">
		<el-row :gutter="5">
			<el-col v-for="album in albums" :key="album.id" :span="6" style="text-align: center">
				<router-link :to="{name: 'album', params: {albumId: album.id, pageNo: 1}}">	<!---->
					<el-image
						:src="require(`../assets/albums.jpg`)"
						fit="contain"
						:lazy="true"
					></el-image>
					<p>{{album.albumName}}</p>
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
    name: 'Albums',
    data(){
		return {
			pageNo: 1,
			pageCount: 0,
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
				vm.pageCount = response.data.pageCount
				vm.albums = response.data.itemsOfCurrentPage
			}
			axios.get("/api/albums/", {params: {pageNo: this.pageNo, pageSize: 12}}).then(fillData)
		},

		handlePageChange(pageNo){
			this.$router.push({ name: 'albums', query: { pageNo: pageNo } })
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