<template>
    <form id="img-upload" :action="'/api/pictures/' + pictureGroupId" method="post" enctype="multipart/form-data">
        <input id="img-input" type="file" name="pictures" @change="handleFileUpload" multiple/>
    </form>
	<div id="img-preview">
        <div class="img-frame" v-for="(item, index) in items" :key="item.id" 
            :sequence="index" :id="item.id"
            @mousedown="handleMouseDown"
        >
            <el-image
                :src="getPictureUrl(item)"
                fit="contain"
                :lazy="true"
            ></el-image>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
	name: "PictureUploader",
	props: ['pictureGroupId'],
	data(){
		return {
            //{id: 在列表中的唯一编号，用于实现拖动
            // picture: 若不为null，则为已经上传到服务器端的图片的对象
            // file: 若不为null，则为从本地文件选择的待上传图片}
			items: [],
            nextId : 0,
			draged: null,
		}
	},
	methods:{
        handleFileUpload(event){
            //提交表单
            let files = event.target.files
            for(let file of files){
                this.nextId++
                this.items.push({id: this.nextId, picture: null, file: file})
            }
        },

        getPictureUrl(item){
            if(item.picture != null){
                return "/api/picture/" + item.picture.id
            }else if(item.file != null){
                return window.URL.createObjectURL(item.file)
            }
        },

        handleMouseDown(event){
            //克隆被拖动的节点，并移至鼠标位置--拖动效果
            this.draged = event.target.cloneNode(true)
            this.draged.style = "position: absolute;"
                      + "left: " + (event.clientX - 50) + "px;"
                      + "top:  " + (event.clientY - 50) + "px;"
            document.getElementById("img-preview").append(this.draged)
            
            window.addEventListener("mousemove", this.handleMouseMove)
            window.addEventListener("mouseup", this.handleMouseUpAndLeave)
            window.addEventListener("mouseleave", this.handleMouseUpAndLeave)
        },

        handleMouseMove(event){
            if(this.draged == null) return

            //跟随鼠标
            this.draged.style = "position: absolute;"
                    + "left: " + (event.clientX - 50) + "px;"
                    + "top:  " + (event.clientY - 50) + "px;"

            let elements = document.elementsFromPoint(event.clientX, event.clientY)
            let dragedId = Number(this.draged.getAttribute("id"))
            for(let element of elements){
                //找到鼠标指针所在位置的div
                if(element.className != "img-frame") continue
                let insertAt = Number(element.getAttribute("sequence"))
                if(this.items[insertAt].id == dragedId) continue

                //改变items
                let dragedIndex = this.items.findIndex(item => (item.id == dragedId))
                let dragedItem = this.items.splice(dragedIndex, 1)
                let firstPart = this.items.slice(0, insertAt)
                let lastPart = this.items.slice(insertAt)
                this.items = firstPart.concat(dragedItem).concat(lastPart)
            }
        },

        handleMouseUpAndLeave(){
            window.removeEventListener("mousemove", this.handleMouseMove)
            window.removeEventListener("mouseup", this.handleMouseUpAndLeave)
            window.removeEventListener("mouseleave", this.handleMouseUpAndLeave)

            if(this.draged != null){
                this.draged.parentNode.removeChild(this.draged)
                this.draged = null
            }
        }
    }
}
</script>

<style>
.img-frame{
    float: left;
    height: 100px;
    width: 100px;
    background-color: aqua;
    border: 2px solid var(--el-border-color-base);
}
</style>