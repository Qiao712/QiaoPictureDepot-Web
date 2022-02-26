<template>
	<el-row justify="center" v-for="picture in pictures" :key="picture.id">
		<el-col :sm="24" :md="18" :lg="12" style="text-align: center">
			<el-image 
				:src="getPictureUrl(picture.id)"
				fit="contain"
				:lazy="true"
			> 
			</el-image>
		</el-col>
	</el-row>

	<el-backtop /> 	<!--回到顶部-->
</template>

<script>
import axios from 'axios'

export default {
	name: "PictureGroup",
	data(){
		return {
			pictureGroupId: null,
			pictures: []
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
		fetchData(){
			this.pictureGroupId = this.$route.params.pictureGroupId
			
			let vm = this
			let fillData = function(response){
				vm.pictures = response.data
			}

			//若未从prop传入数据则请求数据
			axios.get(["/api/picture-groups/", this.pictureGroupId, "pictures"].join("/")).then(fillData)
		},

		getPictureUrl(pictureId){
			return ["/api/picture-groups", this.pictureGroupId, "pictures", pictureId].join('/')
		}
	}
}
</script>

<style scoped>

</style>