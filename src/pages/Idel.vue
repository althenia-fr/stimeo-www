<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import VitaliaRoleCards from '../components/VitaliaRoleCards.vue'
import { useTitleAnimations } from '../composables/useTitleAnimations'
import { useCarouselSwipe } from '../composables/useCarouselSwipe'

const router = useRouter()
const currentEngagementIndex = ref(0)
const expandedCardId = ref<string | null>(null)

// Engagement card data with full descriptions
const engagementCards = [
  {
    id: 'conformite',
    title: 'La sérénité juridique au service de la sécurité patient.',
    shortDescription: 'Garantissez la pérennité de votre activité grâce à un accès transparent aux dispositifs médicaux, en totale adéquation avec les normes du Code de la Santé Publique.',
    fullDescription: 'Nous assurons une veille permanente et des <b>audits de conformité réguliers</b> pour garantir un respect strict du <b>Code de la Santé Publique</b> et des dernières évolutions législatives. Chaque dispositif médical déployé fait l\'objet d\'une <b>documentation transparente</b> et d\'une traçabilité complète, assurant ainsi une sécurité juridique et technique optimale pour tous les acteurs. Notre expertise en conseil réglementaire offre à nos partenaires un <b>support juridique dédié</b> pour sécuriser chaque étape du parcours de soin à domicile.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'ethique',
    title: 'Placer l\'humain au sommet de nos exigences.',
    shortDescription: 'Exercez en toute sérénité avec un partenaire engagé qui refuse toute pratique non conforme, plaçant la déontologie au cœur de chaque prise en charge.',
    fullDescription: 'Notre engagement repose sur une <strong>charte éthique rigoureuse</strong>, co-signée par l\'ensemble de nos partenaires, pour garantir une <strong>intégrité absolue</strong> dans chaque prise en charge. Nous plaçons le respect de la <strong>dignité</strong> et des droits fondamentaux du patient au cœur de nos priorités, en refusant systématiquement toute pratique non conforme aux plus hauts standards de soin. Cette culture de la <strong>transparence</strong> guide l\'intégralité de nos échanges pour bâtir une relation de confiance durable et sincère avec le patient et sa famille.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'innovation',
    title: 'L\'innovation digitale au service d\'un pilotage de précision',
    shortDescription: 'Optimisez votre suivi clinique avec la plateforme Stiméo Connect : un accès gratuit à des données de télé-observance précises pour une coordination simplifiée.',
    fullDescription: '<p>Grâce à notre plateforme <strong>STIMÉO Connect</strong>, nous transformons le suivi patient en intégrant une <strong>télé-observance interactive</strong> et des données exploitables en temps réel pour un pilotage de précision. Cette coordination digitale simplifiée, accessible sans frais, nous permet de déployer des <strong>innovations continues</strong> spécifiquement conçues pour maximiser l\'observance et la sécurité des soins au domicile. En unifiant technologie et expertise humaine, nous offrons aux prescripteurs des outils de pilotage performants pour une vision claire et immédiate du parcours de soin.</p>',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    id: 'expertise',
    title: 'L\'excellence technique par la transmission constante du savoir',
    shortDescription: 'Restez à la pointe de l\'innovation technique et humaine pour maîtriser les dispositifs de demain et perfectionner votre accompagnement au quotidien.',
    fullDescription: '<p>Nous garantissons une expertise de pointe grâce à des programmes de <strong>formations continues</strong> sur l\'ensemble de nos dispositifs médicaux, portés par des ressources humaines expertes et toujours disponibles. Notre mission est d\'accompagner chaque soignant vers une <strong>maîtrise technique irréprochable</strong>, tout en favorisant le développement professionnel constant au sein de notre communauté. En rejoignant notre <strong>réseau de praticiens spécialisés</strong>, vous bénéficiez d\'un environnement de partage et d\'apprentissage conçu pour élever durablement les standards du soin technique.</p>',
    icon: 'M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.25 3.75 7.5 10 7.5s10-2.25 10-7.5c0-6.252-4.5-11-10-11z'
  }
]

useTitleAnimations()

// Initialize carousel swipe with haptic feedback for engagement cards
const { getCurrentCardIndex } = useCarouselSwipe('.engagement-carousel-mobile')

