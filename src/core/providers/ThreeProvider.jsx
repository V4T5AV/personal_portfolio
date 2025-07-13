import React, { createContext, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

// Context
const ThreeContext = createContext({
  gl: null,
  camera: null,
})

/**
 * Provides WebGL context and camera for react-three-fiber scenes
 * @param props - Component props for canvas configuration
 * @returns Canvas with Three.js context
 */
export const ThreeProvider = ({
  children,
  pixelRatio = [1, 2],
  fov = 75,
  cameraPosition = [0, 0, 5],
}) => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={pixelRatio}
      camera={{ fov, position: cameraPosition }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ThreeContext.Provider value={{ gl: null, camera: null }}>
        <Preload all />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
        {children}
      </ThreeContext.Provider>
    </Canvas>
  )
}

/**
 * Hook to access Three.js context
 * @returns WebGL renderer and camera
 * @throws Error if used outside ThreeProvider
 */
export const useThreeContext = () => {
  const context = useContext(ThreeContext)
  if (!context) {
    throw new Error('useThreeContext must be used within ThreeProvider')
  }
  return context
}