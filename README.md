# 🏗️ BlockForge

> **Plateforme professionnelle de construction modulaire** pour la création, l'assemblage et la visualisation de plans architecturaux en 2D/3D

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

---

## 🎯 Vue d'ensemble

**BlockForge** est une application web moderne permettant aux professionnels de la construction de créer, assembler et visualiser des plans architecturaux modulaires avec une interface intuitive et des outils puissants.

### ✨ Fonctionnalités principales

#### 👨‍🎨 **Mode Designer**

- Création et paramétrage de blocs réutilisables
- Définition de dimensions, matériaux et propriétés personnalisées
- Bibliothèque de composants modulaires
- Édition 2D rapide et intuitive

#### 🏛️ **Mode Architecte**

- Assemblage de blocs en plans complexes
- Système de layers et de gestion de calques
- Snapping et alignements automatiques
- Grille et outils de précision
- Vue hybride 2D/3D

#### 👁️ **Mode Client**

- Visualisation 3D immersive
- Navigation et contrôles de caméra avancés
- Export de plans au format PDF
- Présentation professionnelle

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** 18+
- **pnpm** 8+ (recommandé) ou npm/yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd block-forge

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur `http://localhost:5173`

### Scripts disponibles

```bash
pnpm dev          # Démarre le serveur de développement
pnpm build        # Compile pour la production
pnpm preview      # Prévisualise le build de production
pnpm lint         # Vérifie le code avec ESLint
pnpm type-check   # Vérifie les types TypeScript
pnpm test         # Lance les tests unitaires
```

---

## 🛠️ Technologies

### Core

- **React 19** - Framework UI moderne
- **TypeScript 5.9** - Typage statique
- **Vite 7** - Build tool ultra-rapide

### Rendering

- **Three.js** - Moteur 3D pour la visualisation
- **React Three Fiber** - Intégration React/Three.js
- **PixiJS** - Prototypage 2D rapide

### UI/UX

- **Radix UI** - Composants accessibles headless
- **shadcn/ui** - Design system moderne
- **Tailwind CSS** - Styling utilitaire
- **rc-dock** - Interface dockable personnalisable

### State & Data

- **Zustand** - State management léger
- **React Router** - Navigation client-side
- **React Hook Form** - Gestion de formulaires
- **Zod** - Validation de schémas

---

## 📁 Structure du projet

```
block-forge/
├── application/          # Application principale
│   ├── pages/           # Pages et routes
│   └── main.tsx         # Point d'entrée
├── blockForge-ui/       # Composants UI réutilisables
│   ├── ui/              # Composants shadcn/ui
│   ├── components/      # Composants métier
│   ├── hooks/           # Hooks React personnalisés
│   └── lib/             # Utilitaires
├── docs/                # Documentation technique complète
└── guides/              # Guides de développement
```

---

## 📚 Documentation

Pour une documentation complète et détaillée, consultez le dossier [`docs/`](./docs/) :

- **[📖 INDEX.md](./docs/INDEX.md)** - Navigation complète de la documentation
- **[🏛️ ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Architecture technique détaillée
- **[📊 DATA_STRUCTURES.md](./docs/DATA_STRUCTURES.md)** - Structures de données TypeScript
- **[🛠️ STACK_TECHNIQUE.md](./docs/STACK_TECHNIQUE.md)** - Stack technique et justifications
- **[🔄 WORKFLOWS_DETAILLES.md](./docs/WORKFLOWS_DETAILLES.md)** - Workflows utilisateurs
- **[💡 DECISIONS_TECHNIQUES.md](./docs/DECISIONS_TECHNIQUES.md)** - Décisions d'architecture
- **[🎨 SYNTHESE_VISUELLE.md](./docs/SYNTHESE_VISUELLE.md)** - Design system et UI

### Guides rapides

- **[⚡ QUICK_START.md](./guides/QUICK_START.md)** - Guide de démarrage rapide
- **[👨‍💻 DEVELOPPEUR.md](./guides/DEVELOPPEUR.md)** - Guide pour développeurs
- **[🔀 GIT.md](./guides/GIT.md)** - Workflow Git et conventions

---

## 🎨 Interface

BlockForge propose une interface moderne et professionnelle avec :

- **Thème clair/sombre** - Basculement instantané
- **Layout dockable** - Panneaux personnalisables et réorganisables
- **Design system cohérent** - Composants shadcn/ui stylisés
- **Responsive** - Adaptation à toutes les tailles d'écran

---

## 🔒 Sécurité & Performance

- **TypeScript strict** - Typage fort pour la sécurité du code
- **ESLint** - Linting automatique
- **Optimisations Vite** - Build optimisé pour la production
- **Code splitting** - Chargement à la demande
- **Lazy loading** - Composants chargés dynamiquement

---

## 🤝 Contribution

Pour toute question ou contribution, contactez l'équipe de développement.

---

## 📄 License

Propriétaire - Tous droits réservés - Steve Zafimahita steve05h2@gmail.com

**Développé avec ❤️ pour les professionnels de la construction**
