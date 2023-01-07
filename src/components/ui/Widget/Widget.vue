<template>
	<div v-if="value" ref="widget" class="widget" :style="computedStyle" v-bind="$attrs">
		<div class="widget__inner">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSystemStore } from "@/stores/system";
import { computed, ref } from "vue";

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

const systemStore = useSystemStore();
const widget = ref(null);

const computedStyle = computed(() => ({
	'background-color': systemStore.isDarkMode ? `rgba(30, 30, 30, .7)` : `rgba(255, 255, 255, ${props.opacity})`,
	padding: `${props.paddingTop} ${props.paddingRight} ${props.paddingBottom} ${props.paddingLeft}`,
	'border-radius': `${props.borderRadius}`
}));
</script>

<style lang="scss" scoped>
.widget {
	border-radius: 20px;

	&__inner {
		width: 100%;
		height: 100%;
	}
}

body.light .widget {
	border: 0.5px solid #f4f5f5;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.16);
}

body.dark .widget {
	border: 0.5px solid rgba(255, 255, 255, 0.26);
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
}
</style>
