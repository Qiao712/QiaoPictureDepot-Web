<template>
  <div>
    <el-button style="margin-bottom: 20px" @click="clickFileInput"
      >选择文件</el-button
    >
    <input
      class="file-input"
      hidden
      type="file"
      @change="handleFileSelect"
      multiple
    />

    <draggable
      v-model="items"
      group="items"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <div @dblclick="preview" style="position: relative">
          <!-- 删除按钮 -->
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon-color="red"
            title="是否删除?"
            @confirm="deletePicture(element.id)"
          >
            <template #reference>
              <el-button
                class="delete-button"
                size="small"
                :icon="Delete"
                circle
              >
                <delete style="width: 100%"></delete>
              </el-button>
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
  </div>

  <!-- 大图预览 -->
  <el-dialog v-model="dialogVisible">
    <el-image class="big_img" :src="dialogImageUrl" fit="contain"></el-image>
  </el-dialog>
</template>

<script>
import draggable from "vuedraggable"
import pictureApi from "@/api/PictureApi"
import { Delete } from "@element-plus/icons-vue"

export default {
  name: "PictureGroupUploader",
  props: {
    pictureGroupId: Number,
    title: String,
    albumId: Number,
    //指定行为是 修改/新建
    isUpdate: Boolean,
  },
  components: {
    draggable,
    Delete,
  },
  data() {
    return {
      //{id: 在列表中的唯一编号，用于实现拖动
      // pictureId: 若不为null，则为已经上传到服务器端的图片的对象
      // file: 若不为null，则为从本地文件选择的待上传图片}
      items: [],
      drag: false,
      nextId: 0,
      picturesToDelete: [],

      //大图预览
      dialogVisible: false,
      dialogImageUrl: "",
    }
  },
  created() {
    // watch props参数，改变时再次获取数据
    this.$watch(
      () => this.pictureGroupId,
      () => {
        this.fetchData()
      },
      { immediate: true }
    )
    //监听父组件传来的上传事件
    this.$eventBus.on("upload", this.upload)
  },
  beforeUnmount() {
    this.$eventBus.off("upload", this.upload)
  },

  methods: {
    //如果状态为 更新模式，则获取已上传的图片
    fetchData() {
      if (this.isUpdate && this.pictureGroupId != null) {
        this.items = []

        pictureApi.getPicturesInfoByGroup(this.pictureGroupId).then(
          response=>{
            let pictures = response.data
            for (let picture of pictures) {
              this.items.push({
                id: ++this.nextId,
                pictureId: picture.id,
                file: null,
              })
            }
          }
        )
      }
    },

    //选择图片
    handleFileSelect(event) {
      //收集选择的文件
      let files = event.target.files
      for (let file of files) {
        this.nextId++
        this.items.push({ id: this.nextId, pictureId: null, file: file })
      }
    },
    //获取item代表的图片的url
    getPictureUrl(item) {
      if (item.pictureId != null) {
        return (
          "/api/picture-groups/" +
          this.pictureGroupId +
          "/pictures	/" +
          item.pictureId
        )
      } else if (item.file != null) {
        return window.URL.createObjectURL(item.file)
      }
    },
    //删除一张图片
    deletePicture(id) {
      let index = this.items.findIndex((item) => item.id == id)
      let item = this.items.splice(index, 1)[0]
      if (item.pictureId != null) this.picturesToDelete.push(item.pictureId)
    },
    //预览
    preview(event) {
      let url = (this.dialogImageUrl = event.target.getAttribute("src"))
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    //上传
    upload() {
      //收集并上传选择的图片
      let formData = new FormData()
      for (let item of this.items) {
        if (item.file != null) formData.append("pictures", item.file)
      }

      if(this.isUpdate){
        //修改
        //生成id sequence，新增的图片位置留空(null)
        let idSequence = []
        for (let item of this.items) {
          idSequence.push(item.pictureId)
        }

        let pictureGroupUpdateRequest = {
          title: this.title,
          albumId: this.albumId,
          pictureGroupId: this.pictureGroupId,

          picturesToDelete: this.picturesToDelete,
          idSequence: idSequence,
        }

        formData.set("picture-group", JSON.stringify(pictureGroupUpdateRequest))

        pictureApi.updatePictureGroup(formData).then(
          this.$router.back()
        )
      }else{
        let pictureGroup = {
          pictureGroupId: this.pictureGroupId,
          title: this.title,
          albumId: this.albumId
        }

        //新建
        formData.set("picture-group", JSON.stringify(pictureGroup))

        pictureApi.addPictureGroup(formData).then(
          this.$router.back()
        )
      }
    },

    //点击file input
    clickFileInput() {
      document.querySelector(".file-input").click()
    },
  },
}
</script>

<style scoped>
.small_img {
  height: 150px;
  width: 150px;
  background-color: aliceblue;
  border: 2px solid var(--el-border-color-base);
}
.delete-button {
  z-index: 999;
  margin-right: 8px;
  position: absolute;
  right: 0px;
  bottom: 15px;
}
</style>