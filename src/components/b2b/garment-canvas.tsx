'use client'

import { Suspense, useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { Colorway, GarmentKind } from '@/lib/products'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths'

type OrbitControlsImpl = ComponentRef<typeof OrbitControls>

const DEPTH = 0.22
const BEVEL = 0.14
const FRONT_Z = DEPTH / 2 + BEVEL

const extrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: DEPTH,
  bevelEnabled: true,
  bevelThickness: BEVEL,
  bevelSize: 0.07,
  bevelSegments: 10,
  curveSegments: 32,
}

function teeShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.22, 1.0)
  s.quadraticCurveTo(0, 0.8, 0.22, 1.0)
  s.lineTo(0.62, 0.92)
  s.lineTo(1.08, 0.52)
  s.lineTo(0.86, 0.24)
  s.lineTo(0.62, 0.44)
  s.lineTo(0.64, -1.0)
  s.quadraticCurveTo(0, -1.04, -0.64, -1.0)
  s.lineTo(-0.62, 0.44)
  s.lineTo(-0.86, 0.24)
  s.lineTo(-1.08, 0.52)
  s.lineTo(-0.62, 0.92)
  s.closePath()
  return s
}

function hoodieShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.2, 1.0)
  s.quadraticCurveTo(0, 0.84, 0.2, 1.0)
  s.lineTo(0.66, 0.9)
  s.lineTo(1.2, -0.5)
  s.lineTo(1.16, -0.74)
  s.lineTo(0.93, -0.68)
  s.lineTo(0.68, 0.3)
  s.lineTo(0.7, -0.86)
  s.lineTo(0.64, -1.04)
  s.quadraticCurveTo(0, -1.08, -0.64, -1.04)
  s.lineTo(-0.7, -0.86)
  s.lineTo(-0.68, 0.3)
  s.lineTo(-0.93, -0.68)
  s.lineTo(-1.16, -0.74)
  s.lineTo(-1.2, -0.5)
  s.lineTo(-0.66, 0.9)
  s.closePath()
  return s
}

function hoodShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.46, 0.86)
  s.bezierCurveTo(-0.54, 1.34, -0.24, 1.56, 0, 1.56)
  s.bezierCurveTo(0.24, 1.56, 0.54, 1.34, 0.46, 0.86)
  s.closePath()
  return s
}

function pocketShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.36, -0.22)
  s.lineTo(0.36, -0.22)
  s.lineTo(0.5, -0.5)
  s.lineTo(0.48, -0.8)
  s.lineTo(-0.48, -0.8)
  s.lineTo(-0.5, -0.5)
  s.closePath()
  return s
}

const [LOGO_X, LOGO_Y, LOGO_W, LOGO_H] = LOGO_VIEWBOX.split(' ').map(Number)
let logoPaths: Path2D[] | null = null

function drawLogo(ctx: CanvasRenderingContext2D, cx: number, cy: number, height: number, color: string) {
  logoPaths ??= LOGO_PATHS.map((d) => new Path2D(d))
  const scale = height / LOGO_H
  ctx.save()
  ctx.fillStyle = color
  ctx.translate(cx - (LOGO_W * scale) / 2, cy - height / 2)
  ctx.scale(scale, scale)
  ctx.translate(-LOGO_X, -LOGO_Y)
  logoPaths.forEach((p) => ctx.fill(p))
  ctx.restore()
}

function usePrintTextures(color: string) {
  return useMemo(() => {
    const font = typeof document !== 'undefined' ? getComputedStyle(document.body).fontFamily : 'sans-serif'

    const chest = document.createElement('canvas')
    chest.width = 1024
    chest.height = 256
    const c1 = chest.getContext('2d')!
    drawLogo(c1, 512, 128, 220, color)

    const back = document.createElement('canvas')
    back.width = 1024
    back.height = 512
    const c2 = back.getContext('2d')!
    drawLogo(c2, 512, 190, 300, color)
    c2.fillStyle = color
    c2.font = `700 46px ${font}`
    c2.textAlign = 'center'
    c2.textBaseline = 'middle'
    c2.fillText('240 GSM TWILL / EST. 2026', 512, 430)

    const chestTex = new THREE.CanvasTexture(chest)
    const backTex = new THREE.CanvasTexture(back)
    chestTex.colorSpace = THREE.SRGBColorSpace
    backTex.colorSpace = THREE.SRGBColorSpace
    chestTex.anisotropy = 8
    backTex.anisotropy = 8
    return { chestTex, backTex }
  }, [color])
}

