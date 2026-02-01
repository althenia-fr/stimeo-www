<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface TabItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: boolean
  isCentral?: boolean
}

const tabs: TabItem[] = [
  {
    id: 'home',
    label: 'Accueil',
    icon: 'home',
    path: '/'
  },
  {
    id: 'practitioners',
    label: 'Praticiens',
    icon: 'users',
    path: '/patient-portal'
  },
  {
    id: 'appointment',
    label: 'RDV',
    icon: 'calendar',
    path: '/patient-portal',
    isCentral: true
  },
  {
    id: 'messages',
    label: 'Messagerie',
    icon: 'mail',
    path: '/patient-portal',
    badge: true
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: 'user',
    path: '/patient-portal'
  }
]

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path.replace(/\/$/, ''))
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
    <div class="flex items-center justify-around h-20">
      <template v-for="tab in tabs" :key="tab.id">
        <!-- Central Button (RDV) -->
        <button
          v-if="tab.isCentral"
          @click="navigateTo(tab.path)"
          class="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-2 border-brand-gold bg-white flex items-center justify-center transition-all duration-200 hover:bg-brand-gold hover:bg-opacity-5 shadow-lg"
        >
          <svg class="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <!-- Thin cross icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Regular Tabs -->
        <button
          v-else
          @click="navigateTo(tab.path)"
          class="flex flex-col items-center justify-center flex-1 h-20 relative transition-colors duration-200"
          :class="isActive(tab.path) ? 'text-brand-gold' : 'text-gray-400 hover:text-gray-600'"
        >
          <!-- Icon -->
          <svg
            v-if="tab.icon === 'home'"
            class="w-6 h-6 mb-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 13h1v7a1 1 0 001 1h12a1 1 0 001-1v-7h1a1 1 0 00.707-1.707l-7-7z" />
          </svg>
          <svg
            v-else-if="tab.icon === 'users'"
            class="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5H9m4 0a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
          <svg
            v-else-if="tab.icon === 'mail'"
            class="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <svg
            v-else-if="tab.icon === 'user'"
            class="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>

          <!-- Label -->
          <span class="text-xs font-medium">{{ tab.label }}</span>

          <!-- Badge (for Messagerie) -->
          <div v-if="tab.badge" class="absolute top-2 right-2">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>

          <!-- Active indicator -->
          <div
            v-if="isActive(tab.path) && !tab.isCentral"
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"
          />
        </button>
      </template>
    </div>
  </nav>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
