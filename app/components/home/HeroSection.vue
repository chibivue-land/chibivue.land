<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import KingdomScene from "~/components/tres/KingdomScene.vue";
import KawaikoEmote from "~/components/kawaiko/KawaikoEmote.vue";
import BaseButton from "~/components/ui/BaseButton.vue";

const { t } = useI18n();

// Kawaiko emote cycling
type EmoteType = "default" | "funny" | "surprise" | "question" | "warning";
const emotes: EmoteType[] = ["default", "funny", "surprise", "question", "default", "warning"];
const currentEmoteIndex = ref(0);
const currentEmote = computed(() => emotes[currentEmoteIndex.value] ?? "default");
const isTransitioning = ref(false);

let emoteInterval: ReturnType<typeof setInterval> | null = null;

const cycleEmote = () => {
  isTransitioning.value = true;
  setTimeout(() => {
    currentEmoteIndex.value = (currentEmoteIndex.value + 1) % emotes.length;
    isTransitioning.value = false;
  }, 300);
};

onMounted(() => {
  emoteInterval = setInterval(cycleEmote, 4000);
});

onUnmounted(() => {
  if (emoteInterval) clearInterval(emoteInterval);
});

// Parallax effect on scroll
const scrollY = ref(0);
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const parallaxStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.3}px)`,
}));

const titleStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.1}px)`,
  opacity: Math.max(0, 1 - scrollY.value / 500),
}));
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <!-- 3D Background -->
    <div class="hero-background" aria-hidden="true">
      <KingdomScene />
    </div>

    <!-- Floating decorative elements -->
    <div class="hero-decorations" aria-hidden="true">
      <div class="decoration decoration-1" />
      <div class="decoration decoration-2" />
      <div class="decoration decoration-3" />
    </div>

    <!-- Main content -->
    <div class="hero-content" :style="titleStyle">
      <div class="hero-text-container">
        <div class="hero-badge">
          <span class="badge-dot" />
          <span class="badge-text">Welcome to the Kingdom</span>
        </div>

        <h1 id="hero-title" class="hero-title">
          <span class="title-line title-line-1">
            <span class="title-word" style="--delay: 0">chibivue</span>
          </span>
          <span class="title-line title-line-2">
            <span class="title-word title-accent" style="--delay: 1">.land</span>
          </span>
        </h1>

        <p class="hero-tagline">{{ t("hero.subtitle") }}</p>

        <p class="hero-description">{{ t("hero.description") }}</p>

        <div class="hero-actions">
          <BaseButton
            href="https://discord.gg/aVHvmbmSRy"
            :external="true"
            variant="accent"
            size="lg"
            class="btn-glow"
          >
            {{ t("hero.joinDiscord") }}
          </BaseButton>
          <BaseButton
            href="https://book.chibivue.land/"
            :external="true"
            variant="outline"
            size="lg"
          >
            {{ t("hero.learnChibivue") }}
          </BaseButton>
        </div>

        <div class="hero-links">
          <a
            href="https://discord.gg/aVHvmbmSRy"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-link hero-link--discord"
            aria-label="Discord community (opens in new tab)"
          >
            <span class="link-icon" aria-hidden="true">💬</span>
            <span class="link-text">Discord</span>
          </a>
          <a
            href="https://github.com/chibivue-land"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-link hero-link--github"
            aria-label="GitHub organization (opens in new tab)"
          >
            <span class="link-icon" aria-hidden="true">🐙</span>
            <span class="link-text">GitHub</span>
          </a>
        </div>
      </div>

      <div class="hero-mascot" :style="parallaxStyle">
        <!-- Multiple glow layers for dramatic effect -->
        <div class="mascot-glow mascot-glow-outer" aria-hidden="true" />
        <div class="mascot-glow mascot-glow-middle" aria-hidden="true" />
        <div class="mascot-glow mascot-glow-inner" aria-hidden="true" />

        <!-- Floating sparkles around kawaiko -->
        <div class="mascot-sparkles" aria-hidden="true">
          <div v-for="i in 8" :key="`sparkle-${i}`" class="sparkle" :style="{ '--i': i }" />
        </div>

        <!-- Orbiting rings -->
        <div class="orbit-ring orbit-ring-1" aria-hidden="true" />
        <div class="orbit-ring orbit-ring-2" aria-hidden="true" />

        <div class="mascot-wrapper" :class="{ 'mascot-transitioning': isTransitioning }">
          <KawaikoEmote :emote="currentEmote" size="hero" :interactive="true" />
        </div>

        <!-- Speech bubble hint -->
        <div class="mascot-hint">
          <span>Click me!</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll-indicator">
      <div class="scroll-line" />
      <span class="scroll-text">{{ t("hero.scroll") }}</span>
    </div>

    <!-- Bottom gradient fade -->
    <div class="hero-fade" aria-hidden="true" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
  overflow-x: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-decorations {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float-decoration 20s ease-in-out infinite;
}

