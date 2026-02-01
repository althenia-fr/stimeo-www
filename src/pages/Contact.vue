<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CheckIcon from '../components/icons/CheckIcon.vue'
import ContactInfoCard from '../components/ContactInfoCard.vue'
import { useTitleAnimations } from '../composables/useTitleAnimations'
import {http} from "@/services/http.ts";

useTitleAnimations()

const formData = ref({
  prenom: '',
  nom: '',
  phone: '',
  email: '',
  postcode: '',
  message: '',
})

const submitted = ref(false)

const submitForm = () => {

  if (formData.value.prenom && formData.value.nom && formData.value.phone && formData.value.email && formData.value.message) {

    let dataToPost = {
      prenom: formData.value.prenom,
      nom: formData.value.nom,
      phone: formData.value.phone,
      postcode: formData.value.postcode,
      email: formData.value.email,
      message: formData.value.message,
    }

    let axiosRequestConfig = {
      headers: {
        'Content-Type':'application/json; charset=utf-8',
      }
    }

    http.postApi(`/wwwstimeo/contact`, dataToPost, axiosRequestConfig).then((response) => {

      submitted.value = true
      formData.value = {
        prenom: '',
        nom: '',
        phone: '',
        postcode: '',
        email: '',
        message: '',
      }

      console.log('contact failed '+response)

    },  (err) => {

      console.log('contact failed '+err)

    })

  }

}



