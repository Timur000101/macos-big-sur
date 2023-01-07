<script setup lang="ts">
import apps from '@/configs/apps';
import type { Ref } from 'vue';
import { ref } from 'vue';

const dockRoot = ref();
const appsElem: Ref<any[]> = ref([]);
const DOCK_APP_SIZE = 48;
const mousePosition: Ref<number> = ref(0);
const globalScale: Ref<number> = ref(1);
const dockWidth: Ref<any> = ref();
const transformOrigin: Record<string, string> = {
	'-1': 'right',
	'0': 'center',
	'1': 'left'
};

const icon = (name: string) => {
	return new URL(`../Icon/icons/${name}.svg`, import.meta.url).href;
};

function between(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(val, max));
}

function scaling(d: number): number {
	return Math.max(Math.min(-0.2 * Math.pow(d, 2) + 1.05, 1), 0);
}

function scaleIcons() {
	const selectedIndex = Math.floor(mousePosition.value);
	const centerOffset = mousePosition.value - selectedIndex - 0.5;
	const baseOffset = scaleFromDirection(selectedIndex, 0, -centerOffset * DOCK_APP_SIZE);
	let offset = baseOffset * (0.5 - centerOffset);
	for (let i = selectedIndex + 1; i < apps.length; i++) {
		offset += scaleFromDirection(i, 1, offset);
	}
	offset = baseOffset * (0.5 + centerOffset);
	for (let i = selectedIndex - 1; i >= 0; i--) {
		offset += scaleFromDirection(i, -1, -offset);
	}
}

function scaleFromDirection(index: number, direction: number, offset: number): number {
	const center = index + 0.5;
	const distanceFromPointer = mousePosition.value - center;
	const scale = scaling(distanceFromPointer) * globalScale.value;
	appsElem.value[index].style.setProperty('transform', `translateX(${offset}px) scale(${scale + 1})`);
	appsElem.value[index].style.setProperty('transform-origin', `${transformOrigin[direction.toString()]} bottom`);
	return scale * DOCK_APP_SIZE;
}

const handleMouseMove = (event: MouseEvent) => {
	mousePosition.value = between((event.clientX - dockRoot.value.offsetLeft) / DOCK_APP_SIZE, 0, apps.length);
	scaleIcons();
};

const handleMouseLeave = () => {
	dockRoot.value.classList.add('animated');
	apps.forEach((_, index) => {
		appsElem.value[index].style.removeProperty('transform');
		appsElem.value[index].style.removeProperty('transform-origin');
	});
};

const handleMouseEnter = () => {
	dockRoot.value.classList.add('animated');
	setTimeout(() => {
		dockRoot.value.classList.remove('animated');
	}, 100);
};
</script>

<template>
	<div class="dock">
		<ul
			ref="dockRoot"
			class="dock__inner"
			:style="`
        grid-template-columns: repeat(${apps.length}, 1fr);
        width: ${dockWidth}px
     `"
		>
			<!--			@mousemove="handleMouseMove"-->
			<!--			@mouseleave="handleMouseLeave"-->
			<!--			@mouseenter="handleMouseEnter"-->
			<li v-for="app in apps" :key="app.id" class="dock-item">
				<div class="dock-item__inner">
					<img ref="appsElem" :src="icon(app.id)" width="48" height="48" alt="" />
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.dock {
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	position: fixed;
	bottom: 12px;

	&__inner {
		display: grid;
		grid-column-gap: 10px;
		padding: 6px 8px;
		border-radius: 16px;
		background: var(--alternate---content---background);
		position: relative;
	}

	&-item {
		list-style: none;
		transition: 0.2s;
		transform-origin: center bottom;

		&__inner {
			img {
				object-fit: cover;
				transition: 0.2s;
			}
		}
	}
}

.dock__inner.animated .dock-item {
	transition: 0.3s;
	transition-property: transform, transform-origin;
}
</style>