.decoration-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: 10%;
  left: -10%;
  animation-delay: 0s;
}

.decoration-2 {
  width: 300px;
  height: 300px;
  background: var(--color-accent);
  top: 60%;
  right: -5%;
  animation-delay: -7s;
}

.decoration-3 {
  width: 250px;
  height: 250px;
  background: var(--color-primary);
  bottom: 10%;
  left: 20%;
  animation-delay: -14s;
}

@keyframes float-decoration {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-md);
  padding-top: calc(var(--spacing-3xl) + 60px);
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 640px) {
  .hero-content {
    padding: var(--spacing-xl) var(--spacing-lg);
    padding-top: calc(var(--spacing-3xl) + 60px);
    gap: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .hero-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: var(--spacing-2xl) var(--spacing-2xl);
    gap: var(--spacing-2xl);
  }
}

@media (min-width: 1280px) {
  .hero-content {
    padding: var(--spacing-3xl) var(--spacing-3xl);
    gap: var(--spacing-3xl);
  }
}

.hero-text-container {
  max-width: 600px;
}

@media (min-width: 1024px) {
  .hero-text-container {
    max-width: 550px;
    flex-shrink: 1;
    order: 1;
  }
}

@media (min-width: 1280px) {
  .hero-text-container {
    max-width: 600px;
  }
}

.hero-badge {
  display: none;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  margin-bottom: var(--spacing-lg);
  animation: fade-in-up 0.6s ease-out;
}

@media (min-width: 640px) {
  .hero-badge {
    display: inline-flex;
  }
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.badge-text {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-title {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-lg);
  line-height: 1;
}

.title-line {
  display: block;
  overflow: hidden;
}

.title-word {
  display: inline-block;
  font-size: clamp(2.2rem, 9vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  animation: reveal-text 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--delay) * 0.15s);
  opacity: 0;
  transform: translateY(100%);
}

.title-accent {
  background: linear-gradient(
    135deg,
    var(--color-accent) 0%,
    var(--color-primary) 50%,
    var(--color-accent) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation:
    reveal-text 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    gradient-shift 8s ease-in-out infinite;
  animation-delay: calc(var(--delay) * 0.15s), 0s;
}

@keyframes reveal-text {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-tagline {
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
  animation: fade-in-up 0.6s ease-out 0.3s backwards;
}

.hero-description {
  font-size: var(--font-size-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text);
  max-width: 550px;
  animation: fade-in-up 0.6s ease-out 0.4s backwards;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 640px) {
  .hero-description {
    font-size: var(--font-size-lg);
    -webkit-line-clamp: unset;
    overflow: visible;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  animation: fade-in-up 0.6s ease-out 0.5s backwards;
}

@media (min-width: 640px) {
  .hero-actions {
    flex-direction: row;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
  }
}

.btn-glow {
  position: relative;
}

.btn-glow::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
  border-radius: inherit;
  filter: blur(12px);
  opacity: 0.5;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.btn-glow:hover::before {
  opacity: 0.8;
}

.hero-links {
  display: none;
  align-items: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
  animation: fade-in-up 0.6s ease-out 0.6s backwards;
}

@media (min-width: 640px) {
  .hero-links {
    display: flex;
  }
}

.hero-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.hero-link:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hero-link--discord:hover {
  background: #5865f2;
  color: white;
  border-color: #5865f2;
}

.hero-link--github:hover {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
}

.link-icon {
  font-size: var(--font-size-lg);
}

.link-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.hero-mascot {
  position: relative;
  animation: fade-in-up 0.8s ease-out 0.4s backwards;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  flex-shrink: 0;
  /* Reserve space to prevent CLS */
  width: min(180px, 45vw);
  height: min(180px, 45vw);
}

@media (min-width: 640px) {
  .hero-mascot {
    width: min(220px, 35vw);
    height: min(220px, 35vw);
  }
}

/* Desktop: larger kawaiko on the right side */
@media (min-width: 1024px) {
  .hero-mascot {
    margin-bottom: 0;
    flex-shrink: 0;
    order: 2;
    width: min(320px, 28vw);
    height: min(320px, 28vw);
  }
}

@media (min-width: 1280px) {
  .hero-mascot {
    width: 350px;
    height: 350px;
  }
}

/* Multi-layer glow effect */
.mascot-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.mascot-glow-outer {
  inset: -40%;
  background: radial-gradient(circle at center, var(--color-primary) 0%, transparent 60%);
  opacity: 0.2;
  filter: blur(40px);
  animation: pulse-glow-outer 6s ease-in-out infinite;
}

.mascot-glow-middle {
  inset: -25%;
  background: radial-gradient(circle at center, var(--color-accent) 0%, transparent 65%);
  opacity: 0.25;
  filter: blur(30px);
  animation: pulse-glow-middle 4s ease-in-out infinite;
}

.mascot-glow-inner {
  inset: -10%;
  background: radial-gradient(circle at center, #fff 0%, var(--color-accent) 30%, transparent 70%);
  opacity: 0.15;
  filter: blur(20px);
  animation: pulse-glow-inner 3s ease-in-out infinite;
}

@keyframes pulse-glow-outer {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.15) rotate(5deg);
    opacity: 0.3;
  }
}

@keyframes pulse-glow-middle {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.25;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.35;
  }
}

@keyframes pulse-glow-inner {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.15;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.25;
  }
}

