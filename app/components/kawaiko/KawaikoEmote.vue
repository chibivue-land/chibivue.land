<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  emote?: "default" | "angry" | "funny" | "question" | "surprise" | "warning";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "hero";
  animate?: boolean;
  interactive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  emote: "default",
  size: "md",
  animate: true,
  interactive: true,
});

const emoteMap = {
  default: "kawaiko.png",
  angry: "kawaiko_angry.png",
  funny: "kawaiko_funny.png",
  question: "kawaiko_question.png",
  surprise: "kawaiko_surprise.png",
  warning: "kawaiko_warning.png",
};

const imageUrl = computed(
  () => `https://raw.githubusercontent.com/chibivue-land/art/main/${emoteMap[props.emote]}`,
);

const isClicked = ref(false);
const isHovered = ref(false);

function handleClick() {
  if (!props.interactive) return;
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 600);
}

function handleMouseEnter() {
  if (props.interactive) isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
}
</script>

<template>
  <span
    class="kawaiko-emote"
    :class="[
      `kawaiko-emote--${props.size}`,
      {
        'kawaiko-emote--animate': props.animate,
        'kawaiko-emote--interactive': props.interactive,
        'kawaiko-emote--clicked': isClicked,
        'kawaiko-emote--hovered': isHovered,
      },
    ]"
    :role="props.interactive ? 'button' : undefined"
    :tabindex="props.interactive ? 0 : undefined"
    :aria-label="props.interactive ? `kawaiko ${props.emote} - click to interact` : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="kawaiko-shadow" aria-hidden="true" />
    <img
      :src="imageUrl"
      :alt="`kawaiko ${props.emote}`"
      class="kawaiko-img"
      width="500"
      height="500"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
    <span v-if="isClicked" class="kawaiko-sparkles" aria-hidden="true">
      <span class="sparkle sparkle-1" />
      <span class="sparkle sparkle-2" />
      <span class="sparkle sparkle-3" />
      <span class="sparkle sparkle-4" />
    </span>
  </span>
</template>

<style scoped>
.kawaiko-emote {
  display: inline-block;
  position: relative;
  cursor: default;
}

.kawaiko-emote--interactive {
  cursor: pointer;
}

.kawaiko-emote--interactive:hover .kawaiko-img,
.kawaiko-emote--interactive:focus .kawaiko-img {
  transform: scale(1.1) rotate(5deg);
}

.kawaiko-emote--interactive:hover .kawaiko-shadow,
.kawaiko-emote--interactive:focus .kawaiko-shadow {
  transform: scale(1.2);
  opacity: 0.8;
}

.kawaiko-emote--interactive:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 50%;
}

.kawaiko-emote--sm {
  width: 48px;
  height: 48px;
}

.kawaiko-emote--md {
  width: 80px;
  height: 80px;
}

.kawaiko-emote--lg {
  width: 120px;
  height: 120px;
}

.kawaiko-emote--xl {
  width: 200px;
  height: 200px;
}

.kawaiko-emote--2xl {
  width: 280px;
  height: 280px;
}

.kawaiko-emote--3xl {
  width: 360px;
  height: 360px;
}

.kawaiko-emote--4xl {
  width: 450px;
  height: 450px;
}

.kawaiko-emote--5xl {
  width: 550px;
  height: 550px;
}

.kawaiko-emote--hero {
  width: min(180px, 45vw);
  height: auto;
  aspect-ratio: 1;
}

@media (min-width: 640px) {
  .kawaiko-emote--hero {
    width: min(220px, 35vw);
  }
}

@media (min-width: 1024px) {
  .kawaiko-emote--hero {
    width: min(380px, 30vw);
  }
}

@media (min-width: 1280px) {
  .kawaiko-emote--hero {
    width: 420px;
  }
}

.kawaiko-emote--animate {
  animation: float 4s ease-in-out infinite;
}

.kawaiko-emote--animate .kawaiko-shadow {
  animation: shadow-pulse 4s ease-in-out infinite;
}

.kawaiko-emote--clicked .kawaiko-img {
  animation: bounce-jump 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.kawaiko-shadow {
  position: absolute;
  bottom: -10%;
  left: 10%;
  width: 80%;
  height: 20%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
  filter: blur(4px);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.kawaiko-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(-12px) rotate(2deg);
  }

  50% {
    transform: translateY(-8px) rotate(0deg);
  }

  75% {
    transform: translateY(-14px) rotate(-2deg);
  }
}

@keyframes shadow-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  25% {
    transform: scale(0.85);
    opacity: 0.7;
  }

  50% {
    transform: scale(0.9);
    opacity: 0.8;
  }

  75% {
    transform: scale(0.8);
    opacity: 0.65;
  }
}

@keyframes bounce-jump {
  0% {
    transform: scale(1) rotate(0deg);
  }

  15% {
    transform: scale(0.9) rotate(-5deg);
  }

  40% {
    transform: scale(1.2) rotate(10deg) translateY(-30px);
  }

  60% {
    transform: scale(1.1) rotate(-5deg) translateY(-10px);
  }

  80% {
    transform: scale(1.05) rotate(3deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

.kawaiko-sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  animation: sparkle-burst 0.6s ease-out forwards;
}

.sparkle-1 {
  top: 10%;
  left: 20%;
  animation-delay: 0s;
  --tx: -30px;
  --ty: -40px;
}

.sparkle-2 {
  top: 20%;
  right: 15%;
  animation-delay: 0.1s;
  --tx: 40px;
  --ty: -35px;
}

.sparkle-3 {
  bottom: 30%;
  left: 10%;
  animation-delay: 0.15s;
  --tx: -35px;
  --ty: 20px;
}

.sparkle-4 {
  bottom: 20%;
  right: 20%;
  animation-delay: 0.05s;
  --tx: 35px;
  --ty: 15px;
}

@keyframes sparkle-burst {
  0% {
    transform: scale(0) translate(0, 0);
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1.5) translate(var(--tx, 20px), var(--ty, -30px));
    opacity: 0;
  }
}
</style>
