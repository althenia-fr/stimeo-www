<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import CheckIcon from '../components/icons/CheckIcon.vue'
import DomainCard from '../components/DomainCard.vue'
import { useMagneticButton } from '../composables/useMagneticButton'
import { useTitleAnimations } from '../composables/useTitleAnimations'
import { useDomainCardReveal } from '../composables/useDomainCardReveal'
import { useCarouselSwipe } from '../composables/useCarouselSwipe'

// Initialize global animations
useTitleAnimations()
useMagneticButton()
useDomainCardReveal()

// Initialize carousel swipe with haptic feedback
const { getCurrentCardIndex } = useCarouselSwipe('.domain-carousel-mobile')

// For parallax effect
let parallaxShapes: HTMLElement[] = []
let isScrolling = false

// Magnetic button effect
useMagneticButton()

const router = useRouter()
const currentSlide = ref(0)
const currentDomainIndex = ref(0)
const autoplayInterval = ref<NodeJS.Timeout | null>(null)
const isHovering = ref(false)
const ecosystemTab = ref<'patient' | 'prescripteur'>('patient')

// Swipe gesture support
let touchStartX = 0
let touchEndX = 0

const slides = [
  {
    label: 'Expertise Majeure',
    title: 'Téléobservance',
    description: 'Pilotage en temps réel des protocoles de soin avec sécurisation complète du parcours patient. Une synergie entre Stiméo+ et Stiméo Connect.',
    points: [
      {
        title: 'Duo Stiméo+ / Stiméo Connect',
        description: 'Connexion sécurisée entre patient et professionnel de santé.',
      },
      {
        title: 'Pilotage en Temps Réel',
        description: 'Supervision active et alertes ciblées pour une prise en charge proactive.',
      },
      {
        title: 'Sécurisation du Parcours',
        description: 'Données chiffrées, conformité RGPD et traçabilité complète.',
      },
    ],
    buttonText: 'En savoir plus',
    path: '/ecosysteme-connecte',
  },
  {
    label: 'Expertise Majeure',
    title: 'Neuro-stimulation (TENS)',
    description: 'Soulagement des douleurs chroniques grâce à la technologie TENS. Installation et suivi par des IDEL formés.',
    points: [
      {
        title: 'Soulagement Prouvé',
        description: 'Efficacité cliniquement validée pour les douleurs chroniques (jusqu\'à 70% de soulagement).',
      },
      {
        title: 'Technologie Innovante',
        description: 'Dispositif médical innovant, portable et intuitif.',
      },
      {
        title: 'Installation par IDEL Formés',
        description: 'Expertise sur terrain garantissant l\'adoption et l\'observance.',
      },
    ],
    buttonText: 'En savoir plus',
    path: '/categories/neurostimulation',
  },
  {
    label: 'Expertise Majeure',
    title: 'Parcours d\'affirmation de genre',
    description: 'Une prise en charge pionnière et bienveillante. Nous assurons une coordination post-opératoire spécifique entre chirurgiens et infirmiers libéraux (IDEL).',
    points: [
      {
        title: 'Coordination Chirurgie-Ville',
        description: 'Fluidité totale du parcours de soin dès la sortie de clinique.',
      },
      {
        title: 'Suivi Clinique Expert',
        description: 'Gestion de la cicatrisation, de la douleur et protocoles de dilatation.',
      },
      {
        title: 'Réassurance & Proximité',
        description: 'Appel de réassurance sous 24-48h et suivi régulier à domicile jusqu\'à 6 mois.',
      },
    ],
    buttonText: 'En savoir plus',
    path: '/reassignation-sexuelle',
  },
]

const navigateTo = (path: string) => {
  router.push(path)
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoplay = () => {
  if (!isHovering.value) {
    autoplayInterval.value = setInterval(() => {
      if (!isHovering.value) {
        nextSlide()
      }
    }, 12000)
  }
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

const handleCarouselHover = (hovering: boolean) => {
  isHovering.value = hovering
  if (hovering) {
    stopAutoplay()
  } else {
    startAutoplay()
  }
}

// Swipe gesture handlers for mobile
const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50 // Minimum distance to trigger swipe
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - go to next slide
      nextSlide()
    } else {
      // Swiped right - go to previous slide
      prevSlide()
    }
  }
}

