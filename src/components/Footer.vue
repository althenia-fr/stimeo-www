<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <footer class="footer-container">
    <!-- Main Footer Body (4 Columns) -->
    <div class="footer-body vitalia-footer-main">
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <!-- Column 1: Identity & Security -->
          <div class="footer-column">
            <!-- STIMÉO Logo -->
            <a href="/" class="footer-logo-link">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Ff59155a39a3a4c9caa6e8566eb01e537?format=webp&width=800"
                alt="STIMÉO"
                class="footer-logo mb-8 max-w-[200px]"
              />
            </a>

            <!-- Empty Links Container -->
            <div class="footer-links mt-8" />
          </div>

          <!-- Column 2: Services Patients -->
          <div class="footer-column">
            <ul class="footer-links vitalia-nav-links-stack">
              <li><a href="#" class="footer-link">Lexique</a></li>
              <li><a href="#" class="footer-link">FAQ Patient</a></li>
              <li><a href="#" class="footer-link">Devenir partenaire IDEL</a></li>
              <li><p>A propos de nous </p></li>
            </ul>
          </div>

          <!-- Column 3: Support & Social -->
          <div class="footer-column">
            <!-- Social Icons -->
            <h4 class="social-title">Suivez-nous</h4>
            <div class="social-icons">
              <a href="#" class="social-icon-link" title="LinkedIn">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.16v8.16h2.16v-4.07a1.16 1.16 0 0 1 1.16-1.16h.02a1.16 1.16 0 0 1 1.16 1.16v4.07h2.16M6.88 8.56a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm1.06 9.94H5.82v-8.16h2.12v8.16z"/>
                </svg>
              </a>
              <a href="#" class="social-icon-link" title="Instagram">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.5 2c-2.1 0-3.8 1.7-3.8 3.8v8.4c0 2.1 1.7 3.8 3.8 3.8h8.4c2.1 0 3.8-1.7 3.8-3.8V7.8c0-2.1-1.7-3.8-3.8-3.8H7.3m9.2 1.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m-5 1.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
              </a>
              <a href="#" class="social-icon-link" title="Facebook">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3v-7h3v-3h-3V8.5C16 7.12 16.6 6 18 6h1V3.5A10.36 10.36 0 0 0 15.88 3c-3.13 0-5.33 1.9-5.56 5.75V11H9v3h1.94v7H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Legal Bar -->
    <div class="legal-bar vitalia-legal-bar">
      <div class="max-w-7xl mx-auto px-12">
        <div class="legal-content">
          <!-- Left: Contact (Empty) -->
          <div class="legal-contact" />

          <!-- Right: Legal Links -->
          <div class="legal-links">
            <a href="/mentions-legales" class="legal-link">Mentions Légales</a>
            <span class="legal-divider">•</span>
            <a href="#" class="legal-link">Confidentialité</a>
            <span class="legal-divider">•</span>
            <a href="#" class="legal-link">Cookies</a>
            <span class="legal-divider">•</span>
            <a href="#" class="legal-link">CGU</a>
            <span class="legal-divider">•</span>
            <a href="#" class="legal-link">CGV</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ============================================
   DARK FOOTER CONTAINER
   ============================================ */
.footer-container {
  background-color: #1f2937 !important;
  color: #f9fafb !important;
  font-family: 'Eastman Grotesque', sans-serif;
}

/* --- Footer Body --- */
.footer-body {
  background-color: #1f2937;
  border-bottom: 1px solid #374151;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-logo-link {
  display: inline-block;
  text-decoration: none;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.footer-logo-link:hover {
  opacity: 0.8;
}

.footer-logo {
  display: block;
  height: auto;
}

.footer-column-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #99554e;
  margin-bottom: 20px;
  margin-top: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-size: 14px;
  font-weight: 400;
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.footer-link:hover {
  color: #b19e31;
}

/* HDS Security Block */
.hds-block {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1.5px solid #b19e31;
  border-radius: 12px;
  padding: 16px;
  margin: 24px 0;
}

.hds-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.hds-icon {
  width: 32px;
  height: 32px;
  filter: invert(1) brightness(1.2);
}

.hds-label {
  font-size: 14px;
  font-weight: 700;
  color: #b19e31;
}

.hds-pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #b19e31;
  border-radius: 50%;
  display: inline-block;
  animation: pulse-gold 2s infinite;
  margin: 0 4px;
}

.hds-text {
  font-size: 13px;
  font-weight: 400;
  color: #9ca3af;
  margin: 0;
}

/* Badge */
.badge-recruit {
  display: inline-block;
  background-color: #b19e31;
  color: #111827;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
}

/* Footer Buttons */
.footer-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-footer-primary {
  background-color: #b19e31;
  color: #111827;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-footer-primary:hover {
  background-color: #a88d29;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(177, 158, 49, 0.3);
}

/* Social Icons */
.social-title {
  font-size: 12px;
  font-weight: 600;
  color: #d1d5db;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 12px 0;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon-link:hover {
  background-color: #b19e31;
}

