<script setup lang="ts">
import { useRouter } from 'vue-router'
import CheckIcon from '../components/icons/CheckIcon.vue'
import { useTitleAnimations } from '../composables/useTitleAnimations'

const router = useRouter()
useTitleAnimations()
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- Hero Section with Layered Design -->
    <section class="relative py-10 lg:py-14 px-6 md:px-12">
      <div class="container-width">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch relative">
           <!-- Layered Yellow Block -->
           <div class="absolute -top-20 -right-32 w-3/5 h-full bg-brand-yellow rounded-4xl -z-10 transform rotate-2 lg:block hidden"></div>

           <div class="lg:col-span-7 relative z-20 pr-0 lg:pr-8 py-8">
              <span class="text-brand-gold font-bold text-sm tracking-widest uppercase mb-3 block">Notre Mission</span>
              <h1 class="font-extrabold mb-4 text-5xl lg:text-6xl">
                Nos <span class="liquid-highlight">Engagements</span> Statutaires
              </h1>
              <p class="text-lg text-brand-neutral font-normal leading-relaxed">
                L'excellence de STIMÉO repose sur trois piliers fondamentaux : l'éthique professionnelle, l'innovation utile et la responsabilité sociétale.
              </p>
           </div>
           <!-- Asymmetrical Image Block -->
           <div class="lg:col-span-5 relative z-10">
              <div class="bg-gray-100 rounded-4xl h-[380px] flex items-center justify-center shadow-xl overflow-hidden">
                 <div class="text-center p-6">
                    <span class="block text-brand-anthracite font-bold text-lg mb-2">PHOTO RÉELLE</span>
                    <span class="block text-brand-neutral text-sm">Équipe STIMÉO en réunion</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Engagement 1: IDEL Support -->
    <section class="py-10 px-6 md:px-12">
      <div class="container-width">
        <div class="bg-brand-yellow rounded-4xl p-8 lg:p-12 relative transform rotate-2">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7">
                 <h2 class="font-extrabold text-white text-3xl lg:text-4xl mb-3 animate-fade-in-up-enhanced">1. Soutien aux Infirmiers Libéraux</h2>
                 <p class="text-white text-base font-medium leading-relaxed mb-5 opacity-90">
                    L'IDEL est le pivot du maintien à domicile. Nous garantissons un partenariat basé sur la transparence et l'éthique absolue.
                 </p>
                 <ul class="space-y-2">
                    <li class="flex items-start text-white text-sm">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <span>Accès transparent aux dispositifs médicaux</span>
                    </li>
                    <li class="flex items-start text-white text-sm">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <span>Refus strict des pratiques illégales et des conflits d'intérêt</span>
                    </li>
                    <li class="flex items-start text-white text-sm">
                       <CheckIcon class="mr-3 mt-1 text-brand-gold flex-shrink-0" />
                       <span>Formation continue aux nouvelles technologies de santé</span>
                    </li>
                 </ul>
              </div>
              <div class="lg:col-span-5 flex justify-center">
                  <div class="bg-white rounded-3xl p-8 shadow-lg w-full text-center h-56 flex flex-col justify-center items-center">
                     <span class="font-bold text-brand-anthracite text-lg mb-2">PHOTO RÉELLE</span>
                     <span class="text-brand-neutral text-sm">Collaboration IDEL / STIMÉO</span>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Transition Text -->
    <section class="py-4 px-6 md:px-12 bg-white">
      <div class="container-width text-center">
        <p class="text-brand-neutral text-sm font-medium italic opacity-80">
          L'infrastructure de confiance pour l'IDEL moderne
        </p>
      </div>
    </section>

    <!-- Engagement 2: Innovation -->
    <section class="py-10 px-6 md:px-12 bg-white">
      <div class="container-width">
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div class="relative">
               <div class="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-full -z-10"></div>
               <div class="bg-brand-anthracite rounded-4xl h-[420px] flex items-center justify-center shadow-2xl">
                  <div class="text-center p-6">
                     <span class="block text-white font-bold text-lg mb-2">PHOTO RÉELLE</span>
                     <span class="block text-gray-400 text-sm">Innovation R&D</span>
                  </div>
               </div>
            </div>

            <div>
               <h2 class="font-extrabold text-brand-anthracite text-3xl lg:text-4xl mb-3 animate-fade-in-up-enhanced">2. Innovation <span class="text-brand-gold">Bien-être</span></h2>
               <p class="text-lg text-brand-neutral mb-5 leading-relaxed">
                  La technologie n'est pas une fin en soi. Elle doit servir l'autonomie.
               </p>
               <div class="space-y-4">
                  <div class="border-l-4 border-brand-gold pl-4">
                     <h4 class="font-bold text-brand-anthracite text-lg mb-1">Autonomie au quotidien</h4>
                     <p class="text-brand-neutral text-sm">Des dispositifs qui s'adaptent à la vie du patient, et non l'inverse.</p>
                  </div>
                  <div class="border-l-4 border-brand-gold pl-4">
                     <h4 class="font-bold text-brand-anthracite text-lg mb-1">Sécurité renforcée</h4>
                     <p class="text-brand-neutral text-sm">La téléobservance pour prévenir les complications avant qu'elles ne surviennent.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>

    <!-- Transition Text -->
    <section class="py-4 px-6 md:px-12 bg-white">
      <div class="container-width text-center">
        <p class="text-brand-neutral text-sm font-medium italic opacity-80">
          Une innovation pensée pour simplifier, non pour complexifier
        </p>
      </div>
    </section>

    <!-- Engagement 3: Environnement & Handisport -->
    <section class="py-10 px-6 md:px-12 bg-gray-50">
      <div class="container-width text-center max-w-4xl mx-auto">
         <h2 class="font-extrabold text-brand-anthracite text-3xl lg:text-4xl mb-3 animate-fade-in-up-enhanced">3. <span class="text-brand-gold">Responsabilité</span> Sociétale</h2>
         <p class="text-lg text-brand-neutral mb-8">
            STIMÉO s'engage pour une santé durable et inclusive.
         </p>

         <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
               <h4 class="font-bold text-brand-anthracite text-lg mb-3">Handisport & Inclusivité</h4>
               <p class="text-brand-neutral leading-relaxed text-sm">
                  Soutien actif aux athlètes et clubs handisports. Le sport est un vecteur essentiel de réappropriation du corps et d'intégration sociale.
               </p>
            </div>

            <div class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
               <h4 class="font-bold text-brand-anthracite text-lg mb-3">Modèle Durable</h4>
               <p class="text-brand-neutral leading-relaxed text-sm">
                  Optimisation logistique pour réduire notre empreinte carbone. Gestion responsable des déchets de soins.
               </p>
            </div>
         </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-10 px-6 md:px-12">
      <div class="container-width text-center">
         <button
           @click="router.push('/contact')"
           class="btn-primary text-sm py-3"
         >
           Partager nos valeurs
         </button>
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
</style>
