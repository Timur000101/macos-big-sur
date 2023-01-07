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
              <h6 class="network_control__title">Wi-Fi</h6>
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
              <h6 class="network_control__title">Bluetooth</h6>
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
              <h6 class="network_control__title">AirDrop</h6>
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
          <span>Dark Mode</span>
        </div>
      </widget>
      <widget class="keyboard-brightness-widget">
        <div class="simple-control">
          <Icon name="Keyboard-brightness" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
          <span class="simple-control__title">Keyboard Brightness</span>
        </div>
      </widget>
      <widget class="screen-mirroring-widget">
        <div class="simple-control">
          <Icon name="Pages" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
          <span class="simple-control__title">Screen Mirroring</span>
        </div>
      </widget>
      <widget class="display-control-widget display-widget">
        <div class="display-control-widget__header">
          <span>Display</span>
          <Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
        </div>
        <Slider icon-name="Brightness" />
      </widget>
      <widget class="display-control-widget sound-widget">
        <div class="display-control-widget__header">
          <span>Sound</span>
          <Icon name="Chevron-right" :color="`gray-${systemStore.isDarkMode ? 'light' : 'dark'}`" />
        </div>
        <Slider icon-name="sound-off" />
      </widget>
    </div>
  </widget>
</template>

<script setup lang="ts">
import Icon from "@/components/ui/Icon";
import Slider from "@/components/ui/Slider/Slider.vue";
import Widget from "@/components/ui/Widget";
import { useSystemStore } from "@/stores/system";
import { computed } from "vue";

const systemStore = useSystemStore();

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
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

body.light .network_control {
  &__title {
    color: black;
  }
  
  &__icon {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

body.dark .network_control {
  &__title {
    color: white;
  }
  
  &__icon {
    background-color: rgba(255, 255, 255, 0.1);
  }
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
    color: $light-secondary;
  }
}

.network_control .network_control__icon.active {
  background: $blue;
}

.theme-switch-widget {
  grid-area: b;
}

body.light .theme-switch {
  span {
    color: black;
  }
}

body.dark .theme-switch {
  span {
    color: white;
  }
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
    background: $light-quaternary;
  }
}

.theme-switch__icon.active {
  background: $indigo;
}

.keyboard-brightness-widget {
  grid-area: c;
}

.screen-mirroring-widget {
  grid-area: d;
}

body.light .simple-control {
  span {
    color: black;
  }
}

body.dark .simple-control {
  span {
    color: white;
  }
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

body.light .display-control-widget {
  span {
    color: black;
  }
}

body.dark .display-control-widget {
  span {
    color: white;
  }
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
</style>
