<script setup lang="ts">
import { useLocalePath } from "#imports";

interface NavItem {
  path: string;
  label: string;
}

defineProps<{
  isOpen: boolean;
  navItems: NavItem[];
}>();

const emit = defineEmits<{
  close: [];
}>();

const localePath = useLocalePath();
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="isOpen" class="backdrop" @click="emit('close')" />
    </Transition>

    <Transition name="mobile-menu">
      <nav v-if="isOpen" class="mobile-menu">
        <div class="mobile-menu-content">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="localePath(item.path)"
            class="mobile-nav-link"
            @click="emit('close')"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal-backdrop);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(300px, 80vw);
  background-color: var(--color-background);
  z-index: var(--z-modal);
  padding: var(--spacing-xl);
  padding-top: calc(64px + var(--spacing-xl));
  box-shadow: var(--shadow-xl);
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.mobile-nav-link {
  display: block;
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background-color: var(--color-background-secondary);
  color: var(--color-primary);
}
</style>
