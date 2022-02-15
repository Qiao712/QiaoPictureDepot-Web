<template>
    <input type="file" id="upload" multiple>
    <input type="file" id="upload-sum" multiple>
</template>

<script>
import {ref} from 'vue'
export default {
    name: "Test",
    setup(){
        let currentPage = ref(Number(1));
        return {
            currentPage
        }
    }
}
</script>

<style>

</style>