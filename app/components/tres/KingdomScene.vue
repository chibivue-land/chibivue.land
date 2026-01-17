<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, shallowRef } from "vue";
import { useRenderLoop } from "@tresjs/core";
import { useColorMode } from "#imports";

const cameraRef = shallowRef();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const bgColor = computed(() => (isDark.value ? "#0a0a18" : "#faf8f0"));

// Mouse position for interactive camera
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY.value = -(event.clientY / window.innerHeight) * 2 + 1;
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});

// Camera follow mouse and orb animations
const { onLoop } = useRenderLoop();

const globalTime = ref(0);

onLoop(({ delta }) => {
  globalTime.value += delta;

  if (cameraRef.value) {
    // Smooth camera movement following mouse
    const targetX = mouseX.value * 1.5;
    const targetY = 2.5 + mouseY.value * 0.3;
    cameraRef.value.position.x += (targetX - cameraRef.value.position.x) * 0.03;
    cameraRef.value.position.y += (targetY - cameraRef.value.position.y) * 0.03;
    cameraRef.value.lookAt(0, 1.2, 0);
  }

  // Animate each orb
  orbRefs.value.forEach((orbMesh, index) => {
    if (!orbMesh || !orbs.value[index] || !initialOrbPositions.value[index]) return;

    const orb = orbs.value[index];
    const initial = initialOrbPositions.value[index];
    const t = globalTime.value + orb.phase;

    // Floating up and down
    const floatY = Math.sin(t * orb.floatSpeed) * orb.floatAmplitude;

    // Gentle orbital movement
    const orbitAngle = t * orb.orbitSpeed;
    const orbitRadius = 0.2;
    const orbitX = Math.cos(orbitAngle) * orbitRadius;
    const orbitZ = Math.sin(orbitAngle) * orbitRadius;

    // Apply animations
    orbMesh.position.y = initial.y + floatY;
    orbMesh.position.x = initial.x + orbitX;
    orbMesh.position.z = initial.z + orbitZ;

    // Scale pulsing
    const pulseScale = 1 + Math.sin(t * orb.pulseSpeed) * 0.15;
    orbMesh.scale.setScalar(pulseScale);
  });

  // Animate orb materials (opacity pulsing)
  orbMaterialRefs.value.forEach((mat, index) => {
    if (!mat || !orbs.value[index]) return;
    const orb = orbs.value[index];
    const t = globalTime.value + orb.phase;
    mat.opacity = isDark.value
      ? 0.7 + Math.sin(t * orb.pulseSpeed) * 0.25
      : 0.5 + Math.sin(t * orb.pulseSpeed) * 0.2;
  });
});

// Generate floating orbs positions with animation parameters
const orbs = computed(() => {
  const items = [];
  for (let i = 0; i < 30; i++) {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 2.5 + Math.random() * 3.5;
    items.push({
      x: Math.cos(angle) * radius,
      y: Math.random() * 2.5 + 0.5,
      z: Math.sin(angle) * radius - 2,
      scale: 0.02 + Math.random() * 0.035,
      // Animation parameters
      floatSpeed: 0.8 + Math.random() * 0.8,
      floatAmplitude: 0.3 + Math.random() * 0.4,
      orbitSpeed: 0.1 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 1.5 + Math.random() * 1.5,
    });
  }
  return items;
});

// Orb refs for animation
const orbRefs = ref<any[]>([]);
const orbMaterialRefs = ref<any[]>([]);

// Store initial positions for animation
const initialOrbPositions = ref<{ x: number; y: number; z: number }[]>([]);

// Initialize positions when orbs are computed
watch(
  orbs,
  (newOrbs) => {
    initialOrbPositions.value = newOrbs.map((orb) => ({ x: orb.x, y: orb.y, z: orb.z }));
  },
  { immediate: true },
);

// Concentric rings for stylized ground
const rings = [
  { innerRadius: 0.8, outerRadius: 1.2 },
  { innerRadius: 1.8, outerRadius: 2.0 },
  { innerRadius: 2.8, outerRadius: 3.0 },
  { innerRadius: 4.0, outerRadius: 4.3 },
  { innerRadius: 5.5, outerRadius: 6.0 },
];
</script>

