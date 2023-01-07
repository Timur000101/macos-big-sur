<template>
	<div class="slider__wrapper">
		<div class="slider__icon">
			<Icon :name="props.iconName" color="gray-light" />
		</div>
		<input type="range" :name="props.name" min="0" max="100" class="slider" @change="onChange" />
	</div>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon';

const props = withDefaults(
	defineProps<{
		name?: string;
		iconName?: string;
	}>(),
	{
		name: 'empty',
		iconName: 'Moon'
	}
);

const emit = defineEmits<{
	(e: 'onChange', event: string): void;
}>();

const onChange = (event: Event) => {
	const value = (event.target as HTMLInputElement).value;
	emit('onChange', value);
};
</script>

<style lang="scss" scoped>
.slider {
	width: 100%;
	height: 22px;
	border-radius: 0 16px 16px 0;
	border-top: 1px solid var(--quaternary);
	border-right: 1px solid var(--quaternary);
	border-bottom: 1px solid var(--quaternary);
	-webkit-appearance: none;
	outline: none;
	overflow: hidden;
	background: var(--quaternary);
	//	box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.05);

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--alternate---selected-control---text);
		margin-right: 30px;
		cursor: pointer;
		box-shadow: -409px 0 0 400px var(--alternate---selected-control---text);
		border: 1px solid var(--quaternary);
	}

	&__wrapper {
		display: flex;
		position: relative;
	}

	&__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 22px;
		border-radius: 16px 0 0 16px;
		border-top: 1px solid var(--placeholder-text);
		border-left: 1px solid var(--placeholder-text);
		border-bottom: 1px solid var(--placeholder-text);
		background: var(--alternate---selected-control---text);
	}
}
</style>
