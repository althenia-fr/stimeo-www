<template>
  <div class="service-card bg-gray-50 rounded-lg p-8 border-l-4 border-l-brand-gold flex flex-col h-full">
    <!-- Icon -->
    <div class="mb-6 text-brand-anthracite">
      <DomainIcons :domain="iconType" />
    </div>

    <!-- Title -->
    <h3 class="font-extrabold text-brand-anthracite text-xl mb-3 animate-fade-in-up-enhanced">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-brand-neutral text-sm leading-relaxed flex-grow">
      {{ description }}
    </p>

    <!-- Features list -->
    <ul v-if="features" class="space-y-2 mt-6 pt-6 border-t border-gray-200">
      <li v-for="feature in features" :key="feature" class="flex items-start text-brand-anthracite text-xs">
        <CheckIcon class="mr-2 mt-0.5 flex-shrink-0" />
        <span>{{ feature }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DomainIcons from './icons/DomainIcons.vue'
import CheckIcon from './icons/CheckIcon.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  features: {
    type: Array as () => string[],
    default: () => [],
  },
})

const iconType = computed(() => {
  const typeMap: Record<string, string> = {
    livraison: 'livraison',
    soutien: 'soutien',
    administratif: 'administratif',
  }
  return typeMap[props.serviceType] || 'livraison'
})
</script>

<style scoped>
.service-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.animate-fade-in-up-enhanced {
  animation: fadeInUpEnhanced 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUpEnhanced {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