// Cascade Animation on Scroll
onMounted(() => {
  const engagementItems = document.querySelectorAll('.engagement-item')

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  engagementItems.forEach((item) => {
    observer.observe(item)
  })
})
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- Hero Section -->
    <section class="relative py-24 px-6 md:px-12">
      <div class="container-width text-center">
        <span class="text-brand-gold font-bold text-sm tracking-widest uppercase mb-4 block">À votre écoute</span>
        <h1 class="font-extrabold mb-8 text-5xl lg:text-6xl">
          <span class="liquid-highlight">Contactez</span>-nous
        </h1>
        <p class="text-xl text-brand-neutral font-normal max-w-2xl mx-auto leading-relaxed">
          Une équipe dédiée pour répondre à vos besoins. Patients, prescripteurs ou partenaires, nous sommes là pour vous.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info - Two Column Layout -->
    <section class="py-12 px-6 md:px-12 mb-24">
      <div class="container-width">
        <!-- Desktop: Two Column Layout -->
        <div class="hidden lg:grid grid-cols-2 gap-12 items-start">
          <!-- Left Column: Contact Info Card -->
          <div>
            <ContactInfoCard />
          </div>

          <!-- Right Column: Contact Form -->
          <div>
            <!-- Success Message -->
            <div v-if="submitted" class="flex flex-col items-center justify-center text-center py-12">
              <div class="mb-6">
                <svg class="w-16 h-16 text-brand-gold animate-check-bounce mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 class="font-extrabold text-xl mb-3" style="color: #2D2D2D">Merci !</h3>
              <p class="text-sm leading-relaxed mb-6" style="color: #4A4A4A">
                Votre message a bien été reçu. Un conseiller vous recontactera dans les 24h.
              </p>
              <a href="/" class="inline-flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-70" style="color: #4A4A4A">
                Retour au site
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <!-- Form -->
            <form v-if="!submitted" @submit.prevent="submitForm" class="space-y-5">

              <!-- First Name -->
              <div class="space-y-2">
                <label for="prenom" class="font-bold text-sm" style="color: #2D2D2D">Prénom</label>
                <input v-model="formData.prenom" id="prenom" type="text" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-sm" style="border-color: #F0EFE8" placeholder="Votre prénom" />
              </div>

              <!-- Last Name -->
              <div class="space-y-2">
                <label for="nom" class="font-bold text-sm" style="color: #2D2D2D">Nom</label>
                <input v-model="formData.nom" id="nom" type="text" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-sm" style="border-color: #F0EFE8" placeholder="Votre nom" />
              </div>

              <!-- Phone -->
              <div class="space-y-2">
                <label for="phone" class="font-bold text-sm" style="color: #2D2D2D">Téléphone</label>
                <input v-model="formData.phone" id="phone" type="tel" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-sm" style="border-color: #F0EFE8" placeholder="06 12 34 56 78" />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label for="email" class="font-bold text-sm" style="color: #2D2D2D">Email</label>
                <input v-model="formData.email" id="email" type="email" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-sm" style="border-color: #F0EFE8" placeholder="votre@email.com" />
              </div>

              <!-- Postcode -->
              <div class="space-y-2">
                <label for="email" class="font-bold text-sm" style="color: #2D2D2D">Code Postal</label>
                <input v-model="formData.postcode" id="postcode" type="postcode" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-sm" style="border-color: #F0EFE8" placeholder="Votre code postal" />
              </div>

              <!-- Message -->
              <div class="space-y-2">
                <label for="message" class="font-bold text-sm" style="color: #2D2D2D">Votre message</label>
                <textarea v-model="formData.message" id="message" rows="3" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-sm resize-none" style="border-color: #F0EFE8" placeholder="Vos questions..."></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full py-3 px-6 rounded-xl font-bold text-white text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mt-6" style="background-color: #C0A94D; text-transform: uppercase; font-size: 13px; letter-spacing: 0.5px">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>

        <!-- Tablet/Mobile: Stacked Layout -->
        <div class="lg:hidden space-y-12">
          <!-- Contact Info Card -->
          <ContactInfoCard />

          <!-- Contact Form -->
          <!-- Success Message -->
          <div v-if="submitted" class="flex flex-col items-center justify-center text-center py-12">
            <div class="mb-6">
              <svg class="w-16 h-16 text-brand-gold animate-check-bounce mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 class="font-extrabold text-xl mb-3" style="color: #2D2D2D">Merci !</h3>
            <p class="text-sm leading-relaxed mb-6" style="color: #4A4A4A">
              Votre message a bien été reçu. Un conseiller vous recontactera dans les 24h.
            </p>
            <a href="/" class="inline-flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-70" style="color: #4A4A4A">
              Retour au site
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Form -->
          <form v-if="!submitted" @submit.prevent="submitForm" class="space-y-5">
            <h2 class="font-extrabold text-xl mb-6" style="color: #2D2D2D">Vos coordonnées</h2>

            <!-- First Name -->
            <div class="space-y-2">
              <label for="prenom-mobile" class="font-bold text-sm" style="color: #2D2D2D">Prénom</label>
              <input v-model="formData.prenom" id="prenom-mobile" type="text" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-base" style="border-color: #F0EFE8; min-height: 48px" placeholder="Votre prénom" />
            </div>

            <!-- Last Name -->
            <div class="space-y-2">
              <label for="nom-mobile" class="font-bold text-sm" style="color: #2D2D2D">Nom</label>
              <input v-model="formData.nom" id="nom-mobile" type="text" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-base" style="border-color: #F0EFE8; min-height: 48px" placeholder="Votre nom" />
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label for="phone-mobile" class="font-bold text-sm" style="color: #2D2D2D">Téléphone</label>
              <input v-model="formData.phone" id="phone-mobile" type="tel" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-base" style="border-color: #F0EFE8; min-height: 48px" placeholder="06 12 34 56 78" />
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="email-mobile" class="font-bold text-sm" style="color: #2D2D2D">Email</label>
              <input v-model="formData.email" id="email-mobile" type="email" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-base" style="border-color: #F0EFE8; min-height: 48px" placeholder="votre@email.com" />
            </div>

            <!-- Message -->
            <div class="space-y-2">
              <label for="message-mobile" class="font-bold text-sm" style="color: #2D2D2D">Votre message</label>
              <textarea v-model="formData.message" id="message-mobile" rows="4" required class="w-full bg-white border-2 border-gray-300 focus:border-brand-gold focus:outline-none rounded-xl px-4 py-3 transition-colors text-base resize-none" style="border-color: #F0EFE8; min-height: 120px" placeholder="Vos questions..."></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="w-full py-4 px-6 rounded-xl font-bold text-white text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mt-6" style="background-color: #C0A94D; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px; min-height: 48px">
              Envoyer ma demande
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Nos Engagements Service Section - Signature Style -->
    <section class="py-16 px-6 md:px-12 bg-white relative">
      <!-- Golden Background Band (Signature) -->
      <div class="engagements-background-band absolute left-0 right-0 z-0" style="background-color: #B19E31; width: 100vw; height: 250px;"></div>

      <div class="container-width relative z-10">
        <div class="mb-12 text-center">
          <h2 class="engagements-section-title font-extrabold text-3xl md:text-4xl lg:text-5xl mb-3 max-w-[90%] mx-auto" style="line-height: 1.2;">
            <span style="color: #2D2D2D">Nos Services</span>
          </h2>
          <p class="text-lg text-brand-neutral font-normal max-w-2xl mx-auto">
            Découvrez nos valeurs et nos engagements envers vous.
          </p>
        </div>

        <!-- Grid of Engagement Items - Desktop & Tablet -->
        <div class="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-6 mt-20">
          <!-- Item 1: Livraison sous 24 heures -->
          <div class="engagement-item engagement-item-1 bg-white rounded-[24px] p-10 shadow-card-clean">
            <div class="gold-accent-line"></div>
            <div class="mb-4">
              <CheckIcon class="w-6 h-6 text-brand-gold" />
            </div>
            <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Livraison Rapide</h3>
            <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Une réactivité maximale partout en France pour garantir la continuité de vos soins.</p>
          </div>

          <!-- Item 2: Discrétion Absolue -->
          <div class="engagement-item engagement-item-2 bg-white rounded-[24px] p-10 shadow-card-clean">
            <div class="gold-accent-line"></div>
            <div class="mb-4">
              <CheckIcon class="w-6 h-6 text-brand-gold" />
            </div>
            <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Secret Médical</h3>
            <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Vos dispositifs médicaux sont expédiés dans des colis neutres pour préserver votre intimité.</p>
          </div>

          <!-- Item 3: Gestion administrative totale -->
          <div class="engagement-item engagement-item-3 bg-white rounded-[24px] p-10 shadow-card-clean">
            <div class="gold-accent-line"></div>
            <div class="mb-4">
              <CheckIcon class="w-6 h-6 text-brand-gold" />
            </div>
            <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Gestion administrative</h3>
            <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Prise en charge de vos démarches et tiers-payant intégral pour votre sérénité.</p>
          </div>

          <!-- Item 4: Disponibilité et Réactivité -->
          <div class="engagement-item engagement-item-4 bg-white rounded-[24px] p-10 shadow-card-clean">
            <div class="gold-accent-line"></div>
            <div class="mb-4">
              <CheckIcon class="w-6 h-6 text-brand-gold" />
            </div>
            <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Disponibilité et Réactivité</h3>
            <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Un service client expert et très accessible pour vous accompagner chaque jour.</p>
          </div>

          <!-- Item 5: Le Digital -->
          <div class="engagement-item engagement-item-5 bg-white rounded-[24px] p-10 shadow-card-clean">
            <div class="gold-accent-line"></div>
            <div class="mb-4">
              <CheckIcon class="w-6 h-6 text-brand-gold" />
            </div>
            <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Toujours Connectés</h3>
            <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Le contact est aussi possible directement via votre application Stiméo+.</p>
          </div>
        </div>

        <!-- Mobile Horizontal Carousel -->
        <div class="md:hidden mt-20">
          <div class="engagement-carousel-mobile flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2">
            <!-- Item 1: Livraison sous 24 heures -->
            <div class="engagement-item engagement-item-1 engagement-card-mobile snap-center flex-shrink-0 bg-white rounded-[24px] p-10 shadow-card-clean">
              <div class="gold-accent-line"></div>
              <div class="mb-4">
                <CheckIcon class="w-6 h-6 text-brand-gold" />
              </div>
              <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Livraison Rapide</h3>
              <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Une réactivité maximale partout en France pour garantir la continuité de vos soins.</p>
            </div>

            <!-- Item 2: Discrétion Absolue -->
            <div class="engagement-item engagement-item-2 engagement-card-mobile snap-center flex-shrink-0 bg-white rounded-[24px] p-10 shadow-card-clean">
              <div class="gold-accent-line"></div>
              <div class="mb-4">
                <CheckIcon class="w-6 h-6 text-brand-gold" />
              </div>
              <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Secret Médical</h3>
              <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Vos dispositifs médicaux sont expédiés dans des colis neutres pour préserver votre intimité.</p>
            </div>

            <!-- Item 3: Gestion administrative totale -->
            <div class="engagement-item engagement-item-3 engagement-card-mobile snap-center flex-shrink-0 bg-white rounded-[24px] p-10 shadow-card-clean">
              <div class="gold-accent-line"></div>
              <div class="mb-4">
                <CheckIcon class="w-6 h-6 text-brand-gold" />
              </div>
              <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Gestion administrative</h3>
              <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Prise en charge de vos démarches et tiers-payant intégral pour votre sérénité.</p>
            </div>

            <!-- Item 4: Disponibilité et Réactivité -->
            <div class="engagement-item engagement-item-4 engagement-card-mobile snap-center flex-shrink-0 bg-white rounded-[24px] p-10 shadow-card-clean">
              <div class="gold-accent-line"></div>
              <div class="mb-4">
                <CheckIcon class="w-6 h-6 text-brand-gold" />
              </div>
              <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Disponibilité et Réactivité</h3>
              <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Un service client expert et très accessible pour vous accompagner chaque jour.</p>
            </div>

            <!-- Item 5: Le Digital -->
            <div class="engagement-item engagement-item-5 engagement-card-mobile snap-center flex-shrink-0 bg-white rounded-[24px] p-10 shadow-card-clean">
              <div class="gold-accent-line"></div>
              <div class="mb-4">
                <CheckIcon class="w-6 h-6 text-brand-gold" />
              </div>
              <h3 class="font-extrabold text-xl mb-3" style="color: #1A1A1A">Toujours Connectés</h3>
              <p class="text-base font-normal leading-relaxed" style="color: #4A4A4A">Le contact est aussi possible directement via votre application Stiméo+.</p>
            </div>
          </div>

          <!-- Mobile Pagination Dots -->
          <div class="flex justify-center gap-2 mt-6 md:hidden">
            <button
              v-for="idx in 5"
              :key="`dot-${idx}`"
              class="rounded-full transition-all duration-300"
              :class="idx === 1 ? 'bg-brand-gold w-2.5 h-2.5' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'"
              :aria-label="`Go to engagement ${idx}`"
            />
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

