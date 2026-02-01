import { onMounted, onUnmounted } from 'vue'

export function useTitleAnimations() {
  let titleObserver: IntersectionObserver | null = null
  let liquidHighlightObserver: IntersectionObserver | null = null

  const setupTitleAnimations = () => {
    // Observer for fade-in slide-up animations on all H1 and H2
    titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animation trigger class
            entry.target.classList.add('title-animate')
            // Only observe once
            titleObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observer for liquid highlight sequential animations
    liquidHighlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('highlight-animate')
            liquidHighlightObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    // Observe all H1 and H2 elements
    document.querySelectorAll('h1, h2').forEach((heading) => {
      // Check if H1 is in viewport (page load animation)
      const rect = heading.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0 && heading.tagName === 'H1') {
        // H1 elements on page load animate immediately
        heading.classList.add('title-animate')
      } else if (!heading.classList.contains('title-animate')) {
        // Other elements use intersection observer
        titleObserver?.observe(heading)
      }
    })

    // Observe all liquid-highlight elements
    document.querySelectorAll('.liquid-highlight').forEach((el) => {
      // Check if visible in viewport for page load
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0 && el.closest('h1')) {
        // Liquid highlights in H1 animate immediately
        el.classList.add('highlight-animate')
      } else if (!el.classList.contains('highlight-animate')) {
        liquidHighlightObserver?.observe(el)
      }
    })
  }

  const setupUnderlineAnimations = () => {
    // Add hover listeners for underline expansion on carousel titles
    document.querySelectorAll('.carousel-title-underline').forEach((underline) => {
      const card = (underline as HTMLElement).closest('.carousel-card')
      if (card) {
        card.addEventListener('mouseenter', () => {
          underline.classList.add('underline-expand')
        })
        card.addEventListener('mouseleave', () => {
          underline.classList.remove('underline-expand')
        })
      }
    })

    // Add hover listeners for domain card title underlines
    document.querySelectorAll('.title-underline').forEach((underline) => {
      const card = (underline as HTMLElement).closest('.domain-card')
      if (card) {
        card.addEventListener('mouseenter', () => {
          underline.classList.add('underline-expand')
        })
        card.addEventListener('mouseleave', () => {
          underline.classList.remove('underline-expand')
        })
      }
    })
  }

  onMounted(() => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      setupTitleAnimations()
      setupUnderlineAnimations()
    }, 50)
  })

  onUnmounted(() => {
    if (titleObserver) {
      titleObserver.disconnect()
    }
    if (liquidHighlightObserver) {
      liquidHighlightObserver.disconnect()
    }
  })
}
