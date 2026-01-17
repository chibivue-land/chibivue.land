<script setup lang="ts">
import { useRoute } from "vue-router";
import TheHeader from "~/components/layout/TheHeader.vue";
import TheFooter from "~/components/layout/TheFooter.vue";

const route = useRoute();
</script>

<template>
  <div class="layout">
    <TheHeader />
    <main class="main" :key="route.path">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
</style>
