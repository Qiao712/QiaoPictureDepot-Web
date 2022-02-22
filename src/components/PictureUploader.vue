<template>
	<input type="file" @change="handleFileSelect" multiple>
	<draggable 
		v-model="items" 
		group="items" 
		@start="drag=true" 
		@end="drag=false" 
		item-key="id">
		<template #item="{element}">
			<div @dblclick="preview" style="position: relative;">
				<!-- 删除按钮 -->
				<el-popconfirm
					confirm-button-text="确认"
					cancel-button-text="取消"
					:icon="InfoFilled"
					icon-color="red"
					title="是否删除?"
					@confirm="deletePicture(element.id)"
				>
					<template #reference>
						<el-button class="delete-button" size="small" :icon="deleteIco" circle></el-button>
					</template>
				</el-popconfirm>

				<!-- 预览图片 -->
				<el-image
					class="small_img"
					:src="getPictureUrl(element)"
					fit="contain"
				></el-image>
			</div>
		</template>
	</draggable>
	
	<!-- 大图预览 -->
	<el-dialog v-model="dialogVisible">
		<el-image
			class="big_img"
			:src="dialogImageUrl"
			fit="contain"
		></el-image>
	</el-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import {Delete} from '@element-plus/icons-vue'

export default {
	name: "PictureUploader",
	components: {
		draggable,
	},
	data(){
		return{
            //{id: 在列表中的唯一编号，用于实现拖动
            // pictureId: 若不为null，则为已经上传到服务器端的图片的对象
            // file: 若不为null，则为从本地文件选择的待上传图片}
			items:[],
			drag: false,
            nextId : 0,
            pictureGroupId: null,
			picturesToDelete: [],

			//大图预览
			dialogVisible: false,
			dialogImageUrl: "",

			//将element plus的ico图标组件导出
			deleteIco: Delete
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

		//监听父组件传来的上传事件
		this.$eventBus.on('upload', this.upload)
	},
	
    methods:{
        //获取已上传的图片
        fetchData(){
            this.pictureGroupId = this.$route.params.pictureGroupId
            this.items = []

			let vm = this
			let fillData = function(response){
                let pictures = response.data
                for(let picture of pictures){
                    vm.items.push({id: ++vm.nextId, pictureId: picture.id, file: null})
                }
			}
			axios.get("/api/pictures/" + this.pictureGroupId).then(fillData)
		},

		//选择图片
        handleFileSelect(event){
            //收集选择的文件
            let files = event.target.files
            for(let file of files){
                this.nextId++
                this.items.push({id: this.nextId, pictureId: null, file: file})
            }
        },

		//获取item代表的图片的url
        getPictureUrl(item){
            if(item.pictureId != null){
                return "/api/picture/" + item.pictureId
            }else if(item.file != null){
                return window.URL.createObjectURL(item.file)
            }
        },

		//提交
		upload(){
			//顺序执行：删除图片请求、上传图片请求、改变顺序请求
			this.executeDeletePictures()
		},

		//删除图片(完成后执行上传文件)
		executeDeletePictures(){
			if(this.picturesToDelete.length > 0){
				this.picturesToDelete = []
				axios.post("/api/delete-pictures/" + this.pictureGroupId, this.picturesToDelete).then(this.uploadPictures)
			}else{
				this.uploadPictures()
			}
		},

		//上传图片(完成后执行上传顺序)
		uploadPictures(){
			//收集并上传选择的图片
			let formData = new FormData()
			for(let item of this.items){
				if(item.file != null) formData.append("pictures", item.file)
			}

			if(formData.get("pictures") != null){
				let vm = this
				let fillData = function(response){
					//将返回的pictureId存入items,并上传顺序
					let pictures = response.data
					let i = 0
					for(let item of vm.items){
						if(item.pictureId == null){
							console.info("赋予id", pictures[i].id)
							item.pictureId = pictures[i++].id
						}
					}

					//上传图片顺序
					vm.uploadSequences();
				}

				axios.post("/api/pictures/" + this.pictureGroupId, formData).then(fillData)
			}else{
				//上传图片顺序
				this.uploadSequences();
			}

		},

		//上传改变图片顺序
		uploadSequences(){
			let sequences = []
			for(let item of this.items){
				sequences.push(item.pictureId)
			}
			
			axios.post("/api/picture-sequence/" + this.pictureGroupId, sequences)
		},

		//删除一张图片
		deletePicture(id){
			let index = this.items.findIndex((item)=>(item.id == id))
			let item = this.items.splice(index, 1)[0]
			if(item.pictureId != null) this.picturesToDelete.push(item.pictureId)
		},

		//预览
		preview(event){
			let url = this.dialogImageUrl = event.target.getAttribute("src")
			this.dialogImageUrl = url
			this.dialogVisible = true
		}
    }
}
</script>

<style scoped>
.small_img{
	height: 150px;
	width: 150px;
	background-color: aliceblue;
	border: 2px solid var(--el-border-color-base);
}
.delete-button{
	z-index: 999;
	margin-right: 8px;
	position: absolute;
	right: 0px;
	bottom: 15px;
}
</style>