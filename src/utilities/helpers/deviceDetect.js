export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768
}

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

export const isDesktop = () => {
  return window.innerWidth > 1024
}

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const getDeviceType = () => {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}

export const getScreenSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export const isLandscape = () => {
  return window.innerWidth > window.innerHeight
}

export const isPortrait = () => {
  return window.innerHeight > window.innerWidth
}

// Performance monitoring utilities
export const getPerformanceMetrics = () => {
  if (typeof performance === 'undefined') return null
  
  const navigation = performance.getEntriesByType('navigation')[0]
  const paint = performance.getEntriesByType('paint')
  
  return {
    loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    memory: performance.memory ? {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    } : null
  }
}

export const checkPerformance = () => {
  const metrics = getPerformanceMetrics()
  if (!metrics) return 'unknown'
  
  const loadTime = metrics.loadTime
  if (loadTime < 1000) return 'excellent'
  if (loadTime < 2000) return 'good'
  if (loadTime < 3000) return 'fair'
  return 'poor'
}

export const shouldReduceAnimations = () => {
  return isMobile() || checkPerformance() === 'poor'
}

export const getOptimalParticleCount = () => {
  const deviceType = getDeviceType()
  const performance = checkPerformance()
  
  if (deviceType === 'mobile' || performance === 'poor') return 25
  if (deviceType === 'tablet' || performance === 'fair') return 50
  return 100
} 