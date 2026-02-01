<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import CheckIcon from '../components/icons/CheckIcon.vue'
import { useTitleAnimations } from '../composables/useTitleAnimations'

const router = useRouter()
useTitleAnimations()

// Carousel state
const carouselRef = ref<HTMLElement | null>(null)
const currentSlide = ref(0)
const totalSlides = 3

// Handle carousel scroll for pagination
const handleCarouselScroll = () => {
  if (!carouselRef.value) return
  const scrollLeft = carouselRef.value.scrollLeft
  const cardWidth = carouselRef.value.scrollWidth / totalSlides
  currentSlide.value = Math.round(scrollLeft / cardWidth)
}

// Navigate to specific slide
const goToSlide = (index: number) => {
  if (!carouselRef.value) return
  const cardWidth = carouselRef.value.scrollWidth / totalSlides
  carouselRef.value.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  })
  currentSlide.value = index
}

onMounted(() => {
  if (carouselRef.value) {
    carouselRef.value.addEventListener('scroll', handleCarouselScroll)
  }
})
</script>

<template>
  <div class="w-full bg-white overflow-hidden">
    <!-- Section 1: Introduction -->
    <section class="relative py-16 px-6 md:px-12">
      <div class="container-width text-center">
        <span class="text-brand-gold font-bold text-sm tracking-widest uppercase mb-3 block">Engagement Social</span>
        <h1 class="font-extrabold mb-6 text-5xl lg:text-6xl">
          <span class="liquid-highlight">Horizons</span> Stiméo
        </h1>
        <p class="text-lg text-brand-neutral font-normal max-w-3xl mx-auto leading-relaxed">
          Le sport comme vecteur d'émancipation. Nous soutenons activement les athlètes et les clubs pour une société plus inclusive.
        </p>
      </div>
    </section>

    <!-- Vision Section with Image Cards -->
    <section class="py-16 px-6 md:px-12 bg-gray-50">
      <div class="container-width">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="font-extrabold text-5xl mb-3 animate-fade-in-up-enhanced" style="color: #2D2D2D">
            L'<span class="text-brand-gold">Inclusivité</span> comme moteur d'espoir
          </h2>
          <p class="text-lg" style="color: #4A4A4A">Nos valeurs portées sur le terrain</p>
        </div>

        <!-- Cards Container: Carousel on mobile, Grid on desktop -->
        <div class="relative">
          <!-- Mobile Carousel -->
          <div
            ref="carouselRef"
            class="md:hidden vision-carousel"
          >
            <!-- Card 1: Accès Équitable (Basket) -->
            <div class="vision-card vision-carousel-slide">
              <div class="vision-card-image">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F6986c7a2636145acb3b13fff6489c9c2?format=webp&width=800"
                  alt="Accès Équitable - Basketball en fauteuil"
                />
              </div>
              <div class="vision-card-content">
                <h3 class="vision-card-title">Accès Équitable</h3>
                <p class="vision-card-description">
                  Nous militons pour que chaque infrastructure sportive devienne accessible. Le sport est un droit fondamental.
                </p>
              </div>
            </div>

            <!-- Card 2: Dépassement de soi (Ski) -->
            <div class="vision-card vision-carousel-slide">
              <div class="vision-card-image">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F4cd3bd581b68404984197c326cf03492?format=webp&width=800"
                  alt="Dépassement de soi - Athlète en ski assis"
                />
              </div>
              <div class="vision-card-content">
                <h3 class="vision-card-title">Dépassement de soi</h3>
                <p class="vision-card-description">
                  Célébrer la performance et la résilience. Chaque athlète d'Horizons Stiméo est une source d'inspiration.
                </p>
              </div>
            </div>

            <!-- Card 3: Lien Social (Groupe) -->
            <div class="vision-card vision-carousel-slide">
              <div class="vision-card-image">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F63c42e453ebf450f978e8c5f1f54e609?format=webp&width=800"
                  alt="Lien Social - Communauté Horizons Stiméo"
                />
              </div>
              <div class="vision-card-content">
                <h3 class="vision-card-title">Lien Social</h3>
                <p class="vision-card-description">
                  Briser l'isolement par le collectif. Horizons Stiméo est un lieu de vie, d'échange et de partage.
                </p>
              </div>
            </div>
          </div>

          <!-- Pagination Dots (Mobile only) -->
          <div class="md:hidden flex justify-center gap-2 mt-8">
            <button
              v-for="(_, index) in totalSlides"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'bg-brand-gold w-8'
                  : 'bg-gray-200 w-2'
              ]"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>

          <!-- Desktop Grid -->
          <div class="hidden md:grid grid-cols-3 gap-8">
            <!-- Card 1: Accès Équitable (Basket) -->
            <div class="vision-card" />

            <!-- Card 2: Dépassement de soi (Ski) -->
            <div class="vision-card" />

            <!-- Card 3: Lien Social (Groupe) -->
            <div class="vision-card" />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: L'Aventure Collective - Hero Style -->
    <section
      class="relative py-12 lg:py-20 px-6 md:px-12 overflow-hidden"
      style="background-image: url('https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F23ff5cc3bfbc46f8bdc153e5bfb83184?format=webp&width=800'); background-size: cover; background-position: right center; background-attachment: fixed;"
    >
      <!-- Gradient Overlay for Text Readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-0"></div>

      <!-- Content Container -->
      <div class="container-width relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          <!-- Left: Text Content -->
          <div class="pr-0 lg:pr-12 py-8">
            <h2 class="font-extrabold text-4xl lg:text-5xl mb-4 leading-tight">
              <span class="text-brand-gold">L'aventure</span> <br />
              collective <br />
              <span class="text-brand-gold">Horizons Stiméo</span>
            </h2>
            <p class="text-lg font-medium mb-8 leading-relaxed max-w-xl" style="color: #4A4A4A">
              Rejoignez une communauté d'athlètes, de clubs et de professionnels engagés dans l'inclusion par le sport. Ensemble, nous repoussons les limites et célébrons la performance.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="router.push('/contact')"
                class="btn-secondary text-sm py-3"
              >
                Rejoindre le mouvement
              </button>
            </div>
          </div>

          <!-- Right: Image Balance (empty space for background image) -->
          <div class="lg:col-span-1" />
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

