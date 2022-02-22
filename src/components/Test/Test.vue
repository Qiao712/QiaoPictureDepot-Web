<template>
    <div id="img-upload" style="background-color: antiquewhite; float: left">
        <div class="img-frame" key="1">
            1
        </div>

        <div class="img-frame" key="1" @mousedown="handleMouseDown">
            2
        </div>

        <div class="img-frame" key="2">
            3
        </div>

        <div class="img-frame" key="3">
            4
        </div>

        <div class="img-frame" key="4">
            5
        </div>

        <div class="img-frame" key="5" >
            6
        </div>
    </div>

    <ul>
        <li draggable="true">1111</li>
        <li draggable="true">2222</li>
        <li draggable="true">3333</li>
    </ul>
</template>

<script>
export default {
    name: "Test",
    data(){
        return {
            dragedTemp: null,
            draged: null
        }
    },
    methods:{
        handleMouseMove(event){
            if(this.dragedTemp == null || this.draged == null) return

            this.dragedTemp.style = "position: absolute;"
                    + "left: " + (event.clientX - 50) + "px;"
                    + "top:  " + (event.clientY - 50) + "px;"
        

            let elements = document.elementsFromPoint(event.clientX, event.clientY)
            let beforeThis = null
            for(let i = 0; i<elements.length; i++){
                if(elements[i].className == "img-frame" && Number(elements[i].innerText) != 2){
                    beforeThis = elements[i]
                    break
                }
            }

            if(beforeThis != null){
                let imgUploadDiv = document.getElementById("img-upload")
                imgUploadDiv.removeChild(this.draged)
                imgUploadDiv.insertBefore(this.draged, beforeThis)
            }
        },

        handleMouseDown(event){
            //克隆被拖动的节点，并移至鼠标位置--拖动效果
            this.dragedTemp = event.target.cloneNode(true)
            this.dragedTemp.style = "position: absolute;"
                      + "left: " + (event.clientX - 50) + "px;"
                      + "top:  " + (event.clientY - 50) + "px;"
            document.getElementById("img-upload").append(this.dragedTemp)

            //被拖动的目标
            this.draged = event.target
            this.draged.style = "background-color: red"

            //添加监听器，使节点跟随鼠标移动--拖动效果
            window.addEventListener("mouseup", this.handleMouseUp, true)
            window.addEventListener("mousemove", this.handleMouseMove, true)
        },

        handleMouseUp(){
            window.removeEventListener("mouseup", this.handleMouseUp) 
            window.removeEventListener("mousemove", this.handleMouseMove)

            //移除被拖动的临时节点
            if(this.dragedTemp != null){
                this.dragedTemp.parentNode.removeChild(this.dragedTemp)
                this.dragedTemp = null
                this.draged = null
            }
        },
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