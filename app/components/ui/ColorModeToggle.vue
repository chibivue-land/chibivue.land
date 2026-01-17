<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "#imports";

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

function toggle() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <button
    type="button"
    class="color-mode-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <span class="toggle-track" :class="{ dark: isDark }">
      <span class="toggle-thumb" />
    </span>
  </button>
</template>

<style scoped>
.color-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  min-height: 44px;
  min-width: 44px;
}

.toggle-track {
  position: relative;
  width: 40px;
  height: 22px;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast);

  &.dark {
    background-color: var(--color-primary);

    .toggle-thumb {
      transform: translateX(18px);
    }
  }
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform var(--transition-fast);
  box-shadow: var(--shadow-sm);
}
</style>
