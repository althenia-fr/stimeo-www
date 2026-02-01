<template>
  <!-- Partner Logos Marquee Section -->
  <div class="partner-marquee-section">
    <h3 class="marquee-title">Nos partenaires de confiance</h3>
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- First Set -->
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fe92e7998885c4841870f93a94a0884da?format=webp&width=150" alt="UPSADI" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F614284c313ca435cadd981c709e627a4?format=webp&width=150" alt="DIVA" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fbf3530740234469fa2675cb2e3dffd69?format=webp&width=150" alt="La French Care" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F2823c67519f04d1da9f8ae1c104504a3?format=webp&width=150" alt="ATLANPOLE" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F7a0f805e39984401bed29b06d40d14ae?format=webp&width=150" alt="Groupement e-santé" class="partner-logo" />
        
        <!-- Duplicated for seamless loop -->
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fe92e7998885c4841870f93a94a0884da?format=webp&width=150" alt="UPSADI" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F614284c313ca435cadd981c709e627a4?format=webp&width=150" alt="DIVA" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2Fbf3530740234469fa2675cb2e3dffd69?format=webp&width=150" alt="La French Care" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F2823c67519f04d1da9f8ae1c104504a3?format=webp&width=150" alt="ATLANPOLE" class="partner-logo" />
        <img src="https://cdn.builder.io/api/v1/image/assets%2Ff2976922c6674ae58e827df6ab219826%2F7a0f805e39984401bed29b06d40d14ae?format=webp&width=150" alt="Groupement e-santé" class="partner-logo" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.partner-marquee-section {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  padding: 40px 20px;
  text-align: center;
  overflow: hidden;
}

.marquee-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #555555;
  margin-bottom: 30px;
  margin-top: 0;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-block;
  animation: scroll-marquee 30s linear infinite;
}

.partner-logo {
  height: 50px;
  width: auto;
  margin: 0 40px;
  vertical-align: middle;
  display: inline-block;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.partner-logo:hover {
  opacity: 0.7;
}

@keyframes scroll-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
