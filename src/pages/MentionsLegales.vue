<script setup lang="ts">
import SplitScreenLayout from '../layouts/SplitScreenLayout.vue'

interface TOCItem {
  id: string
  label: string
}

const tocItems: TOCItem[] = [
  { id: 'editeur', label: 'Éditeur du site' },
  { id: 'hebergement', label: 'Hébergement' },
  { id: 'propriete', label: 'Propriété intellectuelle' },
  { id: 'responsabilite', label: 'Responsabilité' },
  { id: 'donnees', label: 'Protection des données' },
  { id: 'contact', label: 'Contact' }
]
</script>

<template>
  <SplitScreenLayout
    title="Mentions Légales"
    subtitle="Informations officielles sur STIMÉO et ses services"
    :tocItems="tocItems"
  >
    <!-- Éditeur du site -->
    <article class="legal-article-block" :id="tocItems[0].id">
      <h2 class="legal-article-title">{{ tocItems[0].label }}</h2>
      
      <p class="legal-article-paragraph">
        Le site www.stimeo.fr est édité par la société STIMÉO, spécialisée dans les solutions innovantes de télé-observations et de coordination des soins.
      </p>

      <div class="legal-data-list space-y-3">
        <div class="legal-data-item">
          <span class="legal-data-label">Raison Sociale :</span> STIMÉO SAS
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Siège Social :</span> [Adresse complète]
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">SIRET :</span> [Numéro SIRET]
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Directeur de Publication :</span> [Nom du directeur]
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Email :</span> hello@stimeo.fr
        </div>
      </div>
    </article>

    <!-- Hébergement -->
    <article class="legal-article-block" :id="tocItems[1].id">
      <h2 class="legal-article-title">{{ tocItems[1].label }}</h2>
      
      <p class="legal-article-paragraph">
        Ce site est hébergé par un prestataire certifié HDS (Hébergeur de Données de Santé), garantissant la sécurité et la conformité des données personnelles et sensibles.
      </p>

      <div class="legal-data-list space-y-3">
        <div class="legal-data-item">
          <span class="legal-data-label">Hébergeur :</span> [Nom de l'hébergeur]
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Certification :</span> HDS - Décision d'autorisation n°[numéro]
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Localisation des serveurs :</span> Union Européenne
        </div>
      </div>
    </article>

    <!-- Propriété Intellectuelle -->
    <article class="legal-article-block" :id="tocItems[2].id">
      <h2 class="legal-article-title">{{ tocItems[2].label }}</h2>
      
      <p class="legal-article-paragraph">
        L'ensemble des contenus du site (textes, images, logos, icônes, graphismes, etc.) sont la propriété exclusive de STIMÉO ou sont utilisés avec autorisation. Aucune reproduction, modification ou exploitation de ces contenus n'est autorisée sans accord préalable.
      </p>

      <p class="legal-article-paragraph">
        Les marques, noms commerciaux et logos sont des marques déposées de STIMÉO ou de ses partenaires. Leur utilisation sans autorisation est strictement interdite.
      </p>
    </article>

    <!-- Responsabilité -->
    <article class="legal-article-block" :id="tocItems[3].id">
      <h2 class="legal-article-title">{{ tocItems[3].label }}</h2>
      
      <p class="legal-article-paragraph">
        STIMÉO s'efforce de maintenir une disponibilité continue du service, mais ne peut garantir l'absence d'erreurs ou d'interruptions. STIMÉO ne peut être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
      </p>

      <p class="legal-article-paragraph">
        Les liens vers des sites tiers sont fournis à titre informatif uniquement. STIMÉO décline toute responsabilité concernant le contenu de ces sites externes.
      </p>
    </article>

    <!-- Protection des Données -->
    <article class="legal-article-block" :id="tocItems[4].id">
      <h2 class="legal-article-title">{{ tocItems[4].label }}</h2>
      
      <p class="legal-article-paragraph">
        Les données personnelles collectées via ce site sont traitées conformément à la réglementation en vigueur (RGPD, Loi Informatique et Libertés). Ces données ne sont jamais cédées à des tiers sans votre consentement.
      </p>

      <p class="legal-article-paragraph">
        Pour exercer vos droits d'accès, de rectification ou de suppression de vos données, merci de nous contacter à l'adresse email ci-dessous.
      </p>

      <div class="legal-data-list space-y-3">
        <div class="legal-data-item">
          <span class="legal-data-label">Responsable des données :</span> hello@stimeo.fr
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Délai de réponse :</span> 30 jours calendaires
        </div>
      </div>
    </article>

    <!-- Contact -->
    <article class="legal-article-block" :id="tocItems[5].id">
      <h2 class="legal-article-title">{{ tocItems[5].label }}</h2>
      
      <p class="legal-article-paragraph">
        Pour toute question ou réclamation concernant ces mentions légales, vous pouvez nous contacter via :
      </p>

      <div class="legal-data-list space-y-3">
        <div class="legal-data-item">
          <span class="legal-data-label">Email :</span> hello@stimeo.fr
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Téléphone :</span> 0801 270 111
        </div>
        <div class="legal-data-item">
          <span class="legal-data-label">Adresse :</span> [Adresse complète]
        </div>
      </div>
    </article>
  </SplitScreenLayout>
</template>

<style scoped>
/* Ensure proper spacing and typography for institutional content */
:deep(.legal-article-block) {
  scroll-margin-top: 140px; /* Offset for sticky header */
}
</style>
