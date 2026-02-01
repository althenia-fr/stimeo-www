<script setup lang="ts">
import { ref, computed } from 'vue'

interface Message {
  id: string
  practitionerName: string
  practitionerRole: string
  subject: string
  preview: string
  timestamp: Date
  isRead: boolean
  messages: {
    sender: 'me' | 'practitioner'
    text: string
    timestamp: Date
  }[]
}

interface Practitioner {
  id: string
  name: string
  role: string
  specialty: string
  avatar?: string
}

const searchQuery = ref('')
const selectedPractitioner = ref<string | null>(null)
const showComposing = ref(false)
const composingText = ref('')

const practitioners: Practitioner[] = [
  {
    id: '1',
    name: 'Dr. Marie Dupont',
    role: 'Médecin Généraliste',
    specialty: 'Suivi patient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie'
  },
  {
    id: '2',
    name: 'Jean Moreau',
    role: 'Pharmacien',
    specialty: 'Bilan de médication',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    role: 'IDEL',
    specialty: 'Suivi pansement',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie'
  },
  {
    id: '4',
    name: 'Thomas Dubois',
    role: 'Kinésithérapeute',
    specialty: 'Rééducation',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas'
  }
]

const messages: Message[] = [
  {
    id: '1',
    practitionerName: 'Dr. Marie Dupont',
    practitionerRole: 'Médecin Généraliste',
    subject: 'Ajustement de dose - Patient X',
    preview: 'Suite à votre alerte sur le taux de glycémie...',
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
    messages: [
      {
        sender: 'practitioner',
        text: 'Suite à votre alerte sur le taux de glycémie, je recommande un ajustement de dose. Pouvez-vous programmer le changement?',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        sender: 'me',
        text: 'Entendu, je vais appliquer l\'ajustement ce soir.',
        timestamp: new Date(Date.now() - 2400000)
      }
    ]
  },
  {
    id: '2',
    practitionerName: 'Sophie Laurent',
    practitionerRole: 'IDEL',
    subject: 'Changement de pansement complexe',
    preview: 'Le pansement de la plaie a bien cicatrisé...',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
    messages: [
      {
        sender: 'practitioner',
        text: 'Le pansement de la plaie a bien cicatrisé. Je propose de changer la fréquence des interventions.',
        timestamp: new Date(Date.now() - 7200000)
      }
    ]
  },
  {
    id: '3',
    practitionerName: 'Jean Moreau',
    practitionerRole: 'Pharmacien',
    subject: 'Bilan de médication - Interaction détectée',
    preview: 'J\'ai identifié une interaction potentielle...',
    timestamp: new Date(Date.now() - 86400000),
    isRead: true,
    messages: [
      {
        sender: 'practitioner',
        text: 'J\'ai identifié une interaction potentielle entre les médicaments. À discuter avec le prescripteur.',
        timestamp: new Date(Date.now() - 86400000)
      }
    ]
  }
]

