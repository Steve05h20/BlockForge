/**
 * Types pour les données mock
 * Basés sur les structures définies dans docs/DATA_STRUCTURES.md
 */

// ==========================================
// Primitives
// ==========================================

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface Vector2 {
  x: number
  y: number
}

export interface Quaternion {
  x: number
  y: number
  z: number
  w: number
}

export interface BoundingBox {
  min: Vector3
  max: Vector3
  center?: Vector3
  size?: Vector3
}

export type ColorHex = string // "#RRGGBB"
export type Unit = 'mm' | 'cm' | 'm' | 'in' | 'ft'

// ==========================================
// Block Types
// ==========================================

export type GeometryType =
  | 'box'
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'prism'
  | 'extruded'
  | 'custom'

export interface Dimensions3D {
  width: number
  height: number
  depth: number
  unit: Unit
}

export interface BlockGeometry {
  type: GeometryType
  dimensions: Dimensions3D
  vertices?: Vector3[]
  faces?: Face[]
  edges?: Edge[]
  bounds: BoundingBox
  origin: Vector3
}

export interface Face {
  vertices: number[]
  normal: Vector3
  uv?: Vector2[]
}

export interface Edge {
  start: number
  end: number
}

export interface Material {
  type: MaterialType
  properties: MaterialProperties
}

export type MaterialType =
  | 'plastic'
  | 'wood'
  | 'metal'
  | 'glass'
  | 'concrete'
  | 'fabric'
  | 'stone'
  | 'ceramic'
  | 'custom'

export interface MaterialProperties {
  roughness?: number
  metalness?: number
  transmission?: number
  clearcoat?: number
  sheen?: number
  normalMap?: string
  roughnessMap?: string
  metalnessMap?: string
  aoMap?: string
}

export interface Texture {
  id: string
  url: string
  name: string
  scale: Vector2
  offset: Vector2
  rotation: number
  repeat: 'repeat' | 'clamp'
}

export interface BlockAppearance {
  color: ColorHex
  texture?: Texture
  material: Material
  opacity: number
  wireframe?: boolean
  castShadow?: boolean
  receiveShadow?: boolean
}

export interface BlockPhysics {
  enabled: boolean
  mass: number
  friction: number
  restitution: number
  collisionShape: 'box' | 'sphere' | 'mesh'
}

export interface BlockMetadata {
  category: string
  subcategory?: string
  tags: string[]
  usageCount: number
  isFavorite?: boolean
  status: 'draft' | 'published' | 'archived'
  visibility: 'private' | 'team' | 'public'
  dimensionsText?: string
  volume?: number
  weight?: number
  price?: {
    value: number
    currency: string
    unit: 'per_block' | 'per_m2' | 'per_m3'
  }
}

export type SnapPointType = 'edge' | 'corner' | 'center' | 'custom'

export interface SnapPoint {
  id: string
  position: Vector3
  normal: Vector3
  type: SnapPointType
  constraints?: SnapConstraints
  color?: ColorHex
  size?: number
  enabled: boolean
  locked?: boolean
}

export interface SnapConstraints {
  allowedBlockTypes?: string[]
  allowedCategories?: string[]
  maxConnections?: number
  rotationLocked?: boolean
}

export interface CustomProperty {
  id: string
  name: string
  type: PropertyType
  value: string | number | boolean | Date | File | string[]
  validation?: PropertyValidation
  label?: string
  description?: string
  group?: string
  order?: number
}

export type PropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'color'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'file'

export interface PropertyValidation {
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  options?: string[]
}

export interface PixiRenderData {
  spriteUrl?: string
  graphics?: PixiGraphicsData
  zIndex?: number
}

export interface PixiGraphicsData {
  commands: PixiCommand[]
}

export type PixiCommand =
  | { type: 'moveTo'; x: number; y: number }
  | { type: 'lineTo'; x: number; y: number }
  | {
      type: 'bezierCurveTo'
      cp1x: number
      cp1y: number
      cp2x: number
      cp2y: number
      x: number
      y: number
    }
  | {
      type: 'arc'
      x: number
      y: number
      radius: number
      startAngle: number
      endAngle: number
    }
  | { type: 'rect'; x: number; y: number; width: number; height: number }
  | { type: 'circle'; x: number; y: number; radius: number }
  | { type: 'fill'; color: number }
  | { type: 'stroke'; color: number; width: number }

export interface ThreeRenderData {
  geometry: SerializedGeometry
  material: SerializedMaterial
  lod?: LODLevel[]
}

