<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useHead } from "#imports";
import HeroSection from "~/components/home/HeroSection.vue";
import AboutSection from "~/components/home/AboutSection.vue";
import ActivitiesSection from "~/components/home/ActivitiesSection.vue";
import JoinSection from "~/components/home/JoinSection.vue";

const { t } = useI18n();

useHead({
  title: t("meta.home.title"),
  meta: [{ name: "description", content: t("meta.home.description") }],
});
</script>

<template>
  <div class="home-page">
    <HeroSection />
    <AboutSection />
    <ActivitiesSection />
    <JoinSection />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>
