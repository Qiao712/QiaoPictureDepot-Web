<template>
	<el-row justify="center" >
		<el-col :sm="24" :md="17">
			<el-form :model="form" label-width="120px">
				<el-form-item label="标题">
					<el-input placeholder="请输入标题..." name="username" v-model="title"></el-input>
				</el-form-item>	

				<el-form-item label="上传图片">
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
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="upload">完成创建</el-button>
					<el-checkbox name="type" label="是否公开" style="margin-left: 50px"></el-checkbox>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>

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
    name: 'ModifyPictureGroup',
	components: {draggable},
	data(){
		return {
			title: "",
			pictureGroupId: null,

			//{id: 在列表中的唯一编号，用于实现拖动
            // pictureId: 若不为null，则为已经上传到服务器端的图片的对象
            // file: 若不为null，则为从本地文件选择的待上传图片}
			items:[],
			drag: false,
            nextId : 0,
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
	},
	methods:{
		fetchData(){
            this.pictureGroupId = this.$route.params.pictureGroupId

			//获取已上传的图片
			if(this.pictureGroupId == null) return
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
                return ["/api/picture/", this.pictureGroupId, item.pictureId].join("/")
            }else if(item.file != null){
                return window.URL.createObjectURL(item.file)
            }
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
		},

		upload(){
			this.uploadPictureGroupInfo()
		},

		//上传picture group信息
		uploadPictureGroupInfo(){
			//上传picture group信息
			let pictureGroup = {id: this.pictureGroupId, title: this.title}
			axios.put("/api/picture-group", pictureGroup)
			
			this.executeDeletePictures()
		},

		//删除图片(完成后执行上传文件)
		executeDeletePictures(){
			if(this.picturesToDelete.length > 0){
				axios.post("/api/delete-pictures/" + this.pictureGroupId, this.picturesToDelete)
				.then(this.uploadPictures)
				this.picturesToDelete = []
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
		}
	}
}
</script>

<style>

</style>