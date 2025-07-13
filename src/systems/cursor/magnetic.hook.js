import { useRef, useEffect } from 'react'

export const useMagnetic = () => {
  const magneticRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!magneticRef.current) return

      const rect = magneticRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
      const maxDistance = 100
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const translateX = mouseX * force * 0.3
        const translateY = mouseY * force * 0.3
        
        magneticRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`
      } else {
        magneticRef.current.style.transform = 'translate(0px, 0px)'
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return { magneticRef }
} 