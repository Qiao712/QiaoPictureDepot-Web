<template>
  <el-popconfirm
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    :icon="InfoFilled"
    icon-color="red"
    title="Are you sure to delete this?"
  >
    <template #reference>
      <delete class="delete-ico" @click="deletePicture(element.id)"/>
    </template>
  </el-popconfirm>
</template>

<script>

export default {
    name: "Test",
}
</script>

<style>

</style>