const filteredMessages = computed(() => {
  return messages.filter(msg => {
    const matchesSearch = 
      msg.practitionerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (selectedPractitioner && selectedPractitioner.value) {
      return matchesSearch && msg.practitionerName === 
        practitioners.find(p => p.id === selectedPractitioner.value)?.name
    }
    
    return matchesSearch
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
})

const unreadCount = computed(() => {
  return messages.filter(m => !m.isRead).length
})

const selectedMessage = computed(() => {
  if (!selectedPractitioner.value) return null
  return filteredMessages.value[0] || null
})

const sendMessage = () => {
  if (composingText.value.trim() && selectedPractitioner.value) {
    const selectedMsg = selectedMessage.value
    if (selectedMsg) {
      // Add user message
      selectedMsg.messages.push({
        sender: 'me',
        text: composingText.value,
        timestamp: new Date()
      })

      // Add auto-response system message
      selectedMsg.messages.push({
        sender: 'practitioner',
        text: 'Votre soignant vous répondra sous 48h',
        timestamp: new Date()
      })
    }
    composingText.value = ''
  }
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (hours < 1) return 'À l\'instant'
  if (hours < 24) return `Il y a ${hours}h`
  if (days < 7) return `Il y a ${days}j`
  
  return date.toLocaleDateString('fr-FR')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="flex h-96 md:h-[600px]">
      <!-- Sidebar: Practitioners List -->
      <div class="w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50">
        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-200">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un praticien..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-opacity-20 text-sm"
          />
        </div>

        <!-- Practitioners List -->
        <div class="flex-1 overflow-y-auto">
          <button
            v-for="practitioner in practitioners"
            :key="practitioner.id"
            @click="selectedPractitioner = practitioner.id"
            :class="[
              'w-full px-4 py-3 border-b border-gray-200 text-left transition-colors duration-200',
              selectedPractitioner === practitioner.id
                ? 'bg-brand-gold bg-opacity-10 border-l-4 border-l-brand-gold'
                : 'hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center gap-3">
              <img
                :src="practitioner.avatar"
                :alt="practitioner.name"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm text-brand-anthracite truncate">{{ practitioner.name }}</p>
                <p class="text-xs text-brand-neutral truncate">{{ practitioner.role }}</p>
              </div>
            </div>
          </button>
        </div>

        <!-- Compose Button -->
        <div class="p-4 border-t border-gray-200">
          <button
            @click="showComposing = true"
            class="w-full px-4 py-3 bg-brand-gold text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-colors duration-200"
          >
            + Nouveau message
          </button>
        </div>
      </div>

      <!-- Main Content: Messages -->
      <div class="hidden md:flex flex-1 flex-col">
        <div v-if="selectedMessage" class="flex-1 flex flex-col">
          <!-- Message Header -->
          <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-brand-gold from-opacity-5 to-transparent">
            <h3 class="font-bold text-lg text-brand-anthracite mb-1">{{ selectedMessage.subject }}</h3>
            <p class="text-sm text-brand-neutral">{{ selectedMessage.practitionerName }} • {{ formatTime(selectedMessage.timestamp) }}</p>
          </div>

          <!-- Messages Thread -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <div
              v-for="(msg, idx) in selectedMessage.messages"
              :key="idx"
              :class="[
                'flex',
                msg.text === 'Votre soignant vous répondra sous 48h' ? 'justify-center py-2' :
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              ]"
            >
              <!-- Auto-response system message -->
              <div v-if="msg.text === 'Votre soignant vous répondra sous 48h'" class="text-center">
                <span class="text-xs text-brand-gold italic px-4 py-2 bg-brand-gold bg-opacity-5 rounded-lg">
                  {{ msg.text }}
                </span>
              </div>

              <!-- Regular message -->
              <div
                v-else
                :class="[
                  'max-w-xs px-4 py-3 rounded-lg',
                  msg.sender === 'me'
                    ? 'bg-brand-gold text-white rounded-br-none'
                    : 'bg-gray-100 text-brand-anthracite rounded-bl-none'
                ]"
              >
                <p class="text-sm leading-relaxed">{{ msg.text }}</p>
                <p :class="['text-xs mt-1', msg.sender === 'me' ? 'text-white text-opacity-70' : 'text-brand-neutral']">
                  {{ formatTime(msg.timestamp) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Reply Input -->
          <div class="p-6 border-t border-gray-200">
            <div class="flex gap-2">
              <input
                v-model="composingText"
                type="text"
                placeholder="Répondre..."
                class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-opacity-20 text-sm"
                @keyup.enter="sendMessage"
              />
              <button
                @click="sendMessage"
                class="px-4 py-2 bg-brand-gold text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-colors duration-200"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex-1 flex items-center justify-center text-center">
          <div>
            <p class="text-brand-neutral text-base mb-2">Sélectionnez un praticien</p>
            <p class="text-sm text-brand-neutral">pour consulter vos messages</p>
          </div>
        </div>
      </div>

      <!-- Mobile: Messages List -->
      <div class="md:hidden flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="message in filteredMessages"
            :key="message.id"
            @click="selectedPractitioner = practitioners.find(p => p.name === message.practitionerName)?.id || null"
            :class="[
              'px-4 py-3 border-b border-gray-200 cursor-pointer transition-colors duration-200',
              !message.isRead ? 'bg-brand-gold bg-opacity-5 border-l-4 border-l-brand-gold' : 'hover:bg-gray-50'
            ]"
          >
            <div class="flex items-start gap-3">
              <div v-if="!message.isRead" class="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm text-brand-anthracite">{{ message.practitionerName }}</p>
                <p class="text-xs text-brand-neutral mb-1">{{ message.subject }}</p>
                <p class="text-xs text-brand-neutral line-clamp-2">{{ message.preview }}</p>
              </div>
              <p class="text-xs text-brand-neutral flex-shrink-0">{{ formatTime(message.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
