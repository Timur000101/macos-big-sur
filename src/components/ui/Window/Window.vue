<template>
	<div ref="window" class="window" :style="windowStyle">
		<div class="window__inner">
			<WindowControls />
			<div v-if="type !== 'simple'" ref="sideBar" class="window__sidebar" :style="sideBarStyle">
				<div class="window__sidebar--inner">
					<div class="window__sidebar--control-wrapper"></div>
					<slot name="sidebar"></slot>
				</div>
				<div class="window__sidebar--separator" @mousedown="onSideBarBorderDown"></div>
			</div>
			<div v-if="type === 'sidebar-header'" class="window__bar" :style="windowBarStyle">
				<div class="window__bar--inner">
					<slot name="topbar"></slot>
				</div>
			</div>
			<div class="border border-top vertical-resize" @mousedown="onTopBorderDown"></div>
			<div class="border border-right horizontal-resize" @mousedown="onRightBorderDown"></div>
			<div class="border border-bottom vertical-resize" @mousedown="onBottomBorderDown"></div>
			<div class="border border-left horizontal-resize" @mousedown="onLeftBorderDown"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getCoords } from '@/utils/dom';
import type { Ref } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';
import './_window.scss';
import WindowControls from './components/WindowControls.vue';

type HtmlType = HTMLElement | null | undefined;
type WindowType = 'simple' | 'sidebar' | 'sidebar-header' | 'sidebar-blocks';

const props = withDefaults(
	defineProps<{
		type: WindowType;
	}>(),
	{
		type: 'simple'
	}
);

const window: Ref<HtmlType> = ref();
const sideBar: Ref<HtmlType> = ref();
const windowCoords: Ref<any> = ref({});
const sideBarCoords: Ref<any> = ref({});
const transformY: Ref<number> = ref(100);
const transformX: Ref<number> = ref(300);
const minHeight: Ref<number> = ref(400);
const minWidth: Ref<number> = ref(400);
const height: Ref<number> = ref(300);
const width: Ref<number> = ref(700);
const windowSideBarWidth: Ref<number> = ref(200);

const windowStyle = computed(() => ({
	transform: `translate(${transformX.value}px, ${transformY.value}px)`,
	height: `${height.value}px`,
	width: `${width.value}px`,
	'min-width': `${minWidth.value}px`,
	'min-height': `${minHeight.value}px`
}));

const sideBarStyle = computed(() => ({
	width: `${windowSideBarWidth.value}px`
}));

const windowBarStyle = computed(() => ({
	left: `${windowSideBarWidth.value}px`,
	width: `calc(100% - ${windowSideBarWidth.value}px)`
}));

const resetMouseMoveHandler = () => {
	document.onmouseup = () => {
		document.onmousemove = null;
	};
};

const onTopBorderDown = () => {
	document.onmousemove = (e) => {
		const delta = Math.floor(e.pageY - windowCoords.value.top);
		const revertDelta = delta > 0 ? -Math.abs(delta) : Math.abs(delta);
		const value = windowCoords.value.height + revertDelta;
		if (minHeight.value <= value) {
			height.value = value;
			transformY.value = e.clientY - 32;
		}
	};
	resetMouseMoveHandler();
};

const onBottomBorderDown = () => {
	document.onmousemove = (e) => {
		const delta = Math.floor(e.pageY - windowCoords.value.bottom);
		const value = windowCoords.value.height + delta;
		if (minHeight.value <= value) {
			height.value = value;
		}
	};
	resetMouseMoveHandler();
};

const onLeftBorderDown = () => {
	document.onmousemove = (e) => {
		const delta = e.pageX - windowCoords.value.left;
		const value = windowCoords.value.width - delta;
		if (minWidth.value <= value) {
			width.value = value;
			transformX.value = e.clientX;
		}
	};
	resetMouseMoveHandler();
};

const onRightBorderDown = () => {
	document.onmousemove = (e) => {
		const delta = e.pageX - windowCoords.value.right;
		const value = windowCoords.value.width + delta;
		if (minWidth.value <= value) {
			width.value = value;
		}
	};
	resetMouseMoveHandler();
};

const onSideBarBorderDown = () => {
	document.onmousemove = (e) => {
		const delta = e.pageX - sideBarCoords.value.right;
		const value = sideBarCoords.value.width + delta;
		if (200 <= value && value <= (window.value as HTMLElement).clientWidth * 0.8) {
			(sideBar.value as HTMLElement).style.width = `${value}px`;
			windowSideBarWidth.value = value;
		}
	};

	resetMouseMoveHandler();
};

watch(
	() => height.value,
	() => {
		windowCoords.value = getCoords(window.value as HTMLElement);
	}
);

watch(
	() => width.value,
	() => {
		windowCoords.value = getCoords(window.value as HTMLElement);
	}
);

onMounted(() => {
	windowCoords.value = getCoords(window.value as HTMLElement);
	sideBarCoords.value = getCoords(sideBar.value as HTMLElement);
});
</script>
