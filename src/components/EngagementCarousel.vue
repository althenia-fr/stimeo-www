<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Engagement {
  title: string
  description: string
  icon: string
}

const props = defineProps<{
  engagements: Engagement[]
}>()

const currentSlide = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.engagements.length
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 3000)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Slides Container -->
    <div class="relative overflow-hidden">
      <!-- Individual Slides -->
      <div
        v-for="(engagement, index) in engagements"
        :key="index"
        :class="[
          'transition-opacity duration-500 ease-in-out',
          currentSlide === index ? 'opacity-100' : 'opacity-0 absolute inset-0',
        ]"
      >
        <div class="flex flex-col items-center text-center py-8 px-4">
          <!-- White Circle with Icon -->
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg flex-shrink-0">
            <svg
              class="w-10 h-10 text-brand-gold"
              fill="currentColor"
              viewBox="0 0 24 24"
              v-html="engagement.icon"
            />
          </div>

          <!-- Title -->
          <h3 class="font-bold text-lg mb-3 text-white leading-tight">
            {{ engagement.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-white/95 leading-relaxed">
            {{ engagement.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center items-center gap-1.5 mt-5">
      <button
        v-for="(_, index) in engagements"
        :key="index"
        @click="currentSlide = index"
        :class="[
          'transition-all duration-300 rounded-full',
          currentSlide === index
            ? 'w-2.5 h-2.5 bg-white'
            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
        type="button"
      />
    </div>
  </div>
</template>