function Garment({
  kind,
  colorway,
  rotationTarget,
  autoRotate,
  resetKey,
}: {
  kind: GarmentKind
  colorway: Colorway
  rotationTarget: number
  autoRotate: boolean
  resetKey: number
}) {
  const group = useRef<THREE.Group>(null)
  const autoOffset = useRef(0)
  const appear = useRef(0)
  const targetColor = useMemo(() => new THREE.Color(colorway.garment), [colorway.garment])

  const twill = useTexture('/images/twill-370.png', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 3)
  })

  const fabric = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorway.garment),
        roughness: 0.92,
        metalness: 0,
        bumpMap: twill,
        bumpScale: 1.4,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [twill],
  )
  const lining = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 1, color: '#000' }), [])
  const aglet = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.8, color: '#bdbdbd' }), [])

  const { chestTex, backTex } = usePrintTextures(colorway.print)

  const geometry = useMemo(() => {
    const body = new THREE.ExtrudeGeometry(kind === 'tee' ? teeShape() : hoodieShape(), extrudeSettings)
    body.translate(0, 0, -DEPTH / 2)

    const hood = new THREE.ExtrudeGeometry(hoodShape(), { ...extrudeSettings, depth: 0.34, bevelThickness: 0.12 })
    hood.translate(0, 0, -FRONT_Z - 0.06)

    const pocket = new THREE.ExtrudeGeometry(pocketShape(), {
      depth: 0.01,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 4,
    })
    pocket.translate(0, 0, FRONT_Z - 0.02)

    const neckY = kind === 'tee' ? 0.8 : 0.84
    const collarFront = new THREE.TubeGeometry(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.24, 1.0, FRONT_Z - 0.03),
        new THREE.Vector3(0, neckY - 0.02, FRONT_Z - 0.03),
        new THREE.Vector3(0.24, 1.0, FRONT_Z - 0.03),
      ),
      48,
      0.04,
      12,
    )
    const collarBack = new THREE.TubeGeometry(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.24, 1.0, -FRONT_Z + 0.03),
        new THREE.Vector3(0, 0.95, -FRONT_Z + 0.03),
        new THREE.Vector3(0.24, 1.0, -FRONT_Z + 0.03),
      ),
      48,
      0.04,
      12,
    )
    const hoodOpening = new THREE.ShapeGeometry(
      (() => {
        const s = new THREE.Shape()
        s.absellipse(0, 1.14, 0.25, 0.3, 0, Math.PI * 2, false, 0)
        return s
      })(),
      48,
    )
    return { body, hood, pocket, collarFront, collarBack, hoodOpening }
  }, [kind])

  useEffect(() => {
    appear.current = 0
  }, [kind])

  useEffect(() => {
    autoOffset.current = 0
  }, [resetKey])

  useEffect(
    () => () => {
      Object.values(geometry).forEach((g) => g.dispose())
    },
    [geometry],
  )

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    if (autoRotate) autoOffset.current += delta * 0.6
    const target = rotationTarget + autoOffset.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target, 5, delta)

    appear.current = Math.min(1, appear.current + delta * 2.2)
    const eased = 1 - Math.pow(1 - appear.current, 3)
    const s = 0.82 + 0.18 * eased
    g.scale.setScalar(s)
    g.position.y = -0.3 + (1 - eased) * -0.25

    fabric.color.lerp(targetColor, 1 - Math.exp(-delta * 8))
    lining.color.copy(fabric.color).multiplyScalar(0.45)
  })

  const isHoodie = kind === 'hoodie'

  return (
    <group ref={group}>
      <mesh geometry={geometry.body} material={fabric} castShadow />
      <mesh geometry={geometry.collarFront} material={fabric} />
      <mesh geometry={geometry.collarBack} material={fabric} />

      {isHoodie && (
        <>
          <mesh geometry={geometry.hood} material={fabric} castShadow />
          <mesh geometry={geometry.hoodOpening} material={lining} position={[0, 0, -FRONT_Z + 0.405]} />
          <mesh geometry={geometry.pocket} material={fabric} />
          {[-0.1, 0.1].map((x) => (
            <group key={x} position={[x, 0.68, FRONT_Z + 0.03]} rotation={[0, 0, x * 0.4]}>
              <mesh material={fabric}>
                <cylinderGeometry args={[0.018, 0.018, 0.42, 12]} />
              </mesh>
              <mesh material={aglet} position={[0, -0.24, 0]}>
                <cylinderGeometry args={[0.022, 0.022, 0.07, 12]} />
              </mesh>
            </group>
          ))}
        </>
      )}

      <mesh position={[0, isHoodie ? 0.14 : 0.5, FRONT_Z + 0.003]}>
        <planeGeometry args={[0.56, 0.14]} />
        <meshStandardMaterial map={chestTex} transparent roughness={0.8} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
      <mesh position={[0, 0.3, -FRONT_Z - 0.003]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.0, 0.5]} />
        <meshStandardMaterial map={backTex} transparent roughness={0.8} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
    </group>
  )
}

export default function GarmentCanvas(props: {
  kind: GarmentKind
  colorway: Colorway
  rotationTarget: number
  autoRotate: boolean
  resetKey: number
}) {
  const controls = useRef<OrbitControlsImpl>(null)

  useEffect(() => {
    controls.current?.reset()
  }, [props.resetKey])

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 4.6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      aria-label={`Vue 3D du ${props.kind === 'tee' ? 'tee' : 'hoodie'}, couleur ${props.colorway.name}`}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} />
      <Suspense fallback={null}>
        <Garment {...props} />
        <Environment preset="studio" />
      </Suspense>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.35} scale={6} blur={2.6} far={2.5} />
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.75}
        rotateSpeed={0.7}
      />
    </Canvas>
  )
}
