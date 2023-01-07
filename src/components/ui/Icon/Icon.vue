<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		name: string;
		size?: 'medium' | 'small' | 'large' | 'custom';
		color?: string;
	}>(),
	{
		size: 'medium',
		color: 'white'
	}
);
const icon = computed(() => {
	props.name;
	return new URL(`./icons/${props.name}.svg`, import.meta.url).href;
});

const classes = computed(() => ({
	[`icon-${props.size}`]: props.size,
	[`${props.color}-icon`]: props.color
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
	width: 12px;
	height: 12px;
}

.blue-icon {
	filter: brightness(0) saturate(100%) invert(34%) sepia(34%) saturate(6947%) hue-rotate(200deg) brightness(102%)
		contrast(103%);
}

.white-icon {
	filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(333deg) brightness(103%)
		contrast(101%);
}

.dark-icon {
	filter: brightness(0) saturate(100%) invert(10%) sepia(24%) saturate(6%) hue-rotate(358deg) brightness(97%)
		contrast(96%);
}

.gray-dark-icon {
	filter: brightness(0) saturate(100%) invert(48%) sepia(0%) saturate(3716%) hue-rotate(301deg) brightness(83%)
		contrast(79%);
}

.gray-light-icon {
	filter: brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(3411%) hue-rotate(51deg) brightness(111%)
		contrast(80%);
}
</style>