export interface SerializedGeometry {
  type: string
  parameters: Record<string, unknown>
}

export interface SerializedMaterial {
  type: string
  parameters: Record<string, unknown>
}

export interface LODLevel {
  distance: number
  geometry: SerializedGeometry
}

export interface BlockValidation {
  rules: ValidationRule[]
}

export interface ValidationRule {
  field: string
  rule: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  value?: string | number | boolean
  message: string
}

export interface Block {
  id: string
  name: string
  slug: string
  description?: string
  version: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  geometry: BlockGeometry
  appearance: BlockAppearance
  physics?: BlockPhysics
  metadata: BlockMetadata
  snapPoints: SnapPoint[]
  customProperties: Record<string, CustomProperty>
  rendering: {
    pixi?: PixiRenderData
    three?: ThreeRenderData
  }
  validation?: BlockValidation
}

// ==========================================
// Project Types
// ==========================================

export interface ProjectConfig {
  units: Unit
  gridSize: number
  snapEnabled: boolean
  snapDistance: number
}

export interface Layer {
  id: string
  name: string
  parent?: string
  children: string[]
  order: number
  visible: boolean
  locked: boolean
  opacity: number
  color: ColorHex
  instanceIds: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Transform {
  position: Vector3
  rotation: Vector3 | Quaternion
  scale: Vector3
  matrix?: Matrix4x4
  bounds?: BoundingBox
}

export interface Matrix4x4 {
  elements: number[] // 16 elements
}

export interface InstanceState {
  selected: boolean
  locked: boolean
  visible: boolean
  hovered?: boolean
  hasErrors?: boolean
  errors?: string[]
}

export interface InstanceOverrides {
  color?: ColorHex
  material?: Material
  opacity?: number
  customProperties?: Record<string, string | number | boolean>
  name?: string
}

export interface Connection {
  id: string
  targetInstanceId: string
  sourceSnapPointId: string
  targetSnapPointId: string
  locked: boolean
  valid: boolean
  error?: string
}

export interface BlockInstance {
  id: string
  blockId: string
  transform: Transform
  layerId: string
  state: InstanceState
  overrides?: InstanceOverrides
  connections: Connection[]
  createdAt: Date
  updatedAt: Date
}

export interface CameraState {
  position: Vector3
  target: Vector3
  up: Vector3
}

export interface ViewportState {
  camera: CameraState
  viewMode: '2d' | '3d'
  gridVisible: boolean
  snapEnabled: boolean
}

export interface HistoryState {
  past: unknown[]
  present: unknown | null
  future: unknown[]
}

export interface Project {
  id: string
  name: string
  description?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  config: ProjectConfig
  layers: Layer[]
  instances: BlockInstance[]
  viewport: ViewportState
  history: HistoryState
}

// ==========================================
// User Types
// ==========================================

export type UserRole = 'designer' | 'architect' | 'client' | 'admin'

export type ResourceType =
  | 'blocks'
  | 'projects'
  | 'library'
  | 'settings'
  | 'users'
  | 'exports'

export type Action = 'create' | 'read' | 'update' | 'delete' | 'share'

export interface Permission {
  resource: ResourceType
  actions: Action[]
}

export type UnitSystem = 'metric' | 'imperial'

export interface PanelState {
  id: string
  position: PanelPosition
  size: number
  visible: boolean
  docked: boolean
  floatingPosition?: { x: number; y: number }
  floatingSize?: { width: number; height: number }
}

export type PanelPosition = 'left' | 'right' | 'top' | 'bottom' | 'floating'

export interface PanelLayout {
  panels: PanelState[]
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  panelLayout: PanelLayout
  gridVisible: boolean
  snapEnabled: boolean
  shortcuts: Record<string, string>
  defaultUnit: Unit
  defaultUnitSystem: UnitSystem
  notifications: {
    email: boolean
    desktop: boolean
    sounds: boolean
  }
}

export interface Subscription {
  plan: 'free' | 'pro' | 'team' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  startDate: Date
  endDate?: Date
  limits: {
    maxProjects: number
    maxBlocks: number
    maxStorageGB: number
    maxCollaborators: number
  }
  usage: {
    projects: number
    blocks: number
    storageGB: number
  }
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatar?: string
  role: UserRole
  permissions: Permission[]
  preferences: UserPreferences
  subscription?: Subscription
  createdAt: Date
  lastLoginAt: Date
}

// Type pour l'état d'authentification
export type AuthState = User | null
