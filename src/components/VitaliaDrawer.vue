<script setup lang="ts">
import { ref, watch } from 'vue'

interface DrawerCard {
  id: string
  title: string
  description: string
}

const props = withDefaults(
  defineProps<{
    isOpen?: boolean
    cardData?: DrawerCard | null
  }>(),
  {
    isOpen: false,
    cardData: null
  }
)

const emit = defineEmits<{
  close: []
}>()

const localIsOpen = ref(props.isOpen)

// Watch for prop changes and sync local state
watch(
  () => props.isOpen,
  (newVal) => {
    localIsOpen.value = newVal
    if (newVal) {
      triggerHaptic(15)
      // Lock body scroll when drawer opens
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

/**
 * Trigger haptic feedback (15ms for drawer open/close)
 */
const triggerHaptic = (duration: number = 15) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration)
  }
}

/**
 * Close drawer with haptic feedback
 */
const closeDrawer = () => {
  triggerHaptic(10)
  localIsOpen.value = false
  document.body.style.overflow = ''
  emit('close')
}

/**
 * Close drawer on overlay click (outside content area)
 */
const closeOnOverlay = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('vitalia-drawer-overlay')) {
    closeDrawer()
  }
}

/**
 * Get detailed content based on card ID
 */
const getDetailedContent = () => {
  if (!props.cardData) return {}

  const contentMap: Record<string, { details: string[]; cta: string }> = {
    // Role Cards
    technique: {
      details: [
        'Installation complète et formation technique sur site',
        'Maintenance préventive et corrective 24/7',
        'Support diagnostic via plateforme STIMÉO Connect',
        'Accès à une documentation complète et mise à jour',
        'Formations continues sur les nouveaux dispositifs'
      ],
      cta: 'Planifier une installation'
    },
    pedagogie: {
      details: [
        'Modules d\'éducation patient personnalisés',
        'Suivi de l\'autonomisation via la plateforme',
        'Guidance progressive vers l\'indépendance',
        'Documentation patient en langage clair',
        'Soutien émotionnel et motivationnel continu'
      ],
      cta: 'Accéder aux ressources pédagogiques'
    },
    coordination: {
      details: [
        'Synchronisation temps réel avec prescripteurs',
        'Partage de données de télé-observance sécurisé',
        'Messagerie intégrée pour coordination fluide',
        'Tableaux de bord collaboratifs',
        'Rapports automatisés pour suivi du parcours'
      ],
      cta: 'Explorer STIMÉO Connect'
    },
    // Engagement Cards
    conformite: {
      details: [
        'Audit régulier de conformité avec normes légales',
        'Documentation transparente de tous les dispositifs',
        'Respect strict du Code de la Santé Publique',
        'Certification qualité et traçabilité complète',
        'Support juridique et conseil en conformité'
      ],
      cta: 'Consulter notre politique de conformité'
    },
    ethique: {
      details: [
        'Charte éthique signée par tous les partenaires',
        'Refus systématique des pratiques non conformes',
        'Intégrité absolue dans la prise en charge',
        'Respect de la dignité et des droits du patient',
        'Transparence dans tous les échanges'
      ],
      cta: 'Lire notre manifeste éthique'
    },
    innovation: {
      details: [
        'Plateforme STIMÉO Connect pour télé-observance',
        'Données en temps réel pour suivi optimisé',
        'Coordination digitale simplifiée',
        'Accès gratuit aux outils de pilotage',
        'Innovations continues pour meilleure observance'
      ],
      cta: 'Accéder à STIMÉO Connect'
    },
    expertise: {
      details: [
        'Formations continues sur tous les dispositifs',
        'Ressources humaines expertes et disponibles',
        'Accompagnement vers maîtrise technique',
        'Développement professionnel continu',
        'Accès à réseau de praticiens spécialisés'
      ],
      cta: 'Rejoindre nos formations'
    }
  }

  return contentMap[props.cardData.id] || { details: [], cta: 'En savoir plus' }
}
</script>