const navigateTo = (path: string) => {
  router.push(path)
}

/**
 * Toggle accordion card expansion with haptic feedback
 */
const toggleAccordion = (cardId: string) => {
  if (navigator.vibrate) navigator.vibrate(12)

  if (expandedCardId.value === cardId) {
    expandedCardId.value = null
  } else {
    expandedCardId.value = cardId
  }
}

onMounted(() => {
  // Setup mobile engagement carousel pagination tracking
  setTimeout(() => {
    const engagementCarousel = document.querySelector('.engagement-carousel-mobile')
    if (engagementCarousel) {
      engagementCarousel.addEventListener('scroll', () => {
        const index = getCurrentCardIndex()
        currentEngagementIndex.value = index
      }, { passive: true })
    }
  }, 100)
})
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- Hero Section with Background Image & White Overlay -->
    <section class="hero-partner-section relative py-12 lg:py-24 px-6 md:px-12 overflow-hidden" style="background-image: url('https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F17449df9b9ad47949f328298dc26772a?format=webp&width=800'); background-size: cover; background-position: center center; background-attachment: fixed;">
      <!-- Gradient Overlay with Side Fades -->
      <div class="absolute inset-0 z-10" style="background: linear-gradient(to right, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.25) 100%);"></div>

      <!-- Content Container -->
      <div class="container-width relative z-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-7 pr-0 lg:pr-8 py-8">
            <h1 class="font-extrabold leading-tight mb-4 text-5xl lg:text-6xl">
              Devenir partenaire <br/>
              <span class="liquid-highlight">STIMEO</span> : <br/>
              l'<span class="liquid-highlight">indépendance</span> au <br/>
              service du soin
            </h1>
            <p class="text-lg text-brand-anthracite font-normal mb-8 leading-relaxed max-w-2xl">
              Rejoignez un réseau d'experts libéraux dédiés à l'installation et au suivi des thérapies à domicile, soutenu par un écosystème digital unique.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="navigateTo('/contact')"
                class="btn-primary text-sm py-3"
              >
                Nous contacter
              </button>
              <button
                @click="navigateTo('/ecosysteme-connecte')"
                class="btn-secondary text-sm py-3"
              >
                Découvrir Stiméo Connect
              </button>
            </div>
          </div>

          <!-- Right Space for Image Balance -->
          <div class="lg:col-span-5" />
        </div>
      </div>
    </section>

    <!-- Section 1: Votre rôle au cœur du parcours - Interactive Cards -->
    <VitaliaRoleCards />

    <!-- Section 2: Nos Engagements envers votre pratique -->
    <section class="py-16 px-6 md:px-12 bg-gray-50">
      <div class="container-width">
        <!-- Section Header - Centered with Large Breathing Room -->
        <div class="text-center mb-20 md:mb-24 max-w-3xl mx-auto">
          <h2 class="vitalia-section-title font-extrabold text-4xl md:text-5xl mb-6 text-brand-gold">
            L'Engagement Éthique au Service de votre Exercice
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Nous sécurisons votre pratique libérale à travers un cadre déontologique rigoureux et des outils de pointe.
          </p>
        </div>

        <!-- Desktop Grid View - Accordion Cards -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div
            v-for="card in engagementCards"
            :key="card.id"
            class="vitalia-card-expandable stagger-fade-in"
            :class="{ 'is-expanded': expandedCardId === card.id }"
            @click="toggleAccordion(card.id)"
          >
            <!-- Card Header (Always Visible) -->
            <div class="vitalia-card-header flex items-start justify-between gap-4">
              <div class="flex items-start gap-4 flex-1">
                <div class="w-12 h-12 rounded-full border-2 border-brand-gold flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg text-brand-gold">{{ card.title }}</h3>
                </div>
              </div>
              <!-- Chevron Icon -->
              <svg class="vitalia-chevron w-5 h-5 text-brand-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <!-- Card Body (Expandable Content) -->
            <div class="vitalia-card-body">
              <p class="text-gray-700 leading-relaxed" v-html="card.fullDescription"></p>
            </div>
          </div>
        </div>

        <!-- Mobile Carousel View - Accordion Cards with Swipe -->
        <div class="md:hidden">
          <div class="engagement-carousel-mobile vitalia-swipe-container">
            <div
              v-for="card in engagementCards"
              :key="card.id"
              class="vitalia-swipe-item"
            >
              <div
                class="vitalia-card-expandable"
                :class="{ 'is-expanded': expandedCardId === card.id }"
                @click="toggleAccordion(card.id)"
              >
                <!-- Card Header (Always Visible) -->
                <div class="vitalia-card-header flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3 flex-1">
                    <div class="w-10 h-10 rounded-full border-2 border-brand-gold flex items-center justify-center flex-shrink-0 mt-1">
                      <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path :d="card.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-base text-brand-gold leading-tight">{{ card.title }}</h3>
                    </div>
                  </div>
                  <!-- Chevron Icon -->
                  <svg class="vitalia-chevron w-5 h-5 text-brand-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <!-- Card Body (Expandable Content) -->
                <div class="vitalia-card-body">
                  <p class="text-gray-700 leading-relaxed text-sm">{{ card.fullDescription }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Pagination Dots (Gold STIMÉO) -->
          <div class="vitalia-carousel-dots">
            <button
              v-for="(_, idx) in 4"
              :key="`engagement-dot-${idx}`"
              class="vitalia-dot"
              :class="{ 'vitalia-dot-active': currentEngagementIndex === idx }"
              :aria-label="`Go to engagement ${idx + 1}`"
              aria-current="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Votre Tableau de Bord Stiméo Connect -->
    <section class="py-16 px-6 md:px-12 bg-white">
      <div class="container-width">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <!-- Left: Professional Image with Vignette -->
          <div class="relative overflow-hidden stimeo-photo-vignette order-2 lg:order-1">
             <!-- Gradient Overlay with Side Fades -->
             <div class="absolute inset-0 z-10 rounded-4xl" style="background: linear-gradient(to right, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.01) 25%, rgba(255, 255, 255, 0.01) 75%, rgba(255, 255, 255, 0.15) 100%);"></div>

             <!-- Radial Vignette Overlay -->
             <div class="absolute inset-0 z-10 rounded-4xl" style="background: radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.7) 80%, rgba(255, 255, 255, 1) 100%); pointer-events: none;"></div>

             <div class="absolute top-10 left-10 w-full h-full bg-gray-100 rounded-4xl -z-10"></div>
             <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F16263677ed15437d92b682d1db8cb783?format=webp&width=800" alt="IDEL healthcare professional with tablet" class="rounded-4xl h-[500px] w-full object-cover shadow-xl relative z-0" />
          </div>

          <!-- Right: Content Section -->
          <div class="order-1 lg:order-2">
            <!-- Label -->
            <span class="vitalia-stimeo-label text-brand-stimeo-gold font-bold text-sm uppercase tracking-wider mb-3 block animate-fade-in-up" style="animation-delay: 0.1s">
              Votre Tableau de Bord
            </span>

            <!-- Title -->
            <h3 class="font-extrabold text-gray-900 text-4xl lg:text-5xl mb-5 leading-tight animate-fade-in-up" style="animation-delay: 0.2s">
              Stiméo Connect
            </h3>

            <!-- Description -->
            <p class="text-lg text-gray-700 mb-6 leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s">
              Une plateforme conçue pour l'ensemble des <strong>professionnels de santé</strong>. Supervisez vos patients en temps réel, accédez à leurs données de téléobservance partagées et coordonnez les interventions avec tout votre réseau de soins.
            </p>

            <!-- Checklist with Stiméo Gold Icons -->
            <ul class="space-y-4 mb-8">
              <li class="flex items-start animate-fade-in-up" style="animation-delay: 0.4s">
                <svg class="vitalia-check-gold w-5 h-5 text-brand-stimeo-gold mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 font-medium">Vision globale de votre file active</span>
              </li>
              <li class="flex items-start animate-fade-in-up" style="animation-delay: 0.5s">
                <svg class="vitalia-check-gold w-5 h-5 text-brand-stimeo-gold mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 font-medium">Alertes ciblées pour une réactivité accrue</span>
              </li>
              <li class="flex items-start animate-fade-in-up" style="animation-delay: 0.6s">
                <svg class="vitalia-check-gold w-5 h-5 text-brand-stimeo-gold mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 font-medium">Coordination transparente avec les prescripteurs</span>
              </li>
              <li class="flex items-start animate-fade-in-up" style="animation-delay: 0.7s">
                <svg class="vitalia-check-gold w-5 h-5 text-brand-stimeo-gold mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 font-medium">Historique complet et documenté de chaque intervention</span>
              </li>
            </ul>

            <!-- Button -->
            <button
              @click="navigateTo('/ecosysteme-connecte')"
              class="vitalia-stimeo-btn px-8 py-4 bg-brand-stimeo-gold text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 inline-block animate-fade-in-up"
              style="animation-delay: 0.8s"
            >
              Accéder au portail
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Banner: Stiméo Gold -->
    <section class="vitalia-footer-cta bg-brand-stimeo-gold py-16 md:py-20 px-6 md:px-12 relative overflow-hidden">
      <!-- Decorative Offset Shape -->
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute top-0 left-1/4 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>

      <div class="container-width relative z-10">
        <!-- Title -->
        <h2 class="font-extrabold text-white text-4xl md:text-5xl mb-6 text-center leading-tight animate-fade-in-up-enhanced">
          Prêt à réinventer la santé à domicile avec nous ?
        </h2>

        <!-- Subtext -->
        <p class="text-white text-lg md:text-xl font-normal mb-10 max-w-2xl mx-auto text-center opacity-95 leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s">
          Rejoignez le réseau STIMEO et accédez à une plateforme révolutionnaire conçue pour améliorer la coordination des soins à domicile.
        </p>

        <!-- CTA Button -->
        <div class="flex justify-center animate-fade-in-up" style="animation-delay: 0.4s">
          <button
            @click="navigateTo('/contact')"
            class="vitalia-btn-white bg-white text-gray-900 px-10 py-4 md:px-16 md:py-5 font-bold rounded-full text-base md:text-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Rejoindre le réseau STIMEO
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Partner Section - Background Image with White Overlay */
.hero-partner-section {
  position: relative;
  min-height: 500px;
}

.hero-partner-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 11;
  pointer-events: none;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up-enhanced {
  animation: fadeInUpEnhanced 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUpEnhanced {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* ============================================
   ACCORDION CARDS - STIMÉO GOLD GLOW EFFECT
   ============================================ */

/* Accordion Card Container */
.vitalia-card-expandable {
  background: #ffffff;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Accordion Card Header */
.vitalia-card-header {
  cursor: pointer;
  position: relative;
}

/* Chevron Animation */
.vitalia-chevron {
  color: #B19E31 !important;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.is-expanded .vitalia-chevron {
  transform: rotate(180deg);
}

/* Accordion Card Body (Hidden Content) */
.vitalia-card-body {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-top: 0;
}

/* Expanded State with Glow Effect */
.is-expanded {
  border-color: #B19E31 !important;
  /* Glow Effect: Subtil halo luminous in STIMÉO Gold + soft shadow */
  box-shadow: 0 0 25px rgba(177, 158, 49, 0.25), 0 10px 30px rgba(0, 0, 0, 0.05) !important;
}

.is-expanded .vitalia-card-body {
  max-height: 500px;
  opacity: 1;
  margin-top: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(177, 158, 49, 0.1);
}

/* Desktop: Hover effect on accordion cards */
@media (min-width: 769px) {
  .vitalia-card-expandable:hover:not(.is-expanded) {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

/* Mobile: Optimize for small screens */
@media (max-width: 768px) {
  .vitalia-card-expandable {
    padding: 20px;
  }

  .vitalia-card-header {
    gap: 12px;
  }

  .is-expanded .vitalia-card-body {
    max-height: 400px;
    padding-top: 16px;
  }
}

/* Staggered Animation for cards */
.stagger-fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.stagger-fade-in:nth-child(1) {
  animation-delay: 0s;
}

.stagger-fade-in:nth-child(2) {
  animation-delay: 0.2s;
}

.stagger-fade-in:nth-child(3) {
  animation-delay: 0.4s;
}

.stagger-fade-in:nth-child(4) {
  animation-delay: 0.6s;
}
</style>