<template>
  <div class="kingdom-scene" aria-hidden="true">
    <ClientOnly>
      <TresCanvas
        :clear-color="bgColor"
        :alpha="false"
        :antialias="true"
        :tone-mapping-exposure="isDark ? 1.0 : 1.3"
      >
        <TresPerspectiveCamera ref="cameraRef" :position="[0, 2.5, 6]" :fov="45" />

        <!-- Ambient light - stronger for flat look -->
        <TresAmbientLight :intensity="isDark ? 0.4 : 0.7" />

        <!-- Main light - no shadows for flat look -->
        <TresDirectionalLight :position="[3, 8, 5]" :intensity="isDark ? 0.6 : 0.8" />

        <!-- Accent colored lights -->
        <TresPointLight
          :position="[-4, 3, -2]"
          :color="isDark ? '#818cf8' : '#a78bfa'"
          :intensity="isDark ? 1.5 : 0.8"
          :distance="12"
        />
        <TresPointLight
          :position="[4, 2, -3]"
          :color="isDark ? '#fbbf24' : '#f59e0b'"
          :intensity="isDark ? 1.0 : 0.5"
          :distance="10"
        />

        <!-- Crown removed - kawaiko is now the main focus -->

        <!-- Floating magical orbs with individual animations -->
        <TresMesh
          v-for="(orb, i) in orbs"
          :ref="
            (el) => {
              if (el) orbRefs[i] = el;
            }
          "
          :key="`orb-${i}`"
          :position="[orb.x, orb.y, orb.z]"
        >
          <TresSphereGeometry :args="[orb.scale, 12, 12]" />
          <TresMeshBasicMaterial
            :ref="
              (el) => {
                if (el) orbMaterialRefs[i] = el;
              }
            "
            :color="isDark ? '#fbbf24' : '#d4af37'"
            :transparent="true"
            :opacity="isDark ? 0.85 : 0.65"
          />
        </TresMesh>

        <!-- Additional small sparkle orbs closer to center -->
        <TresMesh
          v-for="i in 12"
          :key="`sparkle-${i}`"
          :position="[
            Math.cos((i / 12) * Math.PI * 2) * 1.2,
            0.8 + Math.sin(globalTime * 2 + i) * 0.3,
            Math.sin((i / 12) * Math.PI * 2) * 1.2,
          ]"
        >
          <TresSphereGeometry :args="[0.018, 8, 8]" />
          <TresMeshBasicMaterial
            :color="isDark ? '#a78bfa' : '#8b5cf6'"
            :transparent="true"
            :opacity="0.85"
          />
        </TresMesh>

        <!-- Central glow effect replacing crown -->
        <TresPointLight
          :position="[0, 1.5, 0]"
          :color="isDark ? '#fbbf24' : '#d4af37'"
          :intensity="isDark ? 1.5 : 1.0"
          :distance="5"
        />

        <!-- Stylized ground - flat color base -->
        <TresMesh :position="[0, -0.3, 0]" :rotation="[-Math.PI / 2, 0, 0]">
          <TresCircleGeometry :args="[7, 64]" />
          <TresMeshBasicMaterial :color="isDark ? '#12121f' : '#e8e4d4'" />
        </TresMesh>

        <!-- Concentric rings for vector style -->
        <TresMesh
          v-for="(ring, i) in rings"
          :key="`ring-${i}`"
          :position="[0, -0.28 + i * 0.01, 0]"
          :rotation="[-Math.PI / 2, 0, 0]"
        >
          <TresRingGeometry :args="[ring.innerRadius, ring.outerRadius, 64]" />
          <TresMeshBasicMaterial
            :color="isDark ? '#1e1e35' : '#d4d0c0'"
            :transparent="true"
            :opacity="0.6 - i * 0.1"
          />
        </TresMesh>

        <!-- Central highlight circle -->
        <TresMesh :position="[0, -0.25, 0]" :rotation="[-Math.PI / 2, 0, 0]">
          <TresCircleGeometry :args="[0.6, 32]" />
          <TresMeshBasicMaterial :color="isDark ? '#2a2a4a' : '#f0ece0'" />
        </TresMesh>

        <!-- Fog for depth -->
        <TresFog :color="isDark ? '#0a0a18' : '#faf8f0'" :near="6" :far="18" />
      </TresCanvas>

      <template #fallback>
        <div class="scene-fallback" />
      </template>
    </ClientOnly>

    <!-- Overlay gradient for depth -->
    <div class="scene-overlay" />
  </div>
</template>

<style scoped>
.kingdom-scene {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
}

.scene-fallback {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-background) 0%,
    var(--color-background-secondary) 100%
  );
}

.scene-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center 70%, transparent 20%, var(--color-background) 90%);
}
</style>
