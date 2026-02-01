<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VitaliaMailbox from '../components/VitaliaMailbox.vue'

const router = useRouter()
const profileOpen = ref(false)

const userProfile = {
  name: 'Marie Dupont',
  role: 'Professionnelle de Santé',
  specialty: 'IDEL',
  email: 'marie.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie'
}

const logout = () => {
  router.push('/')
}

const toggleProfile = () => {
  profileOpen.value = !profileOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 vitalia-pwa-profil-view">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="container mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-extrabold text-brand-gold">my VITALIA</h1>
          <p class="text-sm text-brand-neutral">Espace de coordination</p>
        </div>

        <!-- Profile Menu -->
        <div class="relative">
          <button
            @click="toggleProfile"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <img
              :src="userProfile.avatar"
              :alt="userProfile.name"
              class="w-10 h-10 rounded-full"
            />
            <span class="hidden sm:block text-sm font-semibold text-brand-anthracite">
              {{ userProfile.name }}
            </span>
          </button>

          <!-- Profile Dropdown -->
          <div
            v-show="profileOpen"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-4">
                  <img
                    :src="userProfile.avatar"
                    :alt="userProfile.name"
                    class="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 class="font-bold text-lg text-brand-anthracite">{{ userProfile.name }}</h3>
                    <p class="text-sm text-brand-neutral">{{ userProfile.specialty }}</p>
                    <p class="text-xs text-brand-neutral mt-1">{{ userProfile.role }}</p>
                  </div>
                </div>
                <button
                  @click="toggleProfile"
                  class="text-brand-gold hover:bg-brand-gold hover:bg-opacity-10 p-2 rounded-lg transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="p-4 space-y-3">
              <div>
                <p class="text-xs text-brand-neutral uppercase font-semibold mb-1">Email</p>
                <p class="text-sm text-brand-anthracite">{{ userProfile.email }}</p>
              </div>
              <div>
                <p class="text-xs text-brand-neutral uppercase font-semibold mb-1">Téléphone</p>
                <p class="text-sm text-brand-anthracite">{{ userProfile.phone }}</p>
              </div>
            </div>

            <div class="p-4 border-t border-gray-200">
              <button
                @click="logout"
                class="w-full px-4 py-3 bg-brand-gold text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>

          <!-- Overlay -->
          <div
            v-show="profileOpen"
            @click="toggleProfile"
            class="fixed inset-0 z-40"
          />
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-30">
      <div class="container mx-auto px-6">
        <div class="flex gap-8">
          <button
            class="py-4 px-2 border-b-2 border-brand-gold text-brand-gold font-semibold text-base transition-colors duration-200"
          >
            Messagerie
          </button>
          <button
            class="py-4 px-2 border-b-2 border-transparent text-brand-neutral font-semibold text-base hover:text-brand-anthracite transition-colors duration-200"
          >
            Constantes
          </button>
          <button
            class="py-4 px-2 border-b-2 border-transparent text-brand-neutral font-semibold text-base hover:text-brand-anthracite transition-colors duration-200"
          >
            Rendez-vous
          </button>
          <button
            class="py-4 px-2 border-b-2 border-transparent text-brand-neutral font-semibold text-base hover:text-brand-anthracite transition-colors duration-200"
          >
            Documents
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <!-- Mailbox Section -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-extrabold text-brand-gold">Vos messages</h2>
            <p class="text-sm text-brand-neutral">Coordonnez avec votre réseau de soins</p>
          </div>
        </div>

        <VitaliaMailbox />
      </div>

      <!-- Info Section -->
      <section class="bg-brand-gold bg-opacity-5 rounded-lg p-8 border border-brand-gold border-opacity-20">
        <h3 class="text-xl font-bold text-brand-gold mb-4">À propos de my VITALIA</h3>
        <p class="text-base text-brand-neutral leading-relaxed mb-4">
          my VITALIA est votre plateforme de coordination centralisée pour faciliter la communication avec l'ensemble des professionnels impliqués dans votre parcours de soins.
        </p>
        <ul class="space-y-2 text-sm text-brand-neutral">
          <li class="flex items-start gap-2">
            <span class="text-brand-gold font-bold mt-1">✓</span>
            <span>Communication directe et sécurisée avec vos praticiens</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-brand-gold font-bold mt-1">✓</span>
            <span>Suivi de vos constantes en temps réel</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-brand-gold font-bold mt-1">✓</span>
            <span>Gestion centralisée de vos rendez-vous</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-brand-gold font-bold mt-1">✓</span>
            <span>Accès à l'historique complet de votre parcours</span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* PWA Ergonomics: 120px bottom padding for mobile navigation bar */
@media (max-width: 768px) {
  :deep(main) {
    padding-bottom: 120px;
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Profile dropdown animation */
.profile-dropdown-enter-active,
.profile-dropdown-leave-active {
  transition: all 0.2s ease;
}

.profile-dropdown-enter-from,
.profile-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
