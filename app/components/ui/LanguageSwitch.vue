<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => locales.value.filter((l) => typeof l !== "string"));

const currentLocale = computed(
  () => availableLocales.value.find((l) => l.code === locale.value) || availableLocales.value[0],
);

function switchLocale() {
  const currentIndex = availableLocales.value.findIndex((l) => l.code === locale.value);
  const nextIndex = (currentIndex + 1) % availableLocales.value.length;
  setLocale(availableLocales.value[nextIndex]!.code);
}
</script>

<template>
  <button
    type="button"
    class="language-switch"
    :aria-label="`Current language: ${currentLocale?.name}. Click to switch.`"
    @click="switchLocale"
  >
    <span class="code">{{ locale.toUpperCase() }}</span>
  </button>
</template>

<style scoped>
.language-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  transition: all var(--transition-fast);
  min-height: 44px;
  min-width: 44px;
}

.language-switch:hover {
  background-color: var(--color-background-secondary);
  border-color: var(--color-primary);
}

.code {
  font-family: monospace;
  letter-spacing: 0.05em;
}
</style>
