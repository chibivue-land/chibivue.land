<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "#imports";

interface Props {
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 200,
});

const positions = computed(() => {
  const pos = new Float32Array(props.count * 3);
  for (let i = 0; i < props.count; i++) {
    const radius = 3 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = Math.random() * 4 - 1;
    pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  return pos;
});

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const particleColor = computed(() => (isDark.value ? "#FFD700" : "#D4AF37"));
</script>

<template>
  <TresPoints>
    <TresBufferGeometry>
      <TresBufferAttribute
        :count="count"
        :item-size="3"
        :array="positions"
        attach="attributes-position"
      />
    </TresBufferGeometry>
    <TresPointsMaterial
      :color="particleColor"
      :size="0.03"
      :size-attenuation="true"
      :transparent="true"
      :opacity="0.8"
    />
  </TresPoints>
</template>
