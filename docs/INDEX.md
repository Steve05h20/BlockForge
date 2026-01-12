# 📖 INDEX - Navigation Complète de la Documentation

> **Table des matières détaillée de toute la documentation technique du projet BlockForge**

## 📋 Table des Matières

1. [Vue d'Ensemble](#️-vue-densemble)
2. [Documents Techniques Détaillés](#-documents-techniques-détaillés)
   - [ARCHITECTURE.md](#1-️-architecturemd)
   - [DATA_STRUCTURES.md](#2--data_structuresmd)
   - [STACK_TECHNIQUE.md](#3-️-stack_techniquemd)
   - [WORKFLOWS_DETAILLES.md](#4--workflows_detaillesmd)
   - [DECISIONS_TECHNIQUES.md](#5--decisions_techniquesmd)
   - [SYNTHESE_VISUELLE.md](#6--synthese_visuellemd)
   - [TESTING.md](#7--testingmd)
3. [Recherche Rapide par Thème](#-recherche-rapide-par-thème)
4. [Comment Naviguer Entre les Documents](#-comment-naviguer-entre-les-documents)
5. [Comment Utiliser Cette Documentation](#-comment-utiliser-cette-documentation)
6. [Liens Utiles](#-liens-utiles)

---

## 🗺️ Vue d'Ensemble

Ce document est la **table des matières complète** de toute la documentation technique du projet.

**Si vous cherchez :**

- 🆘 Une aide rapide → **[../guides/DEVELOPPEUR.md](../guides/DEVELOPPEUR.md)**
- ⚡ Quoi faire maintenant → **[../guides/QUICK_START.md](../guides/QUICK_START.md)**
- 🏠 Point d'entrée → **[../README.md](../README.md)**

---

## 📚 Documents Techniques Détaillés

### 1. 🏛️ [ARCHITECTURE.md](./ARCHITECTURE.md)

**Architecture front-end complète et détaillée**

**Contenu :**

- Vue d'ensemble système
- Stack technique justifiée
- Structure des dossiers complète (pages, modules, components, stores)
- Modules détaillés (Blocks, Library, Grid & Snap, Layers, Export)
- Transition PixiJS → Three.js
- State management (Zustand)
- UX/UI design system
- Performance & scalabilité
- Roadmap MVP détaillée (phase par phase)
- Extensions futures (physics, collaboration, AI, import)

**Pour qui :** Tech Lead, Architectes, Développeurs  
**Quand lire :** Avant de commencer le développement

**Sections clés :**

- 📁 Structure des dossiers → `src/` complète
- 🧩 Modules → Responsabilités et API
- 🎨 UX/UI → Panels, shortcuts, dark mode
- 🛣️ Roadmap → 8 phases détaillées

---

### 2. 📊 [DATA_STRUCTURES.md](./DATA_STRUCTURES.md)

**Structures de données TypeScript complètes**

**Contenu :**

- Types Core (Vector3, BoundingBox, Color, Units)
- Block System complet
  - Block interface (geometry, appearance, physics, snap points)
  - PixiRenderData & ThreeRenderData
  - Custom Properties
  - Validation
- Project System
  - Project interface (config, layers, instances, viewport)
  - Layer interface
  - BlockInstance interface
  - History system
- Library System
  - Library interface
  - Category interface
  - Filters
- User & Permissions
  - User interface
  - Roles (Designer, Architecte, Client, Admin)
  - Permissions
  - Preferences
- State Management Types
  - Store interfaces (Project, Blocks, Instances, Selection, Layers)
- API Types
  - Request/Response types pour tous endpoints

**Pour qui :** Développeurs front-end et back-end  
**Quand lire :** Lors du développement des modules

**Sections clés :**

- 🧱 Block → Interface complète avec tous les champs
- 🏗️ Project → Gestion layers, instances, history
- 🔄 State Management → Types Zustand stores

---

### 3. 🛠️ [STACK_TECHNIQUE.md](./STACK_TECHNIQUE.md)

**Stack technique détaillée avec rationale**

**Contenu :**

- Frontend Stack (React, TypeScript, Vite)
  - Rationale, configuration, alternatives
- Rendering Engines
  - PixiJS 8.x (2D Designer)
  - Three.js + React Three Fiber (3D Architect/Client)
  - Conversion pipeline PixiJS → Three.js
- State Management (Zustand)
  - API, middleware, performance tips
- UI Components
  - shadcn/ui + Radix UI
  - TailwindCSS
  - rc-dock (panels dockable)
  - dnd-kit (drag & drop)
- Utilities & Tools
  - Geometry utils (mathjs)
  - Forms (React Hook Form + Zod)
  - Search (Fuse.js)
  - Export (jsPDF, Three.js exporters)
- Testing (Vitest, Playwright)
- Build & Deployment (Vite, Vercel, GitHub Actions)
- Monitoring (Sentry, Mixpanel)
- Comparaison des alternatives

**Pour qui :** Tech Lead, Développeurs  
**Quand lire :** Pendant setup projet et choix techniques

**Sections clés :**

- 🎨 Rendering → PixiJS vs Three.js justifié
- 🗄️ State → Zustand vs Redux vs Jotai
- 🧪 Testing → Vitest + Playwright setup
- 📦 Package.json → Dependencies complètes

---

### 4. 🔄 [WORKFLOWS_DETAILLES.md](./WORKFLOWS_DETAILLES.md)

**Workflows utilisateurs étape par étape**

**Contenu :**

- Vue d'ensemble des workflows (Designer → Architecte → Client)
- Workflow Designer (10 étapes)
  - Accès Dashboard
  - Mode Designer Workspace
  - Dessiner Géométrie 2D
  - Définir Dimensions 3D
  - Paramétrer Apparence
  - Placer Snap Points
  - Custom Properties
  - Preview 3D
  - Validation & Save
  - Block disponible dans Library
- Workflow Architecte (15 étapes)
  - Dashboard
  - Create Project
  - Architect Workspace
  - Browse Library
  - Place Block (Drag & Drop)
  - Transform Instance (Move, Rotate, Scale)
  - Multi-Select
  - Layer Management
  - Snap & Alignment
  - View Modes (2D/3D)
  - 3D Visualization
  - History (Undo/Redo)
  - Save Project
  - Share Project
  - Export Project
- Workflow Client (10 étapes)
  - Landing Page
  - Authentication
  - Client View Workspace
  - Navigation 3D
  - Layer Visibility
  - Advanced Views (Section, Exploded)
  - Measure Tool
  - Annotations
  - Comments System
  - Export
- Flux de Données (API, Stores, Components)
- Scénarios d'Usage Réels
  - Créer une maison
  - Bureau open space
- Transitions d'État (State machines)

**Pour qui :** UX Designers, Product Managers, Développeurs  
**Quand lire :** Pour comprendre les interactions utilisateurs

**Sections clés :**

- 🎨 Designer → Création de blocs détaillée
- 🏗️ Architecte → Assembly et transform
- 👀 Client → Visualisation 3D
- 📊 Flux → API calls et state updates

---

### 5. 🎯 [DECISIONS_TECHNIQUES.md](./DECISIONS_TECHNIQUES.md)

**Décisions techniques clés et recommandations**

**Contenu :**

- Décisions Clés
  - PixiJS + Three.js (justification détaillée)
  - Zustand vs Redux Toolkit
  - shadcn/ui vs Component Library
  - TypeScript Strict Mode
- Trade-offs Importants
  - Performance vs Features
  - Offline Mode vs Simplicity
  - Real-time Collaboration vs Simplicity
- Patterns Architecturaux
  - Module Pattern
  - Custom Hooks Pattern
  - Command Pattern (History)
  - Factory Pattern (Block Creation)
- Sécurité
  - Input Validation (Zod)
  - Authentication & Authorization (JWT + RBAC)
  - XSS Prevention
  - CSRF Protection
- Scalabilité
  - Database Indexing
  - Caching Strategy (multi-level)
  - Lazy Loading
  - API Pagination
- Monitoring & Observabilité
  - Error Tracking (Sentry)
  - Analytics (Mixpanel)
  - Performance Monitoring (Web Vitals)
- Recommendations Backend
  - Stack recommandée (Node.js, Express, Postgres, Prisma, Redis)
  - Architecture Backend
- DevOps & Infrastructure
  - CI/CD Pipeline (GitHub Actions)
  - Environment Variables
  - Checklist Pré-Launch

**Pour qui :** Tech Lead, Senior Developers  
**Quand lire :** Pendant architecture reviews et décisions techniques

**Sections clés :**

- ⚖️ Trade-offs → Choix justifiés avec alternatives
- 🏗️ Patterns → Code patterns recommandés
- 🔒 Sécurité → Authentication, validation, XSS/CSRF
- 📈 Scalabilité → Database, cache, performance

---

### 6. 📐 [SYNTHESE_VISUELLE.md](./SYNTHESE_VISUELLE.md)

**Synthèse visuelle avec diagrammes ASCII**

**Contenu :**

- Architecture en un Coup d'Œil
- Flux de Données
- Layout UI Détaillé
- Comparaison des Features
- Timeline Roadmap
- Tous les diagrammes visuels

**Pour qui :** Tout le monde (pour comprendre visuellement)  
**Quand lire :** Pour une vue d'ensemble rapide et visuelle

---

### 7. 🧪 [TESTING.md](./TESTING.md)

**Guide de référence pour les tests avec Vitest et React Testing Library**

**Contenu :**

- Configuration Vitest et setup
- Commandes de base
- Queries et recherche d'éléments
- Actions utilisateur (clics, saisie, etc.)
- Assertions et matchers
- Exemples pratiques (composants, router, async)
- Bonnes pratiques et checklist

**Pour qui :** Développeurs  
**Quand lire :** Lors de l'écriture de tests unitaires et d'intégration

**Sections clés :**

- 🔍 Queries → Priorité des méthodes de recherche
- 🎯 Actions → Simuler les interactions utilisateur
- ✅ Assertions → Matchers Jest-DOM et Vitest
- 📝 Exemples → Tests de composants, router, async

---

### 2. 🏛️ [ARCHITECTURE.md](./ARCHITECTURE.md)

**Architecture front-end complète et détaillée**

**Contenu :**

- Vue d'ensemble système
- Stack technique justifiée
- Structure des dossiers complète (pages, modules, components, stores)
- Structures de données (aperçu)
- Workflows utilisateurs (résumé)
- Modules détaillés (Blocks, Library, Grid & Snap, Layers, Export)
- Transition PixiJS → Three.js
- State management (Zustand)
- UX/UI design system
- Performance & scalabilité
- Roadmap MVP détaillée (phase par phase)
- Extensions futures (physics, collaboration, AI, import)

**Pour qui :** Tech Lead, Architectes, Développeurs  
**Quand lire :** Avant de commencer le développement

**Sections clés :**

- 📁 Structure des dossiers → `src/` complète
- 🧩 Modules → Responsabilités et API
- 🎨 UX/UI → Panels, shortcuts, dark mode
- 🛣️ Roadmap → 8 phases détaillées

---

### 3. 📊 [DATA_STRUCTURES.md](./DATA_STRUCTURES.md)

**Structures de données TypeScript complètes**

**Contenu :**

- Types Core (Vector3, BoundingBox, Color, Units)
- Block System complet
  - Block interface (geometry, appearance, physics, snap points)
  - PixiRenderData & ThreeRenderData
  - Custom Properties
  - Validation
- Project System
  - Project interface (config, layers, instances, viewport)
  - Layer interface
  - BlockInstance interface
  - History system
- Library System
  - Library interface
  - Category interface
  - Filters
- User & Permissions
  - User interface
  - Roles (Designer, Architecte, Client, Admin)
  - Permissions
  - Preferences
- State Management Types
  - Store interfaces (Project, Blocks, Instances, Selection, Layers)
- API Types
  - Request/Response types pour tous endpoints

**Pour qui :** Développeurs front-end et back-end  
**Quand lire :** Lors du développement des modules

**Sections clés :**

- 🧱 Block → Interface complète avec tous les champs
- 🏗️ Project → Gestion layers, instances, history
- 🔄 State Management → Types Zustand stores

---

### 4. 🛠️ [STACK_TECHNIQUE.md](./STACK_TECHNIQUE.md)

**Stack technique détaillée avec rationale**

**Contenu :**

- Frontend Stack (React, TypeScript, Vite)
  - Rationale, configuration, alternatives
- Rendering Engines
  - PixiJS 8.x (2D Designer)
  - Three.js + React Three Fiber (3D Architect/Client)
  - Conversion pipeline PixiJS → Three.js
- State Management (Zustand)
  - API, middleware, performance tips
- UI Components
  - shadcn/ui + Radix UI
  - TailwindCSS
  - rc-dock (panels dockable)
  - dnd-kit (drag & drop)
- Utilities & Tools
  - Geometry utils (mathjs)
  - Forms (React Hook Form + Zod)
  - Search (Fuse.js)
  - Export (jsPDF, Three.js exporters)
- Testing (Vitest, Playwright)
- Build & Deployment (Vite, Vercel, GitHub Actions)
- Monitoring (Sentry, Mixpanel)
- Comparaison des alternatives

**Pour qui :** Tech Lead, Développeurs  
**Quand lire :** Pendant setup projet et choix techniques

**Sections clés :**

- 🎨 Rendering → PixiJS vs Three.js justifié
- 🗄️ State → Zustand vs Redux vs Jotai
- 🧪 Testing → Vitest + Playwright setup
- 📦 Package.json → Dependencies complètes

---

### 5. 🔄 [WORKFLOWS_DETAILLES.md](./WORKFLOWS_DETAILLES.md)

**Workflows utilisateurs étape par étape**

**Contenu :**

- Vue d'ensemble des workflows (Designer → Architecte → Client)
- Workflow Designer (10 étapes)
  - Accès Dashboard
  - Mode Designer Workspace
  - Dessiner Géométrie 2D
  - Définir Dimensions 3D
  - Paramétrer Apparence
  - Placer Snap Points
  - Custom Properties
  - Preview 3D
  - Validation & Save
  - Block disponible dans Library
- Workflow Architecte (15 étapes)
  - Dashboard
  - Create Project
  - Architect Workspace
  - Browse Library
  - Place Block (Drag & Drop)
  - Transform Instance (Move, Rotate, Scale)
  - Multi-Select
  - Layer Management
  - Snap & Alignment
  - View Modes (2D/3D)
  - 3D Visualization
  - History (Undo/Redo)
  - Save Project
  - Share Project
  - Export Project
- Workflow Client (10 étapes)
  - Landing Page
  - Authentication
  - Client View Workspace
  - Navigation 3D
  - Layer Visibility
  - Advanced Views (Section, Exploded)
  - Measure Tool
  - Annotations
  - Comments System
  - Export
- Flux de Données (API, Stores, Components)
- Scénarios d'Usage Réels
  - Créer une maison
  - Bureau open space
- Transitions d'État (State machines)

**Pour qui :** UX Designers, Product Managers, Développeurs  
**Quand lire :** Pour comprendre les interactions utilisateurs

**Sections clés :**

- 🎨 Designer → Création de blocs détaillée
- 🏗️ Architecte → Assembly et transform
- 👀 Client → Visualisation 3D
- 📊 Flux → API calls et state updates

---

### 6. 🎯 [DECISIONS_TECHNIQUES.md](./DECISIONS_TECHNIQUES.md)

**Décisions techniques clés et recommandations**

**Contenu :**

- Décisions Clés
  - PixiJS + Three.js (justification détaillée)
  - Zustand vs Redux Toolkit
  - shadcn/ui vs Component Library
  - TypeScript Strict Mode
- Trade-offs Importants
  - Performance vs Features
  - Offline Mode vs Simplicity
  - Real-time Collaboration vs Simplicity
- Patterns Architecturaux
  - Module Pattern
  - Custom Hooks Pattern
  - Command Pattern (History)
  - Factory Pattern (Block Creation)
- Sécurité
  - Input Validation (Zod)
  - Authentication & Authorization (JWT + RBAC)
  - XSS Prevention
  - CSRF Protection
- Scalabilité
  - Database Indexing
  - Caching Strategy (multi-level)
  - Lazy Loading
  - API Pagination
- Monitoring & Observabilité
  - Error Tracking (Sentry)
  - Analytics (Mixpanel)
  - Performance Monitoring (Web Vitals)
- Recommendations Backend
  - Stack recommandée (Node.js, Express, Postgres, Prisma, Redis)
  - Architecture Backend
- DevOps & Infrastructure
  - CI/CD Pipeline (GitHub Actions)
  - Environment Variables
  - Checklist Pré-Launch

**Pour qui :** Tech Lead, Senior Developers  
**Quand lire :** Pendant architecture reviews et décisions techniques

**Sections clés :**

- ⚖️ Trade-offs → Choix justifiés avec alternatives
- 🏗️ Patterns → Code patterns recommandés
- 🔒 Sécurité → Authentication, validation, XSS/CSRF
- 📈 Scalabilité → Database, cache, performance

---

## 🔍 Recherche Rapide par Thème

### Architecture

- 📁 **Structure dossiers** → `ARCHITECTURE.md` section "Structure des Dossiers"
- 🧩 **Modules** → `ARCHITECTURE.md` section "Modules Détaillés"
- 🔄 **State Management** → `ARCHITECTURE.md` section "State Management"

### Fonctionnalités

- 🎨 **Designer Mode** → `WORKFLOWS_DETAILLES.md` section "Workflow Designer"
- 🏗️ **Architecte Mode** → `WORKFLOWS_DETAILLES.md` section "Workflow Architecte"
- 👀 **Client View** → `WORKFLOWS_DETAILLES.md` section "Workflow Client"

### Technique

- 📊 **Types TypeScript** → `DATA_STRUCTURES.md`
- 🛠️ **Stack & Librairies** → `STACK_TECHNIQUE.md`
- 🎯 **Décisions Techniques** → `DECISIONS_TECHNIQUES.md`

### UX/UI

- 🎨 **Design System** → `ARCHITECTURE.md` section "UX/UI Design System"
- ⌨️ **Shortcuts** → `ARCHITECTURE.md` section "Shortcuts Essentiels"
- 🖼️ **Panels** → `ARCHITECTURE.md` section "Panels Système"

### Performance

- ⚡ **Optimizations** → `ARCHITECTURE.md` section "Performance & Scalabilité"
- 📈 **Scalabilité** → `DECISIONS_TECHNIQUES.md` section "Scalabilité"
- 🚀 **Rendering** → `STACK_TECHNIQUE.md` sections "PixiJS" et "Three.js"

### Tests

- 🧪 **Guide Tests** → `TESTING.md` (guide complet)
- ⚙️ **Configuration** → `TESTING.md` section "Configuration"
- 🔍 **Queries** → `TESTING.md` section "Queries"
- 📝 **Exemples** → `TESTING.md` section "Exemples Pratiques"

### Sécurité & DevOps

- 🔒 **Sécurité** → `DECISIONS_TECHNIQUES.md` section "Sécurité"
- 🚀 **Deployment** → `STACK_TECHNIQUE.md` section "Build & Deployment"
- 📊 **Monitoring** → `DECISIONS_TECHNIQUES.md` section "Monitoring & Observabilité"

---

## 🔗 Comment Naviguer Entre les Documents

### Pour Implémenter une Feature

```
1. WORKFLOWS_DETAILLES.md → Comprendre le workflow utilisateur
2. ARCHITECTURE.md → Trouver le module correspondant
3. DATA_STRUCTURES.md → Vérifier les types
4. STACK_TECHNIQUE.md → Installer les librairies nécessaires
5. DECISIONS_TECHNIQUES.md → Suivre les patterns recommandés
```

### Exemples de Parcours

**Implémenter le Block System :**

```
WORKFLOWS_DETAILLES.md (Designer workflow)
    ↓
ARCHITECTURE.md (Blocks Module)
    ↓
DATA_STRUCTURES.md (Block interface)
    ↓
STACK_TECHNIQUE.md (PixiJS)
    ↓
DECISIONS_TECHNIQUES.md (Factory Pattern)
```

**Implémenter le Project System :**

```
WORKFLOWS_DETAILLES.md (Architecte workflow)
    ↓
ARCHITECTURE.md (Project structure)
    ↓
DATA_STRUCTURES.md (Project interface)
    ↓
STACK_TECHNIQUE.md (Three.js, Zustand)
    ↓
DECISIONS_TECHNIQUES.md (Command Pattern)
```

---

## 💡 Comment Utiliser Cette Documentation

### Au Quotidien

- **Bookmark ce fichier** (INDEX.md) pour navigation rapide
- **Consultez [guides/QUICK_START.md](../guides/QUICK_START.md)** chaque matin
- **Référencez les sections** dans vos PR (ex: "Implements Block Module, see ARCHITECTURE.md#blocks-module")

### Pendant le Développement

- **Question technique ?** → `DECISIONS_TECHNIQUES.md`
- **Workflow utilisateur ?** → `WORKFLOWS_DETAILLES.md`
- **Types TypeScript ?** → `DATA_STRUCTURES.md`
- **Stack technique ?** → `STACK_TECHNIQUE.md`
- **Embrouillé ?** → `../guides/DEVELOPPEUR.md`

### Pour les Revues

- **Architecture Review** → `ARCHITECTURE.md` + `DECISIONS_TECHNIQUES.md`
- **Code Review** → Vérifier conformité avec `DATA_STRUCTURES.md`
- **Sprint Planning** → Référencer `ARCHITECTURE.md` Roadmap

---

## 📞 Liens Utiles

### Documentation Externe

- **React** : https://react.dev/
- **TypeScript** : https://www.typescriptlang.org/docs/
- **PixiJS** : https://pixijs.com/8.x/guides
- **Three.js** : https://threejs.org/docs/
- **Zustand** : https://docs.pmnd.rs/zustand/
- **Vite** : https://vitejs.dev/guide/

### Références Design

- **Figma** : https://www.figma.com/
- **AutoCAD** : https://www.autodesk.com/products/autocad

---

**Bon développement ! 🚀**

_Ce blueprint est complet et prêt à guider le développement du MVP._

---

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
