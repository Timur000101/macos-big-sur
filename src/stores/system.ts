import { useDark, useStorage, useToggle } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { unref } from 'vue';

interface SystemState {
	isDarkMode: boolean;
	wifi: boolean;
	bluetooth: boolean;
	airDrop: boolean;
}

const dark = useDark({
	selector: 'body',
	attribute: 'class',
	valueDark: 'dark',
	valueLight: 'light'
});
const toggleDark = useToggle(dark);

export const useSystemStore = defineStore('system', {
	state: (): SystemState => ({
		isDarkMode: unref(useStorage('isDark', dark, localStorage)),
		wifi: true,
		bluetooth: true,
		airDrop: true
	}),

	actions: {
		toggleThemeMode() {
			toggleDark();
			this.isDarkMode = !this.isDarkMode;
		},
		toggleWifi() {
			this.wifi = !this.wifi;
		},
		toggleBluetooth() {
			this.bluetooth = !this.bluetooth;
		},
		toggleAirDrop() {
			this.airDrop = !this.airDrop;
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot));
}
