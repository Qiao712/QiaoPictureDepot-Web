<template>
	<draggable 
		v-model="pictures" 
		group="people" 
		@start="drag=true" 
		@end="drag=false" 
		item-key="id">
		<template #item="{element}">
			<div>
				<el-image
					:src="element.url"
					fit="contain"
					lazy="true"
				></el-image>
			</div>
		</template>
	</draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
	name: "Test",
	components: {
		draggable,
	},
	data(){
		return{
			pictures:[	{id: 1, url: "/api/picture/1"},
						{id: 2, url: "/api/picture/2"},
						{id: 3, url: "/api/picture/3"},
						{id: 4, url: "/api/picture/1"},
						{id: 5, url: "/api/picture/1"},
						{id: 6, url: "/api/picture/1"},
						{id: 7, url: "/api/picture/1"},
						{id: 1, url: "/api/picture/1"},
						{id: 1, url: "/api/picture/1"},
						{id: 1, url: "/api/picture/1"},
						{id: 1, url: "/api/picture/1"},
						{id: 1, url: "/api/picture/1"},
						{id: 1, url: "/api/picture/1"},],
			drag: false
		}
	}
}
</script>

<style>
.el-image{
	height: 100px;
	width: 100px;
	background-color: aqua;
	border: 2px solid var(--el-border-color-base);
}	
</style>