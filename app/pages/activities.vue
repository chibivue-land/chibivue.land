<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useHead } from "#imports";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseButton from "~/components/ui/BaseButton.vue";

const { t } = useI18n();

useHead({
  title: t("meta.activities.title"),
  meta: [{ name: "description", content: t("meta.activities.description") }],
});

const projects = computed(() => [
  {
    name: t("activitiesPage.projects.chibivue.name"),
    description: t("activitiesPage.projects.chibivue.description"),
    link: "https://book.chibivue.land/",
    tags: ["Vue.js", "Learning", "Book"],
  },
  {
    name: t("activitiesPage.projects.vueyous.name"),
    description: t("activitiesPage.projects.vueyous.description"),
    link: "https://github.com/chibivue-land/vueyous",
    tags: ["VueUse", "Composables", "Learning"],
  },
  {
    name: t("activitiesPage.projects.japaneseCompanies.name"),
    description: t("activitiesPage.projects.japaneseCompanies.description"),
    link: "https://github.com/chibivue-land/japanese-companies-using-vuejs",
    tags: ["Vue.js", "Companies", "List"],
  },
  {
    name: t("activitiesPage.projects.zennPlaza.name"),
    description: t("activitiesPage.projects.zennPlaza.description"),
    link: "https://zenn.dev/p/comm_vue_nuxt",
    tags: ["Zenn", "Articles", "Community"],
  },
  {
    name: t("activitiesPage.projects.land.name"),
    description: t("activitiesPage.projects.land.description"),
    link: "https://github.com/chibivue-land/chibivue.land",
    tags: ["Nuxt", "TresJS", "Website"],
  },
]);

const subProjects = computed(() => [
  {
    name: t("activitiesPage.subProjects.chibinuxt.name"),
    description: t("activitiesPage.subProjects.chibinuxt.description"),
    link: "https://github.com/shoma-mano/chibinuxt",
  },
]);

const events = computed(() => [
  {
    title: t("activitiesPage.events.writing.title"),
    description: t("activitiesPage.events.writing.description"),
    frequency: t("activitiesPage.events.writing.frequency"),
  },
  {
    title: t("activitiesPage.events.gathering.title"),
    description: t("activitiesPage.events.gathering.description"),
    frequency: t("activitiesPage.events.gathering.frequency"),
  },
]);
</script>

<template>
  <div class="activities-page">
    <section class="page-hero section">
      <div class="container">
        <h1 class="page-title">{{ t("activitiesPage.title") }}</h1>
        <p class="page-description">{{ t("activitiesPage.description") }}</p>
      </div>
    </section>

    <section class="projects-section section">
      <div class="container">
        <h2 class="mb-xl">{{ t("activitiesPage.projectsTitle") }}</h2>
        <div class="projects-grid grid grid-cols-1 grid-cols-2 grid-cols-3">
          <BaseCard v-for="project in projects" :key="project.name" padding="lg">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
            <BaseButton
              :href="project.link"
              :external="true"
              variant="outline"
              size="sm"
              class="mt-lg"
            >
              {{ t("activitiesPage.viewProject") }}
            </BaseButton>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="sub-projects-section section">
      <div class="container">
        <h2 class="mb-xl">{{ t("activitiesPage.subProjectsTitle") }}</h2>
        <div class="sub-projects-grid grid grid-cols-1 grid-cols-2">
          <BaseCard v-for="project in subProjects" :key="project.name" padding="md">
            <h3 class="sub-project-name">{{ project.name }}</h3>
            <p class="sub-project-description">{{ project.description }}</p>
            <BaseButton
              :href="project.link"
              :external="true"
              variant="outline"
              size="sm"
              class="mt-md"
            >
              {{ t("activitiesPage.viewProject") }}
            </BaseButton>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="events-section section">
      <div class="container">
        <h2 class="text-center mb-xl">{{ t("activitiesPage.eventsTitle") }}</h2>
        <div class="events-list">
          <BaseCard v-for="event in events" :key="event.title" padding="lg">
            <div class="event-content">
              <div class="event-info">
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
              </div>
              <div class="event-frequency">
                <span class="frequency-badge">{{ event.frequency }}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="contribute-section section">
      <div class="container text-center">
        <h2 class="mb-md">{{ t("activitiesPage.contribute.title") }}</h2>
        <p class="contribute-description">{{ t("activitiesPage.contribute.description") }}</p>
        <div class="contribute-buttons">
          <BaseButton
            href="https://discord.gg/aVHvmbmSRy"
            :external="true"
            variant="accent"
            size="lg"
          >
            Discordに参加
          </BaseButton>
          <BaseButton
            href="https://github.com/chibivue-land"
            :external="true"
            variant="outline"
            size="lg"
          >
            {{ t("activitiesPage.contribute.cta") }}
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.activities-page {
  overflow-x: hidden;
}

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

.project-name {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.project-description {
  color: var(--color-text-muted);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.sub-projects-section {
  background-color: var(--color-background-secondary);
}

.sub-project-name {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
}

.sub-project-description {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.events-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.event-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.event-info {
  h3 {
    margin-bottom: var(--spacing-sm);
  }

  p {
    color: var(--color-text-muted);
    margin-bottom: 0;
  }
}

.frequency-badge {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-accent);
  color: #1a1a1a;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.contribute-description {
  max-width: 500px;
  margin: 0 auto;
  color: var(--color-text-muted);
}

.contribute-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-lg);
  flex-wrap: wrap;
}
</style>
