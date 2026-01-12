/**
 * Mock Data - Données de test avec dimensions LEGO réalistes
 *
 * Dimensions LEGO standard :
 * - Unité de base (stud pitch) : 8mm
 * - Hauteur brique standard : 9.6mm
 * - Hauteur plaque : 3.2mm
 * - Largeur/longueur : multiples de 8mm (8, 16, 24, 32, 40, 48mm...)
 */

import type { Block, BlockInstance, Project } from './types'

// Helper pour générer des IDs
const generateId = () => `mock-${Math.random().toString(36).substr(2, 9)}`

// Helper pour calculer les snap points sur les coins et centres
const generateSnapPoints = (width: number, height: number, depth: number) => {
  const w2 = width / 2
  const h2 = height / 2
  const d2 = depth / 2

  return [
    // Coins bas
    {
      id: generateId(),
      position: { x: -w2, y: -h2, z: -d2 },
      normal: { x: -1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    {
      id: generateId(),
      position: { x: w2, y: -h2, z: -d2 },
      normal: { x: 1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    {
      id: generateId(),
      position: { x: -w2, y: -h2, z: d2 },
      normal: { x: -1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    {
      id: generateId(),
      position: { x: w2, y: -h2, z: d2 },
      normal: { x: 1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    // Coins haut
    {
      id: generateId(),
      position: { x: -w2, y: h2, z: -d2 },
      normal: { x: -1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    {
      id: generateId(),
      position: { x: w2, y: h2, z: -d2 },
      normal: { x: 1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    {
      id: generateId(),
      position: { x: -w2, y: h2, z: d2 },
      normal: { x: -1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    {
      id: generateId(),
      position: { x: w2, y: h2, z: d2 },
      normal: { x: 1, y: 0, z: 0 },
      type: 'corner' as const,
      enabled: true,
    },
    // Centres des faces
    {
      id: generateId(),
      position: { x: 0, y: h2, z: 0 },
      normal: { x: 0, y: 1, z: 0 },
      type: 'center' as const,
      enabled: true,
    }, // Top
    {
      id: generateId(),
      position: { x: 0, y: -h2, z: 0 },
      normal: { x: 0, y: -1, z: 0 },
      type: 'center' as const,
      enabled: true,
    }, // Bottom
  ]
}

// Helper pour calculer le bounding box
const calculateBounds = (width: number, height: number, depth: number) => ({
  min: { x: -width / 2, y: -height / 2, z: -depth / 2 },
  max: { x: width / 2, y: height / 2, z: depth / 2 },
  center: { x: 0, y: 0, z: 0 },
  size: { x: width, y: height, z: depth },
})

const now = new Date()
const userId = 'user-designer-001'

export const mockBlocks: Block[] = [
  // ==========================================
  // BRIQUES LEGO STANDARD
  // ==========================================

  {
    id: 'block-lego-1x1',
    name: 'Brique LEGO 1x1',
    slug: 'brique-lego-1x1',
    description: 'Brique LEGO standard 1x1 (8mm x 8mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 8, // 1 stud = 8mm
        height: 9.6, // Hauteur standard brique
        depth: 8, // 1 stud = 8mm
        unit: 'mm',
      },
      bounds: calculateBounds(8, 9.6, 8),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#FF0000', // Rouge LEGO classique
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.0025, // ~2.5g pour une brique 1x1
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '1x1', 'small'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '8 x 8 x 9.6 mm',
      volume: 0.0006144, // cm³
      weight: 0.0025, // kg
    },
    snapPoints: generateSnapPoints(8, 9.6, 8),
    customProperties: {},
    rendering: {},
  },

  {
    id: 'block-lego-1x2',
    name: 'Brique LEGO 1x2',
    slug: 'brique-lego-1x2',
    description: 'Brique LEGO standard 1x2 (8mm x 16mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 8,
        height: 9.6,
        depth: 16, // 2 studs
        unit: 'mm',
      },
      bounds: calculateBounds(8, 9.6, 16),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#00FF00', // Vert
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.005, // ~5g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '1x2'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '8 x 16 x 9.6 mm',
      volume: 0.0012288,
      weight: 0.005,
    },
    snapPoints: generateSnapPoints(8, 9.6, 16),
    customProperties: {},
    rendering: {},
  },

  {
    id: 'block-lego-2x2',
    name: 'Brique LEGO 2x2',
    slug: 'brique-lego-2x2',
    description: 'Brique LEGO standard 2x2 (16mm x 16mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 16, // 2 studs
        height: 9.6,
        depth: 16, // 2 studs
        unit: 'mm',
      },
      bounds: calculateBounds(16, 9.6, 16),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#0000FF', // Bleu
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.01, // ~10g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '2x2'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '16 x 16 x 9.6 mm',
      volume: 0.0024576,
      weight: 0.01,
    },
    snapPoints: generateSnapPoints(16, 9.6, 16),
    customProperties: {},
    rendering: {},
  },

  {
    id: 'block-lego-2x4',
    name: 'Brique LEGO 2x4',
    slug: 'brique-lego-2x4',
    description: 'Brique LEGO classique 2x4 (16mm x 32mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 16, // 2 studs
        height: 9.6,
        depth: 32, // 4 studs
        unit: 'mm',
      },
      bounds: calculateBounds(16, 9.6, 32),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#FFFF00', // Jaune
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.02, // ~20g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '2x4', 'classic'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '16 x 32 x 9.6 mm',
      volume: 0.0049152,
      weight: 0.02,
    },
    snapPoints: generateSnapPoints(16, 9.6, 32),
    customProperties: {},
    rendering: {},
  },

  {
    id: 'block-lego-4x4',
    name: 'Brique LEGO 4x4',
    slug: 'brique-lego-4x4',
    description: 'Brique LEGO 4x4 (32mm x 32mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 32, // 4 studs
        height: 9.6,
        depth: 32, // 4 studs
        unit: 'mm',
      },
      bounds: calculateBounds(32, 9.6, 32),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#FF00FF', // Magenta
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.04, // ~40g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '4x4', 'large'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '32 x 32 x 9.6 mm',
      volume: 0.0098304,
      weight: 0.04,
    },
    snapPoints: generateSnapPoints(32, 9.6, 32),
    customProperties: {},
    rendering: {},
  },

  // ==========================================
  // PLAQUES LEGO (plus fines)
  // ==========================================

  {
    id: 'block-lego-plate-1x1',
    name: 'Plaque LEGO 1x1',
    slug: 'plaque-lego-1x1',
    description: 'Plaque LEGO 1x1 (8mm x 8mm x 3.2mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 8,
        height: 3.2, // Hauteur plaque
        depth: 8,
        unit: 'mm',
      },
      bounds: calculateBounds(8, 3.2, 8),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#FFA500', // Orange
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.001, // ~1g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'plaque',
      subcategory: 'standard',
      tags: ['lego', 'plaque', '1x1', 'thin'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '8 x 8 x 3.2 mm',
      volume: 0.0002048,
      weight: 0.001,
    },
    snapPoints: generateSnapPoints(8, 3.2, 8),
    customProperties: {},
    rendering: {},
  },

  {
    id: 'block-lego-plate-2x4',
    name: 'Plaque LEGO 2x4',
    slug: 'plaque-lego-2x4',
    description: 'Plaque LEGO 2x4 (16mm x 32mm x 3.2mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 16,
        height: 3.2,
        depth: 32,
        unit: 'mm',
      },
      bounds: calculateBounds(16, 3.2, 32),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#00FFFF', // Cyan
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.008, // ~8g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'plaque',
      subcategory: 'standard',
      tags: ['lego', 'plaque', '2x4', 'thin'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '16 x 32 x 3.2 mm',
      volume: 0.0016384,
      weight: 0.008,
    },
    snapPoints: generateSnapPoints(16, 3.2, 32),
    customProperties: {},
    rendering: {},
  },

  // ==========================================
  // BRIQUES SPÉCIALES
  // ==========================================

  {
    id: 'block-lego-1x6',
    name: 'Brique LEGO 1x6',
    slug: 'brique-lego-1x6',
    description: 'Brique LEGO 1x6 (8mm x 48mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 8,
        height: 9.6,
        depth: 48, // 6 studs
        unit: 'mm',
      },
      bounds: calculateBounds(8, 9.6, 48),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#800080', // Violet
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.015, // ~15g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '1x6', 'long'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '8 x 48 x 9.6 mm',
      volume: 0.0036864,
      weight: 0.015,
    },
    snapPoints: generateSnapPoints(8, 9.6, 48),
    customProperties: {},
    rendering: {},
  },

  {
    id: 'block-lego-2x6',
    name: 'Brique LEGO 2x6',
    slug: 'brique-lego-2x6',
    description: 'Brique LEGO 2x6 (16mm x 48mm x 9.6mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 16,
        height: 9.6,
        depth: 48, // 6 studs
        unit: 'mm',
      },
      bounds: calculateBounds(16, 9.6, 48),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#FFC0CB', // Rose
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.03, // ~30g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'standard',
      tags: ['lego', 'standard', '2x6', 'long'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '16 x 48 x 9.6 mm',
      volume: 0.0073728,
      weight: 0.03,
    },
    snapPoints: generateSnapPoints(16, 9.6, 48),
    customProperties: {},
    rendering: {},
  },

  // ==========================================
  // BRIQUES HAUTES (2x hauteur)
  // ==========================================

  {
    id: 'block-lego-1x1-tall',
    name: 'Brique LEGO 1x1 Haute',
    slug: 'brique-lego-1x1-tall',
    description: 'Brique LEGO 1x1 double hauteur (8mm x 8mm x 19.2mm)',
    version: 1,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    geometry: {
      type: 'box',
      dimensions: {
        width: 8,
        height: 19.2, // 2x hauteur standard
        depth: 8,
        unit: 'mm',
      },
      bounds: calculateBounds(8, 19.2, 8),
      origin: { x: 0, y: 0, z: 0 },
    },
    appearance: {
      color: '#A52A2A', // Marron
      material: {
        type: 'plastic',
        properties: {
          roughness: 0.3,
          metalness: 0.0,
        },
      },
      opacity: 1,
      castShadow: true,
      receiveShadow: true,
    },
    physics: {
      enabled: false,
      mass: 0.005, // ~5g
      friction: 0.8,
      restitution: 0.1,
      collisionShape: 'box',
    },
    metadata: {
      category: 'brique',
      subcategory: 'tall',
      tags: ['lego', 'tall', '1x1', 'double-height'],
      usageCount: 0,
      status: 'published',
      visibility: 'public',
      dimensionsText: '8 x 8 x 19.2 mm',
      volume: 0.0012288,
      weight: 0.005,
    },
    snapPoints: generateSnapPoints(8, 19.2, 8),
    customProperties: {},
    rendering: {},
  },
]

