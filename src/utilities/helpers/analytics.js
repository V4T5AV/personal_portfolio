export const trackEvent = (eventName, properties = {}) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties)
  }
  
  // Custom analytics
  console.log('Analytics Event:', eventName, properties)
}

export const trackPageView = (pageName) => {
  trackEvent('page_view', { page_name: pageName })
}

export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', { 
    button_name: buttonName,
    location: location
  })
}

export const trackProjectView = (projectName) => {
  trackEvent('project_view', { project_name: projectName })
}

export const trackContactForm = (formType) => {
  trackEvent('contact_form', { form_type: formType })
}

export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', { depth: depth })
}

export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', { seconds: seconds })
}

export const initializeAnalytics = () => {
  // Track initial page view
  trackPageView(window.location.pathname)
  
  // Track scroll depth with throttling
  let maxScroll = 0
  let scrollTimeout = null
  
  const handleScroll = () => {
    if (scrollTimeout) return // Throttle scroll events
    
    scrollTimeout = setTimeout(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        if (maxScroll % 25 === 0) { // Track every 25%
          trackScrollDepth(maxScroll)
        }
      }
      scrollTimeout = null
    }, 100) // Throttle to 100ms
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Track time on page
  let startTime = Date.now()
  const handleBeforeUnload = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000)
    trackTimeOnPage(timeOnPage)
  }
  
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('beforeunload', handleBeforeUnload)
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  }
} 