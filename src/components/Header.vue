<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const openMenu = ref<string | null>(null)
const mobileMenuOpen = ref(false)

// Toggle body overflow when mobile menu opens/closes
watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('menu-open')
  } else {
    document.body.classList.remove('menu-open')
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  document.body.classList.remove('menu-open')
})

const menuItems = [
  {
    label: 'Nos Expertises',
    path: '/categories/urologie',
    submenu: [
      { label: 'Urologie', path: '/categories/urologie' },
      { label: 'Stomathérapie', path: '/categories/stomatherapie' },
      { label: 'Cicatrisation', path: '/categories/cicatrisation' },
      { label: 'Neuro-stimulation (TENS)', path: '/categories/neurostimulation' },
      { label: 'Parcours d\'affirmation de genre', path: '/reassignation-sexuelle' },
    ],
  },
  {
    label: "L'Écosystème Connecté",
    path: '/ecosysteme-connecte',
  },
  {
    label: 'Horizons Stiméo',
    path: '/horizons-stimeo',
  },
  {
    label: 'Vous êtes IDEL ?',
    path: '/idel',
  },
]

const navigateTo = (path: string) => {
  router.push(path)
  mobileMenuOpen.value = false
  openMenu.value = null
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/98 backdrop-blur-sm border-b border-gray-100 transition-all duration-300 header-shadow">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="flex items-center justify-between h-16 py-4">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex items-center h-12 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F74a30cfa669741ed99c36ea1d2901af8?format=webp&width=800"
            alt="STIMÉO"
            class="h-full object-contain"
          />
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-10">
          <template v-for="item in menuItems" :key="item.label">
            <div v-if="item.submenu" class="relative group h-16 flex items-center">
              <button
                class="text-base font-medium text-brand-anthracite hover:text-brand-gold transition-colors py-2"
              >
                {{ item.label }}
              </button>
              <!-- Mega-menu dropdown with enhanced styling -->
              <div
                class="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-80 bg-white rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-3 group-hover:translate-y-0 shadow-dropdown"
              >
                <!-- Dropdown border accent (top) -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-yellow to-brand-gold rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <!-- Dropdown content with proper spacing -->
                <div class="p-3 space-y-1">
                  <RouterLink
                    v-for="submenu in item.submenu"
                    :key="submenu.label"
                    :to="submenu.path"
                    class="block px-5 py-3 text-sm font-medium text-brand-anthracite rounded-xl hover:bg-gray-50 hover:text-brand-gold transition-colors duration-200"
                  >
                    {{ submenu.label }}
                  </RouterLink>
                </div>
              </div>
            </div>

            <RouterLink
              v-else
              :to="item.path"
              :class="[
                'text-base font-medium transition-colors',
                $route.path === item.path
                  ? 'text-brand-gold'
                  : 'text-brand-anthracite hover:text-brand-gold',
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </template>
        </nav>

        <!-- CTA Button and Mobile Menu Toggle -->
        <div class="flex items-center gap-6">
          <button
            @click="navigateTo('/contact')"
            class="btn-primary hidden sm:inline-block text-sm py-3 px-8 shadow-lg shadow-brand-gold/20"
          >
            Nous contacter
          </button>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden inline-flex items-center justify-center text-brand-anthracite hover:text-brand-gold transition-colors"
          >
            <span class="sr-only">Open main menu</span>
            <div class="w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
               <span :class="['block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out', mobileMenuOpen ? 'rotate-45 translate-y-2' : '']"></span>
               <span :class="['block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out', mobileMenuOpen ? 'opacity-0' : '']"></span>
               <span :class="['block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out', mobileMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Overlay (Full-screen) -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed top-0 left-0 w-screen h-screen z-999 bg-white mobile-menu-container"
      >
        <!-- Close Button (Fixed at top-right) -->
        <button
          @click="mobileMenuOpen = false"
          class="fixed top-6 right-6 z-1000 w-8 h-8 flex items-center justify-center text-brand-anthracite hover:text-brand-gold transition-colors"
          aria-label="Close menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Mobile Menu Content (Scrollable) -->
        <div class="h-screen overflow-y-auto pt-20 pb-24 px-6 mobile-menu-scroll">
          <div class="space-y-1">
            <template v-for="item in menuItems" :key="item.label">
              <div v-if="item.submenu" class="space-y-0">
                <button
                  @click="openMenu = openMenu === item.label ? null : item.label"
                  class="w-full text-left px-5 py-4 font-bold font-eastman text-lg text-brand-anthracite flex justify-between items-center border-b border-gray-100 hover:bg-gray-50 hover:text-brand-gold transition-all duration-200 group"
                >
                  {{ item.label }}
                  <span :class="['transform transition-transform duration-300 text-brand-gold font-light text-xl group-hover:scale-110', openMenu === item.label ? 'rotate-180' : '']">
                    ▾
                  </span>
                </button>
                <div v-if="openMenu === item.label" class="mobile-submenu-container">
                  <RouterLink
                    v-for="(submenu, idx) in item.submenu"
                    :key="submenu.label"
                    :to="submenu.path"
                    @click="mobileMenuOpen = false; openMenu = null"
                    class="block px-6 py-3 text-base font-medium text-brand-neutral hover:text-brand-gold hover:bg-gray-50 transition-colors duration-200"
                    :style="{ '--animation-delay': `${idx * 30}ms` }"
                  >
                    {{ submenu.label }}
                  </RouterLink>
                </div>
              </div>

              <RouterLink
                v-else
                :to="item.path"
                @click="mobileMenuOpen = false"
                class="block px-5 py-4 font-bold font-eastman text-lg text-brand-anthracite border-b border-gray-100 hover:bg-gray-50 hover:text-brand-gold transition-all duration-200"
              >
                {{ item.label }}
              </RouterLink>
            </template>
          </div>
          <div class="mt-12 px-4">
            <button
              @click="navigateTo('/contact')"
              class="btn-primary w-full text-center justify-center"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ============================================
   HEADER & DROPDOWN STYLING
   ============================================ */

/* Sticky header with subtle shadow on scroll */
header.header-shadow {
  box-shadow: 0 1px 3px rgba(45, 45, 45, 0.05), 0 0 8px rgba(190, 169, 37, 0.04);
}

/* Professional dropdown shadow (soft, subtle) */
.shadow-dropdown {
  box-shadow: 0 10px 25px -5px rgba(45, 45, 45, 0.1), 0 4px 6px -2px rgba(45, 45, 45, 0.05);
  border: 1px solid rgba(190, 169, 37, 0.08);
}

/* ============================================
   MOBILE MENU FULL-SCREEN OVERLAY STYLING
   ============================================ */

/* Mobile Menu Container - Full Screen Fixed Overlay */
.mobile-menu-container {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: #FFFFFF;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

/* Scrollable Content Area - Hide Scrollbar */
.mobile-menu-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.mobile-menu-scroll::-webkit-scrollbar {
  display: none;
}

/* Prevent body scroll when menu is open */
:global(body.menu-open) {
  overflow: hidden;
}

/* ============================================
   MOBILE MENU ACCORDION ANIMATION
   ============================================ */

/* Mobile submenu container with staggered item animations */
.mobile-submenu-container {
  overflow: hidden;
  background-color: rgba(245, 245, 245, 0.5);
  border-left: 3px solid rgba(190, 169, 37, 0.3);
  animation: submenuSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes submenuSlideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

/* Staggered item animations within submenu */
.mobile-submenu-container a {
  animation: submenuItemFadeIn 0.3s ease-out forwards;
  opacity: 0;
}

.mobile-submenu-container a:nth-child(1) {
  animation-delay: calc(var(--animation-delay, 0ms) + 0ms);
}

.mobile-submenu-container a:nth-child(2) {
  animation-delay: calc(var(--animation-delay, 0ms) + 30ms);
}

.mobile-submenu-container a:nth-child(3) {
  animation-delay: calc(var(--animation-delay, 0ms) + 60ms);
}

.mobile-submenu-container a:nth-child(4) {
  animation-delay: calc(var(--animation-delay, 0ms) + 90ms);
}

.mobile-submenu-container a:nth-child(5) {
  animation-delay: calc(var(--animation-delay, 0ms) + 120ms);
}

@keyframes submenuItemFadeIn {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