// ==========================================
// MOCK PROJECTS
// ==========================================

export const mockProjects: Project[] = [
  {
    id: 'project-001',
    name: 'Maison Modulaire Test',
    description: 'Projet de test avec briques LEGO',
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    config: {
      units: 'mm',
      gridSize: 8, // 1 stud = 8mm
      snapEnabled: true,
      snapDistance: 2,
    },
    layers: [
      {
        id: 'layer-base',
        name: 'Base',
        parent: undefined,
        children: [],
        order: 0,
        visible: true,
        locked: false,
        opacity: 1,
        color: '#3B82F6',
        instanceIds: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'layer-walls',
        name: 'Murs',
        parent: undefined,
        children: [],
        order: 1,
        visible: true,
        locked: false,
        opacity: 1,
        color: '#EF4444',
        instanceIds: [],
        createdAt: now,
        updatedAt: now,
      },
    ],
    instances: [],
    viewport: {
      camera: {
        position: { x: 100, y: 100, z: 100 },
        target: { x: 0, y: 0, z: 0 },
        up: { x: 0, y: 1, z: 0 },
      },
      viewMode: '3d',
      gridVisible: true,
      snapEnabled: true,
    },
    history: {
      past: [],
      present: null,
      future: [],
    },
  },
]

// ==========================================
// MOCK INSTANCES (pour tester)
// ==========================================

