<script setup lang="ts">
import Icon from '@/components/ui/Icon';

const props = defineProps<{
	id: string;
	name: string;
}>();
</script>

<template>
	<li class="dock-item">
		<div class="dock-item__inner">
			<Icon :name="props.id" width="48" height="48" size="custom" />
		</div>
	</li>
</template>

<style lang="scss" scoped>
.dock-item {
	list-style: none;
	transition: 0.2s;
	transform-origin: 50% 100%;

	&__inner {
		img {
			object-fit: cover;
			transition: 0.2s;
		}
	}
}
</style>
