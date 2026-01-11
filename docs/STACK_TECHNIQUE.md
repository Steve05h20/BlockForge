# 🛠️ STACK TECHNIQUE DÉTAILLÉE

## Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Frontend Stack](#frontend-stack)
3. [Librairies Rendering](#librairies-rendering)
4. [State Management](#state-management)
5. [UI Components](#ui-components)
6. [Utilities & Tools](#utilities--tools)
7. [Testing](#testing)
8. [Build & Deployment](#build--deployment)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Comparaison des Alternatives](#comparaison-des-alternatives)

---

## 🎯 Vue d'ensemble

### Philosophie de Choix

```
┌──────────────────────────────────────────────────┐
│   PRIORITÉS                                      │
├──────────────────────────────────────────────────┤
│ 1. Performance (60fps 2D, 30fps 3D)             │
│ 2. Developer Experience (TypeScript, devtools)   │
│ 3. Scalabilité (10,000+ blocks, 5,000+ instances)│
│ 4. Ecosystem & Community                         │
│ 5. Maintenance & Long-term support              │
└──────────────────────────────────────────────────┘
```

### Architecture Globale

```
┌─────────────────────────────────────────────────┐
│              USER INTERFACE                     │
│         (React + TypeScript)                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┐        ┌─────────────┐       │
│  │   PixiJS    │        │  Three.js   │       │
│  │  (Designer) │   →    │ (Architect) │       │
│  └─────────────┘        └─────────────┘       │
│                                                 │
├─────────────────────────────────────────────────┤
│          STATE MANAGEMENT                       │
│             (Zustand)                           │
├─────────────────────────────────────────────────┤
│          DATA LAYER                             │
│    (API Client + Cache)                         │
└─────────────────────────────────────────────────┘
```

---

## ⚛️ Frontend Stack

### Core Framework : React 18+

**Choix : React 18.2+**

**Rationale :**

- ✅ Concurrent features (Suspense, Transitions)
- ✅ Automatic batching (performance)
- ✅ Excellent ecosystem
- ✅ TypeScript support first-class
- ✅ React Three Fiber (integration Three.js)

**Package :**

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

**Alternatives considérées :**

- Vue 3 : bon, mais ecosystem 3D moins mature
- Svelte : excellent performance, mais ecosystem plus petit
- Solid : très performant, mais communauté limitée

---

### Language : TypeScript 5+

**Choix : TypeScript 5.3+**

**Rationale :**

- ✅ Type safety critique pour géométrie 3D
- ✅ Excellent DX avec autocomplete
- ✅ Refactoring safe
- ✅ Documentation as code

**Configuration :**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@modules/*": ["./src/modules/*"],
      "@stores/*": ["./src/stores/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

---

### Build Tool : Vite

**Choix : Vite 5+**

**Rationale :**

- ✅ Hot Module Replacement ultra-rapide
- ✅ Build optimisé (Rollup)
- ✅ Plugin ecosystem riche
- ✅ TypeScript native

**Configuration :**

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  optimizeDeps: {
    include: ["three", "pixi.js"],
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "pixi-vendor": ["pixi.js"],
        },
      },
    },
  },
});
```

**Alternatives :**

- Webpack : plus lent, config complexe
- Parcel : moins de contrôle

---

## 🎨 Librairies Rendering

### 2D : PixiJS 8.x

**Choix : PixiJS 8.0+**

**Rationale :**

- ✅ Performance exceptionnelle (WebGL)
- ✅ API simple et intuitive
- ✅ Sprite batching automatique
- ✅ Plugin ecosystem riche
- ✅ Perfect pour Designer mode (2D editing)

**Installation :**

```bash
pnpm add pixi.js @pixi/react
```

**Usage Example :**

```typescript
import { Application, Graphics } from "pixi.js";

class PixiCanvasManager {
  private app: Application;

  async init(container: HTMLElement) {
    this.app = new Application();
    await this.app.init({
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: 0xf5f5f5,
      antialias: true,
      resolution: window.devicePixelRatio,
    });

    container.appendChild(this.app.canvas);
  }

  drawBlock(block: Block) {
    const graphics = new Graphics();
    graphics.rect(
      0,
      0,
      block.geometry.dimensions.width,
      block.geometry.dimensions.height
    );
    graphics.fill(block.appearance.color);

    this.app.stage.addChild(graphics);
  }
}
```

**Optimizations :**

```typescript
// Sprite batching pour blocks identiques
const spritePool = new Map<string, Sprite[]>();

// Object pooling
class ObjectPool<T> {
  private pool: T[] = [];

  acquire(factory: () => T): T {
    return this.pool.pop() || factory();
  }

  release(obj: T): void {
    this.pool.push(obj);
  }
}

// Culling : ne render que viewport visible
const visibleInstances = instances.filter((instance) =>
  isInViewport(instance.transform.position, viewport)
);
```

**Alternatives :**

- Konva : React-friendly, mais moins performant
- Fabric.js : bon pour editing, mais moins optimisé
- Canvas API natif : trop low-level

---

### 3D : Three.js + React Three Fiber

**Choix : Three.js r160+ avec React Three Fiber**

**Rationale :**

- ✅ Standard de facto pour 3D web
- ✅ React Three Fiber : integration React parfaite
- ✅ Énorme ecosystem (loaders, controls, helpers)
- ✅ Performance excellente
- ✅ Support GLTF, OBJ, STL, etc.

**Installation :**

```bash
pnpm add three @react-three/fiber @react-three/drei
pnpm add -D @types/three
```

**Usage Example :**

```typescript
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function ArchitectCanvas() {
  return (
    <Canvas>
      <PerspectiveCamera position={[10, 10, 10]} />
      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />

      {instances.map((instance) => (
        <BlockMesh key={instance.id} instance={instance} />
      ))}
    </Canvas>
  );
}

function BlockMesh({ instance }: { instance: BlockInstance }) {
  const block = useBlock(instance.blockId);

  return (
    <mesh
      position={instance.transform.position}
      rotation={instance.transform.rotation}
      scale={instance.transform.scale}
    >
      <boxGeometry
        args={[
          block.geometry.dimensions.width,
          block.geometry.dimensions.height,
          block.geometry.dimensions.depth,
        ]}
      />
      <meshStandardMaterial
        color={block.appearance.color}
        roughness={0.5}
        metalness={0.2}
      />
    </mesh>
  );
}
```

**Optimizations :**

```typescript
// InstancedMesh pour blocks identiques
import { InstancedMesh } from "three";

function OptimizedBlockRenderer({ instances }: Props) {
  const meshRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    instances.forEach((instance, i) => {
      const matrix = new Matrix4();
      matrix.compose(
        instance.transform.position,
        instance.transform.rotation,
        instance.transform.scale
      );

      meshRef.current!.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instances]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, instances.length]}>
      <boxGeometry />
      <meshStandardMaterial />
    </instancedMesh>
  );
}

// LOD (Level of Detail)
import { LOD } from "three";

const lod = new LOD();
lod.addLevel(highDetailMesh, 0);
lod.addLevel(mediumDetailMesh, 50);
lod.addLevel(lowDetailMesh, 100);
```

**Alternatives :**

- Babylon.js : plus complet, mais moins flexible
- PlayCanvas : gaming-oriented
- A-Frame : trop haut niveau

---

## 🗄️ State Management

### Choix : Zustand

**Choix : Zustand 4+**

**Rationale :**

- ✅ API simple et intuitive
- ✅ Performance excellente (pas de Context)
- ✅ DevTools support
- ✅ Middleware riche (persist, immer, devtools)
- ✅ TypeScript first-class

**Installation :**

```bash
pnpm add zustand immer
```

**Example Store :**

```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ProjectStore {
  currentProject: Project | null;
  projects: Project[];

  loadProject: (id: string) => Promise<void>;
  saveProject: () => Promise<void>;
  updateProjectConfig: (config: Partial<ProjectConfig>) => void;
}

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        currentProject: null,
        projects: [],

        loadProject: async (id) => {
          const project = await api.getProject(id);
          set({ currentProject: project });
        },

        saveProject: async () => {
          const { currentProject } = get();
          if (!currentProject) return;

          await api.updateProject(currentProject.id, currentProject);
        },

        updateProjectConfig: (config) => {
          set((state) => {
            if (!state.currentProject) return;
            state.currentProject.config = {
              ...state.currentProject.config,
              ...config,
            };
          });
        },
      })),
      { name: "project-store" }
    )
  )
);

// Usage
function ProjectSettings() {
  const config = useProjectStore((state) => state.currentProject?.config);
  const updateConfig = useProjectStore((state) => state.updateProjectConfig);

  return (
    <div>
      <input
        value={config?.gridSize}
        onChange={(e) => updateConfig({ gridSize: Number(e.target.value) })}
      />
    </div>
  );
}
```

**Performance Tips :**

```typescript
// ❌ BAD : Re-render à chaque changement de state
const { currentProject, projects, loadProject } = useProjectStore();

// ✅ GOOD : Shallow selector
const currentProject = useProjectStore((state) => state.currentProject);
const loadProject = useProjectStore((state) => state.loadProject);

// ✅ BETTER : Shallow equality
import { shallow } from "zustand/shallow";

const { currentProject, loadProject } = useProjectStore(
  (state) => ({
    currentProject: state.currentProject,
    loadProject: state.loadProject,
  }),
  shallow
);
```

**Alternatives :**

- Redux Toolkit : plus verbeux, overkill pour ce projet
- Jotai : atoms-based, moins naturel pour big objects
- Recoil : Meta-backed, mais moins mature

---

## 🎨 UI Components

### Design System : Radix UI + shadcn/ui

**Choix : Radix UI primitives + shadcn/ui**

**Rationale :**

- ✅ Headless components (full styling control)
- ✅ Accessibility built-in (ARIA, keyboard nav)
- ✅ shadcn : copy-paste components (no dependency)
- ✅ TailwindCSS integration parfaite

**Installation :**

```bash
# shadcn/ui init
pnpx shadcn-ui@latest init

# Add components
pnpx shadcn-ui@latest add button
pnpx shadcn-ui@latest add input
pnpx shadcn-ui@latest add select
pnpx shadcn-ui@latest add dialog
pnpx shadcn-ui@latest add dropdown-menu
```

**Example Custom Component :**

```typescript
// components/ui/PropertiesPanel.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function PropertiesPanel({ instance }: Props) {
  const block = useBlock(instance.blockId);
  const updateTransform = useInstancesStore((state) => state.updateTransform);

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>Position X</Label>
        <Input
          type="number"
          value={instance.transform.position.x}
          onChange={(e) =>
            updateTransform(instance.id, {
              position: {
                ...instance.transform.position,
                x: Number(e.target.value),
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Material</Label>
        <Select
          value={block.appearance.material.type}
          onValueChange={(value) => updateBlockMaterial(block.id, value)}
        >
          <option value="plastic">Plastic</option>
          <option value="wood">Wood</option>
          <option value="metal">Metal</option>
        </Select>
      </div>
    </div>
  );
}
```

**Styling : TailwindCSS**

```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p
```

```typescript
// tailwind.config.js
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        // ... theme colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Alternatives :**

- Material UI : trop opinionated
- Chakra UI : bon, mais moins flexible
- Ant Design : design trop spécifique

---

### Docking System : rc-dock

**Choix : rc-dock**

**Rationale :**

- ✅ Panels dockable type VS Code
- ✅ Drag & drop native
- ✅ Persist layout
- ✅ TypeScript support

**Installation :**

```bash
pnpm add rc-dock
```

**Usage :**

```typescript
import DockLayout from "rc-dock";

const defaultLayout = {
  dockbox: {
    mode: "horizontal",
    children: [
      {
        mode: "vertical",
        size: 300,
        children: [
          {
            tabs: [
              { id: "library", title: "Library", content: <LibraryPanel /> },
            ],
          },
          {
            tabs: [{ id: "layers", title: "Layers", content: <LayerPanel /> }],
          },
        ],
      },
      {
        size: 800,
        tabs: [{ id: "canvas", title: "Canvas", content: <CanvasWrapper /> }],
      },
      {
        size: 300,
        tabs: [
          {
            id: "properties",
            title: "Properties",
            content: <PropertiesPanel />,
          },
        ],
      },
    ],
  },
};

function Workspace() {
  return <DockLayout defaultLayout={defaultLayout} />;
}
```

**Alternative :**

- react-mosaic : bon, mais moins flexible
- golden-layout : obsolète

---

### Drag & Drop : dnd-kit

**Choix : dnd-kit**

**Rationale :**

- ✅ Performance (no React DnD overhead)
- ✅ Accessibility built-in
- ✅ Touch support
- ✅ Sortable lists

**Installation :**

```bash
pnpm add @dnd-kit/core @dnd-kit/sortable
```

**Usage :**

```typescript
import { DndContext, useDraggable } from "@dnd-kit/core";

function LibraryPanel() {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over?.id === "canvas") {
      // Drop block on canvas
      addInstance(active.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        {blocks.map((block) => (
          <DraggableBlock key={block.id} block={block} />
        ))}
      </div>

      <CanvasDropzone id="canvas" />
    </DndContext>
  );
}

function DraggableBlock({ block }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: block.id,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <BlockThumbnail block={block} />
    </div>
  );
}
```

---

## 🔧 Utilities & Tools

### Geometry : mathjs + Custom Utils

**Math Library : mathjs**

```bash
pnpm add mathjs
```

**Custom Geometry Utils :**

```typescript
// utils/geometry/bounds.ts
export function calculateBounds(vertices: Vector3[]): BoundingBox {
  const min = { x: Infinity, y: Infinity, z: Infinity };
  const max = { x: -Infinity, y: -Infinity, z: -Infinity };

  vertices.forEach((v) => {
    min.x = Math.min(min.x, v.x);
    min.y = Math.min(min.y, v.y);
    min.z = Math.min(min.z, v.z);
    max.x = Math.max(max.x, v.x);
    max.y = Math.max(max.y, v.y);
    max.z = Math.max(max.z, v.z);
  });

  return {
    min,
    max,
    center: {
      x: (min.x + max.x) / 2,
      y: (min.y + max.y) / 2,
      z: (min.z + max.z) / 2,
    },
    size: {
      x: max.x - min.x,
      y: max.y - min.y,
      z: max.z - min.z,
    },
  };
}

// utils/geometry/intersection.ts
export function boundingBoxIntersects(a: BoundingBox, b: BoundingBox): boolean {
  return (
    a.min.x <= b.max.x &&
    a.max.x >= b.min.x &&
    a.min.y <= b.max.y &&
    a.max.y >= b.min.y &&
    a.min.z <= b.max.z &&
    a.max.z >= b.min.z
  );
}

// utils/geometry/transforms.ts
export function applyTransform(point: Vector3, transform: Transform): Vector3 {
  // Apply scale
  let result = {
    x: point.x * transform.scale.x,
    y: point.y * transform.scale.y,
    z: point.z * transform.scale.z,
  };

  // Apply rotation (simplified, use quaternion in prod)
  result = rotatePoint(result, transform.rotation);

  // Apply translation
  result = {
    x: result.x + transform.position.x,
    y: result.y + transform.position.y,
    z: result.z + transform.position.z,
  };

  return result;
}
```

---

### Forms : React Hook Form + Zod

**Choix : React Hook Form + Zod**

**Rationale :**

- ✅ Performance (uncontrolled forms)
- ✅ Zod : schema validation puissante
- ✅ TypeScript inference automatique

**Installation :**

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

**Usage :**

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const blockSchema = z.object({
  name: z.string().min(1, "Name required"),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    depth: z.number().positive(),
  }),
  material: z.enum(["plastic", "wood", "metal", "glass"]),
});

type BlockFormData = z.infer<typeof blockSchema>;

function BlockForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlockFormData>({
    resolver: zodResolver(blockSchema),
  });

  const onSubmit = (data: BlockFormData) => {
    createBlock(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        type="number"
        {...register("dimensions.width", { valueAsNumber: true })}
      />
      {errors.dimensions?.width && (
        <span>{errors.dimensions.width.message}</span>
      )}

      {/* ... */}
    </form>
  );
}
```

---

### Search : Fuse.js

**Choix : Fuse.js**

**Rationale :**

- ✅ Fuzzy search performant
- ✅ Configurable (weights, thresholds)
- ✅ No backend needed

**Installation :**

```bash
pnpm add fuse.js
```

**Usage :**

```typescript
import Fuse from "fuse.js";

const fuseOptions = {
  keys: ["name", "description", "metadata.tags", "metadata.category"],
  threshold: 0.3,
  includeScore: true,
};

export function useBlockSearch(blocks: Block[], query: string) {
  const fuse = useMemo(() => new Fuse(blocks, fuseOptions), [blocks]);

  return useMemo(() => {
    if (!query) return blocks;

    const results = fuse.search(query);
    return results.map((result) => result.item);
  }, [query, fuse]);
}
```

---

### Export : jsPDF + Three.js Exporters

**2D Export : jsPDF**

```bash
pnpm add jspdf
```

```typescript
import jsPDF from "jspdf";

export async function exportToPDF(project: Project): Promise<Blob> {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text(project.name, 20, 20);

  // Render canvas to image
  const canvas = document.querySelector("canvas");
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 20, 40, 170, 120);

  // Metadata
  doc.setFontSize(12);
  doc.text(`Blocks: ${project.metadata.stats.instanceCount}`, 20, 180);

  return doc.output("blob");
}
```

**3D Export : Three.js Exporters**

```bash
pnpm add three-stdlib
```

```typescript
import { GLTFExporter } from "three-stdlib";

export async function exportToGLTF(scene: THREE.Scene): Promise<Blob> {
  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], {
          type: "application/json",
        });
        resolve(blob);
      },
      (error) => reject(error),
      { binary: false }
    );
  });
}
```

---

## 🧪 Testing

### Unit Testing : Vitest

**Choix : Vitest**

**Rationale :**

- ✅ Vite-native (même config)
- ✅ Jest-compatible API
- ✅ Fast (ESM native)

**Installation :**

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Configuration :**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

**Example Test :**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlockComponent } from "./BlockComponent";

describe("BlockComponent", () => {
  it("renders block with correct dimensions", () => {
    const block = createMockBlock({
      dimensions: { width: 100, height: 50, depth: 20 },
    });

    render(<BlockComponent block={block} />);

    expect(screen.getByText(/100 x 50 x 20/)).toBeInTheDocument();
  });
});
```

