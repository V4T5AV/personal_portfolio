class ScrollManager {
  constructor() {
    this.listeners = new Map()
    this.scrollPosition = 0
    this.lastScrollPosition = 0
    this.scrollDirection = 'down'
    this.isScrolling = false
    this.scrollTimeout = null
    
    this.init()
  }

  init() {
    this.handleScroll = this.handleScroll.bind(this)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop
    const scrollDelta = currentScroll - this.lastScrollPosition
    
    this.scrollDirection = scrollDelta > 0 ? 'down' : 'up'
    this.scrollPosition = currentScroll
    this.lastScrollPosition = currentScroll
    
    // Set scrolling state
    this.isScrolling = true
    clearTimeout(this.scrollTimeout)
    
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false
    }, 150)

    // Notify all listeners
    this.notifyListeners({
      scrollPosition: this.scrollPosition,
      scrollDirection: this.scrollDirection,
      isScrolling: this.isScrolling,
      scrollDelta
    })
  }

  addListener(id, callback) {
    this.listeners.set(id, callback)
  }

  removeListener(id) {
    this.listeners.delete(id)
  }

  notifyListeners(data) {
    this.listeners.forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error('Scroll listener error:', error)
      }
    })
  }

  getScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return docHeight > 0 ? scrollTop / docHeight : 0
  }

  scrollTo(element, options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    }
    
    element.scrollIntoView({ ...defaultOptions, ...options })
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  getElementScrollProgress(element) {
    const rect = element.getBoundingClientRect()
    const elementHeight = element.offsetHeight
    const viewportHeight = window.innerHeight
    
    if (rect.top > viewportHeight) return 0
    if (rect.bottom < 0) return 1
    
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
    return visibleHeight / elementHeight
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll)
    this.listeners.clear()
    clearTimeout(this.scrollTimeout)
  }
}

export const scrollManager = new ScrollManager()
export default scrollManager 