.social-icon {
  width: 18px;
  height: 18px;
  color: #f9fafb;
}

.social-icon-link:hover .social-icon {
  color: #111827;
}

/* --- Legal Bar --- */
.legal-bar {
  background-color: transparent;
  border-top: none;
  padding: 0 48px;
  max-width: 1280px;
  margin: 0 auto;
}

.legal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 768px) {
  .legal-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.legal-contact {
  text-align: left;
}

.legal-label {
  display: none;
}

.contact-email {
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
}

.contact-items {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.contact-link {
  font-size: 14px;
  font-weight: 600;
  color: #f3f4f6;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #b19e31;
}

.contact-separator {
  color: #6b7280;
}

.legal-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .legal-links {
    justify-content: flex-start;
  }
}

.legal-link {
  font-size: 13px;
  font-weight: 400;
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0 8px;
}

.legal-link:hover {
  color: #b19e31;
}

.legal-divider {
  color: #6b7280;
  padding: 0 4px;
}

/* --- Pulse Animation --- */
@keyframes pulse-gold {
  0% {
    box-shadow: 0 0 0 0 rgba(177, 158, 49, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(177, 158, 49, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(177, 158, 49, 0);
  }
}

/* --- Responsive Adjustments --- */
@media (max-width: 1024px) {
  /* Tablet: Adjust spacing */
  .footer-column {
    gap: 16px;
  }

  .social-icons {
    gap: 10px;
  }

  .footer-column-title {
    margin-bottom: 16px;
  }
}

@media (max-width: 768px) {
  /* Mobile: Force Vertical Centering & Horizontal Alignment */
  .vitalia-footer-main {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;

    /* Vertical rhythm - optimized for mobile */
    padding-top: 30px !important;
    padding-bottom: 100px !important; /* Liberation space for floating widget */
    gap: 24px !important; /* Reduced from 40px for mobile */
  }

  .footer-body {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  /* Mobile footer grid becomes single column */
  .footer-body .grid {
    grid-template-columns: 1fr !important;
  }

  .footer-logo {
    max-width: 150px;
    margin-bottom: 12px;
  }

  .footer-logo-link {
    display: inline-block;
  }

  .footer-links {
    gap: 8px;
  }

  .footer-link {
    font-size: 13px;
    line-height: 20px;
  }

  .footer-column {
    gap: 12px;
  }

  .footer-column-title {
    margin-top: 12px;
    margin-bottom: 10px;
    font-size: 11px;
    letter-spacing: 0.5px;
  }

  /* Social icons smaller on mobile */
  .social-title {
    font-size: 11px;
    margin: 8px 0 10px 0;
    line-height: 16px;
  }

  .social-icons {
    gap: 8px;
  }

  .social-icon-link {
    width: 28px;
    height: 28px;
  }

  .social-icon {
    width: 16px;
    height: 16px;
  }

  /* Distribution légère des liens de navigation */
  .vitalia-nav-links-stack {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important; /* Reduced from 15px for mobile */
    text-align: center !important;
  }

  /* Alignement des liens légaux en bas */
  .vitalia-legal-bar {
    width: 100% !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 10px 15px !important; /* Reduced from 15px 25px for mobile */
    padding-top: 15px !important; /* Reduced from 25px */
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  /* Legal bar responsive */
  .legal-contact {
    text-align: center !important;
  }

  .legal-label {
    font-size: 11px;
    margin-bottom: 6px;
  }

  .contact-items {
    gap: 6px;
    flex-wrap: wrap;
    font-size: 13px;
  }

  .contact-link {
    font-size: 13px;
    font-weight: 600;
  }

  .legal-links {
    justify-content: center !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 8px 12px !important; /* Reduced from 15px 25px */
    width: 100% !important;
  }

  .legal-link {
    font-size: 12px;
    padding: 0;
    line-height: 18px;
  }

  .legal-divider {
    display: inline !important;
    margin: 0 8px;
  }

  /* Ensure footer columns are centered on mobile */
  .footer-column {
    align-items: center !important;
  }

  .footer-logo-link {
    display: block !important;
    text-align: center !important;
  }
}

@media (max-width: 480px) {
  /* Extra small screens - aggressive sizing */
  .footer-logo {
    max-width: 120px;
    margin-bottom: 10px;
  }

  .footer-link {
    font-size: 12px;
  }

  .footer-column-title {
    font-size: 10px;
    margin-top: 10px;
    margin-bottom: 8px;
  }

  .social-title {
    font-size: 10px;
    margin: 6px 0 8px 0;
  }

  .social-icon-link {
    width: 26px;
    height: 26px;
  }

  .social-icon {
    width: 14px;
    height: 14px;
  }

  .contact-link {
    font-size: 12px;
  }

  .legal-label {
    font-size: 10px;
    margin-bottom: 4px;
  }

  .legal-link {
    font-size: 11px;
  }
}
</style>