---

### E2E Testing : Playwright

**Choix : Playwright**

**Rationale :**

- ✅ Multi-browser (Chrome, Firefox, Safari)
- ✅ Auto-wait (no flaky tests)
- ✅ Screenshot & video recording

**Installation :**

```bash
pnpm add -D @playwright/test
pnpx playwright install
```

**Example E2E Test :**

```typescript
import { test, expect } from "@playwright/test";

test("designer workflow", async ({ page }) => {
  await page.goto("http://localhost:5173/designer");

  // Create new block
  await page.click('button:has-text("New Block")');

  // Set dimensions
  await page.fill('input[name="width"]', "100");
  await page.fill('input[name="height"]', "50");

  // Choose color
  await page.click('input[type="color"]');
  await page.fill('input[type="color"]', "#3498db");

  // Save
  await page.click('button:has-text("Save")');

  // Verify block in library
  await page.goto("http://localhost:5173/library");
  await expect(page.locator(".block-card")).toHaveCount(1);
});
```

---

## 🚀 Build & Deployment

### Hosting : Vercel

**Choix : Vercel**

**Rationale :**

- ✅ Zero-config pour Vite
- ✅ Edge Network (performance)
- ✅ Preview deployments (PR)
- ✅ Analytics built-in

**Configuration :**

