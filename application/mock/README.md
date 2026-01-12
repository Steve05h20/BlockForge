# 📦 Mock Data - Données de Test

Ce dossier contient des données de test réalistes pour le développement et les tests de BlockForge.

## 📐 Dimensions LEGO

Toutes les dimensions sont basées sur les **vraies dimensions LEGO** :

- **Unité de base (stud pitch)** : `8mm`
- **Hauteur brique standard** : `9.6mm`
- **Hauteur plaque** : `3.2mm`
- **Largeur/longueur** : multiples de 8mm (8, 16, 24, 32, 40, 48mm...)

### Ratio de hauteur

- 1 brique = 3 plaques (9.6mm = 3 × 3.2mm)

## 📁 Structure

```
mock/
├── types.ts          # Types TypeScript pour les données mock
├── mockData.ts       # Données mock (blocks, projects, instances)
└── README.md         # Ce fichier
```

## 🧱 Blocks Disponibles

### Briques Standard

- `block-lego-1x1` : 8mm × 8mm × 9.6mm (Rouge)
- `block-lego-1x2` : 8mm × 16mm × 9.6mm (Vert)
- `block-lego-2x2` : 16mm × 16mm × 9.6mm (Bleu)
- `block-lego-2x4` : 16mm × 32mm × 9.6mm (Jaune) - **Classique**
- `block-lego-4x4` : 32mm × 32mm × 9.6mm (Magenta)
- `block-lego-1x6` : 8mm × 48mm × 9.6mm (Violet)
- `block-lego-2x6` : 16mm × 48mm × 9.6mm (Rose)

### Plaques (fines)

- `block-lego-plate-1x1` : 8mm × 8mm × 3.2mm (Orange)
- `block-lego-plate-2x4` : 16mm × 32mm × 3.2mm (Cyan)

### Briques Spéciales

- `block-lego-1x1-tall` : 8mm × 8mm × 19.2mm (Marron) - Double hauteur

## 🎯 Utilisation

### Importer les données

```typescript
import {
  mockData,
  mockBlocks,
  mockProjects,
  mockInstances,
} from '@/mock/mockData'

// Toutes les données
const allData = mockData

// Ou individuellement
const blocks = mockBlocks
const projects = mockProjects
const instances = mockInstances
```

### Utiliser dans un composant

```typescript
import { mockBlocks } from '@/mock/mockData'

function BlockLibrary() {
  return (
    <div>
      {mockBlocks.map(block => (
        <BlockCard key={block.id} block={block} />
      ))}
    </div>
  )
}
```

### Utiliser dans un store (Zustand)

```typescript
import { mockBlocks } from '@/mock/mockData'
import { create } from 'zustand'

interface BlocksStore {
  blocks: Block[]
  loadMockData: () => void
}

export const useBlocksStore = create<BlocksStore>(set => ({
  blocks: [],
  loadMockData: () => set({ blocks: mockBlocks }),
}))
```

## 📊 Caractéristiques des Blocks

Chaque block contient :

- ✅ **Géométrie** : Dimensions précises en mm
- ✅ **Apparence** : Couleur, matériau (plastic), opacité
- ✅ **Physique** : Masse, friction, restitution (optionnel)
- ✅ **Métadonnées** : Catégorie, tags, statut, dimensions textuelles
- ✅ **Snap Points** : Points de connexion automatiquement générés
- ✅ **Bounding Box** : Calculé automatiquement

## 🔧 Helpers

### `generateSnapPoints(width, height, depth)`

Génère automatiquement les snap points sur :

- 8 coins (haut et bas)
- 2 centres (top et bottom)

### `calculateBounds(width, height, depth)`

Calcule le bounding box avec :

- `min` : coin inférieur gauche arrière
- `max` : coin supérieur droit avant
- `center` : centre du block
- `size` : dimensions

## 🎨 Couleurs

Les blocks utilisent des couleurs vives pour faciliter la distinction :

- 🔴 Rouge : 1x1
- 🟢 Vert : 1x2
- 🔵 Bleu : 2x2
- 🟡 Jaune : 2x4 (classique)
- 🟣 Magenta : 4x4
- 🟠 Orange : Plaque 1x1
- 🔷 Cyan : Plaque 2x4
- 🟣 Violet : 1x6
- 🌸 Rose : 2x6
- 🟤 Marron : 1x1 haute

