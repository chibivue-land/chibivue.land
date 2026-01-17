<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useHead } from "#imports";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseButton from "~/components/ui/BaseButton.vue";

const { t } = useI18n();

useHead({
  title: t("meta.community.title"),
  meta: [{ name: "description", content: t("meta.community.description") }],
});

const platforms = computed(() => [
  {
    name: "GitHub",
    description: t("communityPage.github.description"),
    link: "https://github.com/chibivue-land",
    linkText: t("communityPage.github.linkText"),
  },
  {
    name: "Discord",
    description: t("communityPage.discord.description"),
    link: "https://discord.gg/chibivue",
    linkText: t("communityPage.discord.linkText"),
  },
]);

const guidelines = computed(() => [
  {
    title: t("communityPage.guidelines.respect.title"),
    description: t("communityPage.guidelines.respect.description"),
  },
  {
    title: t("communityPage.guidelines.share.title"),
    description: t("communityPage.guidelines.share.description"),
  },
  {
    title: t("communityPage.guidelines.grow.title"),
    description: t("communityPage.guidelines.grow.description"),
  },
]);
</script>

<template>
  <div class="community-page">
    <section class="page-hero section">
      <div class="container">
        <h1 class="page-title">{{ t("communityPage.title") }}</h1>
        <p class="page-description">{{ t("communityPage.description") }}</p>
      </div>
    </section>

    <section class="platforms-section section">
      <div class="container">
        <h2 class="text-center mb-xl">{{ t("communityPage.platformsTitle") }}</h2>
        <div class="platforms-grid grid grid-cols-1 grid-cols-2">
          <BaseCard v-for="platform in platforms" :key="platform.name" padding="lg">
            <h3 class="platform-name">{{ platform.name }}</h3>
            <p class="platform-description">{{ platform.description }}</p>
            <BaseButton :href="platform.link" :external="true" variant="primary" class="mt-lg">
              {{ platform.linkText }}
            </BaseButton>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="guidelines-section section">
      <div class="container">
        <h2 class="text-center mb-xl">{{ t("communityPage.guidelinesTitle") }}</h2>
        <div class="guidelines-grid grid grid-cols-1 grid-cols-3">
          <div
            v-for="(guideline, index) in guidelines"
            :key="guideline.title"
            class="guideline-item"
          >
            <div class="guideline-number">{{ String(index + 1).padStart(2, "0") }}</div>
            <h3 class="guideline-title">{{ guideline.title }}</h3>
            <p class="guideline-description">{{ guideline.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  background: linear-gradient(
    135deg,
    var(--color-background) 0%,
    var(--color-background-secondary) 100%
  );
  text-align: center;
}

.page-title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.page-description {
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.platform-name {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.platform-description {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.guidelines-section {
  background-color: var(--color-background-secondary);
}

.guideline-item {
  text-align: center;
  padding: var(--spacing-lg);
}

.guideline-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  font-family: monospace;
}

.guideline-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.guideline-description {
  color: var(--color-text-muted);
  margin-bottom: 0;
}
</style>
