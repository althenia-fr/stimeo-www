<script setup lang="ts">
import { useRouter } from 'vue-router'
import CheckIcon from '../components/icons/CheckIcon.vue'
import CarouselSlider from '../components/CarouselSlider.vue'
import EngagementCarousel from '../components/EngagementCarousel.vue'
import { useTitleAnimations } from '../composables/useTitleAnimations'

const router = useRouter()
useTitleAnimations()

const engagements = [
  {
    title: 'Expertise Humaine',
    description: 'Chaque décision est validée par nos infirmiers spécialisés. La technologie augmente le soignant, elle ne le remplace pas.',
    icon: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
  },
  {
    title: 'Innovation Continue',
    description: 'Nous investissons dans la R&D pour anticiper les besoins de demain. Votre feedback façonne notre roadmap.',
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>'
  },
  {
    title: 'Sécurité Maximale',
    description: 'Conformité RGPD, chiffrement bout-en-bout, hébergement de santé certifié (HDS). Vos données sont nos plus précieuses.',
    icon: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11.99h2.02c.78 0 1.48.37 1.91.93.48-.49 1.45.5 1.45.5.34-.8.52-1.68.52-2.58 0-3.35-2.57-6.01-5.98-6.01-3.39 0-6.01 2.66-6.01 6.01 0 .9.18 1.78.52 2.58 0 0 .97-1 1.45-.5.43-.56 1.13-.93 1.91-.93h2.21V9l-3 2 3 2v-1z"/>'
  }
]
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- HERO SECTION: Vision of Independence -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image with White Overlay (Faded Effect) -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-white/85 z-10"></div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fb5c275a191184555bb9d8d7bb3cb5017?format=webp&width=1200"
          alt="Partenariat French Care et sécurité des données"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Hero Content -->
      <div class="relative z-20 px-6 md:px-12 max-w-4xl py-24">
        <h1 class="font-extrabold text-5xl md:text-7xl mb-6 leading-tight text-center animate-fade-in-up-enhanced" style="color: #2D2D2D">
          Notre Vision : Repenser l'<span class="text-brand-gold">Observance</span> par l'Indépendance
        </h1>
        <p class="text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed mb-10" style="color: #2D2D2D">
          Chez STIMÉO, nous sommes convaincus que la vraie observance naît de l'autonomie. Notre écosystème réunit patients et professionnels autour d'une mission commune : transformer le soin en un acte de vie quotidienne, simple et naturel.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button @click="router.push('/contact')" class="px-8 py-4 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transition-colors">
            Demander une démo
          </button>
        </div>
      </div>
    </section>

    <!-- SOLUTIONS SECTION: Two Premium Cards with Advice Block -->
    <section class="py-24 px-6 md:px-12 bg-gray-50 relative">
      <div class="container-width">
        <div class="text-center mb-16">
          <h2 class="font-extrabold text-4xl md:text-5xl mb-4" style="color: #2D2D2D">L'Écosystème Connecté</h2>
          <p class="text-lg" style="color: #4A4A4A">Deux compagnons, une mission commune</p>
        </div>

        <CarouselSlider :columns="2" :cards-per-view-mobile="1.15" :gap="64" snap-align="center">
          <!-- Card A: Stiméo+ for Patient -->
          <div data-carousel-item class="bg-white rounded-4xl p-5 md:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow min-h-[450px]">
            <div class="w-15 h-15 md:w-14 md:h-14 bg-brand-gold rounded-full flex items-center justify-center mb-4 md:mb-6">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl md:text-3xl mb-3 md:mb-4" style="color: #2D2D2D">Stiméo+</h3>
            <p class="text-xs md:text-base mb-3 md:mb-6 leading-relaxed" style="color: #4A4A4A">Le Compagnon du Patient</p>
            <p class="text-xs md:text-sm leading-relaxed mb-4 md:mb-8" style="color: #4A4A4A">
              Donnez aux patients les outils pour reprendre le contrôle de leur santé. Suivi intuitif, ressources éducatives et lien direct avec les soignants. C'est l'autonomie en poche.
            </p>
            <ul class="space-y-2 md:space-y-3 mb-6 md:mb-10">
              <li class="flex items-start">
                <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                <span class="text-xs md:text-sm" style="color: #4A4A4A">Suivi personnalisé en temps réel</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                <span class="text-xs md:text-sm" style="color: #4A4A4A">Ressources éducatives validées</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                <span class="text-xs md:text-sm" style="color: #4A4A4A">Lien direct avec vos soignants</span>
              </li>
            </ul>
            <button @click="router.push('/contact')" class="w-full bg-brand-gold text-white font-bold py-3 px-6 rounded-4xl hover:shadow-lg transition-shadow">
              Demander une démo
            </button>
          </div>

          <!-- Card B: Stiméo Connect for Professional -->
          <div data-carousel-item class="bg-white rounded-4xl p-5 md:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow relative min-h-[450px]">
            <div class="w-15 h-15 md:w-14 md:h-14 bg-brand-gold rounded-full flex items-center justify-center mb-4 md:mb-6">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-5H4c-.55 0-1 .45-1 1v2h18V9c0-.55-.45-1-1-1zm0-7H4c-.55 0-1 .45-1 1v2h18V2c0-.55-.45-1-1-1z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl md:text-3xl mb-3 md:mb-4" style="color: #2D2D2D">Stiméo Connect</h3>
            <p class="text-xs md:text-base mb-3 md:mb-6 leading-relaxed" style="color: #4A4A4A">Le Portail des Professionnels</p>
            <p class="text-xs md:text-sm leading-relaxed mb-4 md:mb-8" style="color: #4A4A4A">
              Superviser votre file active en temps réel. Alertes pertinentes, protocoles ajustables et analytics cliniques. La coordination à proximité devient simple.
            </p>
            <ul class="space-y-2 md:space-y-3 mb-6 md:mb-10">
              <li class="flex items-start">
                <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                <span class="text-xs md:text-sm" style="color: #4A4A4A">Vision globale et centralisée</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                <span class="text-xs md:text-sm" style="color: #4A4A4A">Intégration sécurisée DMP</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                <span class="text-xs md:text-sm" style="color: #4A4A4A">Analytics et rapports cliniques</span>
              </li>
            </ul>
            <button @click="router.push('/contact')" class="w-full bg-brand-gold text-white font-bold py-3 px-6 rounded-4xl hover:shadow-lg transition-shadow">
              Demander une démo
            </button>

            <!-- Advice Block - Positioned Absolutely at Bottom-Right on Desktop -->
            <div class="advice-block-container animate-fade-in-up-advice" />
          </div>
        </CarouselSlider>
      </div>
    </section>

    <!-- ENGAGEMENT SECTION: French Care in Action -->
    <section class="w-full relative" style="background-color: #C0A94D; padding: 80px 24px;">
      <div class="container-width">
        <div class="text-center mb-20">
          <h2 class="font-extrabold text-4xl md:text-5xl mb-4 text-white">French Care en Action</h2>
          <p class="text-lg text-white/90">Nos engagements envers vous</p>
        </div>

        <!-- Desktop Grid View (md and up) -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
          <!-- Engagement 1: Human Expertise -->
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl flex-shrink-0">
              <svg class="w-12 h-12 md:w-14 md:h-14 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="font-bold text-2xl md:text-3xl mb-4 text-white leading-tight">Expertise Humaine</h3>
            <p class="text-base md:text-lg text-white/95 leading-relaxed">
              Chaque décision est validée par nos infirmiers spécialisés. La technologie augmente le soignant, elle ne le remplace pas.
            </p>
          </div>

          <!-- Engagement 2: Innovation -->
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl flex-shrink-0">
              <svg class="w-12 h-12 md:w-14 md:h-14 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
            <h3 class="font-bold text-2xl md:text-3xl mb-4 text-white leading-tight">Innovation Continue</h3>
            <p class="text-base md:text-lg text-white/95 leading-relaxed">
              Nous investissons dans la R&D pour anticiper les besoins de demain. Votre feedback façonne notre roadmap.
            </p>
          </div>

          <!-- Engagement 3: Security -->
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl flex-shrink-0">
              <svg class="w-12 h-12 md:w-14 md:h-14 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11.99h2.02c.78 0 1.48.37 1.91.93.48-.49 1.45.5 1.45.5.34-.8.52-1.68.52-2.58 0-3.35-2.57-6.01-5.98-6.01-3.39 0-6.01 2.66-6.01 6.01 0 .9.18 1.78.52 2.58 0 0 .97-1 1.45-.5.43-.56 1.13-.93 1.91-.93h2.21V9l-3 2 3 2v-1z"/>
              </svg>
            </div>
            <h3 class="font-bold text-2xl md:text-3xl mb-4 text-white leading-tight">Sécurité Maximale</h3>
            <p class="text-base md:text-lg text-white/95 leading-relaxed">
              Conformité RGPD, chiffrement bout-en-bout, hébergement de santé certifié (HDS). Vos données sont nos plus précieuses.
            </p>
          </div>
        </div>

        <!-- Mobile Carousel View (below md) -->
        <div class="md:hidden">
          <EngagementCarousel :engagements="engagements" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in-up-enhanced {
  animation: fadeInUpEnhanced 1.2s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-staggered-1 {
  animation: fadeInUpEnhanced 0.8s ease-out forwards 0.1s;
}

.animate-fade-in-staggered-2 {
  animation: fadeInUpEnhanced 0.8s ease-out forwards 0.2s;
}

.animate-fade-in-staggered-3 {
  animation: fadeInUpEnhanced 0.8s ease-out forwards 0.3s;
}

.animate-fade-in-staggered-4 {
  animation: fadeInUpEnhanced 0.8s ease-out forwards 0.4s;
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

@keyframes fadeInUpAdvice {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up-advice {
  animation: fadeInUpAdvice 0.6s ease-out forwards;
  animation-delay: 0.8s;
  opacity: 0;
}

/* Advice Block Positioning */
.advice-block-container {
  position: static;
}

.shadow-advice {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

@media (min-width: 1024px) {
  .advice-block-container {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: 320px;
    margin-top: 0;
  }
}
</style>