// Reset carousel underline animation on slide change
watch(currentSlide, () => {
  const underline = document.querySelector('.carousel-title-underline')
  if (underline) {
    // Trigger animation by removing and re-adding the class
    underline.classList.remove('carousel-underline-animate')
    // Force a reflow to restart the animation
    void (underline as HTMLElement).offsetWidth
    underline.classList.add('carousel-underline-animate')
  }
})

onMounted(() => {
  startAutoplay()

  // Setup parallax shapes
  setTimeout(() => {
    parallaxShapes = Array.from(document.querySelectorAll('.parallax-shape')) as HTMLElement[]
    isScrolling = true
  }, 100)

  // Add scroll listener for parallax
  window.addEventListener('scroll', handleParallaxScroll, { passive: true })

  // Initialize carousel underline animation
  setTimeout(() => {
    const underline = document.querySelector('.carousel-title-underline')
    if (underline) {
      underline.classList.add('carousel-underline-animate')
    }
  }, 150)

  // Setup mobile domain carousel pagination tracking
  setTimeout(() => {
    const domainCarousel = document.querySelector('.domain-carousel-mobile')
    if (domainCarousel) {
      domainCarousel.addEventListener('scroll', () => {
        const index = getCurrentCardIndex()
        currentDomainIndex.value = index
      }, { passive: true })
    }
  }, 100)
})

onUnmounted(() => {
  stopAutoplay()
  window.removeEventListener('scroll', handleParallaxScroll)
})

const expertises = [
  {
    title: 'Urologie',
    description: 'Suivi des pathologies urinaires avec expertise médicale continue.',
    path: '/categories/urologie',
    domain: 'urologie',
  },
  {
    title: 'Stomathérapie',
    description: 'Accompagnement spécialisé pour les patients porteurs de stomies.',
    path: '/categories/stomatherapie',
    domain: 'stomatherapie',
  },
  {
    title: 'Cicatrisation',
    description: 'Pansements avancés et surveillance pour une cicatrisation optimale.',
    path: '/categories/cicatrisation',
    domain: 'cicatrisation',
  },
  {
    title: 'Neuro-stimulation',
    description: 'Technologie TENS pour le soulagement des douleurs chroniques.',
    path: '/categories/neurostimulation',
    domain: 'neurostimulation',
  },
  {
    title: 'Affirmation de Genre',
    description: 'Accompagnement bienveillant et suivi spécialisé pour sécuriser le parcours post-opératoire.',
    path: '/reassignation-sexuelle',
    domain: 'affirmationdegen',
  },
]

