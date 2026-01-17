<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BaseButton from "~/components/ui/BaseButton.vue";
import KawaikoEmote from "~/components/kawaiko/KawaikoEmote.vue";

const { t } = useI18n();
</script>

<template>
  <section class="join-section section">
    <div class="container">
      <div class="join-content">
        <div class="join-text">
          <h2 class="join-title">{{ t("join.title") }}</h2>
          <p class="join-description">{{ t("join.description") }}</p>

          <div class="join-links">
            <BaseButton
              href="https://github.com/chibivue-land"
              :external="true"
              variant="primary"
              size="lg"
            >
              <span>GitHub</span>
            </BaseButton>
            <BaseButton
              href="https://discord.gg/chibivue"
              :external="true"
              variant="outline"
              size="lg"
            >
              <span>Discord</span>
            </BaseButton>
          </div>
        </div>

        <div class="join-mascot">
          <KawaikoEmote emote="funny" size="xl" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join-section {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-background-secondary) 100%
  );
  color: #ffffff;
}

.dark .join-section {
  background: linear-gradient(
    135deg,
    var(--color-background-secondary) 0%,
    var(--color-primary) 100%
  );
}

.join-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .join-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.join-text {
  max-width: 500px;
}

.join-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
  color: inherit;
}

.join-description {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: var(--spacing-xl);
}

.join-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 640px) {
  .join-links {
    flex-direction: row;
  }
}

.join-mascot {
  display: none;
}

@media (min-width: 768px) {
  .join-mascot {
    display: block;
  }
}
</style>
