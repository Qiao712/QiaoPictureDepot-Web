<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :span="6" :offset="1" style="float: left">
        <div class="block" style="float: left">
          <el-avatar :size="100" :src="circleUrl"></el-avatar>
        </div>
        
        <div style="float: left; margin: 10px">
          <p>图片数量: </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserSpace'
}
</script>
