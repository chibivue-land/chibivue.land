<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  external: false,
  disabled: false,
});

const classes = computed(() => [
  "base-btn",
  `base-btn--${props.variant}`,
  `base-btn--${props.size}`,
  { "base-btn--disabled": props.disabled },
]);
</script>

<template>
  <NuxtLink v-if="href && !external" :to="href" :class="classes">
    <slot />
  </NuxtLink>
  <a
    v-else-if="href && external"
    :href="href"
    :class="classes"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <button v-else :class="classes" :disabled="disabled" type="button">
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  min-height: 44px;
  min-width: 44px;
}

.base-btn--sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.base-btn--md {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-base);
}

.base-btn--lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

.base-btn--primary {
  background-color: var(--color-primary);
  color: #ffffff;
}

.base-btn--primary:hover:not(.base-btn--disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.base-btn--accent {
  background-color: var(--color-accent);
  color: #1a1a1a;
}

.base-btn--accent:hover:not(.base-btn--disabled) {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.base-btn--outline {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.base-btn--outline:hover:not(.base-btn--disabled) {
  background-color: var(--color-primary);
  color: #ffffff;
}

.base-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
