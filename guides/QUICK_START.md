# ⚡ WORKFLOW QUICK START - Savoir Quoi Faire Maintenant

> **Ce guide vous dit exactement quoi faire à chaque étape du développement.**

## 📋 Table des Matières

### 🎯 Checklist par Phase

1. [Phase 1 : Foundation](#-phase-1--foundation)
2. [Phase 2 : Designer Mode](#-phase-2--designer-mode)
3. [Phase 3 : Library](#-phase-3--library)
4. [Phase 4 : Architect Mode](#-phase-4--architect-mode)
5. [Phase 5 : 3D Visualization](#-phase-5--3d-visualization)
6. [Phase 6 : Client View & Export](#-phase-6--client-view--export)
7. [Phase 7 : Polish & Testing](#-phase-7--polish--testing)
8. [Phase 8 : Deployment](#-phase-8--deployment)

### 📅 Autres Sections

- [Workflow Quotidien Recommandé](#-workflow-quotidien-recommandé)
- [Priorités par Situation](#-priorités-par-situation)
- [Checklist Générale](#-checklist-générale)
- [Références Rapides](#-références-rapides)
- [Ordre de Priorité des Phases](#-ordre-de-priorité-des-phases)

---

## 🎯 Checklist par Phase

### ✅ Phase 1 : Foundation

**Objectif :** Setup projet et structure de base

#### Étape 1.1 : Setup Projet

- [x] Créer repo Git
- [x] `pnpm create vite . --template react-ts`
- [x] Installer dépendances de base (voir [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md))
- [x] Configurer `tsconfig.json`
- [x] Configurer `vite.config.ts` avec paths alias
- [x] Setup ESLint + Prettier

#### Étape 1.2 : Design System

- [x] Installer TailwindCSS
- [x] Installer shadcn/ui
- [x] Créer thème (dark/light)
- [x] Créer composants UI de base (Button, Input, Select)
- [ ] Documenter dans Storybook (optionnel)

#### Étape 1.3 : Layout

- [x] Installer rc-dock
- [x] Créer layout principal avec panels dockable
- [x] Créer Topbar, Bottom Bar
- [x] Tester responsive - destop first

#### Étape 1.4 : Routing

- [x] Installer React Router
- [x] Créer routes (Dashboard, Designer, Architect, Client, Library, Settings)
- [x] Créer ProtectedRoute component
- [x] Tester navigation/header

#### Étape 1.5 : State Management

- [x] Installer Zustand + Immer
- [ ] Créer stores de base (Project, Blocks, Instances, Layers, Selection, UI)
- [ ] Configurer persist middleware
- [ ] Tester stores

#### Étape 1.6 : Auth (mock ou Firebase)

- [ ] Créer AuthProvider
- [ ] Créer login/logout
- [ ] Gérer rôles (Designer, Architecte, Client)
- [ ] Tester permissions

#### Étape 1.7 : Polish Foundation

- [ ] Error boundaries
- [ ] Loading states
- [ ] Toast notifications
- [ ] Tests unitaires de base
- [ ] CI/CD setup (GitHub Actions)

**Livrables :** Projet fonctionnel avec routing, state, layout, auth

---

### ✅ Phase 2 : Designer Mode

**Objectif :** Canvas PixiJS et création de blocs

#### Étape 2.1 : PixiJS Setup

- [ ] Installer PixiJS
- [ ] Créer `PixiCanvas` component
- [ ] Initialiser Application PixiJS
- [ ] Gérer resize et cleanup
- [ ] Tester canvas basique

#### Étape 2.2 : Drawing Tools

- [ ] Créer Rectangle tool
- [ ] Créer Circle tool
- [ ] Créer Polygon tool (optionnel)
- [ ] Gérer mouse events (down, move, up)
- [ ] Preview en temps réel

#### Étape 2.3 : Grid & Snap

- [ ] Afficher grille
- [ ] Snap to grid
- [ ] Toggle grid visibility

#### Étape 2.4 : Properties Panel

- [ ] Créer PropertiesPanel component
- [ ] Inputs pour dimensions (width, height, depth)
- [ ] Color picker
- [ ] Material selector
- [ ] Opacity slider
- [ ] Live update sur canvas

#### Étape 2.5 : Blocks Module

- [ ] Créer `BlocksModule` class
- [ ] CRUD operations (create, read, update, delete)
- [ ] Validation (Zod schemas)
- [ ] Intégrer avec `useBlocksStore`
- [ ] Tests unitaires

#### Étape 2.6 : Snap Points

- [ ] Mode "Edit Snap Points"
- [ ] Placer snap points sur edges/corners
- [ ] Visual feedback (points verts)
- [ ] Sauvegarder dans Block

#### Étape 2.7 : Preview 3D

- [ ] Installer Three.js + React Three Fiber
- [ ] Créer modal Preview3D
- [ ] Convertir PixiJS geometry → Three.js
- [ ] Afficher block en 3D
- [ ] Camera controls (orbit, zoom)

#### Étape 2.8 : Save to Library

- [ ] Créer modal "Save Block"
- [ ] Form (name, description, category, tags)
- [ ] Validation
- [ ] API call (mock ou réel)
- [ ] Success notification
- [ ] Générer thumbnail

#### Étape 2.9 : Polish Designer

- [ ] Keyboard shortcuts
- [ ] Undo/Redo basique
- [ ] Tests E2E (Playwright)
- [ ] Documentation

**Livrables :** Designer mode fonctionnel, création de blocs, save to library

---

### ✅ Phase 3 : Library

**Objectif :** Browser de blocs avec search et filters

#### Étape 3.1 : Library Panel UI

- [ ] Créer LibraryPanel component
- [ ] Grid view (thumbnails)
- [ ] List view (optionnel)
- [ ] Toggle view mode
- [ ] Responsive

#### Étape 3.2 : Categories

- [ ] Créer CategoryManager
- [ ] Tree view (expandable)
- [ ] CRUD categories
- [ ] Drag & drop pour réorganiser
- [ ] Intégrer avec LibraryModule

#### Étape 3.3 : Search & Filters

- [ ] Installer Fuse.js
- [ ] Search bar avec fuzzy search
- [ ] Filters (category, material, tags)
- [ ] Debounce search
- [ ] Tester performance

#### Étape 3.4 : Drag & Drop

- [ ] Installer dnd-kit
- [ ] Rendre blocks draggables
- [ ] Drop zone sur canvas
- [ ] Visual feedback (preview fantôme)
- [ ] Tester sur différents navigateurs

#### Étape 3.5 : Thumbnails

- [ ] Générer thumbnails (server-side ou client-side)
- [ ] Cache thumbnails
- [ ] Lazy loading
- [ ] Placeholder pendant chargement

#### Étape 3.6 : Polish Library

- [ ] Favorites (star system)
- [ ] Usage analytics (most used)
- [ ] Tests E2E
- [ ] Documentation

**Livrables :** Library Panel fonctionnel avec search, filters, drag & drop

---

### ✅ Phase 4 : Architect Mode

**Objectif :** Assembly de projets avec Three.js

#### Étape 4.1 : Three.js Canvas 2D

- [ ] Créer ThreeCanvas component
- [ ] OrthographicCamera (vue top-down)
- [ ] Setup scene, lights
- [ ] Render instances de blocs
- [ ] Tester performance

#### Étape 4.2 : Placement de Blocs

- [ ] Drag block depuis Library
- [ ] Drop sur canvas
- [ ] Créer BlockInstance
- [ ] Afficher instance sur canvas
- [ ] Sauvegarder dans store

#### Étape 4.3 : Transform Tools - Move

- [ ] Select tool (click instance)
- [ ] Move tool (drag instance)
- [ ] Bounding box avec handles
- [ ] Snap to grid
- [ ] Update transform dans store

#### Étape 4.4 : Transform Tools - Rotate & Scale

- [ ] Rotate tool (circular handle)
- [ ] Snap angles (15°, 45°, 90°)
- [ ] Scale tool (handles sur bounding box)
- [ ] Uniform vs axis scale
- [ ] Keyboard shortcuts ([ ] pour rotate, Cmd +/- pour scale)

#### Étape 4.5 : Multi-Select

- [ ] Shift+Click pour add to selection
- [ ] Rectangle select (lasso)
- [ ] Cmd+A (select all)
- [ ] Transform multiple instances
- [ ] Alignment tools (left, center, right, top, middle, bottom)

#### Étape 4.6 : Grid & Snap Module

- [ ] Créer GridSnapModule
- [ ] Snap to grid avancé
- [ ] Snap to blocks (magnetic snap points)
- [ ] Alignment guides (rouges type Figma)
- [ ] Visual feedback

#### Étape 4.7 : Layer Module

- [ ] Créer LayerModule
- [ ] LayerPanel UI (tree view)
- [ ] CRUD layers
- [ ] Toggle visibility, lock, opacity
- [ ] Nested layers
- [ ] Drag instances entre layers

#### Étape 4.8 : History (Undo/Redo)

- [ ] Créer HistoryStore
- [ ] Command pattern
- [ ] Push state à chaque action
- [ ] Undo/Redo (Cmd+Z, Cmd+Shift+Z)
- [ ] History Panel (optionnel)
- [ ] Limiter taille history (50 entries)

#### Étape 4.9 : Bulk Operations

- [ ] Duplicate instances (Cmd+D)
- [ ] Delete instances (Delete key)
- [ ] Move instances (drag multiple)
- [ ] Group instances (future feature)

#### Étape 4.10 : Properties Panel (Architecte)

- [ ] Afficher properties de instance sélectionnée
- [ ] Inputs numériques pour transform
- [ ] Overrides (color, material)
- [ ] Live update sur canvas

#### Étape 4.11 : View Modes

- [ ] Toggle 2D/3D
- [ ] 2D views (top, front, side)
- [ ] Isometric view
- [ ] Smooth transitions
- [ ] Keyboard shortcuts (1, 2, 3, 0)

#### Étape 4.12 : Polish Architect

- [ ] Performance optimizations (InstancedMesh, LOD)
- [ ] Tests E2E
- [ ] Documentation

**Livrables :** Architect mode fonctionnel, placement, transform, layers, history

---

### ✅ Phase 5 : 3D Visualization

**Objectif :** Visualisation 3D complète

#### Étape 5.1 : 3D View

- [ ] PerspectiveCamera
- [ ] OrbitControls
- [ ] Pan, zoom, rotate
- [ ] Smooth transitions depuis 2D
- [ ] Tester performance

#### Étape 5.2 : Lighting

- [ ] Ambient light
- [ ] Directional light (sun)
- [ ] Shadows (optionnel, performance impact)
- [ ] Environment map (HDRI, optionnel)
- [ ] Ajuster intensités

#### Étape 5.3 : Materials

- [ ] PBR materials (roughness, metalness)
- [ ] Textures
- [ ] Transparency (glass)
- [ ] Material presets (plastic, wood, metal, glass)

#### Étape 5.4 : Camera Presets

- [ ] Top view button
- [ ] Front view button
- [ ] Side view button
- [ ] Isometric button
- [ ] Reset camera button
- [ ] Smooth transitions

#### Étape 5.5 : Optimizations

- [ ] InstancedMesh pour blocks identiques
- [ ] LOD (Level of Detail)
- [ ] Frustum culling
- [ ] Texture atlasing
- [ ] Performance monitoring

#### Étape 5.6 : Polish 3D

- [ ] Minimap 2D (optionnel)
- [ ] Section planes (optionnel)
- [ ] Exploded view (optionnel)
- [ ] Tests
- [ ] Documentation

**Livrables :** Visualisation 3D complète avec camera controls et optimizations

---

### ✅ Phase 6 : Client View & Export

**Objectif :** Viewer client et export multi-format

#### Étape 6.1 : Client View Page

- [ ] Créer ClientView page (read-only)
- [ ] Viewer 3D optimisé
- [ ] Simplified UI
- [ ] No edit tools
- [ ] Tester permissions

#### Étape 6.2 : Share Links

- [ ] Générer share link (public/private)
- [ ] Password protection (optionnel)
- [ ] Expiration date (optionnel)
- [ ] Permissions (comments, download)
- [ ] Analytics (views count)

#### Étape 6.3 : Client Features

- [ ] Layer visibility controls
- [ ] Measure tool (optionnel)
- [ ] Annotations (optionnel)
- [ ] Comments system (optionnel)

#### Étape 6.4 : Export Module (3D)

- [ ] Créer ExportModule
- [ ] GLTF exporter
- [ ] OBJ exporter
- [ ] STL exporter
- [ ] Options (textures, materials, optimize)

#### Étape 6.5 : Export Module (2D)

- [ ] PDF exporter (jsPDF)
- [ ] SVG exporter
- [ ] PNG exporter
- [ ] Templates (multi-view layouts)
- [ ] Options (resolution, layers, view angle)

#### Étape 6.6 : Export UI

- [ ] Export modal
- [ ] Format selector
- [ ] Options form
- [ ] Progress bar
- [ ] Download link
- [ ] Email delivery (optionnel)

**Livrables :** Client view fonctionnel, export multi-format

---

### ✅ Phase 7 : Polish & Testing

**Objectif :** Finaliser et tester

#### Étape 7.1 : Responsive Design

- [ ] Mobile breakpoints
- [ ] Tablet breakpoints
- [ ] Touch controls (optionnel)
- [ ] Tester sur différents devices

#### Étape 7.2 : Keyboard Shortcuts

- [ ] Implémenter tous les shortcuts (voir [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md))
- [ ] Shortcuts panel (aide)
- [ ] Customizable shortcuts (optionnel)
- [ ] Tester tous les shortcuts

#### Étape 7.3 : Performance

- [ ] Lighthouse audit
- [ ] Optimiser bundle size
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Cache strategies

#### Étape 7.4 : Error Handling

- [ ] Error boundaries
- [ ] Retry logic
- [ ] User-friendly error messages
- [ ] Sentry integration
- [ ] Logging

#### Étape 7.5 : Testing

- [ ] Unit tests (> 80% coverage)
- [ ] E2E tests (critical paths)
- [ ] Cross-browser testing
- [ ] Performance tests
- [ ] Accessibility tests

#### Étape 7.6 : User Onboarding

- [ ] Guided tour (optionnel)
- [ ] Tooltips
- [ ] Help documentation
- [ ] Video tutorials (optionnel)

**Livrables :** Application polie, testée, performante

---

### ✅ Phase 8 : Deployment

**Objectif :** Déployer en production

#### Étape 8.1 : Build Production

- [ ] Optimiser build
- [ ] Test build local
- [ ] Vérifier bundle size
- [ ] Vérifier assets

#### Étape 8.2 : Hosting Setup

- [ ] Setup Vercel (ou Netlify)
- [ ] Configurer domain
- [ ] Environment variables
- [ ] Test staging

#### Étape 8.3 : CI/CD

- [ ] GitHub Actions workflow
- [ ] Auto-deploy on merge to main
- [ ] Preview deployments (PR)
- [ ] Test CI/CD

#### Étape 8.4 : Monitoring

- [ ] Sentry setup
- [ ] Mixpanel setup
- [ ] Analytics
- [ ] Performance monitoring
- [ ] Launch ! 🚀

**Livrables :** Application déployée en production

---

## 📅 Workflow Quotidien Recommandé

### 🌅 Début de Session

1. **Planifier** (5 min) : Consulter ce document, choisir 2-3 tâches prioritaires
2. **Lire** : Section correspondante dans [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md)
3. **Commencer** : Implémenter la première tâche

### ⚙️ Pendant le Développement

1. **Coder** : Implémenter features selon phase actuelle
2. **Tester** : Écrire tests pour code écrit
3. **Documenter** : Commenter le code complexe
4. **Review** : Vérifier performance et conformité

### 🏁 Fin de Session

1. **Commit & Push** : Sauvegarder travail
2. **PR** : Créer PR si feature complète
3. **Mettre à jour** : Cocher les tâches terminées dans ce document
4. **Planifier** : Identifier les prochaines tâches

---

## 🎯 Priorités par Situation

### "Je viens de commencer le projet"

→ **Phase 1 : Foundation** → Étape 1.1

### "Je dois créer un nouveau composant"

→ [DEVELOPPEUR.md](./DEVELOPPEUR.md) → Section "Créer un Composant"

### "Je dois implémenter un module"

→ [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md) → Section "Modules Détaillés"

### "Je ne sais pas quelle phase je suis"

→ Regardez votre roadmap / sprint planning
→ Vérifiez les livrables de chaque phase ci-dessus

### "Je dois debugger un problème"

→ [DEVELOPPEUR.md](./DEVELOPPEUR.md) → Section "Troubleshooting"

---

## ✅ Checklist Générale

### Avant de commencer à coder

- [ ] J'ai lu la section correspondante dans [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md)
- [ ] J'ai vérifié les types dans [../docs/DATA_STRUCTURES.md](./../docs/DATA_STRUCTURES.md)
- [ ] Je sais quel module/composant créer
- [ ] J'ai compris le workflow utilisateur (si applicable)

### Pendant le codage

- [ ] J'écris des tests en même temps
- [ ] Je respecte les patterns (voir [../docs/DECISIONS_TECHNIQUES.md](./../docs/DECISIONS_TECHNIQUES.md))
- [ ] Je documente le code complexe
- [ ] Je vérifie les performances

### Avant de commit

- [ ] Tests passent
- [ ] Lint OK
- [ ] Type check OK
- [ ] Code review (si nécessaire)

---

## 📚 Références Rapides

- **Architecture** → [../docs/ARCHITECTURE.md](./../docs/ARCHITECTURE.md)
- **Types** → [../docs/DATA_STRUCTURES.md](./../docs/DATA_STRUCTURES.md)
- **Stack** → [../docs/STACK_TECHNIQUE.md](./../docs/STACK_TECHNIQUE.md)
- **Workflows** → [../docs/WORKFLOWS_DETAILLES.md](./../docs/WORKFLOWS_DETAILLES.md)
- **Aide** → [DEVELOPPEUR.md](./DEVELOPPEUR.md)

---

## 🎯 Ordre de Priorité des Phases

Pour le **Module Designer uniquement** (objectif minimal viable) :

```
Phase 1 (Foundation) → CRITIQUE
Phase 2 (Designer Mode) → CRITIQUE
Phase 3 (Library) → IMPORTANT
Phase 4-8 → Pour plus tard
```

**Estimations réalistes :**

- **Phase 1** : ~40-60 heures
- **Phase 2** : ~50-70 heures
- **Phase 3** : ~30-40 heures

**Total Module Designer :** ~120-170 heures

**À 1 weekend par mois (16h/mois) :** 8-11 mois
**À 2 weekends par mois (32h/mois) :** 4-6 mois

---

**Consultez ce document à chaque session pour savoir quoi faire ! 🚀**

---

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
