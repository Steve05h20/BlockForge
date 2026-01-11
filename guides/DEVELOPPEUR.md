# 🆘 GUIDE DÉVELOPPEUR - Quand Vous Êtes Embrouillé

> **Ce guide est votre référence rapide quand vous ne savez pas par où commencer ou comment faire quelque chose.**

## 📋 Table des Matières

### 🚨 Situations Courantes

1. ["Je ne sais pas par où commencer"](#je-ne-sais-pas-par-où-commencer)
2. ["Je ne comprends pas l'architecture"](#je-ne-comprends-pas-larchitecture)
3. ["Je ne sais pas quel type TypeScript utiliser"](#je-ne-sais-pas-quel-type-typescript-utiliser)
4. ["Comment créer un nouveau composant ?"](#comment-créer-un-nouveau-composant-)
5. ["Comment créer un nouveau module ?"](#comment-créer-un-nouveau-module-)
6. ["Comment utiliser Zustand pour le state ?"](#comment-utiliser-zustand-pour-le-state-)
7. ["Comment intégrer PixiJS ou Three.js ?"](#comment-intégrer-pixijs-ou-threejs-)
8. ["Comment faire le drag & drop depuis Library ?"](#comment-faire-le-drag--drop-depuis-library-)
9. ["Comment implémenter le snap system ?"](#comment-implémenter-le-snap-system-)
10. ["Comment gérer les layers ?"](#comment-gérer-les-layers-)
11. ["Comment faire l'export (GLTF, PDF) ?"](#comment-faire-lexport-gltf-pdf-)
12. ["Comment tester mon code ?"](#comment-tester-mon-code-)

### 🔍 Autres Sections

- [Références Rapides](#-références-rapides)
- [Troubleshooting](#-troubleshooting)
- [Ressources Additionnelles](#-ressources-additionnelles)

---

## 🚨 Situations Courantes

### "Je ne sais pas par où commencer"

**Solution :**

1. **Lisez d'abord** → [QUICK_START.md](./QUICK_START.md)
2. **Puis** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Roadmap MVP"
3. **Ensuite** → Commencez par la Phase 1 : Foundation

**Ordre de travail :**

```
1. Setup projet (Vite + React + TS)
2. Design system de base
3. Layout avec panels
4. Routing
5. State management structure
```

---

### "Je ne comprends pas l'architecture"

**Solution :**

1. **Vue d'ensemble** → [../docs/SYNTHESE_VISUELLE.md](./../docs/SYNTHESE_VISUELLE.md)
2. **Structure détaillée** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Structure des Dossiers"
3. **Diagrammes** → [../docs/SYNTHESE_VISUELLE.md](./../docs/SYNTHESE_VISUELLE.md) → Section "Architecture en un Coup d'Œil"

**Points clés :**

- **Pages** : Routes principales (Dashboard, Designer, Architect, Client)
- **Modules** : Logique métier (Blocks, Library, Grid & Snap, Layers)
- **Components** : Composants réutilisables (Canvas, Panels, UI)
- **Stores** : State management (Zustand)

---

### "Je ne sais pas quel type TypeScript utiliser"

**Solution :**

1. **Tous les types** → [../docs/DATA_STRUCTURES.md](./../docs/DATA_STRUCTURES.md)
2. **Recherche rapide** :
   - Block → Section "Block System"
   - Project → Section "Project System"
   - Instance → Section "Block Instances"
   - Layer → Section "Layers"

**Exemples rapides :**

```typescript
// Pour un Block
import { Block } from "@/types/block.types";

// Pour un Project
import { Project } from "@/types/project.types";

// Pour une Instance
import { BlockInstance } from "@/types/project.types";

// Pour un Layer
import { Layer } from "@/types/layer.types";
```

---

### "Comment créer un nouveau composant ?"

**Solution :**

1. **Structure** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Structure des Dossiers"
2. **Exemple** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "UI Components"

**Étapes :**

```typescript
// 1. Créer le fichier
// src/components/ui/MyComponent.tsx

// 2. Importer les types
import { Block } from "@/types/block.types";

// 3. Utiliser shadcn/ui si possible
import { Button } from "@/components/ui/button";

// 4. Exporter le composant
export function MyComponent({ block }: { block: Block }) {
  return (
    <div>
      <Button>{block.name}</Button>
    </div>
  );
}
```

**Où placer :**

- **UI components** → `src/components/ui/`
- **Business components** → `src/components/blocks/`, `src/components/panels/`, etc.
- **Page components** → `src/pages/`

---

### "Comment créer un nouveau module ?"

**Solution :**

1. **Pattern** → [../docs/DECISIONS_TECHNIQUES.md](./../docs/DECISIONS_TECHNIQUES.md) → Section "Module Pattern"
2. **Exemple** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Modules Détaillés"

**Étapes :**

```typescript
// 1. Créer le module
// src/modules/my-module/MyModule.ts

export class MyModule {
  // Méthodes publiques
  doSomething(): void {
    // Implementation
  }
}

// 2. Créer les types associés
// src/modules/my-module/types.ts

export interface MyModuleConfig {
  // ...
}

// 3. Exporter depuis index
// src/modules/my-module/index.ts

export { MyModule } from "./MyModule";
export * from "./types";
```

---

### "Comment utiliser Zustand pour le state ?"

**Solution :**

1. **Guide complet** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "State Management"
2. **Exemple** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "State Management"

**Pattern recommandé :**

```typescript
// src/stores/useMyStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface MyStore {
  data: string[];
  addItem: (item: string) => void;
}

export const useMyStore = create<MyStore>()(
  immer((set) => ({
    data: [],
    addItem: (item) => {
      set((state) => {
        state.data.push(item);
      });
    },
  }))
);

// Usage dans un composant
function MyComponent() {
  const data = useMyStore((state) => state.data);
  const addItem = useMyStore((state) => state.addItem);

  return <button onClick={() => addItem("new item")}>Add Item</button>;
}
```

---

### "Comment intégrer PixiJS ou Three.js ?"

**Solution :**

1. **PixiJS** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "2D : PixiJS"
2. **Three.js** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "3D : Three.js"
3. **Conversion** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Transition PixiJS → Three.js"

**PixiJS (Designer) :**

```typescript
// src/components/canvas/PixiCanvas.tsx
import { Application } from "pixi.js";

export function PixiCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();
    app.init({
      width: 800,
      height: 600,
      backgroundColor: 0xf5f5f5,
    });

    canvasRef.current?.appendChild(app.canvas);

    return () => {
      app.destroy(true);
    };
  }, []);

  return <div ref={canvasRef} />;
}
```

**Three.js (Architecte/Client) :**

```typescript
// src/components/canvas/ThreeCanvas.tsx
import { Canvas } from "@react-three/fiber";

export function ThreeCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      {/* Vos meshes ici */}
    </Canvas>
  );
}
```

---

### "Comment faire le drag & drop depuis Library ?"

**Solution :**

1. **Guide** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "Drag & Drop : dnd-kit"
2. **Workflow** → [../docs/WORKFLOWS_DETAILLES.md](./../docs/WORKFLOWS_DETAILLES.md) → Section "Workflow Architecte" → Étape 5

**Exemple :**

```typescript
import { DndContext, useDraggable } from "@dnd-kit/core";

function LibraryPanel() {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over?.id === "canvas") {
      addInstance(active.id); // blockId
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {blocks.map((block) => (
        <DraggableBlock key={block.id} block={block} />
      ))}
    </DndContext>
  );
}

function DraggableBlock({ block }) {
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

### "Comment implémenter le snap system ?"

**Solution :**

1. **Module** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Grid & Snap Module"
2. **Workflow** → [../docs/WORKFLOWS_DETAILLES.md](./../docs/WORKFLOWS_DETAILLES.md) → Section "Workflow Architecte" → Étape 9

**Exemple :**

```typescript
// src/modules/grid-snap/SnapEngine.ts
export class SnapEngine {
  snapToGrid(position: Vector3, gridSize: number): Vector3 {
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize,
      z: Math.round(position.z / gridSize) * gridSize,
    };
  }

  findNearbySnapPoints(
    position: Vector3,
    instances: BlockInstance[],
    tolerance: number
  ): SnapPoint[] {
    // Trouver les snap points dans le rayon de tolérance
    return instances.flatMap((instance) => {
      const block = getBlock(instance.blockId);
      return block.snapPoints
        .map((sp) => ({
          ...sp,
          worldPosition: applyTransform(sp.position, instance.transform),
        }))
        .filter((sp) => {
          const distance = calculateDistance(position, sp.worldPosition);
          return distance < tolerance;
        });
    });
  }
}
```

---

### "Comment gérer les layers ?"

**Solution :**

1. **Module** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Layer Module"
2. **Types** → [../docs/DATA_STRUCTURES.md](./../docs/DATA_STRUCTURES.md) → Section "Layers"
3. **Store** → [../docs/DATA_STRUCTURES.md](./../docs/DATA_STRUCTURES.md) → Section "Layers Store"

**Exemple :**

```typescript
// src/stores/useLayersStore.ts
export const useLayersStore = create<LayersStore>()(
  immer((set) => ({
    layers: {},
    activeLayerId: "default",

    createLayer: (data) => {
      const layer: Layer = {
        id: nanoid(),
        name: data.name || "New Layer",
        visible: true,
        locked: false,
        opacity: 1,
        color: "#0078d4",
        order: 0,
        children: [],
        instanceIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set((state) => {
        state.layers[layer.id] = layer;
      });

      return layer;
    },

    toggleVisibility: (id, recursive = false) => {
      set((state) => {
        const layer = state.layers[id];
        if (layer) {
          layer.visible = !layer.visible;

          if (recursive) {
            layer.children.forEach((childId) => {
              state.layers[childId].visible = layer.visible;
            });
          }
        }
      });
    },
  }))
);
```

---

### "Comment faire l'export (GLTF, PDF) ?"

**Solution :**

1. **Module** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Export Module"
2. **Stack** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "Export"

**Exemple GLTF :**

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

**Exemple PDF :**

```typescript
import jsPDF from "jspdf";

export async function exportToPDF(project: Project): Promise<Blob> {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(project.name, 20, 20);

  const canvas = document.querySelector("canvas");
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 20, 40, 170, 120);

  return doc.output("blob");
}
```

---

### "Comment tester mon code ?"

**Solution :**

1. **Setup** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md) → Section "Testing"
2. **Best practices** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Best Practices"

**Unit Test (Vitest) :**

```typescript
// src/modules/blocks/__tests__/BlocksModule.test.ts
import { describe, it, expect } from "vitest";
import { BlocksModule } from "../BlocksModule";

describe("BlocksModule", () => {
  it("should create a block", () => {
    const module = new BlocksModule();
    const block = module.createBlock({
      name: "Test Block",
      geometry: {
        type: "box",
        dimensions: { width: 100, height: 50, depth: 20 },
      },
    });

    expect(block.name).toBe("Test Block");
    expect(block.id).toBeDefined();
  });
});
```

**E2E Test (Playwright) :**

```typescript
// e2e/designer.spec.ts
import { test, expect } from "@playwright/test";

test("should create a block", async ({ page }) => {
  await page.goto("http://localhost:5173/designer");
  await page.click('button:has-text("New Block")');
  await page.fill('input[name="name"]', "Test Block");
  await page.click('button:has-text("Save")');

  await expect(page.locator(".block-card")).toContainText("Test Block");
});
```

---

## 🔍 Références Rapides

### Chemins de Fichiers

```
src/
├── app/                    # Application core
├── pages/                  # Pages (Dashboard, Designer, Architect, Client)
├── modules/                # Modules métier
│   ├── blocks/
│   ├── library/
│   ├── grid-snap/
│   └── layers/
├── components/             # Composants réutilisables
│   ├── canvas/
│   ├── blocks/
│   ├── panels/
│   └── ui/
├── stores/                 # Zustand stores
├── hooks/                  # Custom hooks
├── utils/                  # Utilitaires
└── types/                  # Types TypeScript
```

### Imports Courants

```typescript
// Types
import { Block } from "@/types/block.types";
import { Project } from "@/types/project.types";
import { BlockInstance } from "@/types/project.types";

// Stores
import { useBlocksStore } from "@/stores/useBlocksStore";
import { useProjectStore } from "@/stores/useProjectStore";

// Components
import { Button } from "@/components/ui/button";
import { PropertiesPanel } from "@/components/panels/PropertiesPanel";

// Utils
import { calculateBounds } from "@/utils/geometry/bounds";
```

### Commandes Utiles

```bash
# Dev
pnpm run dev

# Build
pnpm run build

# Test
pnpm run test
pnpm run test:e2e

# Lint
pnpm run lint

# Type check
pnpm run type-check
```

---

## 🆘 Troubleshooting

### "Le canvas ne s'affiche pas"

**Vérifications :**

1. Container a-t-il une taille ? (`width` et `height`)
2. PixiJS/Three.js initialisé correctement ?
3. Canvas ajouté au DOM ?
4. Erreurs dans la console ?

**Solution :**

```typescript
// Vérifier que le container a une taille
useEffect(() => {
  if (!containerRef.current) return;

  const { width, height } = containerRef.current.getBoundingClientRect();
  if (width === 0 || height === 0) {
    console.error("Container has no size!");
    return;
  }

  // Initialiser canvas
}, []);
```

---

### "Le state ne se met pas à jour"

**Vérifications :**

1. Utilisez-vous un selector shallow ?
2. Le store est-il bien configuré ?
3. Immer middleware activé ?

**Solution :**

```typescript
// ❌ BAD : Re-render à chaque changement
const { data, updateData } = useMyStore();

// ✅ GOOD : Shallow selector
const data = useMyStore((state) => state.data);
const updateData = useMyStore((state) => state.updateData);
```

---

### "Les types TypeScript ne sont pas reconnus"

**Vérifications :**

1. Fichier `tsconfig.json` correct ?
2. Paths alias configurés ?
3. Types exportés correctement ?

**Solution :**

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

---

### "Le drag & drop ne fonctionne pas"

**Vérifications :**

1. `DndContext` enveloppe-t-il les éléments ?
2. `useDraggable` et `useDroppable` correctement configurés ?
3. IDs uniques ?

**Solution :**

```typescript
// Vérifier que DndContext est au bon niveau
<DndContext onDragEnd={handleDragEnd}>
  <DraggableItem id="item-1" />
  <DroppableZone id="drop-zone" />
</DndContext>
```

---

## 📚 Ressources Additionnelles

### Documentation Externe

- **React** : https://react.dev/
- **TypeScript** : https://www.typescriptlang.org/docs/
- **PixiJS** : https://pixijs.com/8.x/guides
- **Three.js** : https://threejs.org/docs/
- **Zustand** : https://docs.pmnd.rs/zustand/
- **Vite** : https://vitejs.dev/guide/

### Documents de Référence

- **Architecture complète** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md)
- **Types TypeScript** → [../docs/DATA_STRUCTURES.md](./../docs/DATA_STRUCTURES.md)
- **Stack technique** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md)
- **Workflows** → [../docs/WORKFLOWS_DETAILLES.md](./../docs/WORKFLOWS_DETAILLES.md)

---

**Si vous êtes toujours embrouillé, consultez [QUICK_START.md](./QUICK_START.md) pour savoir quoi faire maintenant !**

---

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
