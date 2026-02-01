<script setup lang="ts">
import { useRouter } from 'vue-router'
import CheckIcon from '../../components/icons/CheckIcon.vue'
import { useTitleAnimations } from '../../composables/useTitleAnimations.ts'

const router = useRouter()
useTitleAnimations()
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- Hero Section with Layered Design -->
    <section class="relative py-12 lg:py-16 px-6 md:px-12">
      <div class="container-width">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch relative">
           <!-- Layered Yellow Block -->
           <div class="absolute -top-20 -right-32 w-3/5 h-full bg-brand-yellow rounded-4xl -z-10 transform rotate-2 lg:block hidden"></div>

           <div class="lg:col-span-7 relative z-20 pr-0 lg:pr-8 py-8">
              <h1 class="font-extrabold mb-4 text-5xl lg:text-6xl">
                <span class="liquid-highlight">Parcours</span> d'affirmation de genre
              </h1>
              <p class="text-lg font-normal leading-relaxed" style="color: #4A4A4A">
                Parce que la transition chirurgicale demande un suivi post-opératoire d'une précision absolue, nous sécurisons votre retour à domicile en lien direct avec votre équipe chirurgicale.&nbsp;
              </p>
           </div>

           <div class="lg:col-span-5 relative z-10">
              <div class="expertise-photo-vignette rounded-4xl h-[380px] shadow-xl overflow-hidden">
                 <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F8cf68633917341529240eb32f69d0a89?format=webp&width=800" alt="Suivi post-opératoire spécialisé" class="w-full h-full object-cover" />
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="py-16 px-6 md:px-12 bg-gray-50 relative">
      <!-- Offset Yellow Decorative Shapes -->
      <div class="absolute top-8 -right-40 w-96 h-96 bg-brand-yellow rounded-full opacity-50 blur-3xl -z-10"></div>
      <div class="absolute bottom-0 -left-32 w-80 h-80 bg-yellow-300 rounded-full opacity-40 blur-2xl -z-10"></div>

      <div class="container-width">
        <div class="bg-white rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-lg border border-gray-100">
           <!-- Decorative Element Inside Card -->
           <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-50 opacity-50 rounded-full blur-3xl -z-10"></div>

           <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              <div class="lg:col-span-2">
                 <h2 class="font-extrabold text-3xl lg:text-4xl mb-4 animate-fade-in-up-enhanced" style="color: #2D2D2D">Expertise <span class="text-brand-gold">Post-Opératoire</span></h2>
                 <p class="text-base font-medium mb-8 leading-relaxed" style="color: #4A4A4A">
                    Notre mission est de sécuriser votre retour à domicile après la chirurgie. Nous formons et coordonnons les infirmiers libéraux (IDEL) aux protocoles spécifiques de votre chirurgien.
                 </p>

                 <ul class="grid grid-cols-1 gap-4 mb-8">
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Cicatrisation & Soins</h4>
                          <p class="text-sm" style="color: #4A4A4A">Expertise pointue dans la gestion des pansements complexes et surveillance de la cicatrisation en lien direct avec le chirurgien.</p>
                       </div>
                    </li>
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Accompagnement Spécifique</h4>
                          <p class="text-sm" style="color: #4A4A4A">Soutien éducatif et technique sur-mesure, adapté aux protocoles de dilatation et de soins post-chirurgicaux.</p>
                       </div>
                    </li>
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Coordination Chirurgie-Ville</h4>
                          <p class="text-sm" style="color: #4A4A4A">Une liaison vitale et continue entre l'établissement de santé et votre domicile pour sécuriser chaque étape.</p>
                       </div>
                    </li>
                 </ul>
              </div>

              <div class="lg:col-span-1">
                 <!-- Sticky Contact -->
                 <div class="bg-white rounded-3xl p-6 shadow-lg sticky top-8">
                    <h4 class="font-bold text-lg mb-3" style="color: #2D2D2D">Organiser ma prise en charge</h4>
                    <p class="text-sm mb-4" style="color: #4A4A4A">Un conseiller spécialisé vous accompagne.</p>
                    <button @click="router.push('/contact')" class="btn-primary w-full justify-center flex text-sm">
                      Nous contacter
                    </button>
                 </div>
              </div>
           </div>
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

.animate-seesaw-rotate-2 {
  animation: seesawRotate2 5s ease-in-out infinite;
}

.animate-seesaw-rotate-2:hover {
  animation-duration: 3s;
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

.expertise-photo-vignette {
  position: relative;
  overflow: hidden;
}

.expertise-photo-vignette::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1rem;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.3) 60%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
  z-index: 10;
}
</style>
