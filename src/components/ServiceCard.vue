<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  description: string
  features?: string[]
  icon?: string // SVG icon path or component
  color?: string
}

defineProps<Props>()

const isHovering = ref(false)
</script>

<template>
  <div
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    class="service-card relative group"
  >
    <!-- Card Container with rounded corners and shadow -->
    <div class="relative bg-white rounded-3xl p-8 md:p-10 h-full transition-all duration-300 ease-out"
      :class="[
        'shadow-service',
        isHovering ? 'shadow-service-hover group-hover:translate-y-[-8px]' : ''
      ]"
    >
      <!-- Background Plus Element (Decorative) -->
      <div class="absolute top-6 right-6 text-brand-gold/10 pointer-events-none">
        <svg class="w-20 h-20" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 16v16M16 24h16" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Icon with Gold Background Circle (if provided) -->
      <div v-if="icon" class="mb-6 inline-flex">
        <div class="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300">
          <svg class="w-8 h-8 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>

      <!-- Content Section -->
      <div class="relative z-10">
        <!-- Title -->
        <h3 class="font-extrabold font-eastman text-2xl md:text-3xl mb-3 leading-tight">
          {{ title }}
        </h3>

        <!-- Description -->
        <p class="text-base text-brand-neutral font-normal mb-6 leading-relaxed">
          {{ description }}
        </p>

        <!-- Features List (Optional) -->
        <ul v-if="features && features.length > 0" class="space-y-3 mb-8">
          <li v-for="(feature, idx) in features" :key="idx" class="flex items-start gap-3 text-sm">
            <svg class="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span class="text-brand-neutral">{{ feature }}</span>
          </li>
        </ul>

        <!-- Call to Action Link -->
        <div class="flex items-center gap-2">
          <a
            href="#"
            class="text-brand-anthracite font-bold text-sm inline-flex items-center gap-2 hover:text-brand-gold transition-colors duration-200 group/link"
          >
            En savoir plus
            <svg
              class="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Bottom Border Accent (animated on hover) -->
      <div
        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-yellow to-brand-gold rounded-b-3xl transform origin-left transition-all duration-300"
        :class="isHovering ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Service Card Shadows */
.shadow-service {
  box-shadow: 0 4px 15px rgba(45, 45, 45, 0.08);
}

.shadow-service-hover {
  box-shadow: 0 12px 30px rgba(45, 45, 45, 0.15), 0 8px 16px rgba(190, 169, 37, 0.12) !important;
}

/* Service card entrance animation */
.service-card {
  opacity: 0;
  transform: translateY(20px);
}

.service-card.card-visible {
  opacity: 1;
  transform: translateY(0);
  animation: serviceCardReveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes serviceCardReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered animation delays */
.service-card:nth-child(1).card-visible {
  animation-delay: 0.1s;
}

.service-card:nth-child(2).card-visible {
  animation-delay: 0.2s;
}

.service-card:nth-child(3).card-visible {
  animation-delay: 0.3s;
}

.service-card:nth-child(4).card-visible {
  animation-delay: 0.4s;
}
</style>
