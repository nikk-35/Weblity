import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Text, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Particle field that follows mouse
function ParticleField({ count = 5000, mouse }: { count?: number; mouse: React.MutableRefObject<[number, number]> }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 4
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
    
    // React to mouse
    ref.current.rotation.y += mouse.current[0] * 0.0005
    ref.current.rotation.x += mouse.current[1] * 0.0005
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2997ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Inner glowing particles
function InnerGlow({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const ref = useRef<THREE.Points>(null)
  const count = 2000
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.5 + Math.random() * 2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = -state.clock.elapsedTime * 0.1
    ref.current.rotation.z = state.clock.elapsedTime * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#af52de"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Morphing sphere in center
function MorphingSphere({ phase }: { phase: number }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.2
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  const scale = phase >= 1 ? Math.min((phase - 1) * 2, 1) : 0

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} scale={scale * 0.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#1a1a2e"
          emissive="#2997ff"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

// Orbiting rings
function OrbitRings({ phase }: { phase: number }) {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.5
      ring1.current.rotation.y = t * 0.2
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.3 + 1
      ring2.current.rotation.z = t * 0.4
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.6
      ring3.current.rotation.z = t * 0.2 + 2
    }
  })

  const opacity = phase >= 1 ? Math.min((phase - 1) * 1.5, 0.6) : 0

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#2997ff" transparent opacity={opacity} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.8, 0.008, 16, 100]} />
        <meshBasicMaterial color="#af52de" transparent opacity={opacity * 0.7} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.1, 0.006, 16, 100]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={opacity * 0.5} />
      </mesh>
    </group>
  )
}

// Flying particles that burst outward
function BurstParticles({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = 500
  const velocities = useRef<Float32Array>()
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    velocities.current = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = 0
      
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 0.05 + Math.random() * 0.1
      velocities.current[i * 3] = Math.sin(phi) * Math.cos(theta) * speed
      velocities.current[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed
      velocities.current[i * 3 + 2] = Math.cos(phi) * speed
    }
    return pos
  }, [])

  useFrame(() => {
    if (!ref.current || !active || !velocities.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities.current[i * 3]
      pos[i * 3 + 1] += velocities.current[i * 3 + 1]
      pos[i * 3 + 2] += velocities.current[i * 3 + 2]
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  if (!active) return null

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Logo text
function LogoText({ visible }: { visible: boolean }) {
  const opacity = visible ? 1 : 0
  
  return (
    <group position={[0, 0, 0]}>
      <Text
        font="/fonts/inter-bold.woff"
        fontSize={0.8}
        letterSpacing={-0.05}
        position={[-0.85, 0, 2]}
        anchorX="left"
      >
        web
        <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
      </Text>
      <Text
        font="/fonts/inter-bold.woff"
        fontSize={0.8}
        letterSpacing={-0.05}
        position={[0.5, 0, 2]}
        anchorX="left"
      >
        lity
        <meshBasicMaterial color="#2997ff" transparent opacity={opacity} />
      </Text>
    </group>
  )
}

// Camera controller
function CameraController({ phase }: { phase: number }) {
  const { camera } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Gentle breathing motion
    camera.position.x = Math.sin(t * 0.3) * 0.2
    camera.position.y = Math.cos(t * 0.2) * 0.1
    
    // Zoom in during phase 2
    if (phase >= 2) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4, 0.02)
    } else {
      camera.position.z = 6
    }
    
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Main scene
function Scene({ phase, mouse }: { phase: number; mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 15]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2997ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#af52de" />
      
      <CameraController phase={phase} />
      <ParticleField mouse={mouse} />
      <InnerGlow mouse={mouse} />
      <MorphingSphere phase={phase} />
      <OrbitRings phase={phase} />
      <BurstParticles active={phase >= 3} />
    </>
  )
}

// Main component
export default function Intro3D({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [textVisible, setTextVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const mouse = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX - window.innerWidth / 2),
        (e.clientY - window.innerHeight / 2)
      ]
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),      // Sphere appears
      setTimeout(() => setPhase(2), 1500),     // Zoom in
      setTimeout(() => setTextVisible(true), 2000), // Text appears
      setTimeout(() => setPhase(3), 2500),     // Burst
      setTimeout(() => setFadeOut(true), 3500), // Start fade
      setTimeout(() => onComplete(), 4200),    // Complete
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.7s ease-out',
      pointerEvents: fadeOut ? 'none' : 'auto',
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Scene phase={phase} mouse={mouse} />
      </Canvas>
      
      {/* HTML overlay for text (more reliable than 3D text) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 'clamp(3rem, 12vw, 8rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <span style={{ color: '#fff' }}>web</span>
          <span style={{ 
            background: 'linear-gradient(135deg, #2997ff, #af52de)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>lity</span>
        </h1>
      </div>
      
      {/* Tagline */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
      }}>
        <p style={{
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 400,
          letterSpacing: '0.1em',
        }}>
          WEBSITES DIE BEGEISTERN
        </p>
      </div>
      
      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
