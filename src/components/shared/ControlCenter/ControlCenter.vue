<template>
	<widget v-model="value" class="control-center--widget">
		<div class="control-center">
			<widget>
				<p>Hello</p>
			</widget>
		</div>
	</widget>
</template>

<script setup lang="ts">
import Widget from '@/components/ui/Widget';
import { computed } from 'vue';

const props = defineProps<{
	modelValue: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', val: boolean): void;
}>();

const value = computed({
	get(): boolean {
		return props.modelValue;
	},
	set(val: boolean): void {
		emit('update:modelValue', val);
	}
});
</script>

<style lang="scss" scoped>
.control-center--widget {
	position: fixed;
	top: 36px;
	right: 4px;
}
</style>
