<script setup lang="ts">
// Icons are inlined as SVG for flexibility
const contactItems = [
  {
    id: 'opening',
    title: 'Ouverture toute l\'année',
    subtitle: '(sauf weekends et jours fériés)',
    icon: 'clock'
  },
  {
    id: 'hours',
    title: 'Du Lundi au Vendredi',
    subtitle: 'de 08h45 à 18h00',
    icon: 'calendar'
  },
  {
    id: 'phone',
    title: '0801 270 111',
    subtitle: '(Appel gratuit)',
    icon: 'phone'
  },
  {
    id: 'location',
    title: 'Présence partout en France',
    subtitle: 'Un interlocuteur privilégié près de vous',
    icon: 'location'
  }
]

const getIcon = (iconType: string) => {
  const icons: Record<string, string> = {
    clock: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>`,
    calendar: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>`,
    phone: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>`,
    location: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>`
  }
  return icons[iconType] || ''
}
</script>

<template>
  <div class="contact-info-card-container w-full">
    <!-- Yellow Background Container with White Text -->
    <div class="bg-brand-yellow rounded-[24px] p-10 md:p-14 lg:p-16" style="background-color: #C0A94D">
      <!-- Vertical List Layout -->
      <div class="space-y-8">
        <!-- Contact Item -->
        <div 
          v-for="item in contactItems"
          :key="item.id"
          class="flex items-start gap-6"
        >
          <!-- Icon Container (40px, White) -->
          <div 
            class="flex-shrink-0 flex items-center justify-center"
            style="width: 40px; height: 40px; min-width: 40px"
          >
            <div v-html="getIcon(item.icon)" />
          </div>

          <!-- Text Content - White -->
          <div class="flex flex-col gap-0.5 pt-1">
            <!-- Title: Bold, White, 18-20px -->
            <h3 
              class="font-bold text-white"
              style="font-size: 18px; line-height: 1.3"
            >
              {{ item.title }}
            </h3>

            <!-- Subtitle: Normal Weight, White, 14-16px -->
            <p 
              class="font-normal text-white"
              style="font-size: 14px; line-height: 1.3; opacity: 0.95"
            >
              {{ item.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-info-card-container {
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-info-card-container {
    padding: 0;
  }
}
</style>
