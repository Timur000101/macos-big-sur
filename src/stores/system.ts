import { useStorage } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { unref } from 'vue';

interface SystemState {
	isDarkMode: boolean;
}

export const useSystemStore = defineStore('system', {
	state: (): SystemState => ({
		isDarkMode: unref(useStorage('theme', false, localStorage))
	}),
	actions: {
		setThemeMode() {
			this.isDarkMode = !this.isDarkMode;
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot));
}
