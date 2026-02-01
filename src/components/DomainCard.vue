<template>
  <div
    class="domain-card bg-white rounded-xl p-8 relative group cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
    @click="handleClick"
    @mouseenter="triggerIconAnimation"
    @mouseleave="resetIconAnimation"
    ref="cardElement"
  >
    <!-- Line-art Icon at top-left, aligned with yellow bar -->
    <div class="mb-6 text-brand-anthracite group-hover:text-brand-gold transition-colors duration-300 pl-1">
      <DomainIcons :domain="iconType" ref="iconElement" />
    </div>

    <!-- Title with animated underline -->
    <h3 class="font-extrabold text-2xl mb-3 relative pb-3 group-hover:text-brand-gold transition-colors duration-300">
      {{ title }}
      <span class="title-underline"></span>
    </h3>

    <!-- Description -->
    <p class="text-brand-neutral text-sm leading-relaxed mb-8 flex-grow">
      {{ description }}
    </p>

    <!-- Text Link with Arrow - Bottom Right -->
    <a href="#" class="absolute bottom-6 right-6 text-brand-anthracite font-bold text-sm flex items-center gap-2 hover:text-brand-gold transition-colors group/link">
      Découvrir
      <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DomainIcons from './icons/DomainIcons.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const cardElement = ref<HTMLElement | null>(null)
const iconElement = ref<InstanceType<typeof DomainIcons> | null>(null)

const iconType = computed(() => {
  const typeMap: Record<string, string> = {
    urologie: 'urologie',
    stomatherapie: 'stomatherapie',
    cicatrisation: 'cicatrisation',
    neurostimulation: 'neurostimulation',
    affirmationdegen: 'affirmationdegen',
  }
  return typeMap[props.domain] || 'urologie'
})

const handleClick = () => {
  router.push(props.path)
}

const triggerIconAnimation = () => {
  // Get the SVG element from the card's DOM tree
  const svg = cardElement.value?.querySelector('svg.icon-animated')
  if (svg) {
    // Remove the class first to ensure animation restarts
    svg.classList.remove('is-drawing')
    // Force reflow to restart animation
    void svg.offsetWidth
    // Add the drawing animation class
    svg.classList.add('is-drawing')
  }
}

const resetIconAnimation = () => {
  // Remove the drawing class after animation completes (after 700ms)
  setTimeout(() => {
    const svg = cardElement.value?.querySelector('svg.icon-animated')
    if (svg) {
      svg.classList.remove('is-drawing')
    }
  }, 700)
}
</script>

<style scoped>
.domain-card {
  display: flex;
  flex-direction: column;
  min-height: 340px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 3px solid #BEA925;
  position: relative;
}

/* Left border expansion effect */
.domain-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #BEA925, #D9C43D);
  border-radius: 0 2px 2px 0;
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.domain-card:hover::before {
  width: 6px;
}

/* Enhanced base shadow for visibility against golden background */
.domain-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06);
}

/* Glowing shadow on hover - enhanced for golden background */
.domain-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15), 0 0 24px rgba(217, 196, 61, 0.35), 0 0 40px rgba(190, 169, 37, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* Icon styling and animation */
:deep(.icon-animated) {
  width: 64px;
  height: 64px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.domain-card:hover :deep(.icon-animated) {
  transform: scale(1.05);
}

/* Ensure icon paths inherit color transition */
:deep(.icon-path) {
  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

</style>
