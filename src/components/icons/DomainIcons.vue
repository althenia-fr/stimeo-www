<template>
  <!-- Urologie Icon (Kidney/Urinary System) -->
  <svg v-if="domain === 'urologie'" class="w-16 h-16 icon-animated" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Left Kidney -->
    <path class="icon-path" d="M20 16C15 16 12 20 12 26C12 32 14 38 18 40C20 41 21 42 21 44V24C21 20 20 16 20 16Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Right Kidney -->
    <path class="icon-path" d="M44 16C49 16 52 20 52 26C52 32 50 38 46 40C44 41 43 42 43 44V24C43 20 44 16 44 16Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Central connecting line (ureter pathway) -->
    <path class="icon-path" d="M21 44C21 46 22 48 24 50M43 44C43 46 42 48 40 50" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Bladder -->
    <path class="icon-path" d="M28 50C28 50 26 54 32 56C38 54 36 50 36 50Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <!-- Stomatherapie Icon (Stoma Pouch) -->
  <svg v-else-if="domain === 'stomatherapie'" class="w-16 h-16 icon-animated" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Abdominal section (outlined) -->
    <path class="icon-path" d="M20 14C18 14 16 16 16 18L16 32C16 34 18 36 20 36L44 36C46 36 48 34 48 32L48 18C48 16 46 14 44 14Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Stoma opening -->
    <circle class="icon-path" cx="24" cy="24" r="3" stroke="currentColor" stroke-width="1.2"/>
    <!-- Pouch outline (below abdomen) -->
    <path class="icon-path" d="M22 36C20 38 20 44 24 48C28 44 28 38 26 36" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Pouch connection point -->
    <path class="icon-path" d="M28 36C26 38 26 44 30 48C34 44 34 38 32 36" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Fastening clip detail -->
    <line class="icon-path" x1="20" y1="14" x2="44" y2="14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  </svg>

  <!-- Cicatrisation Icon (Hand with Bandage) -->
  <svg v-else-if="domain === 'cicatrisation'" class="w-16 h-16 icon-animated" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Thumb -->
    <path class="icon-path" d="M16 32C16 26 18 22 22 22" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Index finger -->
    <path class="icon-path" d="M24 16C24 16 24 8 24 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Middle finger -->
    <path class="icon-path" d="M32 14C32 14 32 6 32 6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Ring finger -->
    <path class="icon-path" d="M40 16C40 16 40 8 40 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Pinky finger -->
    <path class="icon-path" d="M48 20C48 20 48 12 48 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <!-- Palm -->
    <path class="icon-path" d="M16 32C16 38 20 46 32 48C44 46 48 38 48 32" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Bandage on palm -->
    <g class="icon-path">
      <rect x="26" y="36" width="12" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/>
      <line x1="28" y1="36" x2="28" y2="42" stroke="currentColor" stroke-width="1"/>
      <line x1="32" y1="36" x2="32" y2="42" stroke="currentColor" stroke-width="1"/>
      <line x1="36" y1="36" x2="36" y2="42" stroke="currentColor" stroke-width="1"/>
    </g>
  </svg>

  <!-- Neurostimulation Icon (Brain with Waves) -->
  <svg v-else-if="domain === 'neurostimulation'" class="w-16 h-16 icon-animated" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Brain outline -->
    <path class="icon-path" d="M18 32C18 20 22 14 32 14C42 14 46 20 46 32C46 44 42 50 32 50C22 50 18 44 18 32Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Brain lobe divisions -->
    <path class="icon-path" d="M32 18C32 18 28 22 28 28M32 18C32 18 36 22 36 28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    <!-- Neural pathways -->
    <path class="icon-path" d="M26 36C24 36 22 38 22 40M38 36C40 36 42 38 42 40" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    <!-- Left wave (stimulation signal) -->
    <path class="icon-path" d="M10 28C10 28 12 24 14 28C16 32 18 28 20 28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Right wave (stimulation signal) -->
    <path class="icon-path" d="M44 28C44 28 46 24 48 28C50 32 52 28 54 28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Central neural pulse point -->
    <circle class="icon-path" cx="32" cy="32" r="2.5" stroke="currentColor" stroke-width="1"/>
  </svg>

  <!-- Affirmation de Genre Icon (Heart with supportive hands - Care & Compassion) -->
  <svg v-else-if="domain === 'affirmationdegen'" class="w-16 h-16 icon-animated" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Left supporting hand -->
    <path class="icon-path" d="M12 28C12 28 10 24 14 22C16 21 18 22 18 26L18 36" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Right supporting hand -->
    <path class="icon-path" d="M52 28C52 28 54 24 50 22C48 21 46 22 46 26L46 36" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Central heart -->
    <path class="icon-path" d="M32 24C32 24 28 20 24 20C22 20 20 22 20 24C20 28 25 33 32 39C39 33 44 28 44 24C44 22 42 20 40 20C36 20 32 24 32 24Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Connection line (unity) -->
    <line class="icon-path" x1="18" y1="36" x2="32" y2="48" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    <line class="icon-path" x1="46" y1="36" x2="32" y2="48" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  </svg>

  <!-- Livraison Icon (360 section) -->
  <svg v-else-if="domain === 'livraison'" class="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 24h32m-4-8h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 20v-4a2 2 0 012-2h16a2 2 0 012 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="14" cy="32" r="2" fill="currentColor"/>
    <circle cx="34" cy="32" r="2" fill="currentColor"/>
  </svg>

  <!-- Soutien Icon (360 section) -->
  <svg v-else-if="domain === 'soutien'" class="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8c8.84 0 16 7.16 16 16s-7.16 16-16 16S8 32.84 8 24 15.16 8 24 8z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M24 18v12m-6-6h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <!-- Administratif Icon (360 section) -->
  <svg v-else-if="domain === 'administratif'" class="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 8h28a2 2 0 012 2v28a2 2 0 01-2 2H10a2 2 0 01-2-2V10a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 14h20m-20 6h20m-20 6h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  domain: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
svg {
  color: currentColor;
}

/* Icon Animation for Drawing Effect */
.icon-animated {
  animation: float 3s ease-in-out infinite;
}

.icon-path {
  stroke-dasharray: 500;
  /* Icons are visible by default - stroke-dashoffset: 0 */
  stroke-dashoffset: 0;
  /* Smooth transition for the drawing animation */
  transition: stroke-dashoffset 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Draw animation class - triggered by card hover via parent */
.icon-animated.is-drawing .icon-path {
  animation: drawStroke 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Animation: draw from hidden (dashoffset=500) to visible (dashoffset=0) */
@keyframes drawStroke {
  0% {
    stroke-dashoffset: 500;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Floating animation for depth */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Staggered floating for asynchronous effect */
.icon-animated:nth-child(1) {
  animation-delay: 0s;
}

.icon-animated:nth-child(2) {
  animation-delay: 0.3s;
}

.icon-animated:nth-child(3) {
  animation-delay: 0.6s;
}

.icon-animated:nth-child(4) {
  animation-delay: 0.9s;
}
</style>
