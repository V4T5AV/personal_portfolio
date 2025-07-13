import { useState, useEffect, useRef } from 'react'
import scrollManager from './ScrollManager.js'

export const useParallax = (speed = 0.5, offset = 0) => {
  const [parallaxValue, setParallaxValue] = useState(0)
  const elementRef = useRef(null)
  const listenerId = useRef(null)

  useEffect(() => {
    const handleScroll = ({ scrollPosition }) => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const elementTop = rect.top + scrollPosition
      const elementHeight = rect.height
      const viewportHeight = window.innerHeight

      // Calculate parallax value
      const progress = (scrollPosition - elementTop + viewportHeight) / (viewportHeight + elementHeight)
      const clampedProgress = Math.max(0, Math.min(1, progress))
      
      const parallaxOffset = (clampedProgress - 0.5) * speed * 100 + offset
      setParallaxValue(parallaxOffset)
    }

    // Add scroll listener
    listenerId.current = `parallax-${Date.now()}-${Math.random()}`
    scrollManager.addListener(listenerId.current, handleScroll)

    return () => {
      if (listenerId.current) {
        scrollManager.removeListener(listenerId.current)
      }
    }
  }, [speed, offset])

  return { parallaxValue, elementRef }
}

export const useScrollProgress = (elementRef) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const elementHeight = rect.height
      const viewportHeight = window.innerHeight
      
      if (rect.top > viewportHeight) {
        setProgress(0)
        return
      }
      
      if (rect.bottom < 0) {
        setProgress(1)
        return
      }
      
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      const elementProgress = visibleHeight / elementHeight
      setProgress(1 - elementProgress)
    }

    const listenerId = `scroll-progress-${Date.now()}-${Math.random()}`
    scrollManager.addListener(listenerId, handleScroll)

    return () => {
      scrollManager.removeListener(listenerId)
    }
  }, [elementRef])

  return progress
}

export const useScrollTrigger = (threshold = 0.5) => {
  const [isTriggered, setIsTriggered] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const elementHeight = rect.height
      const viewportHeight = window.innerHeight
      
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      const progress = visibleHeight / elementHeight
      
      setIsTriggered(progress >= threshold)
    }

    const listenerId = `scroll-trigger-${Date.now()}-${Math.random()}`
    scrollManager.addListener(listenerId, handleScroll)

    return () => {
      scrollManager.removeListener(listenerId)
    }
  }, [threshold])

  return { isTriggered, elementRef }
} 