// Parallax handler
const handleParallaxScroll = () => {
  if (!isScrolling) return

  const scrollY = window.scrollY
  const parallaxRatio = 0.1 // Inverse parallax ratio

  parallaxShapes.forEach((shape) => {
    const shapeTop = shape.getBoundingClientRect().top + scrollY
    const offset = (scrollY - shapeTop) * parallaxRatio
    shape.style.transform = `translateY(${offset}px)`
  })
}
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- Hero Section with Layered Design -->
    <section class="relative py-4 sm:py-8 md:py-12 lg:py-12 px-6 md:px-12 overflow-hidden" style="background-image: url('https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F07d79581116b44a495d868ba6acd7d20?format=webp&width=1200'); background-size: cover; background-position: center right; background-attachment: fixed;">
      <!-- Gradient overlay: transparent from left to visible on right -->
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
      <div class="container-width relative z-10">
        <!-- Main Hero Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch relative">
          <!-- Text Content -->
          <div class="lg:col-span-7 z-20 relative pr-0 lg:pr-8 py-2 sm:py-4 md:py-8 lg:py-12">
            <h1 class="font-extrabold font-eastman leading-tight mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-display text-center lg:text-left">
              <span class="liquid-highlight">L'indépendance</span> <br/>
              au service de <br/>
              votre <span class="liquid-highlight">observance</span>
            </h1>
            <p class="text-sm sm:text-base md:text-lg lg:text-xl text-brand-anthracite font-normal mb-4 sm:mb-6 leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              Prestataire de Santé à Domicile (PSAD) agréé et augmenté, Stiméo accompagne les patients dans leurs soins spécialisés : <strong>Urologie</strong>, <strong>Stomathérapie</strong>, <strong>Cicatrisation</strong>, <strong>Neurostimulation TENS</strong> et <strong>Parcours d'affirmation de genre</strong>.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                @click="navigateTo('/ecosysteme-connecte')"
                class="vitalia-btn-vision w-full sm:w-auto flex-grow sm:flex-grow-0"
                data-magnetic
              >
                Découvrir notre vision
              </button>
              <button
                @click="navigateTo('/contact')"
                class="btn-secondary w-full sm:w-auto flex-grow sm:flex-grow-0"
                data-magnetic
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>

          <!-- Asymmetrical Image Block (now layered with yellow background) -->
          <div class="lg:col-span-5 relative z-10" />
        </div>
      </div>
    </section>

    <!-- Expertise Majeure : Panoramic Carousel with Maximum Interactivity -->
    <section class="relative py-8 sm:py-12 md:py-16 lg:py-16 bg-white overflow-hidden">
      <!-- Offset Yellow Decorative Shapes -->
      <div class="absolute -right-96 top-1/2 transform -translate-y-1/2 w-[800px] h-[800px] bg-yellow-300 rounded-full opacity-20 blur-3xl -z-10 hidden lg:block parallax-shape"></div>
      <div class="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-brand-yellow rounded-full opacity-15 blur-2xl -z-10 parallax-shape"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <!-- Carousel Card - Panoramic Layout -->
        <div
          class="bg-white rounded-3xl p-5 sm:p-8 md:p-12 lg:p-16 shadow-2xl relative z-20 w-full transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden group carousel-card"
          @mouseenter="handleCarouselHover(true)"
          @mouseleave="handleCarouselHover(false)"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <!-- Watermark Icon on Right (Filigree) -->
          <div class="absolute -right-20 -top-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <svg class="w-96 h-96 text-brand-anthracite" fill="currentColor" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2"/>
              <path d="M24 16v16M16 24h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
            <!-- Left Content Area (2 columns) -->
            <div class="lg:col-span-2">
              <!-- Left Yellow Accent Bar -->
              <div class="absolute left-0 top-10 w-1 h-20 bg-brand-gold rounded-r"></div>

              <!-- Title with underline animation -->
              <h2 class="font-extrabold font-eastman group-hover:text-brand-gold mb-3 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl relative pb-4 pl-6 transition-colors duration-300">
                {{ slides[currentSlide].title }}
                <span class="carousel-title-underline"></span>
              </h2>

              <p class="text-brand-neutral font-normal mb-4 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg pl-6">
                {{ slides[currentSlide].description }}
              </p>

              <!-- Points List with Gold Checks -->
              <ul class="space-y-2 sm:space-y-3 mb-4 sm:mb-8 pl-6">
                 <li v-for="(point, idx) in slides[currentSlide].points" :key="idx" class="flex items-start text-brand-anthracite">
                    <CheckIcon class="mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <h4 class="font-bold text-sm sm:text-base mb-1">{{ point.title }}</h4>
                      <p class="text-xs sm:text-sm text-brand-neutral">{{ point.description }}</p>
                    </div>
                 </li>
              </ul>

              <!-- Text Link with Arrow - Bottom Right -->
              <a
                @click="navigateTo(slides[currentSlide].path)"
                class="absolute bottom-6 right-6 text-brand-anthracite font-bold text-base flex items-center gap-2 hover:text-brand-gold transition-colors cursor-pointer group/link"
                data-magnetic
              >
                {{ slides[currentSlide].buttonText }}
                <svg class="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <!-- Right Side Navigation (Integrated) -->
            <div class="hidden lg:flex flex-col items-center justify-center gap-6">
              <!-- Navigation Buttons (Vertical on Right) -->
              <button
                @click="prevSlide"
                class="text-brand-anthracite hover:text-brand-gold hover:bg-gray-100 transition-all p-3 rounded-full"
                aria-label="Previous slide"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Navigation Dots (Vertical) -->
              <div class="flex flex-col gap-3">
                <button
                  v-for="(slide, idx) in slides"
                  :key="idx"
                  @click="goToSlide(idx)"
                  class="rounded-full transition-all duration-300"
                  :class="idx === currentSlide ? 'bg-brand-gold w-2 h-8' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'"
                  :aria-label="`Go to slide ${idx + 1}`"
                />
              </div>

              <!-- Next Button -->
              <button
                @click="nextSlide"
                class="text-brand-anthracite hover:text-brand-gold hover:bg-gray-100 transition-all p-3 rounded-full"
                aria-label="Next slide"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Decorative Golden Bar at Bottom -->
          <div class="absolute bottom-0 left-0 right-0 h-2.5 bg-brand-gold rounded-b-3xl"></div>
        </div>

        <!-- Bottom Navigation for Mobile -->
        <div class="flex lg:hidden items-center justify-center gap-3 mt-4 sm:mt-6 sm:gap-4 relative z-20">
          <!-- Previous Button -->
          <button
            @click="prevSlide"
            class="text-brand-anthracite active:text-brand-gold active:bg-gray-100 transition-all p-4 sm:p-3 rounded-full active:scale-90"
            aria-label="Previous slide"
          >
            <svg class="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Navigation Dots -->
          <div class="flex gap-3 sm:gap-2 mx-4">
            <button
              v-for="(slide, idx) in slides"
              :key="idx"
              @click="goToSlide(idx)"
              class="rounded-full transition-all duration-300 active:scale-90"
              :class="idx === currentSlide ? 'bg-brand-gold w-8 h-3 sm:h-2' : 'bg-gray-300 w-3 h-3 sm:w-2 sm:h-2 active:bg-gray-400'"
              :aria-label="`Go to slide ${idx + 1}`"
            />
          </div>

          <!-- Next Button -->
          <button
            @click="nextSlide"
            class="text-brand-anthracite active:text-brand-gold active:bg-gray-100 transition-all p-4 sm:p-3 rounded-full active:scale-90"
            aria-label="Next slide"
          >
            <svg class="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Nos Domaines d'Intervention - Offset Yellow Shapes Section -->
    <section class="relative py-12 sm:py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <!-- Offset Yellow Decorative Shapes -->
      <div class="absolute top-16 right-0 w-80 h-80 bg-yellow-300 rounded-full opacity-50 blur-2xl -z-10 parallax-shape"></div>
      <div class="absolute bottom-0 -left-32 w-96 h-96 bg-brand-yellow rounded-full opacity-40 blur-3xl -z-10 parallax-shape"></div>

      <!-- Golden Background Band (Overlapping Cards) -->
      <div class="absolute left-0 right-0 top-1/2 w-full h-48 bg-brand-gold parallax-shape" style="z-index: 0; transform: translateY(-50%);"></div>

      <div class="container-width relative z-10">
        <!-- Section Header -->
        <div class="mb-8 sm:mb-12 md:mb-16 text-center relative z-20">
            <h2 class="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-3">Nos <span class="liquid-highlight">Domaines d'Intervention</span></h2>
        </div>

        <!-- Domain Cards Grid (on light background with offset shapes) -->
        <!-- Desktop: 5 columns, Tablet: 2 columns, Mobile: Horizontal scroll -->
        <div class="relative z-20">
          <!-- Desktop & Tablet Grid View -->
          <div class="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-6">
             <DomainCard
               v-for="expertise in expertises"
               :key="expertise.title"
               :title="expertise.title"
               :description="expertise.description"
               :path="expertise.path"
               :domain="expertise.domain"
             />
          </div>

          <!-- Mobile Horizontal Scroll View with Swipe & Haptic -->
          <div class="md:hidden">
            <div
              class="domain-carousel-mobile vitalia-swipe-container"
            >
              <div
                v-for="(expertise, idx) in expertises"
                :key="expertise.title"
                class="vitalia-swipe-item"
              >
                <DomainCard
                  :title="expertise.title"
                  :description="expertise.description"
                  :path="expertise.path"
                  :domain="expertise.domain"
                />
              </div>
            </div>

            <!-- Mobile Pagination Dots (Gold STIMÉO) -->
            <div class="vitalia-carousel-dots">
              <button
                v-for="(expertise, idx) in expertises"
                :key="`domain-dot-${idx}`"
                class="vitalia-dot"
                :class="{ 'vitalia-dot-active': currentDomainIndex === idx }"
                :aria-label="`Go to domain ${idx + 1}`"
                aria-current="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Logos Marquee - Infinite Scroll -->
    <section class="marquee-section">
      <div class="marquee-wrapper">
        <div class="marquee-content">
          <!-- First set of logos -->
          <div class="logos-group">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Ff016b5016da74212bc71ae9ede08a456?format=webp&width=800" alt="Schwa Medico" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F029480992e594007aaad84f95f7e1a0d?format=webp&width=800" alt="Teleflex" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fe58fde7ca7b74a6aae376b64ed800a3d?format=webp&width=800" alt="Hartmann" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F961b754ed4ee4533a1842844726a2f0a?format=webp&width=800" alt="Hollister" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F0cf4ae2508e14bd99c8fc5e2cfb11c3d?format=webp&width=800" alt="Urgo" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F1f340ef3da614d92a9085fb68fd216d2?format=webp&width=800" alt="Coloplast" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fe0a14db297f04970b0358c45549842b1?format=webp&width=800" alt="Cereplas" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F19f01d96f0e5461e9e424b9e3bc7d8f7?format=webp&width=800" alt="Stimuli Technology" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F655592e5b7e642c3a2098a87e8065173?format=webp&width=800" alt="Bard" class="marquee-logo" />
          </div>
          <!-- Duplicated set for seamless loop -->
          <div class="logos-group">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Ff016b5016da74212bc71ae9ede08a456?format=webp&width=800" alt="Schwa Medico" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F029480992e594007aaad84f95f7e1a0d?format=webp&width=800" alt="Teleflex" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fe58fde7ca7b74a6aae376b64ed800a3d?format=webp&width=800" alt="Hartmann" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F961b754ed4ee4533a1842844726a2f0a?format=webp&width=800" alt="Hollister" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F0cf4ae2508e14bd99c8fc5e2cfb11c3d?format=webp&width=800" alt="Urgo" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F1f340ef3da614d92a9085fb68fd216d2?format=webp&width=800" alt="Coloplast" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fe0a14db297f04970b0358c45549842b1?format=webp&width=800" alt="Cereplas" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F19f01d96f0e5461e9e424b9e3bc7d8f7?format=webp&width=800" alt="Stimuli Technology" class="marquee-logo" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F655592e5b7e642c3a2098a87e8065173?format=webp&width=800" alt="Bard" class="marquee-logo" />
          </div>
        </div>
      </div>
    </section>

    <!-- Écosystème Connecté - Tabbed Interface -->
    <section class="py-8 sm:py-12 md:py-16 px-6 md:px-12 bg-white relative">

      <div class="container-width">
        <!-- Section Header -->
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-3">L'<span class="liquid-highlight">Écosystème Connecté</span></h2>
          <p class="text-lg text-brand-anthracite font-normal max-w-2xl mx-auto">
            Une synergie parfaite entre le patient et le corps médical grâce à nos deux plateformes connectées.
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="flex justify-center gap-4 sm:gap-8 md:gap-16 mb-8 sm:mb-12 md:mb-16 border-b border-gray-200">
          <button
            @click="ecosystemTab = 'patient'"
            :class="[
              'font-bold text-base md:text-lg font-eastman transition-all duration-300 pb-4 relative group',
              ecosystemTab === 'patient'
                ? 'text-brand-gold'
                : 'text-brand-neutral tab-inactive-hint group-hover:text-brand-gold group-hover:scale-105'
            ]"
          >
            CÔTÉ PATIENT
            <span
              v-if="ecosystemTab === 'patient'"
              class="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-t tab-indicator-animate"
              style="height: 3px"
            ></span>
          </button>
          <button
            @click="ecosystemTab = 'prescripteur'"
            :class="[
              'font-bold text-base md:text-lg font-eastman transition-all duration-300 pb-4 relative group',
              ecosystemTab === 'prescripteur'
                ? 'text-brand-gold'
                : 'text-brand-neutral tab-inactive-hint group-hover:text-brand-gold group-hover:scale-105'
            ]"
          >
            CÔTÉ PRESCRIPTEUR
            <span
              v-if="ecosystemTab === 'prescripteur'"
              class="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-t tab-indicator-animate"
              style="height: 3px"
            ></span>
          </button>
        </div>

        <!-- Dual-View Content -->
        <div class="relative overflow-hidden">
          <!-- Patient View (Stiméo+) -->
          <div
            v-show="ecosystemTab === 'patient'"
            class="tab-content-enter"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <!-- Left: Device Image -->
              <div class="relative h-80 md:h-96 lg:h-96">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F058d7e5d9b4145af9f19a6b4b5ed1800?format=webp&width=800"
                  alt="Interface Patient Stiméo+"
                  class="w-full h-full object-contain"
                />
              </div>
              <!-- Right: Content -->
              <div>
                <h3 class="font-extrabold font-eastman text-3xl md:text-4xl text-brand-gold mb-4">Stiméo+</h3>
                <p class="text-base text-brand-anthracite mb-6 leading-relaxed">
                  <strong>Votre compagnon de santé quotidien.</strong> Stiméo+ vous permet de suivre vos traitements, d'accéder à des contenus éducatifs validés et de rester en lien constant avec votre équipe soignante.
                </p>
                <ul class="space-y-4 mb-8 text-brand-anthracite text-base">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Autonomie renforcée par le coaching digital.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Téléobservance simplifiée et sécurisée.</span>
                  </li>
                </ul>
                <div class="text-right">
                  <a @click="navigateTo('/ecosysteme-connecte')" class="text-brand-anthracite font-bold text-sm inline-flex items-center gap-2 hover:text-brand-gold transition-colors cursor-pointer group btn-discover" data-magnetic>
                    Découvrir l'application
                    <svg class="w-4 h-4 arrow transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Prescripteur View (Stiméo Connect) -->
          <div
            v-show="ecosystemTab === 'prescripteur'"
            class="tab-content-enter"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <!-- Left: Content -->
              <div>
                <h3 class="font-extrabold font-eastman text-3xl md:text-4xl text-brand-gold mb-4">Stiméo Connect</h3>
                <p class="text-base text-brand-anthracite mb-6 leading-relaxed">
                  <strong>Le tableau de bord expert pour les professionnels de santé.</strong> Supervisez vos patients en temps réel, recevez des alertes pertinentes et adaptez les protocoles à distance.
                </p>
                <ul class="space-y-4 mb-8 text-brand-anthracite text-base">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Vision globale de la file active.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Réactivité accrue grâce aux alertes ciblées.</span>
                  </li>
                </ul>
                <div class="text-right">
                  <a @click="navigateTo('/ecosysteme-connecte')" class="text-brand-anthracite font-bold text-sm inline-flex items-center gap-2 hover:text-brand-gold transition-colors cursor-pointer group btn-discover" data-magnetic>
                    Accéder au portail
                    <svg class="w-4 h-4 arrow transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              <!-- Right: Device Image -->
              <div class="relative h-80 md:h-96 lg:h-96">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Ff2d2740fb3b44b3db47050674b1b74fd?format=webp&width=800"
                  alt="Interface Pro Stiméo Connect"
                  class="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Engagements / Editorial Prestige Layout -->
    <section class="py-16 px-6 md:px-12 bg-white">
       <div class="container-width">
          <!-- Section Title -->
          <div class="mb-16 text-center">
             <h2 class="font-extrabold text-4xl md:text-5xl mb-3">
                <span class="text-brand-anthracite">Nos Engagements de</span>
                <span class="liquid-highlight font-extrabold inline-block align-baseline"> Confiance</span>
             </h2>
          </div>

          <!-- 2-Column Editorial Layout (40/60) -->
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
             <!-- Left Column (40%) - Charte Éthique Anchor -->
             <div class="lg:col-span-2">
                <div class="bg-gray-100 rounded-4xl p-10 md:p-12">
                   <!-- Icon -->
                   <div class="mb-6 text-brand-gold">
                      <svg class="w-16 h-16 stroke-current" viewBox="0 0 48 48" fill="none">
                         <circle cx="24" cy="24" r="18" stroke-width="1.5"/>
                         <path d="M24 16v16M18 24h12" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                   </div>
                   <!-- Title -->
                   <h3 class="font-extrabold font-eastman text-3xl text-brand-gold mb-4">Charte Éthique</h3>
                   <!-- Description -->
                   <p class="text-base leading-relaxed text-brand-anthracite">
                      Chez STIMÉO, nous plaçons l'humain et la déontologie au cœur de notre modèle. Notre indépendance est le garant de notre intégrité : nous agissons en toute transparence pour garantir une prise en charge éthique, centrée exclusivement sur les besoins du patient.
                   </p>
                </div>
             </div>

             <!-- Right Column (60%) - Engagement Items with Stagger -->
             <div class="lg:col-span-3 space-y-20">
                <!-- Engagement Item 1 -->
                <div class="engagement-item group relative opacity-0 translate-y-8">
                   <!-- Background Number -->
                   <div class="absolute -left-4 -top-16 pointer-events-none">
                      <span class="outline-number">1</span>
                   </div>
                   <!-- Content -->
                   <div class="relative z-10 pl-16">
                      <!-- Icon + Title -->
                      <div class="flex items-start gap-4 mb-3">
                         <svg class="stimeo-draw-svg w-12 h-12 flex-shrink-0 text-brand-gold" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="1.5" fill="none"/>
                            <path d="M12 24h24M18 18h12M18 30h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                         </svg>
                         <h4 class="font-extrabold text-brand-anthracite text-2xl">Soutien aux IDEL</h4>
                      </div>
                      <!-- Description -->
                      <p class="text-base text-brand-neutral leading-relaxed">
                         L'infirmier libéral reste le pivot souverain du soin. Nous garantissons une collaboration transparente, éthique et sans conflit d'intérêt.
                      </p>
                   </div>
                </div>

                <!-- Engagement Item 2 -->
                <div class="engagement-item group relative opacity-0 translate-y-8">
                   <!-- Background Number -->
                   <div class="absolute -left-4 -top-16 pointer-events-none">
                      <span class="outline-number">2</span>
                   </div>
                   <!-- Content -->
                   <div class="relative z-10 pl-16">
                      <!-- Icon + Title -->
                      <div class="flex items-start gap-4 mb-3">
                         <svg class="stimeo-draw-svg w-12 h-12 flex-shrink-0 text-brand-gold" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="1.5" fill="none"/>
                            <path d="M24 10v28M12 24h24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                         </svg>
                         <h4 class="font-extrabold text-brand-anthracite text-2xl">Innovation Bien-être</h4>
                      </div>
                      <!-- Description -->
                      <p class="text-base text-brand-neutral leading-relaxed">
                         L'innovation doit servir l'autonomie et la sécurité du patient. Nos outils sont conçus pour simplifier la vie quotidienne, jamais pour la complexifier.
                      </p>
                   </div>
                </div>

                <!-- Engagement Item 3 -->
                <div class="engagement-item group relative opacity-0 translate-y-8">
                   <!-- Background Number -->
                   <div class="absolute -left-4 -top-16 pointer-events-none">
                      <span class="outline-number">3</span>
                   </div>
                   <!-- Content -->
                   <div class="relative z-10 pl-16">
                      <!-- Icon + Title -->
                      <div class="flex items-start gap-4 mb-3">
                         <svg class="stimeo-draw-svg w-12 h-12 flex-shrink-0 text-brand-gold" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="1.5" fill="none"/>
                            <path d="M24 10L32 18L24 26L16 18Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
                            <path d="M24 26v12M16 32h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                         </svg>
                         <h4 class="font-extrabold text-brand-anthracite text-2xl">Santé Durable & Inclusive</h4>
                      </div>
                      <!-- Description -->
                      <p class="text-base text-brand-neutral leading-relaxed">
                         Notre modèle valorise l'inclusivité, via notre soutien au handisport. Nous nous engageons pour une santé durable et respectueuse de l'environnement.
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Final Call to Action -->
    <section class="py-10 px-6 md:px-12">
       <div class="container-width">
          <div class="bg-brand-yellow rounded-4xl p-10 md:p-14 text-center relative overflow-hidden animate-seesaw-rotate-neg1">
             <!-- Decorative Offset Shape -->
             <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

             <h2 class="font-extrabold text-white text-4xl md:text-5xl mb-4 relative z-10">Engageons ensemble votre réussite thérapeutique.</h2>
             <p class="text-white text-lg md:text-xl font-normal mb-8 max-w-3xl mx-auto relative z-10 opacity-95 leading-relaxed">
                Patient, prescripteur ou infirmier : profitez d'un accompagnement expert et indépendant pour un parcours de soin sécurisé, du premier diagnostic au suivi à domicile.
             </p>
             <button @click="navigateTo('/contact')" class="bg-white text-brand-anthracite px-12 py-3 font-bold rounded-pill text-base hover:bg-gray-50 hover:shadow-lg transition-all duration-300 relative z-10" data-magnetic>
                Contacter un conseiller Stiméo
             </button>
          </div>
       </div>
    </section>
  </div>
