<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router';

const rootStyle = computed(() => ({
	'background-image': `url(${new URL('./components/wallpapers/light-mode.svg', import.meta.url).href})`
}));
</script>

<template>
	<div class="root" :style="rootStyle">
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
