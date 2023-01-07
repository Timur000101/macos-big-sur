<template>
	<widget v-model="value" class="control-center--widget" border-radius="16px" :opacity="0.75">
		<div class="control-center">
			<widget padding-right="6px" class="network_controls-widget">
				<div class="network_controls">
					<div class="network_control wifi">
						<div class="network_control__icon" :class="{ active: systemStore.wifi }" @click="systemStore.toggleWifi()">
							<Icon name="Wi-Fi" :color="systemStore.wifi ? 'white' : 'gray-dark'" />
						</div>
						<div class="network_control__info">
							<p class="network_control__title title">Wi-Fi</p>
							<span class="network_control__status">My iPhone</span>
						</div>
						<div class="network_control__arrow">
							<Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
						</div>
					</div>

					<div class="network_control bluetooth">
						<div
							class="network_control__icon"
							:class="{ active: systemStore.bluetooth }"
							@click="systemStore.toggleBluetooth()"
						>
							<Icon name="Radio-waves" :color="systemStore.bluetooth ? 'white' : 'gray-dark'" />
						</div>
						<div class="network_control__info">
							<p class="network_control__title title">Bluetooth</p>
							<span class="network_control__status">Off</span>
						</div>
						<div class="network_control__arrow">
							<Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
						</div>
					</div>

					<div class="network_control airdrop">
						<div
							class="network_control__icon"
							:class="{ active: systemStore.airDrop }"
							@click="systemStore.toggleAirDrop()"
						>
							<Icon name="Airdrop" :color="systemStore.airDrop ? 'white' : 'gray-dark'" />
						</div>
						<div class="network_control__info">
							<p class="network_control__title title">AirDrop</p>
							<span class="network_control__status">Off</span>
						</div>
						<div class="network_control__arrow">
							<Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
						</div>
					</div>
				</div>
			</widget>
			<widget class="theme-switch-widget">
				<div class="theme-switch">
					<div
						class="theme-switch__icon"
						:class="{ active: systemStore.isDarkMode }"
						@click="systemStore.toggleThemeMode()"
					>
						<Icon name="Moon" :color="systemStore.isDarkMode ? 'white' : 'gray-dark'" />
					</div>
					<span class="theme-switch__label">Dark Mode</span>
				</div>
			</widget>
			<widget class="keyboard-brightness-widget">
				<div class="simple-control">
					<Icon name="Keyboard-brightness" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
					<span class="simple-control__title title">Keyboard Brightness</span>
				</div>
			</widget>
			<widget class="screen-mirroring-widget">
				<div class="simple-control">
					<Icon name="Pages" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
					<span class="simple-control__title title">Screen Mirroring</span>
				</div>
			</widget>
			<widget class="display-control-widget display-widget">
				<div class="display-control-widget__header">
					<span class="title">Display</span>
					<Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
				</div>
				<Slider icon-name="Brightness" />
			</widget>
			<widget class="display-control-widget sound-widget">
				<div class="display-control-widget__header">
					<span class="title">Sound</span>
					<Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
				</div>
				<Slider icon-name="sound-off" />
			</widget>
		</div>
	</widget>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon';
import Slider from '@/components/ui/Slider/Slider.vue';
import Widget from '@/components/ui/Widget';
import { useSystemStore } from '@/stores/system';
import { computed } from 'vue';

const systemStore = useSystemStore();

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
	z-index: 20;
}

.control-center {
	display: grid;
	grid-template-areas:
		'a b b'
		'a c d'
		'e e e'
		'f f f'
		'g g g';
	grid-gap: 10px;
}

.network_controls-widget {
	grid-area: a;
}

.network_control {
	display: grid;
	grid-template-columns: 28px 1fr 24px;
	grid-column-gap: 8px;
	margin-bottom: 4px;

	&:last-child {
		margin-bottom: 0;
	}

	&__icon {
		width: 28px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 8px;
		border-radius: 50%;
		background-color: var(--quaternary);
	}

	&__info {
		margin-right: 8px;
	}

	&__title {
		font-size: 13px;
		font-weight: 600;
		line-height: 1;
	}

	&__status {
		font-size: 11px;
		font-weight: 400;
		color: var(--secondary);
	}
}

.network_control .network_control__icon.active {
	background: var(--system---blue);
}

.theme-switch-widget {
	grid-area: b;
}

.theme-switch {
	display: flex;
	align-items: center;
	height: 100%;

	&__icon {
		width: 28px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 8px;
		border-radius: 50%;
		background: var(--quaternary);
	}

	&__label {
		color: var(--text);
	}
}

.theme-switch__icon.active {
	background: var(--system---indigo);
}

.keyboard-brightness-widget {
	grid-area: c;
}

.screen-mirroring-widget {
	grid-area: d;
}

.simple-control {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 65px;

	&__title {
		text-align: center;
		font-size: 10px;
	}
}

.display-widget {
	grid-area: e;
}

.display-control-widget {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;

		span {
			font-size: 13px;
			font-weight: 500;
		}
	}
}

.sound-widget {
	grid-area: g;
}

.title {
	color: var(--text);
}
</style>
