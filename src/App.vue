<script setup lang="ts">
import { useSystemStore } from '@/stores/system';
import { computed } from 'vue';
import { RouterView } from 'vue-router';

const systemStore = useSystemStore();

const rootStyle = computed(() => {
	return systemStore.isDarkMode
		? `url(${new URL('./components/wallpapers/dark-mode.png', import.meta.url).href}`
		: `url(${new URL('./components/wallpapers/light-mode.png', import.meta.url).href})`;
});
</script>

<template>
	<div class="root" :style="{ 'background-image': rootStyle }">
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
}
</style>
