<template>
  <div class="window-controls">
    <div class="window-controls__btn close"></div>
    <div class="window-controls__btn hide"></div>
    <div class="window-controls__btn full"></div>
  </div>
</template>

<script setup lang="ts">
// const props = withDefaults(defineProps<{}>(), {});
</script>

<style lang="scss" scoped>
.window-controls {
  position: absolute;
  top: 16px;
  left: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 8px;
  z-index: 2;
  
  &__btn {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .close {
    background-color: $red;
  }
  
  .hide {
    background-color: $yellow;
  }
  
  .full {
    background-color: $green;
  }
}
</style>