</template>

<style scoped>

/* Marquee Animation for Partner Logos */
@keyframes scroll-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-section {
  width: 100%;
  height: 120px;
  background-color: #D1D5DB;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.marquee-wrapper {
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  gap: 80px;
  align-items: center;
  animation: scroll-marquee 50s linear infinite;
  width: max-content;
}

.logos-group {
  display: flex;
  gap: 80px;
  align-items: center;
  flex-shrink: 0;
}

.marquee-logo {
  height: 50px;
  width: auto;
  filter: brightness(0) invert(1);
}

/* Engagement Items - Editorial Prestige Layout */
.engagement-item {
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Outline Number Style */
.outline-number {
  display: block;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-family: 'Eastman Grotesque', sans-serif;
  font-size: 150px;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 2px rgba(190, 169, 37, 0.15);
  text-stroke: 2px rgba(190, 169, 37, 0.15);
  transition: -webkit-text-stroke 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: text-stroke 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.engagement-item:hover .outline-number {
  -webkit-text-stroke: 2px rgba(190, 169, 37, 0.4);
  text-stroke: 2px rgba(190, 169, 37, 0.4);
}

.engagement-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered reveal timing */
.engagement-item:nth-child(1).is-visible {
  animation: revealEngage 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards;
}

.engagement-item:nth-child(2).is-visible {
  animation: revealEngage 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

.engagement-item:nth-child(3).is-visible {
  animation: revealEngage 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
}

@keyframes revealEngage {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* SVG Path Drawing Animation */
.stimeo-draw-svg path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  stroke: currentColor;
  fill: none;
}

.engagement-item:hover .stimeo-draw-svg path {
  stroke-dashoffset: 0;
}

.stimeo-draw-svg path.is-visible {
  animation: drawPath 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes drawPath {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* Sticker Floating Animation */
@keyframes stickerFloat {
  0% {
    transform: translateY(0px) rotate(-2deg);
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
    filter: drop-shadow(0 15px 25px rgba(190, 169, 37, 0.2));
  }
  100% {
    transform: translateY(0px) rotate(-2deg);
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
  }
}

/* Ecosystem Badges - Sticker Effect */
.stimeo-sticker {
  animation: stickerFloat 4s ease-in-out infinite;
  transition: all 0.3s ease;
  z-index: 20;
  cursor: pointer;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
}

.stimeo-sticker:hover {
  animation-play-state: paused;
  transform: scale(1.1) rotate(0deg) !important;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.18)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
}

img[alt="Stiméo+ Badge"],
img[alt="Stiméo Connect Badge"] {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

img[alt="Stiméo+ Badge"]:hover,
img[alt="Stiméo Connect Badge"]:hover {
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.18)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
  transform: scale(1.08) translateY(-2px);
}

/* Carousel Container Zoom Effect */
.carousel-card {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.carousel-card:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(190, 169, 37, 0.1);
}


/* Seesaw Animation for Asymmetric Yellow Blocks */
.animate-seesaw-rotate-2 {
  animation: seesawRotate2 5s ease-in-out infinite;
}

.animate-seesaw-rotate-2:hover {
  animation-duration: 3s;
}

.animate-seesaw-rotate-neg1 {
  animation: seesawRotateNeg1 5s ease-in-out infinite;
}

.animate-seesaw-rotate-neg1:hover {
  animation-duration: 3s;
}

@keyframes seesawRotate2 {
  0%, 100% {
    transform: rotate(2deg);
  }
  25% {
    transform: rotate(3.5deg);
  }
  50% {
    transform: rotate(2deg);
  }
  75% {
    transform: rotate(0.5deg);
  }
}

@keyframes seesawRotateNeg1 {
  0%, 100% {
    transform: rotate(-1deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  50% {
    transform: rotate(-1deg);
  }
  75% {
    transform: rotate(-2.5deg);
  }
}

/* Fix p tag margins inside h2 carousel title */
h2 > p {
  margin: 0;
  display: block;
}

/* Tab Content Animation - Slide & Fade */
.tab-content-enter {
  animation: slideInFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideInFade {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ============================================
   ECOSYSTEM TAB MICRO-INTERACTIONS
   ============================================ */

/* Animation de pulsation pour l'onglet inactif */
.tab-inactive-hint {
  animation: hintPulse 2s infinite ease-in-out;
}

@keyframes hintPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
    color: #BEA925;
  }
}

/* Animation de la barre dorée - glissement initial */
.tab-indicator-animate {
  animation: indicatorSlide 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
}

@keyframes indicatorSlide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(120px);
  }
  100% {
    transform: translateX(0);
  }
}

/* Animation de la flèche du bouton découvrir */
.btn-discover:hover .arrow {
  animation: arrowSlide 0.8s ease-in-out infinite;
}

@keyframes arrowSlide {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

/* ============================================
   DOMAIN CAROUSEL MOBILE STYLING
   ============================================ */

/* Mobile carousel: Unified with vitalia-swipe-container from base.css */
.domain-carousel-mobile {
  /* Inherits from vitalia-swipe-container in base.css */
  position: relative;
}

</style>
