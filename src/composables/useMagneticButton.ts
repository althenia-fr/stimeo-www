import { onMounted, onUnmounted } from 'vue'

export function useMagneticButton() {
  let magneticElements: HTMLElement[] = []
  const magneticRange = 50 // Distance in pixels
  const magneticStrength = 0.3 // Strength multiplier (0-1)

  const handleMouseMove = (e: MouseEvent) => {
    magneticElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const elementCenterX = rect.left + rect.width / 2
      const elementCenterY = rect.top + rect.height / 2

      const distanceX = e.clientX - elementCenterX
      const distanceY = e.clientY - elementCenterY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < magneticRange) {
        const strength = (1 - distance / magneticRange) * magneticStrength
        const translateX = (distanceX / distance) * strength * magneticRange
        const translateY = (distanceY / distance) * strength * magneticRange

        element.style.transform = `translate(${translateX}px, ${translateY}px)`
      } else {
        element.style.transform = 'translate(0, 0)'
      }
    })
  }

  const handleMouseLeave = () => {
    magneticElements.forEach((element) => {
      element.style.transform = 'translate(0, 0)'
    })
  }

  onMounted(() => {
    setTimeout(() => {
      magneticElements = Array.from(
        document.querySelectorAll('[data-magnetic]')
      ) as HTMLElement[]
    }, 100)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
  })
}
