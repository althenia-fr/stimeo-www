import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import EcosystemeConnecte from '../pages/EcosystemeConnecte.vue'
import HorizonsStimeo from '../pages/HorizonsStimeo.vue'
import Engagements from '../pages/Engagements.vue'
import ReassinationSexuelle from '../pages/ReassinationSexuelle.vue'
import Idel from '../pages/Idel.vue'
import PatientPortal from '../pages/PatientPortal.vue'
import Urologie from '../pages/categories/Urologie.vue'
import Stomatherapie from '../pages/categories/Stomatherapie.vue'
import Cicatrisation from '../pages/categories/Cicatrisation.vue'
import Neurostimulation from '../pages/categories/Neurostimulation.vue'
import Contact from '../pages/Contact.vue'
import MentionsLegales from '../pages/MentionsLegales.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ecosysteme-connecte',
    name: 'EcosystemeConnecte',
    component: EcosystemeConnecte,
  },
  {
    path: '/horizons-stimeo',
    name: 'HorizonsStimeo',
    component: HorizonsStimeo,
  },
  {
    path: '/engagements',
    name: 'Engagements',
    component: Engagements,
  },
  {
    path: '/idel',
    name: 'Idel',
    component: Idel,
  },
  {
    path: '/patient-portal',
    name: 'PatientPortal',
    component: PatientPortal,
  },
  {
    path: '/reassignation-sexuelle',
    name: 'ReassinationSexuelle',
    component: ReassinationSexuelle,
  },
  {
    path: '/categories/urologie',
    name: 'Urologie',
    component: Urologie,
  },
  {
    path: '/categories/stomatherapie',
    name: 'Stomatherapie',
    component: Stomatherapie,
  },
  {
    path: '/categories/cicatrisation',
    name: 'Cicatrisation',
    component: Cicatrisation,
  },
  {
    path: '/categories/neurostimulation',
    name: 'Neurostimulation',
    component: Neurostimulation,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/mentions-legales',
    name: 'MentionsLegales',
    component: MentionsLegales,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
