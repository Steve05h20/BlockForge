# 📊 STRUCTURES DE DONNÉES DÉTAILLÉES

## Table des Matières

1. [Types Core](#types-core)
2. [Block System](#block-system)
3. [Project System](#project-system)
4. [Library System](#library-system)
5. [User & Permissions](#user--permissions)
6. [State Management Types](#state-management-types)
7. [API Types](#api-types)

---

## 🔷 Types Core

### Primitives Géométriques

```typescript
// Vector 3D
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

// Vector 2D
interface Vector2 {
  x: number;
  y: number;
}

// Quaternion (rotation 3D)
interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

// Bounding Box (AABB)
interface BoundingBox {
  min: Vector3;
  max: Vector3;
  center?: Vector3;
  size?: Vector3;
}

// Transform Matrix
interface Matrix4x4 {
  elements: number[]; // 16 elements
}

// Color
type ColorHex = string; // "#RRGGBB"
type ColorRGB = { r: number; g: number; b: number };
type ColorRGBA = { r: number; g: number; b: number; a: number };
type ColorHSL = { h: number; s: number; l: number };

// Units
type Unit = "mm" | "cm" | "m" | "in" | "ft";
type UnitSystem = "metric" | "imperial";
```

---

## 🧱 Block System

### Block (Template)

```typescript
interface Block {
  // Identification
  id: string; // UUID v4
  name: string; // "Wall Block 100x50"
  slug: string; // "wall-block-100x50"
  description?: string;
  version: number; // Versioning

  // Ownership
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;

  // Geometry
  geometry: BlockGeometry;

  // Appearance
  appearance: BlockAppearance;

  // Physics (optional)
  physics?: BlockPhysics;

  // Metadata
  metadata: BlockMetadata;

  // Snap Points
  snapPoints: SnapPoint[];

  // Custom Properties
  customProperties: Record<string, CustomProperty>;

  // Rendering Data
  rendering: {
    pixi?: PixiRenderData; // 2D representation
    three?: ThreeRenderData; // 3D representation
  };

  // Validation Rules
  validation?: BlockValidation;
}

// ==========================================
// Geometry
// ==========================================

interface BlockGeometry {
  type: GeometryType;
  dimensions: Dimensions3D;

  // Pour geometry custom
  vertices?: Vector3[];
  faces?: Face[];
  edges?: Edge[];

  // Bounding box
  bounds: BoundingBox;

  // Origin point (pivot)
  origin: Vector3; // Default: { x: 0, y: 0, z: 0 }
}

type GeometryType =
  | "box" // Cube/Rectangular prism
  | "cylinder" // Cylindre
  | "sphere" // Sphère
  | "cone" // Cône
  | "prism" // Prisme (polygonal)
  | "extruded" // Extrusion 2D → 3D
  | "custom"; // Mesh custom

interface Dimensions3D {
  width: number; // X axis
  height: number; // Y axis
  depth: number; // Z axis
  unit: Unit; // 'mm', 'cm', 'm', 'in', 'ft'
}

interface Face {
  vertices: number[]; // Indices vers vertices array
  normal: Vector3; // Normal vector
  uv?: Vector2[]; // UV coordinates pour texture
}

interface Edge {
  start: number; // Vertex index
  end: number; // Vertex index
}

// ==========================================
// Appearance
// ==========================================

interface BlockAppearance {
  // Color
  color: ColorHex;

  // Texture
  texture?: Texture;

  // Material
  material: Material;

  // Transparency
  opacity: number; // 0-1

  // Additional
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

interface Texture {
  id: string;
  url: string; // CDN URL
  name: string;
  scale: Vector2; // Texture tiling
  offset: Vector2; // Texture offset
  rotation: number; // Radians
  repeat: "repeat" | "clamp";
}

interface Material {
  type: MaterialType;
  properties: MaterialProperties;
}

type MaterialType =
  | "plastic"
  | "wood"
  | "metal"
  | "glass"
  | "concrete"
  | "fabric"
  | "stone"
  | "ceramic"
  | "custom";

interface MaterialProperties {
  // PBR properties (Physically Based Rendering)
  roughness?: number; // 0-1
  metalness?: number; // 0-1

  // Advanced
  transmission?: number; // For glass (0-1)
  clearcoat?: number; // Clear coating (0-1)
  sheen?: number; // Fabric sheen (0-1)

  // Maps
  normalMap?: string; // Normal map URL
  roughnessMap?: string;
  metalnessMap?: string;
  aoMap?: string; // Ambient occlusion
}

// ==========================================
// Physics (Optional)
// ==========================================

interface BlockPhysics {
  enabled: boolean;
  mass: number; // kg
  friction: number; // 0-1
  restitution: number; // Bounciness 0-1
  collisionShape: "box" | "sphere" | "mesh";
}

// ==========================================
// Metadata
// ==========================================

interface BlockMetadata {
  // Categorization
  category: string; // 'wall', 'floor', 'furniture'
  subcategory?: string;
  tags: string[];

  // Usage
  usageCount: number; // Analytics
  isFavorite?: boolean;

  // Status
  status: "draft" | "published" | "archived";
  visibility: "private" | "team" | "public";

  // Dimensions précompilées
  dimensionsText?: string; // "100 x 50 x 20 cm"
  volume?: number; // m³ ou ft³
  weight?: number; // kg ou lb

  // Pricing (optional)
  price?: {
    value: number;
    currency: string;
    unit: "per_block" | "per_m2" | "per_m3";
  };
}

// ==========================================
// Snap Points
// ==========================================

interface SnapPoint {
  id: string;

  // Position relative au block origin
  position: Vector3;

  // Normal (direction de snap)
  normal: Vector3;

  // Type
  type: SnapPointType;

  // Constraints
  constraints?: SnapConstraints;

  // Visual
  color?: ColorHex;
  size?: number;

  // State
  enabled: boolean;
  locked?: boolean;
}

type SnapPointType =
  | "edge" // Sur une arête
  | "corner" // Sur un coin
  | "center" // Centre de face
  | "custom"; // Position custom

interface SnapConstraints {
  allowedBlockTypes?: string[]; // IDs de blocks autorisés
  allowedCategories?: string[];
  maxConnections?: number; // Limite de connections
  rotationLocked?: boolean; // Lock rotation après snap
}

// ==========================================
// Custom Properties
// ==========================================

interface CustomProperty {
  id: string;
  name: string;
  type: PropertyType;
  value: any;

  // Validation
  validation?: PropertyValidation;

  // UI
  label?: string;
  description?: string;
  group?: string; // Grouping in properties panel
  order?: number;
}

type PropertyType =
  | "string"
  | "number"
  | "boolean"
  | "color"
  | "select"
  | "multiselect"
  | "date"
  | "file";

interface PropertyValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string; // Regex
  options?: string[]; // For select/multiselect
}

// ==========================================
// Rendering Data
// ==========================================

interface PixiRenderData {
  // Sprite-based
  spriteUrl?: string;

  // Graphics-based
  graphics?: PixiGraphicsData;

  // Layering
  zIndex?: number;
}

interface PixiGraphicsData {
  commands: PixiCommand[];
}

type PixiCommand =
  | { type: "moveTo"; x: number; y: number }
  | { type: "lineTo"; x: number; y: number }
  | {
      type: "bezierCurveTo";
      cp1x: number;
      cp1y: number;
      cp2x: number;
      cp2y: number;
      x: number;
      y: number;
    }
  | {
      type: "arc";
      x: number;
      y: number;
      radius: number;
      startAngle: number;
      endAngle: number;
    }
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; x: number; y: number; radius: number }
  | { type: "fill"; color: number }
  | { type: "stroke"; color: number; width: number };

interface ThreeRenderData {
  // Geometry serialized
  geometry: SerializedGeometry;

  // Material serialized
  material: SerializedMaterial;

  // LOD (Level of Detail)
  lod?: LODLevel[];
}

interface SerializedGeometry {
  type: string; // 'BoxGeometry', 'CylinderGeometry', etc.
  parameters: Record<string, any>;
}

interface SerializedMaterial {
  type: string; // 'MeshStandardMaterial', etc.
  parameters: Record<string, any>;
}

interface LODLevel {
  distance: number; // Distance from camera
  geometry: SerializedGeometry;
}

// ==========================================
// Validation
// ==========================================

interface BlockValidation {
  rules: ValidationRule[];
}

interface ValidationRule {
  field: string;
  rule: "required" | "min" | "max" | "pattern" | "custom";
  value?: any;
  message: string;
}

// ==========================================
// Block Version History
// ==========================================

interface BlockVersion {
  version: number;
  blockId: string;
  snapshot: Block; // Full block snapshot
  changes: string; // Description of changes
  createdBy: string;
  createdAt: Date;
}
```

---

## 🏗️ Project System

### Project

```typescript
interface Project {
  // Identification
  id: string;
  name: string;
  slug: string;
  description?: string;

  // Ownership
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastOpenedAt?: Date;

  // Configuration
  config: ProjectConfig;

  // Structure
  layers: Record<string, Layer>;
  instances: Record<string, BlockInstance>;

  // Viewport State
  viewport: ViewportState;

  // History
  history: HistoryState;

  // Metadata
  metadata: ProjectMetadata;

  // Sharing
  sharing?: ProjectSharing;

  // Export
  exports?: ProjectExport[];
}

// ==========================================
// Configuration
// ==========================================

interface ProjectConfig {
  // Units
  unitSystem: UnitSystem; // 'metric' | 'imperial'
  unit: Unit; // 'mm', 'cm', 'm', 'in', 'ft'

  // Grid
  grid: GridConfig;

  // Snap
  snap: SnapConfig;

  // Default Layer
  defaultLayerId: string;

  // Limits
  limits?: {
    maxInstances?: number;
    maxLayers?: number;
  };
}

interface GridConfig {
  enabled: boolean;
  size: number; // Grid cell size
  subdivisions: number; // Minor grid lines
  color: ColorHex;
  opacity: number; // 0-1
  adaptive: boolean; // Zoom-based subdivision
}

interface SnapConfig {
  enabled: boolean;
  tolerance: number; // Distance en unités
  snapToGrid: boolean;
  snapToBlocks: boolean;
  snapToGuides: boolean;
  showGuides: boolean; // Visual feedback
}

// ==========================================
// Layers
// ==========================================

interface Layer {
  id: string;
  name: string;

  // Hierarchy
  parent?: string; // Parent layer ID
  children: string[]; // Child layer IDs
  order: number; // Z-index

  // Visibility
  visible: boolean;
  locked: boolean;
  opacity: number; // 0-1

  // Visual
  color: ColorHex; // Highlight color

  // Instances
  instanceIds: string[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Block Instances
// ==========================================

interface BlockInstance {
  // Identification
  id: string; // Instance UUID (unique per project)
  blockId: string; // Reference to Block template

  // Transform
  transform: Transform;

  // Layer
  layerId: string;

  // State
  state: InstanceState;

  // Overrides
  overrides?: InstanceOverrides;

  // Connections
  connections: Connection[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

interface Transform {
  position: Vector3;
  rotation: Vector3 | Quaternion; // Euler ou Quaternion
  scale: Vector3;

  // Cache (computed)
  matrix?: Matrix4x4;
  bounds?: BoundingBox;
}

interface InstanceState {
  selected: boolean;
  locked: boolean;
  visible: boolean;
  hovered?: boolean;

  // Validation
  hasErrors?: boolean;
  errors?: string[];
}

interface InstanceOverrides {
  // Override appearance
  color?: ColorHex;
  material?: Material;
  opacity?: number;

  // Override custom properties
  customProperties?: Record<string, any>;

  // Override name
  name?: string;
}

interface Connection {
  id: string;

  // Target
  targetInstanceId: string;

  // Snap Points
  sourceSnapPointId: string;
  targetSnapPointId: string;

  // State
  locked: boolean;

  // Validation
  valid: boolean;
  error?: string;
}

// ==========================================
// Viewport
// ==========================================

interface ViewportState {
  // Camera
  camera: CameraState;

  // View Mode
  mode: ViewMode;

  // Rendering
  rendering: RenderingState;
}

interface CameraState {
  position: Vector3;
  target: Vector3; // Look-at point
  zoom: number;

  // Orientation (for 3D)
  rotation?: Quaternion;

  // Projection
  projection: "orthographic" | "perspective";
  fov?: number; // Field of view (for perspective)
}

type ViewMode =
  | "2D_top" // Top-down orthographic
  | "2D_front" // Front orthographic
  | "2D_side" // Side orthographic
  | "3D" // Perspective 3D
  | "isometric"; // Isometric 3D

interface RenderingState {
  showGrid: boolean;
  showSnapPoints: boolean;
  showBoundingBoxes: boolean;
  showAxes: boolean;

  // Quality
  antialiasing: boolean;
  shadows: boolean;

  // Background
  backgroundColor: ColorHex;
}

// ==========================================
// History (Undo/Redo)
// ==========================================

interface HistoryState {
  entries: HistoryEntry[];
  currentIndex: number;
  maxEntries: number; // Limit history size
}

interface HistoryEntry {
  id: string;
  timestamp: Date;
  userId: string;

  // Action
  action: HistoryAction;

  // Data (snapshot or diff)
  data: any;

  // Reversible
  undo?: () => void;
  redo?: () => void;
}

interface HistoryAction {
  type: ActionType;
  target: string; // Instance ID, Layer ID, etc.
  description: string;
}

type ActionType =
  // Instances
  | "instance_add"
  | "instance_remove"
  | "instance_move"
  | "instance_rotate"
  | "instance_scale"
  | "instance_update_properties"

  // Layers
  | "layer_create"
  | "layer_delete"
  | "layer_update"
  | "layer_reorder"

  // Bulk
  | "bulk_move"
  | "bulk_delete"
  | "bulk_update";

// ==========================================
// Metadata
// ==========================================

interface ProjectMetadata {
  thumbnail?: string; // URL

  // Statistics
  stats: {
    instanceCount: number;
    layerCount: number;
    blockTypesUsed: number;
  };

  // Status
  status: "draft" | "in_progress" | "completed" | "archived";

  // Tags
  tags: string[];

  // Collaborators (future)
  collaborators?: string[]; // User IDs
}

// ==========================================
// Sharing
// ==========================================

interface ProjectSharing {
  enabled: boolean;
  visibility: "private" | "team" | "public";

  // Link
  shareLink?: string;
  password?: string;
  expiresAt?: Date;

  // Permissions
  allowComments: boolean;
  allowDownload: boolean;

  // Analytics
  views?: number;
  lastViewedAt?: Date;
}

// ==========================================
// Exports
// ==========================================

interface ProjectExport {
  id: string;
  format: ExportFormat;
  url: string; // Download URL
  fileSize: number; // bytes
  createdAt: Date;
  expiresAt?: Date;
}

type ExportFormat =
  // 3D
  | "3D_GLTF"
  | "3D_GLB"
  | "3D_OBJ"
  | "3D_STL"
  | "3D_FBX"

  // 2D
  | "2D_PDF"
  | "2D_SVG"
  | "2D_PNG"
  | "2D_JPEG"
  | "2D_DXF"

  // Data
  | "JSON";
```

---

## 📚 Library System

### Library

```typescript
interface Library {
  id: string;
  name: string;

  // Owner
  ownerId: string;
  type: "personal" | "team" | "public";

  // Categories
  categories: Record<string, Category>;

  // Blocks
  blockIds: string[];

  // Configuration
  config: LibraryConfig;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string; // Icon name ou URL

  // Hierarchy
  parent?: string;
  children: string[];

  // Blocks
  blockIds: string[];

  // Sorting
  order: number;
}

interface LibraryConfig {
  // Display
  defaultView: "grid" | "list";
  gridSize: "small" | "medium" | "large";

  // Sorting
  sortBy: "name" | "date" | "usage" | "category";
  sortOrder: "asc" | "desc";

  // Filters
  filters: LibraryFilters;
}

interface LibraryFilters {
  searchQuery: string;
  categories: string[];
  tags: string[];
  materials: MaterialType[];

  // Advanced
  dimensions?: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    minDepth?: number;
    maxDepth?: number;
  };

  priceRange?: {
    min?: number;
    max?: number;
  };

  dateRange?: {
    from?: Date;
    to?: Date;
  };
}
```

---

## 👤 User & Permissions

### User

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;

  // Avatar
  avatar?: string; // URL

  // Role
  role: UserRole;

  // Permissions
  permissions: Permission[];

  // Preferences
  preferences: UserPreferences;

  // Subscription (optional)
  subscription?: Subscription;

  // Metadata
  createdAt: Date;
  lastLoginAt: Date;
}

type UserRole =
  | "designer" // Peut créer des blocks
  | "architect" // Peut créer des projets
  | "client" // Read-only, visualisation
  | "admin"; // Full access

interface Permission {
  resource: ResourceType;
  actions: Action[];
}

type ResourceType =
  | "blocks"
  | "projects"
  | "library"
  | "settings"
  | "users"
  | "exports";

type Action = "create" | "read" | "update" | "delete" | "share";

interface UserPreferences {
  // Theme
  theme: "light" | "dark" | "auto";

  // Language
  language: string; // 'en', 'fr', etc.

  // UI
  panelLayout: PanelLayout;
  gridVisible: boolean;
  snapEnabled: boolean;

  // Shortcuts
  shortcuts: Record<string, string>;

  // Units
  defaultUnit: Unit;
  defaultUnitSystem: UnitSystem;

  // Notifications
  notifications: {
    email: boolean;
    desktop: boolean;
    sounds: boolean;
  };
}

interface PanelLayout {
  panels: PanelState[];
}

interface PanelState {
  id: string; // 'library', 'properties', 'layers', etc.
  position: PanelPosition;
  size: number; // Width ou height en pixels
  visible: boolean;
  docked: boolean;

  // Floating panel
  floatingPosition?: { x: number; y: number };
  floatingSize?: { width: number; height: number };
}

type PanelPosition = "left" | "right" | "top" | "bottom" | "floating";

interface Subscription {
  plan: "free" | "pro" | "team" | "enterprise";
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  endDate?: Date;

  // Limits
  limits: {
    maxProjects: number;
    maxBlocks: number;
    maxStorageGB: number;
    maxCollaborators: number;
  };

  // Usage
  usage: {
    projects: number;
    blocks: number;
    storageGB: number;
  };
}
```

---

## 🔄 State Management Types

### Zustand Store Types

```typescript
// ==========================================
// Project Store
// ==========================================

interface ProjectStoreState {
  // Current Project
  currentProject: Project | null;

  // Project List
  projects: Project[];

  // Loading
  isLoading: boolean;
  error: string | null;
}

interface ProjectStoreActions {
  // CRUD
  createProject: (data: Partial<Project>) => Promise<Project>;
  loadProject: (id: string) => Promise<void>;
  saveProject: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Config
  updateProjectConfig: (config: Partial<ProjectConfig>) => void;

  // Viewport
  setViewport: (viewport: Partial<ViewportState>) => void;
  toggleViewMode: () => void;

  // Reset
  reset: () => void;
}

type ProjectStore = ProjectStoreState & ProjectStoreActions;

// ==========================================
// Blocks Store
// ==========================================

interface BlocksStoreState {
  blocks: Record<string, Block>;
  isLoading: boolean;
  error: string | null;
}

interface BlocksStoreActions {
  // CRUD
  addBlock: (block: Block) => void;
  updateBlock: (id: string, data: Partial<Block>) => void;
  removeBlock: (id: string) => void;
  getBlock: (id: string) => Block | undefined;

  // Fetch
  fetchBlocks: () => Promise<void>;
  fetchBlock: (id: string) => Promise<Block>;
}

type BlocksStore = BlocksStoreState & BlocksStoreActions;

// ==========================================
// Instances Store
// ==========================================

interface InstancesStoreState {
  instances: Record<string, BlockInstance>;
}

interface InstancesStoreActions {
  // CRUD
  addInstance: (instance: BlockInstance) => void;
  removeInstance: (id: string) => void;
  updateInstance: (id: string, data: Partial<BlockInstance>) => void;

  // Transform
  updateTransform: (id: string, transform: Partial<Transform>) => void;
  moveInstance: (id: string, delta: Vector3) => void;
  rotateInstance: (id: string, rotation: Vector3) => void;
  scaleInstance: (id: string, scale: Vector3) => void;

  // Layer
  setInstanceLayer: (id: string, layerId: string) => void;

  // Bulk
  duplicateInstances: (ids: string[]) => void;
  deleteInstances: (ids: string[]) => void;
  moveInstances: (ids: string[], delta: Vector3) => void;

  // Getters
  getInstancesByLayer: (layerId: string) => BlockInstance[];
  getInstancesByBlock: (blockId: string) => BlockInstance[];
}

type InstancesStore = InstancesStoreState & InstancesStoreActions;

// ==========================================
// Selection Store
// ==========================================

interface SelectionStoreState {
  selectedIds: string[];
  hoveredId: string | null;
}

interface SelectionStoreActions {
  // Single selection
  select: (id: string, multi?: boolean) => void;
  deselect: (id: string) => void;
  toggleSelect: (id: string) => void;

  // Bulk selection
  selectMultiple: (ids: string[]) => void;
  clearSelection: () => void;
  selectAll: () => void;

  // Hover
  setHovered: (id: string | null) => void;

  // Computed
  selectedInstances: () => BlockInstance[];
  selectionBounds: () => BoundingBox | null;
  hasSelection: () => boolean;
}

type SelectionStore = SelectionStoreState & SelectionStoreActions;

// ==========================================
// Layers Store
// ==========================================

interface LayersStoreState {
  layers: Record<string, Layer>;
  activeLayerId: string;
}

interface LayersStoreActions {
  // CRUD
  createLayer: (data: Partial<Layer>) => Layer;
  updateLayer: (id: string, data: Partial<Layer>) => void;
  deleteLayer: (id: string) => void;
  duplicateLayer: (id: string) => Layer;

  // Hierarchy
  setParent: (layerId: string, parentId: string | null) => void;
  reorderLayers: (order: string[]) => void;

  // Active
  setActiveLayer: (id: string) => void;

  // Visibility
  toggleVisibility: (id: string, recursive?: boolean) => void;
  setOpacity: (id: string, opacity: number) => void;

  // Lock
  toggleLock: (id: string, recursive?: boolean) => void;

  // Getters
  getLayer: (id: string) => Layer | undefined;
  getVisibleLayers: () => Layer[];
  getLayerHierarchy: () => Layer[];
}

type LayersStore = LayersStoreState & LayersStoreActions;
```

---

## 🌐 API Types

### Request/Response Types

```typescript
// ==========================================
// Blocks API
// ==========================================

// GET /api/blocks
interface GetBlocksRequest {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string[];
  search?: string;
  sortBy?: "name" | "date" | "usage";
  sortOrder?: "asc" | "desc";
}

interface GetBlocksResponse {
  blocks: Block[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// POST /api/blocks
interface CreateBlockRequest {
  block: Omit<Block, "id" | "createdAt" | "updatedAt">;
}

interface CreateBlockResponse {
  block: Block;
}

// PUT /api/blocks/:id
interface UpdateBlockRequest {
  updates: Partial<Block>;
}

interface UpdateBlockResponse {
  block: Block;
}

// DELETE /api/blocks/:id
interface DeleteBlockResponse {
  success: boolean;
}

// ==========================================
// Projects API
// ==========================================

// GET /api/projects
interface GetProjectsRequest {
  page?: number;
  limit?: number;
  status?: Project["metadata"]["status"];
}

interface GetProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// POST /api/projects
interface CreateProjectRequest {
  project: Omit<Project, "id" | "createdAt" | "updatedAt">;
}

interface CreateProjectResponse {
  project: Project;
}

// GET /api/projects/:id
interface GetProjectResponse {
  project: Project;
}

// PUT /api/projects/:id
interface UpdateProjectRequest {
  updates: Partial<Project>;
}

interface UpdateProjectResponse {
  project: Project;
}

// POST /api/projects/:id/export
interface ExportProjectRequest {
  format: ExportFormat;
  options: ExportOptions;
}

interface ExportProjectResponse {
  exportId: string;
  downloadUrl: string;
  expiresAt: Date;
}

// ==========================================
// Library API
// ==========================================

// GET /api/library
interface GetLibraryResponse {
  library: Library;
}

// POST /api/library/categories
interface CreateCategoryRequest {
  category: Omit<Category, "id">;
}

interface CreateCategoryResponse {
  category: Category;
}

// POST /api/library/import
interface ImportLibraryRequest {
  data: string; // JSON string
}

interface ImportLibraryResponse {
  success: boolean;
  imported: number;
  errors?: string[];
}

// ==========================================
// Export Options
// ==========================================

interface ExportOptions {
  // 3D options
  includeTextures?: boolean;
  includeMaterials?: boolean;
  optimize?: boolean;
  scale?: number;

  // 2D options
  resolution?: number; // DPI
  dimensions?: { width: number; height: number };
  layers?: string[];
  viewAngle?: "top" | "front" | "side" | "isometric";

  // Common
  includeMetadata?: boolean;
  watermark?: string;
  backgroundColor?: ColorHex;
}

// ==========================================
// Validation Result
// ==========================================

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}
```

---

## 🔧 Utility Types

### Common Utility Types

```typescript
// Generic CRUD response
interface CRUDResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Paginated response
interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error
interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Loading State
interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number; // 0-100
}

// Sort Options
interface SortOptions {
  field: string;
  order: "asc" | "desc";
}

// Filter Options
interface FilterOptions {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "contains";
  value: any;
}
```

---

_Ce document définit toutes les structures de données TypeScript pour le logiciel._

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