/* Cascade Animation for Engagement Items */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Golden Background Band for Engagements Section */
.engagements-background-band {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  margin-left: -50vw;
  pointer-events: none;
}

/* Clean Card Shadow - Soft Multi-layer */
.shadow-card-clean {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

/* Gold Accent Line Above Title */
.gold-accent-line {
  width: 40px;
  height: 2px;
  background-color: #C0A94D;
  margin-bottom: 16px;
  border-radius: 1px;
}

/* Shadow for engagement cards - light and diffuse */
.shadow-engagement {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
}

/* Mobile Typography for Engagements Title */
@media (max-width: 767px) {
  .engagements-section-title {
    font-size: 28px !important;
    line-height: 1.2 !important;
  }
}

/* Small Mobile Optimization */
@media (max-width: 640px) {
  .engagements-section-title {
    font-size: 24px !important;
  }
}

/* Premium Contact Card */
.premium-contact-card {
  transition: all 0.3s ease;
}

.premium-contact-card:hover {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.06) !important;
}

/* Form Inputs - Gold Focus Border */
input, textarea {
  border-color: #F0EFE8 !important;
}

input:focus, textarea:focus {
  border-color: #C0A94D !important;
  box-shadow: inset 0 0 0 3px rgba(192, 169, 77, 0.1);
}

