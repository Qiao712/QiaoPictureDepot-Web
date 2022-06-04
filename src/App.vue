<template>
	<head-bar></head-bar>
	<router-view></router-view>
</template>

<script>
import HeadBar from './components/HeadBar.vue'
import userApi from "@/api/UserApi"
import store from "@/store"

export default {
	name: 'App',
	components: {
		HeadBar
	},

	created(){
    console.log("app created")

    //尝试获取当前用户信息
		userApi.getCurrentUser().then(
			response=>{
        store.setCurrentUser(response.data)
      }
		)
	}
}
</script>