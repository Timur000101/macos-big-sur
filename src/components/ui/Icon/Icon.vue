<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		name: string;
		size: 'medium' | 'small' | 'large' | 'custom';
		alt: string;
	}>(),
	{
		size: 'medium',
		alt: 'null'
	}
);
const icon = computed(() => {
	props.name;
	return new URL(`./icons/${props.name}.svg`, import.meta.url).href;
});

const classes = computed(() => ({
	[`icon-${props.size}`]: props.size
}));
</script>

<template>
	<img :src="icon" v-bind="$attrs" :class="classes" :alt="name" />
</template>

<style lang="scss" scoped>
.icon-medium {
	width: 24px;
	height: 24px;
}

.icon-large {
	width: 32px;
	height: 32px;
}

.icon-small {
	width: 18px;
	height: 18px;
}
</style>
