<template>
	<div v-if="value" ref="widget" class="widget" :style="computedStyle" v-bind="$attrs">
		<div class="widget__inner">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
	defineProps<{
		modelValue?: boolean;
		paddingTop?: string;
		paddingRight?: string;
		paddingBottom?: string;
		paddingLeft?: string;
		borderRadius?: string;
		opacity?: number;
	}>(),
	{
		modelValue: true,
		paddingTop: '10px',
		paddingRight: '10px',
		paddingBottom: '10px',
		paddingLeft: '10px',
		borderRadius: '10px',
		opacity: 1
	}
);

const emit = defineEmits<{
	(e: 'update:modelValue', val: boolean): void;
}>();

const value = computed({
	get(): boolean {
		return props.modelValue as boolean;
	},
	set(val: boolean): void {
		emit('update:modelValue', val);
	}
});

const widget = ref(null);

const computedStyle = computed(() => ({
	padding: `${props.paddingTop} ${props.paddingRight} ${props.paddingBottom} ${props.paddingLeft}`,
	'border-radius': `${props.borderRadius}`
}));
</script>

<style lang="scss" scoped>
.widget {
	border-radius: 20px;
	background-color: var(--widget-background);
	box-shadow: 0px 10px 10px var(--shadows---large);
	backdrop-filter: blur(48px);

	&__inner {
		width: 100%;
		height: 100%;
	}
}
</style>
