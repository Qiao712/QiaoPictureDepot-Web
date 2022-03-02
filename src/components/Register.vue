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
					<el-form-item label="邀请码">
                        <el-input v-model="invitationCode" placeholder="请输入邀请码" name="invitation-code"></el-input>
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
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
	name: 'Register',
	data(){
		return {
			msg : "",
			username : "",
			password : "",
            checkPassword: "",
            invitationCode: ""
		}
	},
	methods:{
		register(){
			let formData = new FormData();
            formData.set("username", this.username)
            formData.set("password", this.password)
            formData.set("invitationCode", this.invitationCode)
            axios.post("/api/register", formData).then(this.message).catch(this.message)
		},

        //提示信息
        message(response){
            ElMessage({
                showClose: true,
                message: response.status == 200 ? '操作成功' : '操作失败',
                type: response.status == 200 ? 'success' : 'error',
                duration: 2000
            })

            if(response.status == 200) this.$router.push("/login")
        },
	}
}
</script>
  
<style>

</style>