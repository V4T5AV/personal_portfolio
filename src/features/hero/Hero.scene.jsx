import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus } from '@react-three/drei'

const AnimatedSphere = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.5, 16, 16]} position={position}>
      <meshStandardMaterial 
        color={color} 
        opacity={0.3}
      />
    </Sphere>
  )
}

const FloatingCube = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.z += 0.005 * speed
      meshRef.current.position.x = position[0] + Math.sin(Date.now() * 0.001 * speed * 0.5) * 1
    }
  })

  return (
    <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position}>
      <meshStandardMaterial 
        color={color} 
        opacity={0.2}
      />
    </Box>
  )
}

const RotatingTorus = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02 * speed
      meshRef.current.rotation.y += 0.01 * speed
    }
  })

  return (
    <Torus ref={meshRef} args={[1, 0.3, 8, 16]} position={position}>
      <meshStandardMaterial 
        color={color} 
        opacity={0.15}
      />
    </Torus>
  )
}

const ParticleField = () => {
  // Reduced particle count for better performance
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) { // Reduced from 100 to 50
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() * 0.02
      const x = Math.random() * 20 - 10
      const y = Math.random() * 20 - 10
      const z = Math.random() * 20 - 10
      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [])

  const points = useMemo(() => {
    return new Float32Array(particles.length * 3)
  }, [particles])

  const pointsRef = useRef()
  const geometryRef = useRef()

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        'position',
        new Float32Array(points),
        3
      )
    }
  }, [points])

  // Cleanup on unmount
  useEffect(() => {
    const geometry = geometryRef.current
    return () => {
      if (geometry) {
        geometry.dispose()
      }
    }
  }, [])

  useFrame((state) => {
    if (pointsRef.current && geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array
      particles.forEach((particle, i) => {
        const id = i * 3
        positions[id] = particle.x + Math.sin(state.clock.elapsedTime * particle.speed) * 2
        positions[id + 1] = particle.y + Math.cos(state.clock.elapsedTime * particle.speed) * 2
        positions[id + 2] = particle.z + Math.sin(state.clock.elapsedTime * particle.speed * 0.5) * 2
      })
      geometryRef.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.05}
        color="#667eea"
        opacity={0.6}
      />
    </points>
  )
}

const HeroScene = () => {
  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.2} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#667eea" />
      
      <ParticleField />
      
      <AnimatedSphere position={[-3, 2, -5]} color="#667eea" speed={0.5} />
      <AnimatedSphere position={[3, -1, -3]} color="#764ba2" speed={0.8} />
      <AnimatedSphere position={[0, 3, -7]} color="#667eea" speed={0.3} />
      
      <FloatingCube position={[-4, 0, -4]} color="#764ba2" speed={0.6} />
      <FloatingCube position={[4, 1, -6]} color="#667eea" speed={0.4} />
      <FloatingCube position={[0, -2, -2]} color="#764ba2" speed={0.7} />
      
      <RotatingTorus position={[-2, -1, -8]} color="#667eea" speed={0.5} />
      <RotatingTorus position={[2, 2, -5]} color="#764ba2" speed={0.3} />
      <RotatingTorus position={[0, 0, -10]} color="#667eea" speed={0.6} />
    </>
  )
}

export default HeroScene