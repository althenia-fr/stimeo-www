<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PartnerMarquee from '../components/PartnerMarquee.vue'
import PWATabBar from '../components/PWATabBar.vue'

const route = useRoute()

// Route lockdown: hide footer on /auth routes
const showFooter = computed(() => {
  return !route.path.startsWith('/auth')
})

// Route lockdown: hide hellobar on /patient-portal routes
const showHelloBar = computed(() => {
  return !route.path.startsWith('/patient-portal')
})

// Show PWA Tab Bar on mobile for patient portal
const showTabBar = computed(() => {
  return route.path.startsWith('/patient-portal')
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- HelloBar: Conditional rendering for patient portal -->
    <div v-if="showHelloBar" class="vitalia-hellobar">
      <!-- HelloBar component will be inserted here -->
    </div>

    <Header />
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Partner Marquee: Show before footer -->
    <PartnerMarquee />

    <!-- Footer: Conditional rendering for auth routes -->
    <Footer v-if="showFooter" />

    <!-- PWA Tab Bar: Mobile navigation for patient portal -->
    <PWATabBar v-if="showTabBar" />
  </div>
</template>

<style scoped></style>
