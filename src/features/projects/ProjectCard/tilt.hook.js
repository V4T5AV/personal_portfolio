import { useState, useCallback } from 'react'

export const useTilt = (maxTilt = 10) => {
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const tiltXValue = (mouseY / (rect.height / 2)) * -maxTilt
    const tiltYValue = (mouseX / (rect.width / 2)) * maxTilt
    
    setTiltX(tiltXValue)
    setTiltY(tiltYValue)
  }, [maxTilt])

  const handleMouseLeave = useCallback(() => {
    setTiltX(0)
    setTiltY(0)
  }, [])

  return {
    tiltX,
    tiltY,
    handleMouseMove,
    handleMouseLeave
  }
} 