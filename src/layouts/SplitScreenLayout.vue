<script setup lang="ts">
import SidebarTOC from '../components/SidebarTOC.vue'

interface TOCItem {
  id: string
  label: string
}

interface Props {
  title: string
  subtitle?: string
  tocItems: TOCItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="split-screen-layout">
    <!-- Hero Section -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-extrabold text-4xl md:text-5xl text-gray-900 mb-2">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-lg text-gray-600 font-normal">
          {{ subtitle }}
        </p>
      </div>
    </section>

    <!-- Main Content Area with Sticky Sidebar -->
    <section class="py-12 md:py-16 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          <!-- Left Sidebar (Sticky TOC) -->
          <div class="lg:col-span-1">
            <SidebarTOC :items="tocItems" />
          </div>

          <!-- Right Content -->
          <div class="lg:col-span-3">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.split-screen-layout {
  width: 100%;
}
</style>