/* Photo Container - Standard */
.photo-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.photo-container img {
  width: 100%;
  height: auto;
  display: block;
}

.photo-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0.5) 80%,
    rgba(255, 255, 255, 0.8) 100%
  );
  pointer-events: none;
  z-index: 10;
}

/* CTA Button */
.horizons-cta-button {
  background: rgba(255, 255, 255, 1);
  color: #2D2D2D;
  border: 2px solid #2D2D2D;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: inline-block;
}

.horizons-cta-button:hover {
  background: #2D2D2D;
  color: white;
  box-shadow: 0 8px 20px rgba(190, 169, 37, 0.15);
  transform: translateY(-2px);
}

/* Vision Cards with Images */
.vision-card {
  background: white;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.vision-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-6px);
}

.vision-card-image {
  position: relative;
  overflow: hidden;
  height: 250px;
  background: #f0f0f0;
}

.vision-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.vision-card:hover .vision-card-image img {
  transform: scale(1.05);
}

.vision-card-content {
  padding: 30px;
}

.vision-card-title {
  font-weight: 700;
  font-size: 22px;
  line-height: 1.2;
  color: #2D2D2D;
  margin-bottom: 12px;
}

.vision-card-description {
  font-size: 16px;
  line-height: 1.5;
  color: #4A4A4A;
}

/* Mobile Carousel Styles */
.vision-carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;
  /* Hide scrollbar while keeping scroll functionality */
  scrollbar-width: none;
}

.vision-carousel::-webkit-scrollbar {
  display: none;
}

.vision-carousel-slide {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Responsive */
@media (max-width: 768px) {
  .vision-card-image {
    height: 200px;
  }

  .vision-card-content {
    padding: 24px;
  }

  .vision-card-title {
    font-size: 20px;
  }

  .vision-card-description {
    font-size: 14px;
  }

  /* Ensure carousel shows 1.2 cards (1 full + ~20% of next) */
  .vision-carousel-slide {
    flex: 0 0 calc((100vw - 68px) / 1.2);
  }
}
</style>
