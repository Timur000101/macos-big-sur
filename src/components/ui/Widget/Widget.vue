<template>
	<div v-if="value" ref="widget" class="widget" :style="computedStyle" v-bind="$attrs">
		<div class="widget__inner">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import variables from '@/app.module.scss';
import { useSystemStore } from '@/stores/system';
import { onClickOutside } from '@vueuse/core';
import { computed, ref } from 'vue';

const props = withDefaults(
	defineProps<{
		modelValue?: boolean;
		paddingVertical: string;
		paddingHorizontal: string;
	}>(),
	{
		modelValue: true,
		paddingVertical: '10px',
		paddingHorizontal: '10px'
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

const systemStore = useSystemStore();
const widget = ref(null);

const computedStyle = computed(() => ({
	background: systemStore.isDarkMode ? variables.dark : variables.white,
	padding: `${props.paddingVertical} ${props.paddingHorizontal}`
}));

onClickOutside(widget, () => emit('update:modelValue', false));
</script>

<style lang="scss" scoped>
.widget {
	border-radius: 20px;
	box-shadow: $shadow;
}
</style>