```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Alternative :**

- Netlify : similaire, légèrement moins rapide
- Cloudflare Pages : bon, mais moins de features

---

### CI/CD : GitHub Actions

**Workflow :**

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm run test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 📊 Monitoring & Analytics

### Error Tracking : Sentry

**Installation :**

```bash
pnpm add @sentry/react
```

**Configuration :**

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Error boundary
function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Router />
    </Sentry.ErrorBoundary>
  );
}
```

---

### Analytics : Mixpanel

**Installation :**

```bash
pnpm add mixpanel-browser
```

**Usage :**

```typescript
import mixpanel from "mixpanel-browser";

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);

// Track events
export function trackEvent(name: string, properties?: Record<string, any>) {
  mixpanel.track(name, properties);
}

// Usage
trackEvent("block_created", {
  blockType: "box",
  category: "walls",
  dimensions: { width: 100, height: 50, depth: 20 },
});
```

---

## ⚖️ Comparaison des Alternatives

### State Management

| Library       | Performance | DX         | DevTools   | Ecosystem  | Verdict                 |
| ------------- | ----------- | ---------- | ---------- | ---------- | ----------------------- |
| Zustand       | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   | ⭐⭐⭐⭐   | ✅ **Choisi**           |
| Redux Toolkit | ⭐⭐⭐⭐    | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Overkill                |
| Jotai         | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐   | ⭐⭐⭐     | ⭐⭐⭐     | Bon, mais moins naturel |
| Recoil        | ⭐⭐⭐⭐    | ⭐⭐⭐⭐   | ⭐⭐⭐⭐   | ⭐⭐⭐     | Moins mature            |

