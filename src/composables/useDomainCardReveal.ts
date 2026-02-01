import { onMounted, onUnmounted } from 'vue'

export function useDomainCardReveal() {
  let cardObserver: IntersectionObserver | null = null
  let engagementObserver: IntersectionObserver | null = null

  const setupCardRevealAnimations = () => {
    // Observer for domain card scroll-reveal with lift effect
    cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the reveal animation class
            entry.target.classList.add('card-reveal')
            // Only observe once
            cardObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    // Observe all domain cards
    document.querySelectorAll('.domain-card').forEach((card) => {
      // Check if card is already visible on page load
      const rect = card.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Card is in viewport, animate immediately
        card.classList.add('card-reveal')
      } else {
        // Use intersection observer for cards below the fold
        cardObserver?.observe(card)
      }
    })
  }

  const setupEngagementRevealAnimations = () => {
    // Observer for engagement item scroll-reveal
    engagementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the reveal animation class
            entry.target.classList.add('is-visible')
            // Only observe once
            engagementObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    // Observe all engagement items
    document.querySelectorAll('.engagement-item').forEach((item) => {
      // Check if item is already visible on page load
      const rect = item.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Item is in viewport, animate immediately
        item.classList.add('is-visible')
      } else {
        // Use intersection observer for items below the fold
        engagementObserver?.observe(item)
      }
    })
  }

  onMounted(() => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      setupCardRevealAnimations()
      setupEngagementRevealAnimations()
    }, 50)
  })

  onUnmounted(() => {
    if (cardObserver) {
      cardObserver.disconnect()
    }
    if (engagementObserver) {
      engagementObserver.disconnect()
    }
  })
}
