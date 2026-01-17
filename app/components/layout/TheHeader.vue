<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLocalePath } from "#imports";
import LanguageSwitch from "~/components/ui/LanguageSwitch.vue";
import ColorModeToggle from "~/components/ui/ColorModeToggle.vue";
import TheMobileMenu from "~/components/layout/TheMobileMenu.vue";

const { t } = useI18n();
const localePath = useLocalePath();
const isMobileMenuOpen = ref(false);

const navItems = computed(() => [
  { path: "/", label: t("nav.home") },
  { path: "/about", label: t("nav.about") },
  { path: "/activities", label: t("nav.activities") },
]);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

watch(
  () => isMobileMenuOpen.value,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  },
);
</script>

<template>
  <header class="header">
    <div class="header-container container">
      <NuxtLink :to="localePath('/')" class="logo" @click="closeMobileMenu">
        <span class="logo-text">chibivue.land</span>
      </NuxtLink>

      <nav class="nav-desktop">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="localePath(item.path)"
          class="nav-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <LanguageSwitch />
        <ColorModeToggle />

        <button
          type="button"
          class="mobile-menu-btn"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
        >
          <span class="hamburger" :class="{ open: isMobileMenuOpen }">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </div>

    <TheMobileMenu :is-open="isMobileMenuOpen" :nav-items="navItems" @close="closeMobileMenu" />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-normal);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: var(--color-text);
  text-decoration: none;
}

.logo:hover {
  color: var(--color-primary);
}

.nav-desktop {
  display: none;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
  }
}

.nav-link {
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--color-text);
  transition: all var(--transition-fast);
  border-radius: var(--radius-full);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
</style>
