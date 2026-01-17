<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  tilt?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  padding: "md",
  tilt: true,
});

const cardRef = ref<HTMLElement | null>(null);
const tiltX = ref(0);
const tiltY = ref(0);
const glowX = ref(50);
const glowY = ref(50);
const isHovered = ref(false);

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value || !props.tilt) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  tiltX.value = (y - 0.5) * 12;
  tiltY.value = -(x - 0.5) * 12;
  glowX.value = x * 100;
  glowY.value = y * 100;
}

function handleMouseEnter() {
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
  tiltX.value = 0;
  tiltY.value = 0;
}

const cardStyle = computed(() => {
  if (!props.tilt) return {};
  return {
    transform: isHovered.value
      ? `perspective(1000px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale3d(1.02, 1.02, 1.02)`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
  };
});

const glowStyle = computed(() => ({
  background: isHovered.value
    ? `radial-gradient(circle at ${glowX.value}% ${glowY.value}%, var(--color-accent) 0%, transparent 50%)`
    : "none",
  opacity: isHovered.value ? 0.15 : 0,
}));
</script>

<template>
  <div
    ref="cardRef"
    class="base-card"
    :class="[
      `base-card--padding-${props.padding}`,
      { 'base-card--hover': props.hover },
      { 'base-card--tilt': props.tilt },
      { 'base-card--hovered': isHovered },
    ]"
    :style="cardStyle"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card-glow" :style="glowStyle" />
    <div class="card-content">
      <slot />
    </div>
    <div class="card-shine" />
  </div>
</template>

<style scoped>
.base-card {
  position: relative;
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;
  overflow: hidden;
  will-change: transform;
}

.base-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(212, 175, 55, 0.2) 50%,
    transparent 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.base-card--tilt {
  transform-style: preserve-3d;
}

.base-card--padding-sm {
  padding: var(--spacing-md);
}

.base-card--padding-md {
  padding: var(--spacing-lg);
}

.base-card--padding-lg {
  padding: var(--spacing-xl);
}

.base-card--hover:hover {
  box-shadow:
    var(--shadow-xl),
    0 0 40px rgba(212, 175, 55, 0.1);
}

.base-card--hovered .card-shine {
  opacity: 1;
}

.base-card--hovered::before {
  opacity: 1;
}

.card-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 60%
  );
  pointer-events: none;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
