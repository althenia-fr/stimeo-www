import { onMounted, onUnmounted, ref } from 'vue'

export function useCarouselSwipe(carouselSelector: string) {
  const lastIndex = ref(0)
  let carousel: HTMLElement | null = null

  /**
   * Trigger haptic feedback (10ms vibration)
   * Fallback if navigator.vibrate is unavailable
   */
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }

  /**
   * Calculate which card is centered in the carousel
   */
  const getCurrentCardIndex = (scrollContainer: HTMLElement): number => {
    const cardWidth = scrollContainer.offsetWidth * 0.85 // Account for padding/gap
    const scrollPosition = scrollContainer.scrollLeft
    return Math.round(scrollPosition / cardWidth)
  }

  /**
   * Detect end of carousel and apply bounce animation
   */
  const checkCarouselEnd = (scrollContainer: HTMLElement) => {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
    const isNearEnd = scrollContainer.scrollLeft >= maxScroll - 50 // 50px threshold

    if (isNearEnd) {
      // Apply bounce effect
      scrollContainer.classList.add('vitalia-bounce-end')

      // Remove class after animation completes (400ms)
      setTimeout(() => {
        scrollContainer.classList.remove('vitalia-bounce-end')
      }, 400)
    }
  }

  /**
   * Handle scroll event: detect card change and trigger haptic feedback
   */
  const handleScroll = () => {
    if (!carousel) return

    const currentIndex = getCurrentCardIndex(carousel)

    // Trigger haptic when centered card changes
    if (currentIndex !== lastIndex.value) {
      triggerHaptic()
      lastIndex.value = currentIndex
    }

    // Check if we're at the end and apply bounce
    checkCarouselEnd(carousel)
  }

  /**
   * Initialize carousel event listeners
   */
  const initCarousel = () => {
    carousel = document.querySelector(carouselSelector)

    if (carousel) {
      carousel.addEventListener('scroll', handleScroll, { passive: true })
      carousel.addEventListener('touchend', () => {
        // Additional haptic feedback on touch end
        triggerHaptic()
      }, { passive: true })
    }
  }

  /**
   * Cleanup event listeners
   */
  const cleanupCarousel = () => {
    if (carousel) {
      carousel.removeEventListener('scroll', handleScroll)
      carousel.removeEventListener('touchend', triggerHaptic)
    }
  }

  onMounted(() => {
    initCarousel()
  })

  onUnmounted(() => {
    cleanupCarousel()
  })

  return {
    triggerHaptic,
    getCurrentCardIndex: () => carousel ? getCurrentCardIndex(carousel) : 0
  }
}
