# 🔀 Conventions Git - Commits, Branches & Pull Requests

> **Règles simples et claires pour maintenir un historique Git propre**

## 📋 Table des Matières

1. [Branches](#-branches)
2. [Commits](#-commits)
3. [Pull Requests](#-pull-requests)
4. [Workflow Complet](#-workflow-complet)
5. [Commandes Utiles](#-commandes-utiles)
6. [Exemples Pratiques](#-exemples-pratiques)

---

## 🌿 Branches

### Structure des Branches

```
main
 ├── develop
 │    ├── feature/nom-de-la-feature
 │    ├── fix/nom-du-fix
 │    ├── refactor/nom-du-refactor
 │    └── docs/nom-de-la-doc
 └── hotfix/nom-du-hotfix
```

### Convention de Nommage

**Format :** `type/description-courte`

| Type        | Usage                    | Exemple                     |
| ----------- | ------------------------ | --------------------------- |
| `feature/`  | Nouvelle fonctionnalité  | `feature/designer-canvas`   |
| `fix/`      | Correction de bug        | `fix/snap-grid-alignment`   |
| `refactor/` | Refactoring de code      | `refactor/blocks-module`    |
| `docs/`     | Documentation            | `docs/architecture-update`  |
| `test/`     | Ajout de tests           | `test/blocks-module-unit`   |
| `hotfix/`   | Fix urgent en production | `hotfix/export-crash`       |
| `chore/`    | Tâches diverses          | `chore/update-dependencies` |

### Règles de Nommage

✅ **Bon :**

```bash
feature/designer-canvas
fix/layer-visibility-bug
refactor/zustand-stores
docs/quick-start-guide
```

❌ **Mauvais :**

```bash
new-feature
fix
my-branch
test-branch
```

### Branches Principales

| Branche   | Protection  | Usage                       |
| --------- | ----------- | --------------------------- |
| `main`    | 🔒 Protégée | Production, toujours stable |
| `develop` | 🔒 Protégée | Développement, intégration  |

**Règles :**

- ✅ `main` : Déploie automatiquement en production
- ✅ `develop` : Déploie automatiquement en staging
- ❌ **Jamais** commit direct sur `main` ou `develop`
- ✅ **Toujours** passer par une PR

---

## 📝 Commits

### Format de Message

```
<type>(<scope>): <description>

[body optionnel]

[footer optionnel]
```

### Types de Commit

| Type       | Emoji | Description                          | Exemple                                  |
| ---------- | ----- | ------------------------------------ | ---------------------------------------- |
| `feat`     | ✨    | Nouvelle fonctionnalité              | `feat(designer): add rectangle tool`     |
| `fix`      | 🐛    | Correction de bug                    | `fix(snap): correct grid alignment`      |
| `refactor` | ♻️    | Refactoring                          | `refactor(store): simplify blocks store` |
| `docs`     | 📝    | Documentation                        | `docs(readme): update install steps`     |
| `style`    | 💄    | Style/UI (pas de changement logique) | `style(ui): update button colors`        |
| `test`     | ✅    | Ajout de tests                       | `test(blocks): add unit tests`           |
| `chore`    | 🔧    | Tâches diverses                      | `chore(deps): update dependencies`       |
| `perf`     | ⚡    | Performance                          | `perf(canvas): optimize rendering`       |
| `build`    | 📦    | Build/CI                             | `build(vite): configure code splitting`  |
| `ci`       | 👷    | CI/CD                                | `ci(github): add deploy workflow`        |

### Scopes Recommandés

| Scope       | Description              |
| ----------- | ------------------------ |
| `designer`  | Mode Designer            |
| `architect` | Mode Architecte          |
| `library`   | Library Module           |
| `blocks`    | Blocks Module            |
| `layers`    | Layers Module            |
| `canvas`    | Canvas (PixiJS/Three.js) |
| `store`     | State Management         |
| `ui`        | Components UI            |
| `api`       | API calls                |
| `types`     | Types TypeScript         |
| `tests`     | Tests                    |
| `docs`      | Documentation            |

### Règles de Message

✅ **Bon :**

```bash
feat(designer): add rectangle drawing tool
fix(snap): correct alignment calculation
refactor(store): simplify blocks state management
docs(readme): add installation instructions
```

❌ **Mauvais :**

```bash
update
fix bug
wip
test
```

### Template de Message Complet

```bash
feat(designer): add polygon drawing tool

- Add PolygonTool class
- Implement mouse event handlers
- Add visual feedback during drawing
- Update toolbar with polygon button

Closes #42
```

**Structure :**

- **Ligne 1** : `type(scope): description` (max 72 caractères)
- **Ligne 2** : Vide
- **Ligne 3+** : Détails (optionnel)
- **Footer** : Références issues (optionnel)

### Commandes Commit

```bash
# Commit simple
git commit -m "feat(designer): add rectangle tool"

# Commit avec description détaillée
git commit -m "feat(designer): add rectangle tool" -m "- Add RectangleTool class
- Implement drawing logic
- Add tests"

# Modifier le dernier commit
git commit --amend

# Ajouter au dernier commit sans modifier le message
git commit --amend --no-edit
```

---

## 🔄 Pull Requests

### Titre de PR

**Format :** `[Type] Description claire`

**Exemples :**

```
[Feature] Designer Canvas avec outils de dessin
[Fix] Correction du snap grid alignment
[Refactor] Simplification du Blocks Store
[Docs] Mise à jour du Quick Start Guide
```

### Template de PR

```markdown
## 📋 Description

Brève description de ce que fait cette PR.

## 🎯 Type de Changement

- [ ] ✨ Feature (nouvelle fonctionnalité)
- [ ] 🐛 Fix (correction de bug)
- [ ] ♻️ Refactor (refactoring)
- [ ] 📝 Docs (documentation)
- [ ] ✅ Tests (ajout de tests)
- [ ] 🔧 Chore (tâches diverses)

## 🔗 Issue Liée

Closes #42

## ✅ Checklist

- [ ] Code testé localement
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Lint OK (`pnpm run lint`)
- [ ] Type check OK (`pnpm run type-check`)
- [ ] Build OK (`pnpm run build`)

## 📸 Screenshots (si applicable)

[Ajouter des screenshots si changement visuel]

## 📝 Notes pour le Review

Points spécifiques à vérifier, décisions techniques prises, etc.
```

### Règles de PR

✅ **Bonnes Pratiques :**

- ✅ **Une PR = Une fonctionnalité** (ou un fix)
- ✅ **Titre clair** et descriptif
- ✅ **Description détaillée** avec contexte
- ✅ **Tests inclus** pour le code ajouté
- ✅ **Petites PRs** (< 500 lignes de code si possible)
- ✅ **Reviewer assigné** avant merge
- ✅ **CI/CD passé** (tous les checks verts)

❌ **À Éviter :**

- ❌ PRs trop grosses (> 1000 lignes)
- ❌ Multiples features dans une seule PR
- ❌ Commits "WIP" dans la PR finale
- ❌ Merge sans review
- ❌ Conflits non résolus

### Assignation de Reviewers

```bash
# 1 reviewer minimum pour feature
# 2 reviewers pour refactor important
# Tech Lead review pour architecture change
```

---

## 🔄 Workflow Complet

### 1. Créer une Branche

```bash
# Se mettre à jour
git checkout develop
git pull origin develop

# Créer nouvelle branche
git checkout -b feature/designer-canvas
```

### 2. Développer

```bash
# Travailler sur la feature
# Faire des commits réguliers

git add .
git commit -m "feat(designer): add canvas setup"

git add src/components/Canvas.tsx
git commit -m "feat(designer): add Canvas component"

git add src/components/Toolbar.tsx
git commit -m "feat(designer): add drawing toolbar"
```

### 3. Pousser la Branche

```bash
# Première fois
git push -u origin feature/designer-canvas

# Fois suivantes
git push
```

### 4. Créer une Pull Request

**Sur GitHub :**

1. Aller dans "Pull Requests"
2. Cliquer "New Pull Request"
3. Base: `develop` ← Compare: `feature/designer-canvas`
4. Remplir le template
5. Assigner un reviewer
6. Créer la PR

### 5. Répondre aux Commentaires

```bash
# Faire les modifications demandées
git add .
git commit -m "fix(designer): address review comments"
git push
```

### 6. Merge de la PR

**Options de merge :**

| Option               | Usage                                             |
| -------------------- | ------------------------------------------------- |
| **Squash and merge** | ✅ **Recommandé** - Combine tous les commits en 1 |
| **Rebase and merge** | ✅ OK si historique propre                        |
| **Merge commit**     | ❌ Pas recommandé (historique pollué)             |

**Après merge :**

```bash
# Revenir sur develop
git checkout develop
git pull origin develop

# Supprimer branche locale
git branch -d feature/designer-canvas
```

---

## 🛠️ Commandes Utiles

### Gestion des Branches

```bash
# Lister toutes les branches
git branch -a

# Supprimer branche locale
git branch -d feature/ma-feature

# Supprimer branche distante
git push origin --delete feature/ma-feature

# Renommer branche actuelle
git branch -m nouveau-nom
```

### Synchronisation

```bash
# Récupérer les dernières modifications
git fetch origin

# Mettre à jour develop
git checkout develop
git pull origin develop

# Rebaser votre branche sur develop
git checkout feature/ma-feature
git rebase develop

# Pousser après rebase (force push)
git push --force-with-lease
```

### Nettoyage

```bash
# Annuler modifications non commitées
git checkout .

# Annuler dernier commit (garde les modifications)
git reset --soft HEAD~1

# Annuler dernier commit (supprime les modifications)
git reset --hard HEAD~1

# Nettoyer fichiers non trackés
git clean -fd
```

### Stash (mise de côté temporaire)

```bash
# Mettre de côté les modifications
git stash

# Lister les stashs
git stash list

# Récupérer le dernier stash
git stash pop

# Récupérer un stash spécifique
git stash apply stash@{0}
```

---

## 💡 Exemples Pratiques

### Exemple 1 : Nouvelle Feature

```bash
# 1. Créer branche
git checkout develop
git pull origin develop
git checkout -b feature/library-search

# 2. Développer
git add src/components/LibraryPanel/SearchBar.tsx
git commit -m "feat(library): add search bar component"

git add src/modules/library/SearchEngine.ts
git commit -m "feat(library): implement fuzzy search"

git add src/modules/library/__tests__/SearchEngine.test.ts
git commit -m "test(library): add search engine tests"

# 3. Push et PR
git push -u origin feature/library-search
# Créer PR sur GitHub avec titre : "[Feature] Library Search avec Fuzzy Matching"

# 4. Après merge
git checkout develop
git pull origin develop
git branch -d feature/library-search
```

### Exemple 2 : Fix de Bug

```bash
# 1. Créer branche
git checkout develop
git pull origin develop
git checkout -b fix/snap-alignment

# 2. Corriger
git add src/modules/grid-snap/SnapEngine.ts
git commit -m "fix(snap): correct grid alignment calculation"

git add src/modules/grid-snap/__tests__/SnapEngine.test.ts
git commit -m "test(snap): add regression test for alignment"

# 3. Push et PR
git push -u origin fix/snap-alignment
# Créer PR avec titre : "[Fix] Correction du snap grid alignment"
```

### Exemple 3 : Refactoring

```bash
# 1. Créer branche
git checkout develop
git pull origin develop
git checkout -b refactor/blocks-store

# 2. Refactorer
git add src/stores/useBlocksStore.ts
git commit -m "refactor(store): simplify blocks state structure"

git add src/stores/useBlocksStore.ts
git commit -m "refactor(store): extract validation logic"

git add src/stores/__tests__/useBlocksStore.test.ts
git commit -m "test(store): update tests after refactor"

# 3. Push et PR
git push -u origin refactor/blocks-store
# Créer PR avec titre : "[Refactor] Simplification du Blocks Store"
```

### Exemple 4 : Documentation

```bash
# 1. Créer branche
git checkout develop
git pull origin develop
git checkout -b docs/api-reference

# 2. Documenter
git add ../docs/API.md
git commit -m "docs(api): add blocks API reference"

git add ../docs/API.md
git commit -m "docs(api): add examples for each endpoint"

# 3. Push et PR
git push -u origin docs/api-reference
# Créer PR avec titre : "[Docs] Ajout de la référence API"
```

---

## 🎯 Résumé Rapide

### Branches

```
feature/nom-descriptif  → Nouvelle fonctionnalité
fix/nom-descriptif      → Correction de bug
refactor/nom-descriptif → Refactoring
docs/nom-descriptif     → Documentation
```

### Commits

```
feat(scope): description   → Nouvelle fonctionnalité
fix(scope): description    → Correction
refactor(scope): description → Refactoring
docs(scope): description   → Documentation
```

### Pull Requests

```
[Type] Description claire
- Feature complète
- Tests inclus
- Documentation à jour
- CI/CD passé
- Review validé
```

### Workflow

```
1. git checkout -b feature/nom
2. git commit -m "feat(scope): description"
3. git push -u origin feature/nom
4. Créer PR sur GitHub
5. Merge après review
6. git checkout develop && git pull
```

---

## 📚 Ressources

### Documentation Externe

- **Conventional Commits** : https://www.conventionalcommits.org/
- **Git Flow** : https://nvie.com/posts/a-successful-git-branching-model/
- **GitHub Flow** : https://guides.github.com/introduction/flow/

### Fichiers de Configuration (dans ce projet)

| Fichier                            | Description                                       |
| ---------------------------------- | ------------------------------------------------- |
| `.github/pull_request_template.md` | Template automatique pour les PR sur GitHub       |
| `.github/commitlint.config.js`     | Configuration pour valider les messages de commit |
| `.gitignore`                       | Fichiers à ignorer par Git                        |

### Installation de Commitlint (Optionnel)

Pour valider automatiquement les messages de commit :

```bash
# Installer les dépendances
pnpm add -D @commitlint/cli @commitlint/config-conventional husky

# Installer husky
npx husky install

# Ajouter le hook commit-msg
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

**Effet :** Chaque commit sera validé selon les conventions avant d'être accepté.

---

**Suivez ces conventions pour maintenir un historique Git propre et professionnel ! 🚀**

---

_Dernière mise à jour : 2026-01-10_  
_Version : 1.0.0_