/* Submit Button - Micro-lift on Hover */
button[type="submit"] {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(192, 169, 77, 0.2) !important;
}

button[type="submit"]:active {
  transform: translateY(0);
}

/* Check Icon Bounce Animation */
@keyframes checkBounce {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.animate-check-bounce {
  animation: checkBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Mobile Carousel Container */
.engagement-carousel-mobile {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.engagement-carousel-mobile::-webkit-scrollbar {
  display: none;
}

/* Mobile engagement card sizing - 85% width with peek effect */
.engagement-card-mobile {
  width: calc(85vw - 24px);
  /* Snap card to center when scrolling stops */
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

/* Responsive card width adjustments */
@media (min-width: 640px) {
  .engagement-card-mobile {
    width: calc(85vw - 24px);
  }
}

/* Initial state - hidden and offset, waiting for scroll trigger */
.engagement-item {
  opacity: 0;
  transform: translateY(30px);
}

/* Animate only when in view */
.engagement-item.in-view {
  animation: fadeInUp 800ms ease-out forwards;
}

.engagement-item.in-view.engagement-item-1 {
  animation-delay: 0ms;
}

.engagement-item.in-view.engagement-item-2 {
  animation-delay: 150ms;
}

.engagement-item.in-view.engagement-item-3 {
  animation-delay: 300ms;
}

.engagement-item.in-view.engagement-item-4 {
  animation-delay: 450ms;
}

.engagement-item.in-view.engagement-item-5 {
  animation-delay: 600ms;
}
</style>
