<template>
	<el-menu
		:default-active="activeIndex"
		class="el-menu-demo"
		mode="horizontal"
		@select="handleSelect"
	>
		<p style="margin-left: 10px">QiaoPictureDepot</p>
		<el-menu-item index="albums">相册</el-menu-item>
	</el-menu>
</template>

<script>
export default {
    name: "HeadBar",
	data(){
		return {
			activeIndex: 1
		}
	},
	methods:{
		handleSelect(key){
			switch (key) {
				case "albums":
					this.$router.push({name: "albums", query: {pageNo: 1}})
					break;
			
				default:
					break;
			}
		}
	}
}
</script>

<style>

</style>