<template>
	<head-bar></head-bar>
	<router-view></router-view>
</template>

<script>
import HeadBar from './components/HeadBar.vue'
export default {
	name: 'App',
	components: {
		HeadBar
	},
}
</script>