<template>
    <div id="img-upload">
        <div class="img-frame" v-for="(item, index) in items" :key="item.id" 
            :sequence="index" :id="item.id"
            @mousedown="handleMouseDown"
        >
            {{item.id}}
        </div>
    </div>

    <p>
        {{items}}
    </p>
</template>

<script>
export default {
    name: "Test",
    data(){ 
        return{
            items:[{id: 0, info: 'a'},
                   {id: 1, info: 'b'},
                   {id: 2, info: 'c'},
                   {id: 3, info: 'd'},],

            draged: null,
        }
    },
    methods:{
        handleMouseDown(event){
            //克隆被拖动的节点，并移至鼠标位置--拖动效果
            this.draged = event.target.cloneNode(true)
            this.draged.style = "position: absolute;"
                      + "left: " + (event.clientX - 50) + "px;"
                      + "top:  " + (event.clientY - 50) + "px;"
            document.getElementById("img-upload").append(this.draged)
            
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