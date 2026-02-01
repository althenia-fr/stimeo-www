<script setup lang="ts">
import { useRouter } from 'vue-router'
import CheckIcon from '../../components/icons/CheckIcon.vue'
import { useTitleAnimations } from '../../composables/useTitleAnimations'

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
                <span class="liquid-highlight">Stomathérapie</span>
              </h1>
              <p class="text-lg font-normal leading-relaxed" style="color: #4A4A4A">
                Parce que le port d'une stomie ne doit pas freiner votre liberté, nous vous proposons un accompagnement sur mesure pour retrouver une autonomie complète et une liberté de mouvement totale. Nos experts vous guident avec bienveillance dans le choix de vos appareillages et vous forment aux gestes quotidiens pour transformer le soin en un simple réflexe de vie.
              </p>
           </div>

           <div class="lg:col-span-5 relative z-10">
              <div class="expertise-photo-vignette rounded-4xl h-[380px] shadow-xl overflow-hidden">
                 <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F768237cf73b74908a7d46b84aa5d625e?format=webp&width=800" alt="Consultation Stomathérapie" class="w-full h-full object-cover" />
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

           <div class="grid grid-cols-1 lg:grid-cols-1 gap-10 relative z-10">
              <div>
                 <h2 class="font-extrabold text-3xl lg:text-4xl mb-4 animate-fade-in-up-enhanced" style="color: #2D2D2D">Vivre sans <span class="text-brand-gold">compromis</span></h2>
                 <p class="text-base font-medium mb-8 leading-relaxed" style="color: #4A4A4A">
                    La stomathérapie est l'art de redonner confiance. STIMÉO s'engage à vos côtés pour sécuriser votre quotidien avec des solutions techniques de pointe.
                 </p>

                 <ul class="grid grid-cols-1 gap-4 mb-8">
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Poches Adaptées</h4>
                          <p class="text-sm" style="color: #4A4A4A">Une sélection rigoureuse de systèmes 1 pièce ou 2 pièces pour s'ajuster parfaitement à votre morphologie.</p>
                       </div>
                    </li>
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Protection Cutanée</h4>
                          <p class="text-sm" style="color: #4A4A4A">Des solutions avancées pour préserver l'intégrité de la peau péristomiale et prévenir les irritations.</p>
                       </div>
                    </li>
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Accessoires</h4>
                          <p class="text-sm" style="color: #4A4A4A">Ceintures, sprays et renforts spécifiques pour renforcer la sécurité de votre appareillage en toute discrétion.</p>
                       </div>
                    </li>
                    <li class="flex items-start">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <div>
                          <h4 class="font-bold text-lg mb-0.5" style="color: #2D2D2D">Coaching</h4>
                          <p class="text-sm" style="color: #4A4A4A">Un apprentissage progressif des soins à votre rythme, soutenu par nos infirmiers conseils pour une maîtrise totale.</p>
                       </div>
                    </li>
                 </ul>

                 <h3 class="font-bold text-xl mb-3" style="color: #2D2D2D">Suivi Connecté</h3>
                 <p class="leading-relaxed text-sm pb-32 md:pb-0" style="color: #4A4A4A">
                    Grâce à Stiméo+, envoyez des photos sécurisées de votre stomie à votre référent médical pour prévenir toute complication cutanée et bénéficier d'un avis expert à distance.
                 </p>
              </div>
           </div>

           <!-- Contact Block - Absolute on desktop, normal flow on mobile -->
           <div class="advice-block-container mt-8 md:mt-0 animate-fade-in-up-advice">
              <div class="bg-white rounded-4xl p-6 shadow-advice border border-gray-100">
                 <h4 class="font-bold text-lg mb-3" style="color: #2D2D2D">Parlez à un expert</h4>
                 <p class="text-sm mb-4" style="color: #4A4A4A">Nos stomathérapeutes sont là pour vous.</p>
                 <button @click="router.push('/contact')" class="btn-primary w-full mb-3 justify-center flex text-sm">
                   Prendre RDV
                 </button>
                 <button @click="router.push('/ecosysteme-connecte')" class="btn-outline w-full justify-center flex text-sm">
                   Application Patient
                 </button>
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

/* Contact Block Positioning */
.advice-block-container {
  position: static;
}

.shadow-advice {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .advice-block-container {
    position: absolute;
    top: 50%;
    right: 40px;
    width: 320px;
    margin-top: 0;
    transform: translateY(-50%);
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
