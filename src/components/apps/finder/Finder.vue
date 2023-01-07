<template>
  <window v-if="value" type="sidebar-header">
    <template #sidebar>
      <div class="sidebar-container" @contextmenu="onMouseRightClick">
        <div class="window__sidebar--block">
          <div class="window__sidebar--block-title">
            <p>Favorites</p>
          </div>
          <ul class="window__sidebar--block-menu">
            <li class="window__sidebar--block-item">
              <Icon name="Application" color="blue" />
              <a>Applications</a>
            </li>
            <li class="window__sidebar--block-item">
              <Icon name="Clock" color="blue" />
              <a>Recent</a>
            </li>
            <li class="window__sidebar--block-item">
              <Icon name="Airdrop" color="blue" />
              <a>AirDrop</a>
            </li>
            <li class="window__sidebar--block-item">
              <Icon name="Desktop" color="blue" />
              <a>Desktop</a>
            </li>
            <li class="window__sidebar--block-item">
              <Icon name="File" color="blue" />
              <a>Documents</a>
            </li>
            <li class="window__sidebar--block-item">
              <Icon name="Downloads" color="blue" />
              <a>Downloads</a>
            </li>
          </ul>
        </div>
        
        <div class="window__sidebar--block">
          <div class="window__sidebar--block-title">
            <p>iCloud</p>
          </div>
          <ul class="window__sidebar--block-menu">
            <li class="window__sidebar--block-item">
              <Icon name="Tray" color="blue" />
              <a>iCloud Drive</a>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #topbar>
      <p>TopBar</p>
    </template>
  </window>
</template>

<script setup lang="ts">
import Icon from "@/components/ui/Icon/Icon.vue";
import Window from "@/components/ui/Window";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: false
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
}>();

const value = computed({
  get(): boolean {
    return props.modelValue;
  },
  set(val: boolean): void {
    emit("update:modelValue", val);
  }
});

const onMouseRightClick = (event: MouseEvent) => {
  console.log(event);
};
</script>

<style lang="scss" scoped>
@import '@/components/ui/Window/_window.scss';

.sidebar-container {
  padding: 0 8px;
  height: calc(100% - 48px);
}
</style>
