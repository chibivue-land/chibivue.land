<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useHead } from "#imports";
import KawaikoEmote from "~/components/kawaiko/KawaikoEmote.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseButton from "~/components/ui/BaseButton.vue";

const { t } = useI18n();

useHead({
  title: t("meta.about.title"),
  meta: [{ name: "description", content: t("meta.about.description") }],
});

const milestones = computed(() => [
  {
    year: "2023",
    title: t("aboutPage.milestones.birth.title"),
    description: t("aboutPage.milestones.birth.description"),
  },
  {
    year: "2024",
    title: t("aboutPage.milestones.growth.title"),
    description: t("aboutPage.milestones.growth.description"),
  },
  {
    year: t("aboutPage.milestones.future.year"),
    title: t("aboutPage.milestones.future.title"),
    description: t("aboutPage.milestones.future.description"),
  },
]);
</script>

<template>
  <div class="about-page">
    <section class="page-hero section">
      <div class="container">
        <h1 class="page-title">{{ t("aboutPage.title") }}</h1>
        <p class="page-description">{{ t("aboutPage.description") }}</p>
      </div>
    </section>

    <section class="story-section section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>{{ t("aboutPage.story.title") }}</h2>
            <p>
              <i18n-t keypath="aboutPage.story.p1" tag="span">
                <template #founder>
                  <a
                    href="https://github.com/ubugeeei"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="story-link"
                  >
                    ubugeeei
                  </a>
                </template>
                <template #book>
                  <a
                    href="https://book.chibivue.land"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="story-link"
                  >
                    book.chibivue.land
                  </a>
                </template>
              </i18n-t>
            </p>
            <p>{{ t("aboutPage.story.p2") }}</p>
            <p>{{ t("aboutPage.story.p3") }}</p>
          </div>
          <div class="story-mascot">
            <KawaikoEmote emote="surprise" size="xl" />
          </div>
        </div>
      </div>
    </section>

    <section class="milestones-section section">
      <div class="container">
        <h2 class="text-center mb-xl">{{ t("aboutPage.milestones.title") }}</h2>
        <div class="milestones-timeline">
          <div v-for="milestone in milestones" :key="milestone.year" class="milestone-item">
            <div class="milestone-year">{{ milestone.year }}</div>
            <div class="milestone-content">
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="kawaiko-section section">
      <div class="container">
        <BaseCard padding="lg">
          <div class="kawaiko-content">
            <div class="kawaiko-avatar">
              <KawaikoEmote emote="default" size="lg" />
            </div>
            <div class="kawaiko-info">
              <h2>{{ t("aboutPage.kawaiko.title") }}</h2>
              <p>{{ t("aboutPage.kawaiko.description") }}</p>
              <ul class="kawaiko-facts">
                <li>{{ t("aboutPage.kawaiko.fact1") }}</li>
                <li>{{ t("aboutPage.kawaiko.fact2") }}</li>
                <li>{{ t("aboutPage.kawaiko.fact3") }}</li>
              </ul>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>

    <section class="kingdom-section section">
      <div class="container">
        <h2 class="text-center mb-xl">{{ t("aboutPage.kingdom.title") }}</h2>
        <div class="kingdom-lore-container">
          <div class="kingdom-lore-scroll">
            <p class="kingdom-lore">{{ t("aboutPage.kingdom.lore1") }}</p>
            <p class="kingdom-lore">{{ t("aboutPage.kingdom.lore2") }}</p>
            <p class="kingdom-lore">{{ t("aboutPage.kingdom.lore3") }}</p>
            <p class="kingdom-lore">{{ t("aboutPage.kingdom.lore4") }}</p>
            <p class="kingdom-lore-note">{{ t("aboutPage.kingdom.loreNote") }}</p>
          </div>
          <div class="kingdom-entrance">
            <p class="entrance-text">{{ t("aboutPage.kingdom.entrance") }}</p>
            <BaseButton
              href="https://discord.gg/aVHvmbmSRy"
              :external="true"
              variant="accent"
              size="lg"
            >
              {{ t("aboutPage.kingdom.enterButton") }}
            </BaseButton>
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

.story-content {
  display: grid;
  gap: var(--spacing-2xl);
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
}

.story-text {
  h2 {
    margin-bottom: var(--spacing-lg);
  }

  p {
    line-height: var(--leading-relaxed);
  }
}

.story-mascot {
  display: none;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex;
  }
}

.milestones-section {
  background-color: var(--color-background-secondary);
}

.milestones-timeline {
  max-width: 600px;
  margin: 0 auto;
}

.milestone-item {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--color-border);
}

.milestone-item:last-child {
  border-bottom: none;
}

.milestone-year {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-accent);
  min-width: 80px;
}

.milestone-content h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
}

.milestone-content p {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.kawaiko-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: var(--spacing-2xl);
  }
}

.kawaiko-avatar {
  flex-shrink: 0;
  text-align: center;
  max-width: 150px;

  @media (min-width: 768px) {
    max-width: 180px;
  }
}

.kawaiko-info {
  flex: 1;
  min-width: 0;
}

.kawaiko-info h2 {
  margin-bottom: var(--spacing-md);
}

.kawaiko-facts {
  margin-top: var(--spacing-md);
  padding-left: var(--spacing-lg);
}

.kawaiko-facts li {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-muted);
}

.story-link {
  color: var(--color-primary);
  text-decoration: underline;
  transition: color var(--transition-fast);
}

.story-link:hover {
  color: var(--color-accent);
}

.kingdom-section {
  background-color: var(--color-background-secondary);
}

.kingdom-lore-container {
  max-width: 750px;
  margin: 0 auto;
}

.kingdom-lore-scroll {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  position: relative;
}

.kingdom-lore-scroll::before {
  content: "📜";
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-2xl);
  background: var(--color-background-secondary);
  padding: 0 var(--spacing-sm);
}

.kingdom-lore {
  font-size: var(--font-size-base);
  line-height: 1.9;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-lg);
  text-indent: 1em;
}

.kingdom-lore:last-of-type {
  margin-bottom: var(--spacing-lg);
}

.kingdom-lore-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: right;
  margin: 0;
  opacity: 0.7;
}

.kingdom-entrance {
  margin-top: var(--spacing-2xl);
  text-align: center;
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
}

.entrance-text {
  color: var(--color-text);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
}
</style>