/* Floating sparkles */
.mascot-sparkles {
  position: absolute;
  inset: -30%;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow:
    0 0 10px var(--color-accent),
    0 0 20px var(--color-accent);
  animation: sparkle-float 4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.5s);
}

.sparkle:nth-child(1) {
  top: 10%;
  left: 20%;
}
.sparkle:nth-child(2) {
  top: 20%;
  right: 15%;
}
.sparkle:nth-child(3) {
  top: 50%;
  left: 5%;
}
.sparkle:nth-child(4) {
  top: 70%;
  right: 10%;
}
.sparkle:nth-child(5) {
  bottom: 20%;
  left: 15%;
}
.sparkle:nth-child(6) {
  bottom: 10%;
  right: 25%;
}
.sparkle:nth-child(7) {
  top: 35%;
  left: 10%;
}
.sparkle:nth-child(8) {
  bottom: 35%;
  right: 5%;
}

@keyframes sparkle-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-15px) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translateY(-5px) scale(0.8);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-20px) scale(1.1);
    opacity: 0.9;
  }
}

/* Orbiting rings - hidden on mobile for performance */
.orbit-ring {
  position: absolute;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  opacity: 0.3;
  pointer-events: none;
  display: none;
}

@media (min-width: 1024px) {
  .orbit-ring {
    display: block;
  }
}

.orbit-ring-1 {
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  animation: orbit-spin 15s linear infinite;
  border-style: dashed;
}

.orbit-ring-2 {
  width: 140%;
  height: 140%;
  top: -20%;
  left: -20%;
  animation: orbit-spin 20s linear infinite reverse;
  border-width: 1px;
}

@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Mobile sparkles - simplified */
@media (max-width: 1023px) {
  .mascot-sparkles {
    display: none;
  }

  .mascot-glow-outer {
    display: none;
  }
}

.mascot-wrapper {
  position: relative;
  z-index: 2;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.3s ease;
}

.mascot-transitioning {
  transform: scale(0.9) rotate(-10deg);
  opacity: 0.5;
}

/* Speech bubble hint */
.mascot-hint {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  opacity: 0;
  animation: hint-pulse 3s ease-in-out infinite 2s;
  z-index: 3;
}

.mascot-hint::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border);
}

@keyframes hint-pulse {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(5px);
  }
  20%,
  80% {
    opacity: 0.8;
    transform: translateX(-50%) translateY(0);
  }
}

.hero-scroll-indicator {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  display: none;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  z-index: 2;
  animation: fade-in-up 0.6s ease-out 1s backwards;
}

@media (min-width: 768px) {
  .hero-scroll-indicator {
    display: flex;
  }
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--color-text-muted), transparent);
  animation: scroll-line 2s ease-in-out infinite;
}

@keyframes scroll-line {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(0.5);
    opacity: 0.5;
  }
}

.scroll-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, var(--color-background));
  z-index: 1;
  pointer-events: none;
}
</style>