## 📝 Notes

- Les IDs sont générés avec `mock-` comme préfixe
- Les dates utilisent `new Date()` au moment de l'import
- Les snap points sont générés automatiquement
- Les volumes et poids sont approximatifs
- Les matériaux sont tous de type `plastic` avec `roughness: 0.3`

## 👤 Utilisateurs Mock

### Utilisateurs par rôle

4 utilisateurs mock sont disponibles pour tester les permissions et les routes protégées :

#### 1. Designer (`user-designer-001`)

- **Email** : `designer@blockforge.com`
- **Rôle** : `designer`
- **Permissions** :
  - Blocks : `create`, `read`, `update`, `delete`
  - Library : `read`, `update`
  - Projects : `read` (read-only)
  - Settings : `read`, `update`
- **Subscription** : Pro
- **Usage** : Création et gestion de blocs

#### 2. Architect (`user-architect-001`)

- **Email** : `architect@blockforge.com`
- **Rôle** : `architect`
- **Permissions** :
  - Blocks : `read` (read-only)
  - Library : `read` (read-only)
  - Projects : `create`, `read`, `update`, `delete`
  - Exports : `create`, `read`
  - Settings : `read`, `update`
- **Subscription** : Team
- **Usage** : Création et gestion de projets

#### 3. Client (`user-client-001`)

- **Email** : `client@blockforge.com`
- **Rôle** : `client`
- **Permissions** :
  - Projects : `read` (read-only, projets partagés)
  - Exports : `read` (téléchargement)
- **Subscription** : Free
- **Usage** : Visualisation et validation de projets

#### 4. Admin (`user-admin-001`)

- **Email** : `admin@blockforge.com`
- **Rôle** : `admin`
- **Permissions** : **Full access** sur toutes les ressources
  - Blocks, Projects, Library, Settings, Users, Exports : `create`, `read`, `update`, `delete`, `share`
- **Subscription** : Enterprise (illimité)
- **Usage** : Administration complète

### État non authentifié

```typescript
export const mockNoAuth: AuthState = null
```

### Utilisation

```typescript
import { mockUsers, mockUsersByRole, mockNoAuth } from '@/mock/mockData'

// Tous les utilisateurs
const allUsers = mockUsers

// Par rôle
const designer = mockUsersByRole.designer
const architect = mockUsersByRole.architect
const client = mockUsersByRole.client
const admin = mockUsersByRole.admin

// Non authentifié
const noAuth = mockUsersByRole.noAuth // ou mockNoAuth
```

### Exemple avec ProtectedRoute

```typescript
import { mockUsersByRole } from '@/mock/mockData'

// Simuler un utilisateur connecté
const user = mockUsersByRole.designer

// Tester une route protégée
<ProtectedRoute allowedRoles={['designer']}>
  <DesignerPage />
</ProtectedRoute>
```

### Tester les permissions

```typescript
// Vérifier si un utilisateur peut créer des blocks
const canCreateBlocks = (user: User) => {
  const permission = user.permissions.find(p => p.resource === 'blocks')
  return permission?.actions.includes('create') ?? false
}

// Utilisation
canCreateBlocks(mockUsersByRole.designer) // true
canCreateBlocks(mockUsersByRole.client) // false
```

## 🚀 Extension

### Ajouter de nouveaux blocks

1. Ajouter l'entrée dans `mockBlocks` array
2. Utiliser les helpers `generateSnapPoints()` et `calculateBounds()`
3. Respecter les dimensions LEGO (multiples de 8mm)
4. Ajouter des tags pertinents dans `metadata.tags`

### Ajouter de nouveaux utilisateurs

1. Ajouter l'entrée dans `mockUsers` array
2. Définir les permissions selon le rôle
3. Configurer la subscription si nécessaire
4. Ajouter dans `mockUsersByRole` pour un accès facile

## 📚 Références

- [Documentation LEGO Dimensions](https://www.freelug.org/IMG/pdf/FLL.pdf)
- [Structures de données](../docs/DATA_STRUCTURES.md)
- [Routes protégées](../docs/DECISIONS_TECHNIQUES.md#2-authentication--authorization)
