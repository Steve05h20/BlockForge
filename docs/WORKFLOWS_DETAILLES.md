# 🔄 WORKFLOWS DÉTAILLÉS & FLUX UTILISATEURS

## Table des Matières

1. [Vue d'ensemble des Workflows](#vue-densemble-des-workflows)
2. [Workflow Designer](#workflow-designer)
3. [Workflow Architecte](#workflow-architecte)
4. [Workflow Client](#workflow-client)
5. [Flux de Données](#flux-de-données)
6. [Interactions Clés](#interactions-clés)
7. [Scénarios d'Usage](#scénarios-dusage)
8. [Transitions d'État](#transitions-détat)

---

## 🎯 Vue d'ensemble des Workflows

### Ecosystem Global

```
┌──────────────────────────────────────────────────────────┐
│                    WORKFLOW GLOBAL                       │
└──────────────────────────────────────────────────────────┘

     ┌─────────────┐
     │  DESIGNER   │  Crée les blocs réutilisables
     └──────┬──────┘
            │
            ▼
     [LIBRARY]  ◄─── Catalogue centralisé de blocs
            │
            ▼
     ┌─────────────┐
     │ ARCHITECTE  │  Assemble les blocs en projets
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │   CLIENT    │  Visualise et valide le projet
     └─────────────┘
```

### Rôles et Permissions

```typescript
// Designer
Permissions: {
  blocks: ['create', 'read', 'update', 'delete'],
  library: ['read', 'update'],
  projects: ['read'],                    // Read-only
  settings: ['read', 'update']
}

// Architecte
Permissions: {
  blocks: ['read'],                      // Read-only
  library: ['read'],                     // Read-only
  projects: ['create', 'read', 'update', 'delete'],
  exports: ['create', 'read'],
  settings: ['read', 'update']
}

// Client
Permissions: {
  blocks: [],                            // No access
  library: [],                           // No access
  projects: ['read'],                    // Read-only (shared projects)
  exports: ['read'],                     // Download exports
  settings: []                           // No access
}
```

---

## 🎨 Workflow Designer

### Objectif

Créer et paramétrer des blocs modulaires qui seront utilisés par les architectes.

### Parcours Utilisateur Complet

```
START
  │
  ├─► [1] Accès Dashboard
  │      │
  │      ├─► Voir projets récents (read-only)
  │      ├─► Voir statistiques de blocs (usage, favoris)
  │      └─► Cliquer "Create New Block"
  │
  ├─► [2] Mode Designer Workspace
  │      │
  │      ├─► Canvas PixiJS 2D initialisé
  │      ├─► Panels : Properties, Preview 3D, Snap Points
  │      └─► Toolbar : Drawing tools activée
  │
  ├─► [3] Dessiner Géométrie 2D
  │      │
  │      ├─► Choisir tool (Rectangle, Circle, Polygon, Path)
  │      ├─► Dessiner sur canvas XY (vue top)
  │      ├─► Snap to grid automatique
  │      ├─► Inputs numériques pour dimensions précises
  │      ├─► Basculer vue XZ ou YZ pour définir depth
  │      └─► Validation : géométrie fermée, pas de self-intersection
  │
  ├─► [4] Définir Dimensions 3D
  │      │
  │      ├─► Properties Panel : Width, Height, Depth
  │      ├─► Unit selector (mm, cm, m, in, ft)
  │      ├─► Preview temps réel sur canvas 2D
  │      └─► Validation : dimensions > 0
  │
  ├─► [5] Paramétrer Apparence
  │      │
  │      ├─► Color Picker : choisir couleur
  │      ├─► Material Selector : plastic, wood, metal, glass
  │      ├─► Texture Upload (optional)
  │      │     ├─► Upload image
  │      │     ├─► Adjust scale, offset, rotation
  │      │     └─► Preview on 2D canvas
  │      ├─► Opacity slider (0-1)
  │      └─► Preview 3D Button → Modal Three.js
  │
  ├─► [6] Placer Snap Points
  │      │
  │      ├─► Mode "Edit Snap Points"
  │      ├─► Canvas affiche edges/corners automatiques
  │      ├─► Click edge/corner → placer snap point
  │      ├─► Définir normal direction (arrow tool)
  │      ├─► Types : edge, corner, center, custom
  │      ├─► Constraints (optional)
  │      │     ├─► Allowed block types
  │      │     ├─► Max connections
  │      │     └─► Rotation locked
  │      └─► Visual feedback : points verts avec arrows
  │
  ├─► [7] Custom Properties (Optional)
  │      │
  │      ├─► Add Custom Property button
  │      ├─► Define : name, type, default value
  │      ├─► Types : string, number, boolean, color, select
  │      ├─► Validation rules (min, max, pattern)
  │      └─► Example : "Load Capacity (kg)", type: number, min: 0
  │
  ├─► [8] Preview 3D
  │      │
  │      ├─► Click "Preview 3D" button
  │      ├─► Modal avec Three.js canvas
  │      ├─► Camera controls : orbit, zoom
  │      ├─► Lighting : sun + ambient
  │      ├─► Material rendering réaliste
  │      └─► Close modal ou Edit pour retourner 2D
  │
  ├─► [9] Validation & Save
  │      │
  │      ├─► Click "Save to Library"
  │      ├─► Modal : Save Block
  │      │     ├─► Name (required)
  │      │     ├─► Description (optional)
  │      │     ├─► Category (select from existing ou create new)
  │      │     ├─► Tags (multi-select)
  │      │     ├─► Visibility : private, team, public
  │      │     └─► Price (optional)
  │      ├─► Validation client-side
  │      │     ├─► Name not empty
  │      │     ├─► Dimensions > 0
  │      │     ├─► At least 1 snap point
  │      │     └─► Valid geometry (closed, no self-intersection)
  │      ├─► Submit → API call POST /api/blocks
  │      ├─► Backend validation
  │      ├─► Generate thumbnail (server-side)
  │      ├─► Save to database
  │      └─► Success notification
  │
  └─► [10] Block Disponible
         │
         ├─► Apparaît dans Library
         ├─► Visible pour Architectes
         ├─► Analytics : usage count = 0
         └─► Return to Dashboard ou Create Another Block
```

### États de l'Interface

```typescript
// Designer Workspace State
interface DesignerWorkspaceState {
  mode: "draw" | "edit_snap_points" | "preview_3d";
  activeTool: "select" | "rectangle" | "circle" | "polygon" | "path";

  // Canvas
  canvas: {
    view: "XY" | "XZ" | "YZ";
    zoom: number;
    pan: Vector2;
    gridVisible: boolean;
    snapEnabled: boolean;
  };

  // Block en cours de création
  currentBlock: Partial<Block>;

  // Validation
  validation: {
    isValid: boolean;
    errors: string[];
  };

  // UI
  panels: {
    properties: boolean;
    preview3D: boolean;
    snapPoints: boolean;
  };
}
```

### Interactions Clés

**1. Drawing Tool Behavior**

```typescript
// Rectangle Tool
onMouseDown(e) {
  startPoint = getCanvasPosition(e);
  isDrawing = true;
}

onMouseMove(e) {
  if (!isDrawing) return;

  currentPoint = getCanvasPosition(e);

  // Snap to grid
  if (snapEnabled) {
    currentPoint = snapToGrid(currentPoint);
  }

  // Preview rectangle
  drawPreviewRectangle(startPoint, currentPoint);
}

onMouseUp(e) {
  if (!isDrawing) return;

  endPoint = getCanvasPosition(e);

  // Create final rectangle
  const rect = createRectangle(startPoint, endPoint);
  addToGeometry(rect);

  isDrawing = false;
}
```

**2. Snap Point Placement**

```typescript
onClickCanvas(e) {
  if (mode !== 'edit_snap_points') return;

  const position = getCanvasPosition(e);

  // Find nearest edge/corner
  const nearest = findNearestSnapLocation(position, geometry);

  if (nearest.distance < SNAP_TOLERANCE) {
    // Place snap point
    const snapPoint = createSnapPoint({
      position: nearest.position,
      type: nearest.type,
      normal: calculateNormal(nearest)
    });

    addSnapPoint(snapPoint);

    // Visual feedback
    highlightSnapPoint(snapPoint);
  }
}
```

**3. Preview 3D**

```typescript
function openPreview3D(block: Partial<Block>) {
  // Convert PixiJS geometry to Three.js
  const geometry = convertPixiToThree(block);
  const material = createThreeMaterial(block.appearance);

  // Create mesh
  const mesh = new THREE.Mesh(geometry, material);

  // Setup scene
  const scene = new THREE.Scene();
  scene.add(mesh);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

  // Setup camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // Render
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(600, 600);

  // Mount in modal
  modalContainer.appendChild(renderer.domElement);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}
```

---

## 🏗️ Workflow Architecte

### Objectif

Assembler des blocs existants pour créer un plan architectural complet.

### Parcours Utilisateur Complet

```
START
  │
  ├─► [1] Dashboard
  │      │
  │      ├─► Voir projets existants (grid/list)
  │      ├─► Filtres : status, date, tags
  │      ├─► Actions : Open, Duplicate, Delete, Export
  │      └─► Cliquer "New Project"
  │
  ├─► [2] Create Project Modal
  │      │
  │      ├─► Project Name (required)
  │      ├─► Description (optional)
  │      ├─► Unit System : metric / imperial
  │      ├─► Default Unit : mm, cm, m, in, ft
  │      ├─► Grid Size (default: 100)
  │      ├─► Template (optional) : blank, house, office
  │      └─► Click "Create"
  │
  ├─► [3] Architect Workspace
  │      │
  │      ├─► Canvas Three.js (2D top-down orthographic)
  │      ├─► Panels : Library, Layers, Properties, History
  │      ├─► Toolbar : Select, Move, Rotate, Scale, etc.
  │      ├─► Bottom Bar : Zoom, Grid, Snap, Coordinates
  │      └─► Layers par défaut créés : Ground, Walls, Roof
  │
  ├─► [4] Browse Library
  │      │
  │      ├─► Library Panel ouverte à gauche
  │      ├─► Categories : expandable tree
  │      ├─► Search bar avec fuzzy search
  │      ├─► Filters : material, dimensions, tags
  │      ├─► View mode : grid (thumbnails) / list
  │      └─► Hover block → tooltip avec preview 3D mini
  │
  ├─► [5] Place Block (Drag & Drop)
  │      │
  │      ├─► Drag block depuis Library
  │      ├─► Hover canvas → cursor change + preview fantôme
  │      ├─► Preview : outline du block, semi-transparent
  │      ├─► Snap automatique activé
  │      │     ├─► Snap to grid (vert)
  │      │     ├─► Snap to other blocks (vert intense)
  │      │     └─► Visual feedback : magnets, guides
  │      ├─► Click pour placer
  │      ├─► Instance créée sur layer actif
  │      └─► Instance sélectionnée automatiquement
  │
  ├─► [6] Transform Instance
  │      │
  │      ├─► Select Tool (V) : click instance
  │      ├─► Bounding box affichée avec handles
  │      ├─► Move Tool (M)
  │      │     ├─► Drag instance
  │      │     ├─► Snap to grid (if enabled)
  │      │     ├─► Snap to other instances (magnetic)
  │      │     ├─► Alignment guides (red lines type Figma)
  │      │     └─► Keyboard : Arrow keys pour nudge (1 unit)
  │      ├─► Rotate Tool (R)
  │      │     ├─► Circular handle autour de l'instance
  │      │     ├─► Drag pour rotate
  │      │     ├─► Snap angles : 15°, 45°, 90° (hold Shift)
  │      │     ├─► Display angle en temps réel
  │      │     └─► Keyboard : [ ] pour rotate ±15°
  │      ├─► Scale Tool (S)
  │      │     ├─► Handles sur bounding box corners
  │      │     ├─► Drag handle pour scale
  │      │     ├─► Uniform scale : drag corner + hold Shift
  │      │     ├─► Axis scale : drag edge handle
  │      │     └─► Keyboard : Cmd + / Cmd - pour scale
  │      └─► Properties Panel
  │            ├─► Numerical inputs pour transform précis
  │            ├─► Position X, Y, Z
  │            ├─► Rotation X, Y, Z
  │            ├─► Scale X, Y, Z (avec lock ratio)
  │            └─► Live update sur canvas
  │
  ├─► [7] Multi-Select
  │      │
  │      ├─► Method 1 : Click + Shift pour add to selection
  │      ├─► Method 2 : Drag rectangle (lasso select)
  │      ├─► Method 3 : Cmd + A (select all visible)
  │      ├─► Visual : tous selectionnés ont outline bleu
  │      ├─► Transform applies to all
  │      ├─► Alignment tools
  │      │     ├─► Align Left / Center / Right
  │      │     ├─► Align Top / Middle / Bottom
  │      │     ├─► Distribute Horizontally / Vertically
  │      │     └─► Smart spacing
  │      └─► Bulk actions
  │            ├─► Duplicate (Cmd + D)
  │            ├─► Delete (Delete key)
  │            ├─► Move to layer (drag to layer panel)
  │            └─► Group (future feature)
  │
  ├─► [8] Layer Management
  │      │
  │      ├─► Layer Panel : tree view
  │      ├─► Actions per layer
  │      │     ├─► Toggle visibility (eye icon)
  │      │     ├─► Toggle lock (lock icon)
  │      │     ├─► Adjust opacity (slider)
  │      │     ├─► Change color (for highlight)
  │      │     └─► Rename (double-click)
  │      ├─► Reorder layers (drag & drop)
  │      ├─► Create nested layers
  │      │     ├─► Example : Walls > Interior > Kitchen
  │      │     └─► Recursive visibility/lock
  │      ├─► Set active layer (click)
  │      ├─► New instances created on active layer
  │      └─► Context menu (right-click)
  │            ├─► New Layer
  │            ├─► Duplicate Layer
  │            ├─► Merge Layers
  │            ├─► Delete Layer
  │            └─► Layer Properties
  │
  ├─► [9] Snap & Alignment
  │      │
  │      ├─► Grid Snap (toggle : G)
  │      │     ├─► Adaptive subdivision on zoom
  │      │     ├─► Major grid lines (thick)
  │      │     ├─► Minor grid lines (thin)
  │      │     └─► Origin indicator (0, 0, 0)
  │      ├─► Block Snap (magnetic snap points)
  │      │     ├─► Proximity detection (within tolerance)
  │      │     ├─► Visual : snap points verts
  │      │     ├─► Auto-connection when snap
  │      │     └─► Connection validation
  │      └─► Alignment Guides (type Figma)
  │            ├─► Red lines quand aligned avec autres instances
  │            ├─► Display distance indicators
  │            ├─► Smart guides pour spacing égal
  │            └─► Guides pour center alignment
  │
  ├─► [10] View Modes
  │      │
  │      ├─► 2D Top (default) : OrthographicCamera, vue dessus
  │      ├─► 2D Front : OrthographicCamera, vue face
  │      ├─► 2D Side : OrthographicCamera, vue côté
  │      ├─► Isometric : OrthographicCamera, angle 45°
  │      ├─► 3D : PerspectiveCamera, full 3D navigation
  │      ├─► Transition smooth entre views
  │      ├─► Keyboard shortcuts : 1 (top), 2 (front), 3 (side), 0 (3D)
  │      └─► ViewMode Toggle button sur toolbar
  │
  ├─► [11] 3D Visualization
  │      │
  │      ├─► Click "3D View" ou shortcut (0)
  │      ├─► Camera transition smooth
  │      ├─► Controls : OrbitControls
  │      │     ├─► Left-click drag : orbit
  │      │     ├─► Right-click drag : pan
  │      │     ├─► Scroll : zoom
  │      │     └─► Touch : pinch to zoom, two-finger rotate
  │      ├─► Lighting
  │      │     ├─► Ambient light (global illumination)
  │      │     ├─► Directional light (sun)
  │      │     ├─► Shadows (optional, performance impact)
  │      │     └─► Environment map (HDRI, optional)
  │      ├─► Materials rendering avancé
  │      │     ├─► PBR materials (roughness, metalness)
  │      │     ├─► Textures
  │      │     ├─► Transparency (glass)
  │      │     └─► Reflections
  │      ├─► Minimap 2D en corner (optional)
  │      └─► Return to 2D : click "2D Top" ou shortcut (1)
  │
  ├─► [12] History (Undo/Redo)
  │      │
  │      ├─► Toute action pushée dans history
  │      ├─► Shortcuts : Cmd + Z (undo), Cmd + Shift + Z (redo)
  │      ├─► History Panel (optional)
  │      │     ├─► List des actions chronologiques
  │      │     ├─► Click action → jump to that state
  │      │     └─► Clear history button
  │      ├─► Max entries : 50 (configurable)
  │      └─► Persist history dans localStorage (optional)
  │
  ├─► [13] Save Project
  │      │
  │      ├─► Auto-save toutes les 30s (debounced)
  │      ├─► Manual save : Cmd + S
  │      ├─► Save indicator : "Saving...", "Saved", "Error"
  │      ├─► API call : PUT /api/projects/:id
  │      ├─► Optimistic update (instant feedback)
  │      └─► Error handling : retry avec exponential backoff
  │
  ├─► [14] Share Project
  │      │
  │      ├─► Click "Share" button (top bar)
  │      ├─► Share Modal
  │      │     ├─► Visibility : Private, Team, Public
  │      │     ├─► Generate Share Link
  │      │     ├─► Password protection (optional)
  │      │     ├─► Expiration date (optional)
  │      │     ├─► Permissions : Allow Comments, Allow Download
  │      │     └─► Copy link button
  │      ├─► Link généré : https://app.com/view/:shareId
  │      └─► Analytics : track views
  │
  └─► [15] Export Project
         │
         ├─► Click "Export" button
         ├─► Export Modal
         │     ├─► Format selector
         │     │     ├─► 3D : GLTF, GLB, OBJ, STL, FBX
         │     │     ├─► 2D : PDF, SVG, PNG, JPEG, DXF
         │     │     └─► Data : JSON
         │     ├─► Options (dépend du format)
         │     │     ├─► 3D : Include textures, Optimize, Scale
         │     │     ├─► 2D : Resolution (DPI), Dimensions, Layers, View angle
         │     │     └─► Common : Metadata, Watermark
         │     ├─► Template selector (pour PDF)
         │     │     ├─► Single view
         │     │     ├─► Multi-view (top, front, side, 3D)
         │     │     └─► With legend, title block
         │     ├─► Preview (optional)
         │     └─► Export button
         ├─► Progress bar (pour gros exports)
         ├─► API call : POST /api/projects/:id/export
         ├─► Backend processing (async job)
         ├─► Download link généré
         └─► Success notification avec download button
```

### États de l'Interface

```typescript
// Architect Workspace State
interface ArchitectWorkspaceState {
  // Canvas
  canvas: {
    viewMode: "2D_top" | "2D_front" | "2D_side" | "isometric" | "3D";
    camera: CameraState;
    rendering: RenderingState;
  };

  // Tools
  activeTool: "select" | "move" | "rotate" | "scale" | "measure";

  // Selection
  selection: {
    selectedIds: string[];
    hoveredId: string | null;
    multiSelectMode: boolean;
  };

  // Transform
  transform: {
    mode: "translate" | "rotate" | "scale";
    handles: {
      visible: boolean;
      positions: Vector3[];
    };
  };

  // Snap
  snap: {
    enabled: boolean;
    tolerance: number;
    activeSnapPoints: SnapPoint[];
    alignmentGuides: AlignmentGuide[];
  };

  // UI
  panels: {
    library: { visible: boolean; width: number };
    layers: { visible: boolean; width: number };
    properties: { visible: boolean; width: number };
    history: { visible: boolean; height: number };
  };
}
```

---

## 👀 Workflow Client

### Objectif

Visualiser le projet final en 3D et exporter si autorisé.

### Parcours Utilisateur

```
START (via shared link)
  │
  ├─► [1] Landing Page
  │      │
  │      ├─► Project thumbnail
  │      ├─► Project name & description
  │      ├─► Created by (Architecte name)
  │      ├─► Stats : instances count, dimensions
  │      └─► "View Project" button
  │
  ├─► [2] Authentication (if private)
  │      │
  │      ├─► Password input (if password-protected)
  │      └─► Submit → verify → grant access
  │
  ├─► [3] Client View Workspace
  │      │
  │      ├─► Canvas Three.js (3D full)
  │      ├─► Simplified UI (minimal chrome)
  │      ├─► Controls : Orbit, Pan, Zoom
  │      ├─► Panels : Layers (simplified), Views, Measure
  │      └─► Top Bar : Project name, Export button (if allowed)
  │
  ├─► [4] Navigation 3D
  │      │
  │      ├─► OrbitControls
  │      │     ├─► Left-click drag : rotate around center
  │      │     ├─► Right-click drag : pan
  │      │     ├─► Scroll : zoom in/out
  │      │     └─► Touch : pinch, swipe
  │      ├─► Camera presets (buttons)
  │      │     ├─► Top View
  │      │     ├─► Front View
  │      │     ├─► Side View
  │      │     ├─► Isometric
  │      │     └─► Reset Camera
  │      ├─► Fullscreen mode (button)
  │      └─► Minimap 2D (corner, optional)
  │
  ├─► [5] Layer Visibility
  │      │
  │      ├─► Layer Panel (read-only)
  │      ├─► Toggle visibility per layer
  │      ├─► Opacity slider per layer (optional)
  │      └─► Visual update instantané sur canvas
  │
  ├─► [6] Advanced Views (optional)
  │      │
  │      ├─► Section Planes
  │      │     ├─► Cut model en X, Y, Z
  │      │     ├─► Slider pour position du plan
  │      │     └─► Voir intérieur du modèle
  │      ├─► Exploded View
  │      │     ├─► Écarter les blocs
  │      │     ├─► Slider pour distance d'explosion
  │      │     └─► Comprendre structure
  │      └─► Walkthrough Mode (future)
  │            ├─► First-person camera
  │            ├─► WASD controls
  │            └─► Immersion totale
  │
  ├─► [7] Measure Tool (optional)
  │      │
  │      ├─► Click "Measure" button
  │      ├─► Click two points → display distance
  │      ├─► Display en unités du projet
  │      └─► Clear measurements button
  │
  ├─► [8] Annotations (optional, if allowed)
  │      │
  │      ├─► Click "Annotate" button
  │      ├─► Click sur modèle → place pin
  │      ├─► Modal : add comment text
  │      ├─► Submit → save annotation
  │      ├─► Visible pour Architecte (notification)
  │      └─► List des annotations dans panel
  │
  ├─► [9] Comments System (optional)
  │      │
  │      ├─► Comments Panel
  │      ├─► List des comments existants
  │      ├─► Add comment button
  │      ├─► Comment thread (nested replies)
  │      └─► Notifications pour Architecte
  │
  └─► [10] Export (if allowed)
         │
         ├─► Click "Export" button (top bar)
         ├─► Export Modal (simplified)
         │     ├─► Formats disponibles : PDF, PNG, GLTF (selon permissions)
         │     ├─► Options limitées (preset templates)
         │     └─► Export button
         ├─► API call → generate export
         ├─► Download link
         └─► Success notification
```

---

## 📊 Flux de Données

### Architecture de Communication

```
┌─────────────────────────────────────────────────┐
│               FRONTEND (React)                  │
│                                                 │
│  ┌──────────┐      ┌──────────┐               │
│  │  Stores  │◄────►│Components│               │
│  │(Zustand) │      │          │               │
│  └────┬─────┘      └──────────┘               │
│       │                                         │
│  ┌────▼─────┐                                  │
│  │API Client│                                  │
│  └────┬─────┘                                  │
└───────┼─────────────────────────────────────────┘
        │
        │ HTTP/REST
        │
┌───────▼─────────────────────────────────────────┐
│               BACKEND (Node.js)                 │
│                                                 │
│  ┌──────────┐      ┌──────────┐               │
│  │   API    │◄────►│ Services │               │
│  │ Routes   │      │          │               │
│  └──────────┘      └────┬─────┘               │
│                          │                      │
│                     ┌────▼─────┐               │
│                     │ Database │               │
│                     │(Postgres)│               │
│                     └──────────┘               │
└─────────────────────────────────────────────────┘
```

### Flow : Create Block

```typescript
// 1. User action (Designer)
const handleSaveBlock = (blockData: Partial<Block>) => {
  createBlock(blockData);
};

// 2. Store action
const createBlock = async (data: Partial<Block>) => {
  set({ isLoading: true });

  try {
    // 3. API call
    const response = await api.post("/blocks", data);
    const block = response.data.block;

    // 4. Update store
    set((state) => ({
      blocks: { ...state.blocks, [block.id]: block },
      isLoading: false,
    }));

    // 5. Side effects
    toast.success("Block created successfully");
    generateThumbnail(block.id);
    trackEvent("block_created", { blockId: block.id });

    // 6. Navigate
    router.push("/library");
  } catch (error) {
    set({ isLoading: false, error: error.message });
    toast.error("Failed to create block");
  }
};
```

### Flow : Place Instance (Architecte)

```typescript
// 1. Drag block from library
onDragStart(blockId) {
  setDragging({ blockId, type: 'block' });
}

// 2. Hover canvas
onDragOver(e) {
  const canvasPos = screenToCanvas(e.clientX, e.clientY);

  // Snap
  const snappedPos = snapEnabled
    ? findSnapPosition(canvasPos)
    : canvasPos;

  // Preview
  setDragPreview({ position: snappedPos, block });
}

// 3. Drop
onDrop(e) {
  const canvasPos = screenToCanvas(e.clientX, e.clientY);
  const snappedPos = findSnapPosition(canvasPos);

  // Create instance
  const instance = {
    id: nanoid(),
    blockId: dragging.blockId,
    transform: {
      position: snappedPos,
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    },
    layerId: activeLayerId,
    state: {
      selected: true,
      locked: false,
      visible: true
    }
  };

  // 4. Update store
  addInstance(instance);

  // 5. History
  pushHistory({
    action: 'instance_add',
    data: instance
  });

  // 6. Side effects
  selectInstance(instance.id);
  trackEvent('instance_placed', { blockId: instance.blockId });
}
```

### Flow : Undo/Redo

```typescript
// History structure
interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
}

// Undo
const undo = () => {
  const { past, future } = get().history;

  if (past.length === 0) return;

  // Pop last entry
  const entry = past[past.length - 1];
  const newPast = past.slice(0, -1);

  // Current state → future
  const currentState = getCurrentState();
  const newFuture = [...future, currentState];

  // Restore state
  restoreState(entry.data);

  // Update history
  set({
    history: {
      past: newPast,
      future: newFuture,
    },
  });
};

// Redo
const redo = () => {
  const { past, future } = get().history;

  if (future.length === 0) return;

  // Pop from future
  const entry = future[future.length - 1];
  const newFuture = future.slice(0, -1);

  // Current state → past
  const currentState = getCurrentState();
  const newPast = [...past, currentState];

  // Restore state
  restoreState(entry.data);

  // Update history
  set({
    history: {
      past: newPast,
      future: newFuture,
    },
  });
};
```

---

## 🎯 Scénarios d'Usage Réels

### Scénario 1 : Créer une Maison

**Rôle : Designer**

```
1. Créer block "Mur Intérieur" (200x250x10 cm)
   - Matériau : Plasterboard
   - Snap points : sur les 4 edges (long)

2. Créer block "Mur Extérieur" (200x250x20 cm)
   - Matériau : Brick
   - Snap points : sur les 4 edges

3. Créer block "Plancher" (400x400x20 cm)
   - Matériau : Concrete
   - Snap points : sur les 4 corners

4. Créer block "Fenêtre" (120x150x10 cm)
   - Matériau : Glass
   - Custom property : "Opening direction" (left/right)

5. Créer block "Porte" (90x210x5 cm)
   - Matériau : Wood
   - Custom property : "Opening direction"
```

**Rôle : Architecte**

```
1. Nouveau projet "Maison Moderne"
   - Unit : meters
   - Grid : 100 cm

2. Layer "Foundation"
   - Placer 4x "Plancher" pour base (snap corners)

3. Layer "Walls" > "Exterior"
   - Placer "Mur Extérieur" en périphérie
   - Snap edges pour former rectangle

4. Layer "Walls" > "Interior"
   - Diviser intérieur avec "Mur Intérieur"
   - Créer rooms : Salon, Cuisine, Chambres

5. Layer "Openings"
   - Placer "Fenêtre" sur murs extérieurs
   - Placer "Porte" entre rooms
   - Aligner height à 0 (ground level)

6. Switch to 3D View
   - Vérifier assemblage
   - Ajuster si collisions

7. Export PDF (multi-view: top, front, side, 3D)
   - Template : architectural plan
   - Include dimensions, legend
```

---

### Scénario 2 : Bureau Open Space

**Designer :**

```
1. Créer "Desk Module" (160x80x75 cm)
2. Créer "Chair" (60x60x110 cm)
3. Créer "Room Divider" (200x200x5 cm)
4. Créer "Meeting Table" (240x120x75 cm)
```

**Architecte :**

```
1. Projet "Open Space Office"
2. Layer "Floor"
3. Layer "Furniture" > "Desks"
   - Placer 20x "Desk Module" en rangées
   - Utiliser Distribute Horizontally pour spacing égal
4. Layer "Furniture" > "Dividers"
   - Placer "Room Divider" entre zones
5. Layer "Meeting Rooms"
   - Placer "Meeting Table" + chairs
6. Export GLTF pour VR walkthrough
```

---

## 🔀 Transitions d'État

### State Machine : Block Lifecycle

```
┌─────────┐
│  DRAFT  │  ◄── Designer en train de créer
└────┬────┘
     │
     │ Save (validation OK)
     ▼
┌──────────┐
│PUBLISHED │  ◄── Disponible dans Library
└────┬─────┘
     │
     ├─► Edit → DRAFT (new version)
     │
     ├─► Archive → ARCHIVED (pas supprimé, caché)
     │
     └─► Delete → DELETED (soft delete)
```

### State Machine : Project Status

```
┌─────────┐
│  DRAFT  │  ◄── Nouveau projet créé
└────┬────┘
     │
     │ Add instances
     ▼
┌────────────┐
│IN_PROGRESS │  ◄── Travail en cours
└─────┬──────┘
      │
      │ Mark as complete
      ▼
┌───────────┐
│ COMPLETED │  ◄── Projet finalisé
└─────┬─────┘
      │
      ├─► Edit → IN_PROGRESS
      │
      ├─► Archive → ARCHIVED
      │
      └─► Delete → DELETED
```

---

## 📝 Récapitulatif Final

### Comparaison Workflows

| Aspect         | Designer            | Architecte            | Client            |
| -------------- | ------------------- | --------------------- | ----------------- |
| **Canvas**     | PixiJS 2D           | Three.js 2D/3D        | Three.js 3D       |
| **Actions**    | Create, Edit blocks | Assemble, Transform   | View only         |
| **Tools**      | Draw, Snap, Preview | Select, Move, Rotate  | Navigate, Measure |
| **Panels**     | Properties, Preview | Library, Layers, Hist | Layers, Views     |
| **Output**     | Blocks → Library    | Project → Export      | Download exports  |
| **Complexity** | Moyen               | High                  | Low               |

---

_Ce document détaille tous les workflows utilisateurs avec interactions précises._

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
