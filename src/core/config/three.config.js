export const threeConfig = {
  // Renderer settings
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  },
  
  // Camera settings
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5]
  },
  
  // Lighting settings
  lighting: {
    ambient: {
      intensity: 0.2,
      color: '#ffffff'
    },
    directional: {
      intensity: 0.5,
      color: '#ffffff',
      position: [10, 10, 5]
    },
    point: {
      intensity: 0.3,
      color: '#667eea',
      position: [-10, -10, -10]
    }
  },
  
  // Performance settings
  performance: {
    maxFPS: 60,
    enableShadows: false,
    enableFog: false,
    enablePostProcessing: false
  },
  
  // Material settings
  materials: {
    default: {
      transparent: true,
      opacity: 0.8,
      wireframe: false
    },
    wireframe: {
      transparent: true,
      opacity: 0.3,
      wireframe: true
    }
  }
}

export const modelConfig = {
  // Model loading settings
  loader: {
    draco: true,
    ktx2: true,
    meshopt: true
  },
  
  // Animation settings
  animation: {
    loop: true,
    crossFadeDuration: 0.5
  }
} 