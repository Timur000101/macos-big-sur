<script setup lang="ts">
import Finder from "@/components/apps/finder";
import Dock from "@/components/ui/Dock/";
import StatusBar from "@/components/ui/StatusBar";
import type { Ref } from "vue";
import { ref } from "vue";

const finder: Ref<boolean> = ref(true);
</script>
<template>
  <main>
    <StatusBar />
    <div ref="desktop" class="desktop">
      <Finder v-model="finder" />
    </div>
    <Dock />
  </main>
</template>

<style lang="scss" scoped>
.desktop {
  width: 100vw;
  height: calc(100vh - 32px);
  position: relative;
}
</style>