---

### Rendering Engines

| Library      | Performance 2D | Performance 3D | API Simplicity | Ecosystem  | Verdict              |
| ------------ | -------------- | -------------- | -------------- | ---------- | -------------------- |
| **PixiJS**   | ⭐⭐⭐⭐⭐     | N/A            | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐   | ✅ **2D**            |
| Konva        | ⭐⭐⭐⭐       | N/A            | ⭐⭐⭐⭐⭐     | ⭐⭐⭐     | Bon, mais moins perf |
| **Three.js** | N/A            | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐       | ⭐⭐⭐⭐⭐ | ✅ **3D**            |
| Babylon.js   | N/A            | ⭐⭐⭐⭐⭐     | ⭐⭐⭐         | ⭐⭐⭐⭐   | Trop complet         |

---

### UI Libraries

| Library       | Customization | Accessibility | Bundle Size | DX         | Verdict                  |
| ------------- | ------------- | ------------- | ----------- | ---------- | ------------------------ |
| **shadcn/ui** | ⭐⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐ | ✅ **Choisi**            |
| Material UI   | ⭐⭐⭐        | ⭐⭐⭐⭐⭐    | ⭐⭐⭐      | ⭐⭐⭐⭐   | Trop opinionated         |
| Chakra UI     | ⭐⭐⭐⭐      | ⭐⭐⭐⭐⭐    | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐ | Bon, mais moins flexible |
| Ant Design    | ⭐⭐⭐        | ⭐⭐⭐⭐      | ⭐⭐        | ⭐⭐⭐     | Design trop spécifique   |

---

## 📦 Package.json Final

```json
{
  "name": "modular-builder",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",

    "pixi.js": "^8.0.0",
    "@pixi/react": "^7.1.0",

    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.90.0",
    "three-stdlib": "^2.28.0",

    "zustand": "^4.4.7",
    "immer": "^10.0.3",

    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slider": "^1.1.2",

    "rc-dock": "^3.2.18",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",

    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.3",

    "fuse.js": "^7.0.0",
    "mathjs": "^12.2.0",
    "jspdf": "^2.5.1",

    "@sentry/react": "^7.91.0",
    "mixpanel-browser": "^2.48.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@types/three": "^0.160.0",

    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",

    "typescript": "^5.3.3",

    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "tailwindcss-animate": "^1.0.7",

    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint-plugin-react-hooks": "^4.6.0",

    "vitest": "^1.1.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "jsdom": "^23.0.1",

    "@playwright/test": "^1.40.1"
  }
}
```

---

_Ce document détaille la stack technique complète avec rationale et alternatives._

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
