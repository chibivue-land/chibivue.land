<script setup lang="ts">
import { computed, shallowRef } from "vue";
import { useRenderLoop } from "@tresjs/core";
import { useColorMode } from "#imports";
import * as THREE from "three";

const crownRef = shallowRef();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

// Stylized colors with more vibrancy
const goldColor = computed(() => (isDark.value ? "#fbbf24" : "#d4af37"));
const goldDark = computed(() => (isDark.value ? "#b45309" : "#92700c"));
const gemPurple = "#a78bfa";
const gemRed = "#fb7185";
const gemBlue = "#60a5fa";

// Create gradient texture for toon shading
const gradientTexture = computed(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // 3-tone gradient for toon effect
    ctx.fillStyle = isDark.value ? "#78350f" : "#6b5515";
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = isDark.value ? "#d97706" : "#a08020";
    ctx.fillRect(1, 0, 1, 1);
    ctx.fillStyle = isDark.value ? "#fbbf24" : "#d4af37";
    ctx.fillRect(2, 0, 2, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
});

const { onLoop } = useRenderLoop();

let time = 0;
onLoop(({ delta }) => {
  time += delta;

  if (crownRef.value) {
    // Floating animation with slight wobble
    crownRef.value.position.y = 1.3 + Math.sin(time * 1.2) * 0.12;
    // Slow rotation
    crownRef.value.rotation.y += delta * 0.3;
    // Subtle tilt wobble
    crownRef.value.rotation.x = Math.sin(time * 0.8) * 0.03;
    crownRef.value.rotation.z = Math.cos(time * 0.6) * 0.02;
  }
});
</script>

<template>
  <TresGroup ref="crownRef" :position="[0, 1.3, 0]">
    <!-- Crown base ring - toon shaded -->
    <TresMesh :position="[0, 0, 0]">
      <TresTorusGeometry :args="[0.65, 0.12, 16, 32]" />
      <TresMeshToonMaterial :color="goldColor" :gradient-map="gradientTexture" />
    </TresMesh>

    <!-- Inner accent ring -->
    <TresMesh :position="[0, 0.08, 0]">
      <TresTorusGeometry :args="[0.5, 0.04, 12, 24]" />
      <TresMeshToonMaterial :color="goldDark" :gradient-map="gradientTexture" />
    </TresMesh>

    <!-- Crown spikes - toon shaded triangular style -->
    <TresMesh
      v-for="i in 5"
      :key="`spike-${i}`"
      :position="[
        Math.sin(((i - 1) / 5) * Math.PI * 2) * 0.55,
        0.35,
        Math.cos(((i - 1) / 5) * Math.PI * 2) * 0.55,
      ]"
      :rotation="[0, -((i - 1) / 5) * Math.PI * 2, 0]"
    >
      <TresConeGeometry :args="[0.12, 0.55, 4]" />
      <TresMeshToonMaterial :color="goldColor" :gradient-map="gradientTexture" />
    </TresMesh>

    <!-- Spike bases - small cylinders -->
    <TresMesh
      v-for="i in 5"
      :key="`base-${i}`"
      :position="[
        Math.sin(((i - 1) / 5) * Math.PI * 2) * 0.55,
        0.08,
        Math.cos(((i - 1) / 5) * Math.PI * 2) * 0.55,
      ]"
    >
      <TresCylinderGeometry :args="[0.08, 0.1, 0.06, 8]" />
      <TresMeshToonMaterial :color="goldDark" :gradient-map="gradientTexture" />
    </TresMesh>

    <!-- Gems on top of spikes - glowing octahedrons -->
    <TresMesh
      v-for="i in 5"
      :key="`gem-${i}`"
      :position="[
        Math.sin(((i - 1) / 5) * Math.PI * 2) * 0.55,
        0.68,
        Math.cos(((i - 1) / 5) * Math.PI * 2) * 0.55,
      ]"
    >
      <TresOctahedronGeometry :args="[0.08, 0]" />
      <TresMeshStandardMaterial
        :color="i % 3 === 0 ? gemPurple : i % 3 === 1 ? gemRed : gemBlue"
        :emissive="i % 3 === 0 ? gemPurple : i % 3 === 1 ? gemRed : gemBlue"
        :emissive-intensity="isDark ? 0.5 : 0.3"
        :metalness="0.1"
        :roughness="0.3"
      />
    </TresMesh>

    <!-- Center gem - larger, glowing -->
    <TresMesh :position="[0, 0.22, 0]">
      <TresOctahedronGeometry :args="[0.14, 0]" />
      <TresMeshStandardMaterial
        :color="gemPurple"
        :emissive="gemPurple"
        :emissive-intensity="isDark ? 0.6 : 0.4"
        :metalness="0.1"
        :roughness="0.2"
      />
    </TresMesh>

    <!-- Crown glow point light -->
    <TresPointLight
      :position="[0, 0.3, 0]"
      :color="goldColor"
      :intensity="isDark ? 2.0 : 1.2"
      :distance="4"
    />

    <!-- Gem accent lights -->
    <TresPointLight
      :position="[0, 0.25, 0]"
      :color="gemPurple"
      :intensity="isDark ? 0.8 : 0.4"
      :distance="2"
    />
  </TresGroup>
</template>
