<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLocalePath } from "#imports";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseButton from "~/components/ui/BaseButton.vue";

const { t } = useI18n();
const localePath = useLocalePath();

const activities = computed(() => [
  {
    title: t("activities.items.learning.title"),
    description: t("activities.items.learning.description"),
  },
  {
    title: t("activities.items.building.title"),
    description: t("activities.items.building.description"),
  },
  {
    title: t("activities.items.sharing.title"),
    description: t("activities.items.sharing.description"),
  },
]);
</script>

<template>
  <section class="activities-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">{{ t("activities.title") }}</h2>
        <p class="section-subtitle">{{ t("activities.subtitle") }}</p>
      </div>

      <div class="activities-grid grid grid-cols-1 grid-cols-3">
        <BaseCard v-for="(activity, index) in activities" :key="activity.title">
          <div class="activity-number">{{ String(index + 1).padStart(2, "0") }}</div>
          <h3 class="activity-title">{{ activity.title }}</h3>
          <p class="activity-description">{{ activity.description }}</p>
        </BaseCard>
      </div>

      <div class="activities-cta text-center mt-xl">
        <BaseButton :href="localePath('/activities')" variant="primary">
          {{ t("activities.viewAll") }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.activities-section {
  overflow: visible;
}

.section-header {
  margin-bottom: var(--spacing-2xl);
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

.activity-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  font-family: monospace;
}

.activity-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.activity-description {
  color: var(--color-text-muted);
  margin-bottom: 0;
}
</style>
