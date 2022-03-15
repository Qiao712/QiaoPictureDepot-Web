<template>
  <div id="login-frame">
    <el-row justify="center" >
      <el-col :sm="24" :md="8" class="radius">
        <h1 style="font-family: sans-serif">QiaoPictureDepot</h1>

        <el-form :model="form" label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="username" placeholder="请输入用户名" name="username"></el-input>
          </el-form-item>	
          <el-form-item label="密码">
            <el-input v-model="password" type="password" placeholder="请输入密码" name="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberMe" name="remember-me">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="$router.push('/register')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data(){
    return {
      msg : "",
      username : "",
      password : "",
      rememberMe : false
    }
  },
  methods:{
    login(){
      let form = new FormData()
      form.append("username", this.username)
      form.append("password", this.password)
      form.append("remember-me", this.rememberMe)
      let vm = this
      axios.post("/api/login", form).then(function(){
        vm.$router.push({name: "albums", query: {pageNo: 1}})
      }).catch(function(){
        vm.msg = "登录失败"
      })
    }
  }
}
</script>
  
<style>
#login-frame{
  background-color: aquamarine;
  background: url("../assets/background.jpg");
  background-position: center;
  width: 100vw;
  height: 100vh;
}
.radius {
  text-align: center;
  border: 2px solid var(--el-border-color-base);
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  background-color:rgb(240, 248, 255, 0.5);
  color:rgb(125, 125, 125);
}
</style>