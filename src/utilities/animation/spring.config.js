export const springConfig = {
  // Gentle spring for subtle animations
  gentle: {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.5
  },
  
  // Bouncy spring for playful animations
  bouncy: {
    type: "spring",
    stiffness: 300,
    damping: 15,
    mass: 0.8
  },
  
  // Smooth spring for smooth transitions
  smooth: {
    type: "spring",
    stiffness: 150,
    damping: 25,
    mass: 1
  },
  
  // Quick spring for fast animations
  quick: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.3
  }
}

export const transitionConfig = {
  // Default transition
  default: {
    duration: 0.3,
    ease: "easeInOut"
  },
  
  // Slow transition
  slow: {
    duration: 0.6,
    ease: "easeInOut"
  },
  
  // Fast transition
  fast: {
    duration: 0.15,
    ease: "easeInOut"
  }
} 