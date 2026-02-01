<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TOCItem {
  id: string
  label: string
}

interface Props {
  items: TOCItem[]
}

const props = defineProps<Props>()
const activeId = ref<string>('')

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  // Find which section is currently in view
  for (const item of props.items) {
    const element = document.getElementById(item.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      // Check if element is in upper half of viewport
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        activeId.value = item.id
        break
      }
    }
  }
}

onMounted(() => {
  // Set initial active item
  if (props.items.length > 0) {
    activeId.value = props.items[0].id
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="legal-nav-sidebar hidden lg:block">
    <ul class="space-y-4">
      <li v-for="item in items" :key="item.id">
        <button
          @click="scrollToSection(item.id)"
          :class="['legal-nav-link', { 'is-active': activeId === item.id }]"
          class="text-sm font-normal text-gray-700 hover:text-brand-maroon transition-colors w-full text-left"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>

  <!-- Mobile: Dropdown Menu -->
  <div class="lg:hidden mb-8">
    <select
      @change="scrollToSection(($event.target as HTMLSelectElement).value)"
      class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-normal text-gray-700"
    >
      <option value="">Sommaire de la page</option>
      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.legal-nav-sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 120px;
  border-left: 1px solid #e5e7eb;
  padding-left: 20px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.legal-nav-link {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
}

.legal-nav-link:hover {
  color: #99554e;
}

.legal-nav-link.is-active {
  color: #99554e !important;
  border-left: 3px solid #99554e;
  margin-left: -23px;
  padding-left: 20px;
  font-weight: 700;
}

@media (max-width: 1023px) {
  .legal-nav-sidebar {
    display: none;
  }
}
</style>
