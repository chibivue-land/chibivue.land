import { ref, computed, onMounted, onUnmounted, type Ref } from "vue";

export function useScrollAnimation() {
  const observedElements = ref<Set<Element>>(new Set());

  const observe = (el: Element) => {
    if (observedElements.value.has(el)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(el);
    observedElements.value.add(el);
  };

  const vScrollReveal = {
    mounted: (el: Element) => {
      el.classList.add("scroll-reveal");
      observe(el);
    },
  };

  return {
    observe,
    vScrollReveal,
  };
}

export function useMouseParallax() {
  const mouseX = ref(0);
  const mouseY = ref(0);
  const smoothX = ref(0);
  const smoothY = ref(0);

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  let animationFrame: number | null = null;

  const animate = () => {
    smoothX.value += (mouseX.value - smoothX.value) * 0.05;
    smoothY.value += (mouseY.value - smoothY.value) * 0.05;
    animationFrame = requestAnimationFrame(animate);
  };

  onMounted(() => {
    window.addEventListener("mousemove", handleMouseMove);
    animate();
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });

  return { smoothX, smoothY };
}

export function useTiltEffect(element: Ref<HTMLElement | null>) {
  const tiltX = ref(0);
  const tiltY = ref(0);
  const isHovered = ref(false);
  const glowX = ref(50);
  const glowY = ref(50);

  const handleMouseMove = (e: MouseEvent) => {
    if (!element.value) return;
    const rect = element.value.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    tiltX.value = (y - 0.5) * 15;
    tiltY.value = -(x - 0.5) * 15;
    glowX.value = x * 100;
    glowY.value = y * 100;
  };

  const handleMouseEnter = () => {
    isHovered.value = true;
  };

  const handleMouseLeave = () => {
    isHovered.value = false;
    tiltX.value = 0;
    tiltY.value = 0;
  };

  const style = computed(() => ({
    transform: isHovered.value
      ? `perspective(1000px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale3d(1.02, 1.02, 1.02)`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: isHovered.value ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
  }));

  const glowStyle = computed(() => ({
    background: isHovered.value
      ? `radial-gradient(circle at ${glowX.value}% ${glowY.value}%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)`
      : "none",
  }));

  return {
    style,
    glowStyle,
    isHovered,
    tiltX,
    tiltY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export function useStaggeredAnimation(_itemCount: number, baseDelay = 100) {
  const getDelay = (index: number) => `${index * baseDelay}ms`;
  return { getDelay };
}
