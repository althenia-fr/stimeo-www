<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="w-full min-h-screen bg-white flex items-center px-6 md:px-12 py-24">
    <div class="container-width text-center">
      <h1 class="font-extrabold text-black text-6xl mb-6">404</h1>
      <h2 class="font-bold text-4xl text-black mb-8">Page non trouvée</h2>
      <p class="text-lg text-brand-anthracite font-normal mb-12 max-w-md mx-auto">
        La page que vous cherchez n'existe pas ou est en cours de développement.
      </p>
      <RouterLink
        to="/"
        class="btn-primary inline-block"
      >
        Retour à l'accueil
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
