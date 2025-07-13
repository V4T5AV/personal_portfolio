import * as THREE from 'three'

// Custom shader materials
export const shaderMaterials = {
  // Gradient material
  gradient: new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#667eea') },
      uColor2: { value: new THREE.Color('#764ba2') }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      
      void main() {
        float wave = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
        vec3 color = mix(uColor1, uColor2, wave);
        gl_FragColor = vec4(color, 0.8);
      }
    `,
    transparent: true
  }),

  // Holographic material
  holographic: new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#667eea') }
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec2 vUv;
      void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        float scanline = sin(vUv.y * 50.0 + uTime * 2.0) * 0.5 + 0.5;
        float flicker = sin(uTime * 10.0) * 0.1 + 0.9;
        vec3 color = uColor * scanline * flicker;
        gl_FragColor = vec4(color, 0.6);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  }),

  // Wireframe material
  wireframe: new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#667eea') }
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vPosition;
      
      void main() {
        float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
        vec3 color = uColor * pulse;
        gl_FragColor = vec4(color, 0.3);
      }
    `,
    transparent: true,
    wireframe: true
  })
}

// Standard materials with custom properties
export const standardMaterials = {
  glass: new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.1,
    metalness: 0.1,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  }),

  neon: new THREE.MeshStandardMaterial({
    color: '#667eea',
    emissive: '#667eea',
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.8
  }),

  hologram: new THREE.MeshStandardMaterial({
    color: '#667eea',
    transparent: true,
    opacity: 0.3,
    metalness: 0.8,
    roughness: 0.2
  })
}

// Update shader uniforms
export const updateShaderTime = (materials, time) => {
  Object.values(materials).forEach(material => {
    if (material.uniforms && material.uniforms.uTime) {
      material.uniforms.uTime.value = time
    }
  })
} 