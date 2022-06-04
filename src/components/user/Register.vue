<template>
  <div id="login-frame">
    <el-row justify="center" >
      <el-col :sm="24" :md="8" class="radius">
        <h1 style="font-family: sans-serif">QiaoPictureDepot</h1>

        <el-form :model="form" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="username" placeholder="请输入用户名" name="username-register"></el-input>
          </el-form-item>	
          
          <el-form-item label="密码">
            <el-input v-model="password" type="password" placeholder="请输入密码" name="password-register"></el-input>
          </el-form-item>
          
          <el-form-item label="确认密码">
            <el-input v-model="checkPassword" type="password" placeholder="请再次输入密码" name="password-register"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userApi from "@/api/UserApi"
import {showSuccessMessage} from "@/utils/Message"

export default {
  name: 'Register',
  data(){
    return {
      username : "",
      password : "",
      checkPassword: "",
    }
  },
  methods:{
    register(){
      if(this.password != this.checkPassword){
        showSuccessMessage("两次输入的密码不一致，请重新输入")
        return
      }
      let registerRequest = {
        username: this.username,
        password: this.password
      }
      userApi.register(registerRequest).then(
        this.$router.push({name: "login"})
      )
    },
  }
}
</script>
  
<style>

</style>