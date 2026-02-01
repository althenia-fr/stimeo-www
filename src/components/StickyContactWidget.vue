<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isVisible = ref(false)
const isExpanded = ref(false)
let scrollListener: (() => void) | null = null
let animationInterval: NodeJS.Timeout | null = null

const handleScroll = () => {
  if (isVisible.value) return

  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

  if (scrollPercentage > 30) {
    isVisible.value = true
    startAnimationLoop()
  }
}

const startAnimationLoop = () => {
  if (animationInterval) clearInterval(animationInterval)

  // Animation loop: expand for 2s, then collapse, repeat every 20s
  const animationCycle = () => {
    // Expand
    isExpanded.value = true

    // Stay expanded for 2 seconds
    setTimeout(() => {
      // Collapse
      isExpanded.value = false
    }, 2000)

    // Next cycle in 20 seconds
  }

  // Run first cycle immediately
  animationCycle()

  // Set up interval for subsequent cycles
  animationInterval = setInterval(() => {
    animationCycle()
  }, 20000)
}

const navigateToContact = () => {
  router.push('/contact')
}

const handlePhoneClick = () => {
  window.location.href = 'tel:0801270111'
}

onMounted(() => {
  scrollListener = handleScroll
  window.addEventListener('scroll', scrollListener)
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <div
    v-if="isVisible"
    class="sticky-contact-widget"
    :class="{ expanded: isExpanded }"
  >
    <!-- Phone Icon + Expandable Number Section -->
    <a
      href="tel:0801270111"
      class="phone-section"
      @click="handlePhoneClick"
    >
      <!-- Phone Icon -->
      <div class="icon-container phone-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>

      <!-- Expandable Text Section -->
      <div class="text-section">
        <div class="phone-number">0801 270 111</div>
        <div class="phone-label">(Appel gratuit)</div>
      </div>
    </a>

    <!-- Separator Divider -->
    <div class="separator"></div>

    <!-- Contact Envelope Button -->
    <button
      class="contact-button"
      @click="navigateToContact"
      aria-label="Accéder au formulaire de contact"
    >
      <div class="icon-container envelope-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>
    </button>
  </div>
</template>

<style scoped>
.sticky-contact-widget {
  position: fixed;
  bottom: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 0;
  background-color: #C0A94D;
  border-radius: 50px;
  padding: 12px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 50;
  animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Phone Section with Text Expansion */
.phone-section {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 0 0 auto;
}

.icon-container {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.phone-icon svg {
  width: 18px;
  height: 18px;
}

.envelope-icon svg {
  width: 18px;
  height: 18px;
}

/* Text Section - Hidden by default, shown when expanded */
.text-section {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transition: opacity 0.3s ease, max-width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-left: 0;
}

.sticky-contact-widget.expanded .text-section {
  max-width: 180px;
  opacity: 1;
  margin-left: 8px;
}

.phone-number {
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  color: white;
  display: block;
}

.phone-label {
  font-weight: 400;
  font-size: 11px;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.85);
  display: block;
}

/* Separator */
.separator {
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 8px;
  opacity: 0;
  transition: opacity 0.3s ease 0.2s;
}

.sticky-contact-widget.expanded .separator {
  opacity: 1;
}

/* Contact Button */
.contact-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: white;
}

.contact-button:hover .icon-container {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.1);
}

.phone-section:hover .icon-container {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .sticky-contact-widget {
    bottom: 20px;
    left: 20px;
    padding: 10px 14px;
  }

  .icon-container {
    width: 28px;
    height: 28px;
  }

  .phone-icon svg,
  .envelope-icon svg {
    width: 16px;
    height: 16px;
  }

  .text-section {
    max-width: 0;
  }

  .sticky-contact-widget.expanded .text-section {
    max-width: 150px;
  }

  .separator {
    height: 20px;
  }
}

/* Hover Effects */
.sticky-contact-widget:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
</style>
