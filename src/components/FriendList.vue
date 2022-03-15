<template>
    <el-card class="box-card">
        <div v-for="friendGroup in friendGroups" :key="friendGroup.id" class="text item">
            <h5>{{friendGroup.name}}</h5>
            <div v-for="friend, index in friendGroup.friends" :key="index">
                <div>
                    <p>{{friend.friendUsername}}</p>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import axios from 'axios'
export default {
    name: "FriendList",
    data(){
        return {
            friendGroups: null
        }
    },

    created(){
        let vm = this
        axios.get("/api/friends").then(function(response){
            vm.friendGroups = response.data
        })
    }
}
</script>

<style>

</style>