<template>
  <Teleport to="body">
    <!-- Drawer Overlay -->
    <div
      class="vitalia-drawer-overlay"
      :class="{ 'is-active': localIsOpen }"
      @click="closeOnOverlay"
    >
      <!-- Drawer Content -->
      <div class="vitalia-drawer-content">
        <!-- Close Button (X) - STIMÉO Gold -->
        <button
          class="vitalia-drawer-close"
          @click="closeDrawer"
          aria-label="Close drawer"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Drawer Header -->
        <div class="vitalia-drawer-header mb-8">
          <h2 class="vitalia-drawer-title">
            {{ cardData?.title }}
          </h2>
          <div class="vitalia-drawer-accent-line" />
        </div>

        <!-- Drawer Body Content -->
        <div class="vitalia-drawer-body">
          <!-- Original Description -->
          <p class="vitalia-drawer-description mb-6">
            {{ cardData?.description }}
          </p>

          <!-- Detailed Features List -->
          <div class="vitalia-drawer-section mb-8">
            <h3 class="vitalia-drawer-section-title mb-4">Points clés</h3>
            <ul class="vitalia-drawer-list">
              <li
                v-for="(detail, idx) in getDetailedContent().details"
                :key="`detail-${idx}`"
                class="vitalia-drawer-list-item"
              >
                <span class="vitalia-drawer-list-marker" />
                {{ detail }}
              </li>
            </ul>
          </div>

          <!-- Separator -->
          <div class="vitalia-drawer-separator" />

          <!-- CTA Button -->
          <button class="vitalia-drawer-cta-btn">
            {{ getDetailedContent().cta }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* === Drawer Overlay (Backdrop) === */
.vitalia-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.vitalia-drawer-overlay.is-active {
  visibility: visible;
  opacity: 1;
}

/* === Drawer Content Base === */
.vitalia-drawer-content {
  position: absolute;
  background: #ffffff;
  padding: 40px;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* === Mobile: Bottom Sheet === */
@media (max-width: 768px) {
  .vitalia-drawer-content {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 24px 24px 0 0;
    max-height: 85vh;
    transform: translateY(100%);
    padding: 32px 24px;
  }

  .vitalia-drawer-overlay.is-active .vitalia-drawer-content {
    transform: translateY(0);
  }
}

/* === Desktop: Side Drawer === */
@media (min-width: 769px) {
  .vitalia-drawer-content {
    right: 0;
    top: 0;
    height: 100vh;
    width: 480px;
    border-radius: 0;
    max-height: 100%;
    transform: translateX(100%);
    padding: 48px 40px;
  }

  .vitalia-drawer-overlay.is-active .vitalia-drawer-content {
    transform: translateX(0);
  }

  /* Optional scrollbar styling for desktop */
  .vitalia-drawer-content::-webkit-scrollbar {
    width: 6px;
  }

  .vitalia-drawer-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .vitalia-drawer-content::-webkit-scrollbar-thumb {
    background: rgba(177, 158, 49, 0.3);
    border-radius: 3px;
  }

  .vitalia-drawer-content::-webkit-scrollbar-thumb:hover {
    background: rgba(177, 158, 49, 0.5);
  }
}

/* === Close Button (X) === */
.vitalia-drawer-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(177, 158, 49, 0.1);
  border-radius: 8px;
  cursor: pointer;
  color: #B19E31;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10000;
}

.vitalia-drawer-close:hover {
  background: rgba(177, 158, 49, 0.2);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 12px rgba(177, 158, 49, 0.2);
}

.vitalia-drawer-close:active {
  transform: scale(0.95);
}

/* === Drawer Header === */
.vitalia-drawer-header {
  margin-top: 16px; /* Account for close button */
}

.vitalia-drawer-title {
  font-size: 24px;
  font-weight: 800;
  color: #B19E31;
  line-height: 1.3;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .vitalia-drawer-title {
    font-size: 20px;
  }
}

/* === Accent Line Under Title === */
.vitalia-drawer-accent-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #B19E31 0%, rgba(177, 158, 49, 0.3) 100%);
  border-radius: 2px;
}

/* === Drawer Body === */
.vitalia-drawer-body {
  padding-top: 8px;
}

/* === Description Text === */
.vitalia-drawer-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4a4a4a;
}

/* === Section with Title === */
.vitalia-drawer-section {
  margin-bottom: 24px;
}

.vitalia-drawer-section-title {
  font-size: 14px;
  font-weight: 700;
  color: #B19E31;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* === List Styling === */
.vitalia-drawer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vitalia-drawer-list-item {
  display: flex;
  align-items: flex-start;
  font-size: 15px;
  line-height: 1.5;
  color: #333333;
  padding-left: 20px;
  position: relative;
}

/* === List Marker (Bullet) === */
.vitalia-drawer-list-marker {
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background: #B19E31;
  border-radius: 50%;
  flex-shrink: 0;
}

/* === Separator Line === */
.vitalia-drawer-separator {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(177, 158, 49, 0.2) 50%,
    transparent 100%
  );
  margin: 24px 0;
}

/* === CTA Button === */
.vitalia-drawer-cta-btn {
  width: 100%;
  padding: 14px 24px;
  background: #B19E31;
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-transform: none;
}

.vitalia-drawer-cta-btn:hover {
  background: #a88d29;
  box-shadow: 0 4px 12px rgba(177, 158, 49, 0.3);
  transform: translateY(-2px);
}

.vitalia-drawer-cta-btn:active {
  background: #9a7e24;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .vitalia-drawer-cta-btn {
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style>
