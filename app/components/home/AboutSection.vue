<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseCard from "~/components/ui/BaseCard.vue";

const { t } = useI18n();

const features = computed(() => [
  {
    title: t("about.features.kingdom.title"),
    description: t("about.features.kingdom.description"),
    icon: "🏰",
  },
  {
    title: t("about.features.kawaiko.title"),
    description: t("about.features.kawaiko.description"),
    icon: "🦆",
  },
  {
    title: t("about.features.vue.title"),
    description: t("about.features.vue.description"),
    icon: "🤝",
  },
]);

// Scroll reveal animation
const headerRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement[]>([]);
const isHeaderVisible = ref(false);
const visibleCards = ref<Set<number>>(new Set());

onMounted(() => {
  // Header observer
  const headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isHeaderVisible.value = true;
          headerObserver.disconnect();
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
  );

  if (headerRef.value) {
    headerObserver.observe(headerRef.value);
  }

  // Cards observer with staggered animation
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardsRef.value.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setTimeout(() => {
              visibleCards.value.add(index);
              visibleCards.value = new Set(visibleCards.value);
            }, index * 150);
          }
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  cardsRef.value.forEach((card) => {
    if (card) cardObserver.observe(card);
  });

  onUnmounted(() => {
    headerObserver.disconnect();
    cardObserver.disconnect();
  });
});

const setCardRef = (el: unknown, index: number) => {
  if (el) cardsRef.value[index] = el as HTMLElement;
};
</script>

<template>
  <section class="about-section section" aria-labelledby="about-section-title">
    <div class="container">
      <div
        ref="headerRef"
        class="section-header text-center"
        :class="{ 'header-visible': isHeaderVisible }"
      >
        <div class="section-badge">
          <span class="badge-icon">✨</span>
          <span class="badge-text">About Us</span>
        </div>
        <h2 id="about-section-title" class="section-title">{{ t("about.title") }}</h2>
        <p class="section-subtitle">{{ t("about.subtitle") }}</p>
      </div>

      <div class="features-grid grid grid-cols-1 grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          :ref="(el) => setCardRef(el, index)"
          class="feature-card-wrapper"
          :class="{ 'card-visible': visibleCards.has(index) }"
        >
          <BaseCard>
            <div class="feature-icon" aria-hidden="true">{{ feature.icon }}</div>
            <div class="feature-number">{{ String(index + 1).padStart(2, "0") }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <div class="feature-decoration" />
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Background decorations -->
    <div class="section-bg-decoration" aria-hidden="true">
      <div class="bg-circle bg-circle-1" />
      <div class="bg-circle bg-circle-2" />
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  background-color: var(--color-background-secondary);
  overflow: visible;
}

.about-section .container {
  overflow: visible;
}

/* Section header with reveal animation */
.section-header {
  margin-bottom: var(--spacing-2xl);
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.section-header.header-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  margin-bottom: var(--spacing-lg);
}

.badge-icon {
  font-size: var(--font-size-sm);
}

.badge-text {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.section-title {
  margin-bottom: var(--spacing-sm);
}

.section-subtitle {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
}

/* Card reveal animations */
.feature-card-wrapper {
  opacity: 0;
  transform: translateY(60px) scale(0.95);
  transition:
    opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card-wrapper.card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  animation: float-icon 3s ease-in-out infinite;
}

@keyframes float-icon {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.feature-number {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  font-family: monospace;
  opacity: 0.6;
}

.feature-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.feature-description {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}

.feature-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%);
  opacity: 0;
  transform: scaleX(0);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.feature-card-wrapper:hover .feature-decoration {
  opacity: 0.5;
  transform: scaleX(1);
}

/* Background decorations */
.section-bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  clip-path: inset(0);
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.bg-circle-1 {
  width: 500px;
  height: 500px;
  background: var(--color-primary);
  top: -20%;
  right: -10%;
  animation: float-bg 25s ease-in-out infinite;
}

.bg-circle-2 {
  width: 400px;
  height: 400px;
  background: var(--color-accent);
  bottom: -15%;
  left: -10%;
  animation: float-bg 20s ease-in-out infinite reverse;
}

@keyframes float-bg {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -20px) scale(1.05);
  }
  66% {
    transform: translate(-15px, 10px) scale(0.95);
  }
}

/* Ensure content is above decorations */
.container {
  position: relative;
  z-index: 1;
}
</style>