export const mockInstances: BlockInstance[] = [
  {
    id: 'instance-001',
    blockId: 'block-lego-2x4',
    transform: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
    layerId: 'layer-base',
    state: {
      selected: false,
      locked: false,
      visible: true,
    },
    connections: [],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'instance-002',
    blockId: 'block-lego-2x4',
    transform: {
      position: { x: 32, y: 0, z: 0 }, // À côté (32mm = 4 studs)
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
    layerId: 'layer-base',
    state: {
      selected: false,
      locked: false,
      visible: true,
    },
    connections: [],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'instance-003',
    blockId: 'block-lego-1x1',
    transform: {
      position: { x: 0, y: 9.6, z: 0 }, // Sur le dessus
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
    layerId: 'layer-walls',
    state: {
      selected: false,
      locked: false,
      visible: true,
    },
    connections: [],
    createdAt: now,
    updatedAt: now,
  },
]

// ==========================================
// MOCK USERS
// ==========================================

import type { User, AuthState } from './types'

const defaultPreferences = {
  theme: 'light' as const,
  language: 'fr',
  panelLayout: {
    panels: [],
  },
  gridVisible: true,
  snapEnabled: true,
  shortcuts: {},
  defaultUnit: 'mm' as const,
  defaultUnitSystem: 'metric' as const,
  notifications: {
    email: true,
    desktop: true,
    sounds: false,
  },
}

export const mockUsers: User[] = [
  // Designer
  {
    id: 'user-designer-001',
    email: 'designer@blockforge.com',
    username: 'designer',
    displayName: 'Alice Designer',
    avatar: undefined,
    role: 'designer',
    permissions: [
      { resource: 'blocks', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'library', actions: ['read', 'update'] },
      { resource: 'projects', actions: ['read'] },
      { resource: 'settings', actions: ['read', 'update'] },
    ],
    preferences: defaultPreferences,
    subscription: {
      plan: 'pro',
      status: 'active',
      startDate: new Date('2024-01-01'),
      limits: {
        maxProjects: 50,
        maxBlocks: 1000,
        maxStorageGB: 10,
        maxCollaborators: 5,
      },
      usage: {
        projects: 12,
        blocks: 245,
        storageGB: 2.5,
      },
    },
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
  },

  // Architect
  {
    id: 'user-architect-001',
    email: 'architect@blockforge.com',
    username: 'architect',
    displayName: 'Bob Architect',
    avatar: undefined,
    role: 'architect',
    permissions: [
      { resource: 'blocks', actions: ['read'] },
      { resource: 'library', actions: ['read'] },
      { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'exports', actions: ['create', 'read'] },
      { resource: 'settings', actions: ['read', 'update'] },
    ],
    preferences: {
      ...defaultPreferences,
      theme: 'dark',
    },
    subscription: {
      plan: 'team',
      status: 'active',
      startDate: new Date('2024-02-01'),
      limits: {
        maxProjects: 100,
        maxBlocks: 5000,
        maxStorageGB: 50,
        maxCollaborators: 20,
      },
      usage: {
        projects: 35,
        blocks: 0, // Read-only
        storageGB: 12.3,
      },
    },
    createdAt: new Date('2024-02-01'),
    lastLoginAt: new Date(),
  },

  // Client (Read-only)
  {
    id: 'user-client-001',
    email: 'client@blockforge.com',
    username: 'client',
    displayName: 'Charlie Client',
    avatar: undefined,
    role: 'client',
    permissions: [
      { resource: 'projects', actions: ['read'] },
      { resource: 'exports', actions: ['read'] },
    ],
    preferences: defaultPreferences,
    subscription: {
      plan: 'free',
      status: 'active',
      startDate: new Date('2024-03-01'),
      limits: {
        maxProjects: 5,
        maxBlocks: 0,
        maxStorageGB: 1,
        maxCollaborators: 0,
      },
      usage: {
        projects: 2,
        blocks: 0,
        storageGB: 0.1,
      },
    },
    createdAt: new Date('2024-03-01'),
    lastLoginAt: new Date(),
  },

  // Admin (Full access)
  {
    id: 'user-admin-001',
    email: 'admin@blockforge.com',
    username: 'admin',
    displayName: 'Diana Admin',
    avatar: undefined,
    role: 'admin',
    permissions: [
      {
        resource: 'blocks',
        actions: ['create', 'read', 'update', 'delete', 'share'],
      },
      {
        resource: 'projects',
        actions: ['create', 'read', 'update', 'delete', 'share'],
      },
      {
        resource: 'library',
        actions: ['create', 'read', 'update', 'delete', 'share'],
      },
      {
        resource: 'settings',
        actions: ['create', 'read', 'update', 'delete', 'share'],
      },
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'exports', actions: ['create', 'read', 'update', 'delete'] },
    ],
    preferences: {
      ...defaultPreferences,
      theme: 'dark',
    },
    subscription: {
      plan: 'enterprise',
      status: 'active',
      startDate: new Date('2023-12-01'),
      limits: {
        maxProjects: -1, // Unlimited
        maxBlocks: -1,
        maxStorageGB: -1,
        maxCollaborators: -1,
      },
      usage: {
        projects: 150,
        blocks: 5000,
        storageGB: 250,
      },
    },
    createdAt: new Date('2023-12-01'),
    lastLoginAt: new Date(),
  },
]

// ==========================================
// AUTH STATES
// ==========================================

/**
 * Utilisateur non authentifié (null)
 */
export const mockNoAuth: AuthState = null

/**
 * Utilisateurs par rôle (pour tests)
 */
export const mockUsersByRole = {
  designer: mockUsers.find(u => u.role === 'designer')!,
  architect: mockUsers.find(u => u.role === 'architect')!,
  client: mockUsers.find(u => u.role === 'client')!,
  admin: mockUsers.find(u => u.role === 'admin')!,
  noAuth: mockNoAuth,
}

// ==========================================
// EXPORTS
// ==========================================

export const mockData = {
  blocks: mockBlocks,
  projects: mockProjects,
  instances: mockInstances,
  users: mockUsers,
  usersByRole: mockUsersByRole,
  noAuth: mockNoAuth,
}
