<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCarouselSwipe } from '../composables/useCarouselSwipe'

interface RoleCard {
  id: string
  title: string
  description: string
}

const currentCardIndex = ref(0)
const expandedCardId = ref<string | null>(null)

// Initialize carousel swipe with haptic feedback
const { getCurrentCardIndex } = useCarouselSwipe('.role-carousel-mobile')

const cards: RoleCard[] = [
  {
    id: 'technique',
    title: 'Installation & Maîtrise Technique',
    description: 'Déployez des solutions médicales de pointe (Urologie, Stomathérapie, Cicatrisation, Neuro-stimulation) en bénéficiant de l\'appui logistique et de la réactivité de STIMÉO.'
  },
  {
    id: 'pedagogie',
    title: 'Pédagogie & Autonomie Patient',
    description: 'Valorisez votre rôle d\'éducateur de santé : accompagnez le patient vers la maîtrise de sa thérapie pour garantir son observance, son confort et sa dignité.'
  },
  {
    id: 'coordination',
    title: 'Coordination & Écosystème Connecté',
    description: 'Fluidifiez les échanges entre le domicile et le prescripteur. Pilotez le parcours de soin en temps réel grâce à nos outils digitaux de télé-observance partagée.'
  }
]

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
  // Setup mobile role carousel pagination tracking
  setTimeout(() => {
    const roleCarousel = document.querySelector('.role-carousel-mobile')
    if (roleCarousel) {
      roleCarousel.addEventListener('scroll', () => {
        const index = getCurrentCardIndex()
        currentCardIndex.value = index
      }, { passive: true })
    }
  }, 100)
})
</script>

<template>
  <section class="py-16 px-6 md:px-12 bg-gray-50">
    <div class="container-width">
      <!-- Section Header -->
      <div class="mb-12">
        <h2 class="vitalia-title-animated font-extrabold text-4xl md:text-5xl mb-4 text-brand-gold">
          Votre rôle au cœur du parcours
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed max-w-3xl">
          Plus qu'un partenaire, vous êtes le maillon essentiel garantissant la continuité, la sécurité et l'humanité du soin à domicile.
        </p>
      </div>

      <!-- Desktop Grid View - Accordion Cards -->
      <div class="hidden md:grid vitalia-card-grid">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="vitalia-card-expandable stagger-fade-in"
          :class="{ 'is-expanded': expandedCardId === card.id }"
          :style="{ '--stagger-delay': `${index * 0.2}s` }"
          @click="toggleAccordion(card.id)"
        >
          <!-- Card Header (Always Visible) -->
          <div class="vitalia-card-header flex items-start justify-between gap-4">
            <div class="flex items-start gap-4 flex-1">
              <!-- Card Icon Circle -->
              <div class="vitalia-icon-circle-bordeaux w-14 h-14 flex items-center justify-center flex-shrink-0">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    v-if="card.id === 'technique'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                  <path
                    v-else-if="card.id === 'pedagogie'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.25 3.75 7.5 10 7.5s10-2.25 10-7.5c0-6.252-4.5-11-10-11z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="vitalia-card-title font-bold text-lg text-brand-gold">{{ card.title }}</h3>
              </div>
            </div>
            <!-- Chevron Icon -->
            <svg class="vitalia-chevron w-5 h-5 text-brand-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          <!-- Card Body (Expandable Content) -->
          <div class="vitalia-card-body">
            <p class="text-gray-700 leading-relaxed">{{ card.description }}</p>
          </div>
        </div>
      </div>

      <!-- Mobile Carousel View - Accordion Cards with Swipe -->
      <div class="md:hidden">
        <div class="role-carousel-mobile vitalia-swipe-container">
          <div
            v-for="card in cards"
            :key="card.id"
            class="vitalia-swipe-item"
          >
            <div
              class="vitalia-card-expandable"
              :class="{ 'is-expanded': expandedCardId === card.id }"
              @click="toggleAccordion(card.id)"
            >
              <!-- Card Header (Always Visible) -->
              <div class="vitalia-card-header flex items-start justify-between gap-3">
                <div class="flex items-start gap-3 flex-1">
                  <!-- Card Icon Circle -->
                  <div class="vitalia-icon-circle-bordeaux w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        v-if="card.id === 'technique'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                      <path
                        v-else-if="card.id === 'pedagogie'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.25 3.75 7.5 10 7.5s10-2.25 10-7.5c0-6.252-4.5-11-10-11z"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="vitalia-card-title font-bold text-base text-brand-gold leading-tight">{{ card.title }}</h3>
                  </div>
                </div>
                <!-- Chevron Icon -->
                <svg class="vitalia-chevron w-5 h-5 text-brand-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <!-- Card Body (Expandable Content) -->
              <div class="vitalia-card-body">
                <p class="text-gray-700 leading-relaxed text-sm">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Pagination Dots (Gold STIMÉO) -->
        <div class="vitalia-carousel-dots">
          <button
            v-for="(_, idx) in cards"
            :key="`role-dot-${idx}`"
            class="vitalia-dot"
            :class="{ 'vitalia-dot-active': currentCardIndex === idx }"
            :aria-label="`Go to card ${idx + 1}`"
            aria-current="false"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* === Title Animation === */
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

.vitalia-title-animated {
  color: #B19E31 !important;
  font-weight: 800;
  animation: fadeInUp 0.8s ease-out forwards;
}

/* === Staggered Animation for cards === */
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

/* === Grid Layout (Desktop Only) === */
.vitalia-card-grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .vitalia-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* === Accordion Card Container === */
.vitalia-card-expandable {
  background: #ffffff;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* === Accordion Card Header === */
.vitalia-card-header {
  cursor: pointer;
  position: relative;
}

/* === Chevron Animation === */
.vitalia-chevron {
  color: #B19E31 !important;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.is-expanded .vitalia-chevron {
  transform: rotate(180deg);
}

/* === Accordion Card Body (Hidden Content) === */
.vitalia-card-body {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-top: 0;
}

/* === Expanded State with Glow Effect === */
.is-expanded {
  border-color: #B19E31 !important;
  /* Glow Effect: Subtle halo luminous in STIMÉO Gold + soft shadow */
  box-shadow: 0 0 25px rgba(177, 158, 49, 0.25), 0 10px 30px rgba(0, 0, 0, 0.05) !important;
}

.is-expanded .vitalia-card-body {
  max-height: 500px;
  opacity: 1;
  margin-top: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(177, 158, 49, 0.1);
}

/* === Desktop: Hover effect on accordion cards === */
@media (min-width: 769px) {
  .vitalia-card-expandable:hover:not(.is-expanded) {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

/* === Mobile: Optimize for small screens === */
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

/* === Icon Circle - STIMÉO Gold === */
.vitalia-icon-circle-bordeaux {
  border: 2px solid #B19E31;
  color: #B19E31;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.vitalia-card-expandable:hover .vitalia-icon-circle-bordeaux {
  background: rgba(177, 158, 49, 0.05);
  box-shadow: 0 0 20px rgba(177, 158, 49, 0.2);
}

/* === Responsive Adjustments === */
@media (max-width: 640px) {
  .vitalia-title-animated {
    font-size: 1.875rem; /* text-3xl */
  }
}
</style>
