<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  columns?: number // Desktop columns (default: 2)
  cardsPerViewMobile?: number // Mobile slides visible (default: 1.15)
  gap?: number // Gap between cards in pixels (default: 32)
  snapAlign?: 'start' | 'center' | 'end' // Snap alignment (default: center)
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
  cardsPerViewMobile: 1.15,
  gap: 32,
  snapAlign: 'center',
})

const scrollContainer = ref<HTMLElement | null>(null)
const currentSlide = ref(0)
const totalSlides = ref(0)
const isMobile = ref(false)

const cardWidthCalc = computed(() => {
  return `calc((100vw - 48px) / ${props.cardsPerViewMobile})`
})

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  
  // Count cards for pagination
  if (scrollContainer.value) {
    const cards = scrollContainer.value.querySelectorAll('[data-carousel-item]')
    totalSlides.value = cards.length
  }

  // Enable smooth scrolling on iOS
  if (scrollContainer.value) {
    scrollContainer.value.style.WebkitOverflowScrolling = 'touch'
  }
})

watch(isMobile, () => {
  currentSlide.value = 0
})

const goToSlide = (index: number) => {
  if (!isMobile.value || !scrollContainer.value) return
  
  const cards = scrollContainer.value.querySelectorAll('[data-carousel-item]')
  if (!cards[index]) return
  
  const cardElement = cards[index] as HTMLElement
  const containerRect = scrollContainer.value.getBoundingClientRect()
  const cardRect = cardElement.getBoundingClientRect()
  const scrollDistance = cardRect.left - containerRect.left + scrollContainer.value.scrollLeft
  
  scrollContainer.value.scrollTo({
    left: scrollDistance,
    behavior: 'smooth',
  })
  
  currentSlide.value = index
}

const handleScroll = () => {
  if (!isMobile.value || !scrollContainer.value) return
  
  const cards = scrollContainer.value.querySelectorAll('[data-carousel-item]')
  if (cards.length === 0) return
  
  const container = scrollContainer.value
  const scrollLeft = container.scrollLeft
  let closestIndex = 0
  let closestDistance = Math.abs(scrollLeft)
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i] as HTMLElement
    const cardPosition = card.offsetLeft
    const distance = Math.abs(cardPosition - scrollLeft)
    
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = i
    }
  }
  
  currentSlide.value = closestIndex
}

const carouselItemStyle = computed(() => {
  if (!isMobile.value) {
    return {}
  }

  return {
    flex: `0 0 ${cardWidthCalc.value}`,
    scrollSnapAlign: props.snapAlign,
    scrollSnapStop: 'always',
  }
})
</script>

<template>
  <div class="w-full">
    <!-- Desktop Grid -->
    <div
      v-if="!isMobile"
      class="grid"
      :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gap}px` }"
    >
      <slot />
    </div>

    <!-- Mobile Carousel Container -->
    <div
      v-else
      ref="scrollContainer"
      class="flex overflow-x-auto snap-mandatory pb-8 -mx-6 px-6"
      :style="{ gap: `${gap}px`, scrollSnapType: `x ${snapAlign}` }"
      @scroll="handleScroll"
    >
      <slot />
    </div>

    <!-- Pagination Dots (Mobile only) -->
    <div v-if="isMobile && totalSlides > 1" class="flex justify-center items-center gap-2 -mt-6">
      <button
        v-for="(_, index) in Array.from({ length: totalSlides })"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'transition-all duration-300 rounded-full',
          currentSlide === index
            ? 'w-8 h-2 bg-brand-gold'
            : 'w-2 h-2 bg-gray-300 hover:bg-gray-400',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
        type="button"
      />
    </div>
  </div>
</template>

<style scoped>
/* Carousel item styling - applied through slot content */
:deep([data-carousel-item]) {
  flex: 0 0 calc((100vw - 48px) / 1.15);
  scroll-snap-stop: always;
}

/* Ensure no wrapping on mobile carousel */
.overflow-x-auto {
  flex-wrap: nowrap;
}

/* Desktop - reset snap and sizing */
@media (min-width: 768px) {
  :deep([data-carousel-item]) {
    flex: none;
    scroll-snap-stop: unset;
  }
}
</style>
