import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { modelConfig } from '../../core/config/three.config.js'

class ModelLoader {
  constructor() {
    this.gltfLoader = new GLTFLoader()
    this.dracoLoader = new DRACOLoader()
    
    // Configure DRACO loader
    this.dracoLoader.setDecoderPath('/draco/')
    this.gltfLoader.setDRACOLoader(this.dracoLoader)
    
    this.cache = new Map()
  }

  async loadModel(path, options = {}) {
    // Check cache first
    if (this.cache.has(path)) {
      return this.cache.get(path)
    }

    try {
      const gltf = await this.gltfLoader.loadAsync(path)
      
      // Apply default configurations
      const model = this.processModel(gltf, options)
      
      // Cache the result
      this.cache.set(path, model)
      
      return model
    } catch (error) {
      console.error('Error loading model:', error)
      throw error
    }
  }

  processModel(gltf, options) {
    const { scene } = gltf
    
    // Apply default material settings
    scene.traverse((child) => {
      if (child.isMesh) {
        // Apply material settings
        if (child.material) {
          Object.assign(child.material, modelConfig.materials.default)
        }
        
        // Enable shadows if configured
        if (modelConfig.performance.enableShadows) {
          child.castShadow = true
          child.receiveShadow = true
        }
      }
    })

    return {
      scene,
      animations: gltf.animations,
      ...options
    }
  }

  loadTexture(path) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader()
      loader.load(
        path,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      )
    })
  }

  dispose() {
    // Clear cache
    this.cache.clear()
    
    // Dispose DRACO loader
    this.dracoLoader.dispose()
  }
}

export const modelLoader = new ModelLoader()
export default modelLoader 