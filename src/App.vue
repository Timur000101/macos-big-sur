<script setup lang="ts">
// import { useSystemStore } from '@/stores/system';
import { RouterView } from 'vue-router';

// const systemStore = useSystemStore();

// const rootStyle = reactive({
// 	'background-image': systemStore.isDarkMode
// 		? `url(${new URL('./components/wallpapers/dark-mode.svg', import.meta.url)}`
// 		: `url(${new URL('./components/wallpapers/light-mode.svg', import.meta.url).href})`
// });
</script>

<template>
	<div class="root">
		<RouterView />
	</div>
</template>

<style lang="scss" scoped>
.root {
	width: 100vw;
	height: 100vh;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-color: #5856d6;
	//	background-image: url('./components/wallpapers/light-mode.svg');
}
</style>
