# 🧪 Documentation Tests - Vitest & React Testing Library

> Guide de référence rapide pour écrire et exécuter des tests avec Vitest et React Testing Library

## 📋 Table des Matières

1. [Configuration](#configuration)
2. [Mindset et Questions Préalables](#mindset-et-questions-préalables)
3. [Commandes de Base](#commandes-de-base)
4. [Écrire un Test](#écrire-un-test)
5. [Queries (Recherche d'éléments)](#queries-recherche-déléments)
6. [Actions Utilisateur](#actions-utilisateur)
7. [Assertions](#assertions)
8. [Exemples Pratiques](#exemples-pratiques)
9. [Tests de Snapshot](#tests-de-snapshot)
10. [Tests de Fonctions](#tests-de-fonctions)
11. [Tests de Hooks](#tests-de-hooks)
12. [Mocking (Mocks et Spies)](#mocking-mocks-et-spies)
13. [Bonnes Pratiques](#bonnes-pratiques)
14. [Ressources](#ressources)
15. [Checklist pour un Bon Test](#checklist-pour-un-bon-test)

---

## ⚙️ Configuration

### Fichiers de Configuration

- **`vitest.config.ts`** : Configuration Vitest avec environnement jsdom
- **`vitest.setup.ts`** : Setup global (import de `@testing-library/jest-dom`)

### Alias de Chemin

Les alias suivants sont configurés dans les tests :

```typescript
'@' → './application'
'@blockForge-ui' → './blockForge-ui'
```

---

## 🧠 Mindset et Questions Préalables

Avant d'écrire un test, prenez le temps de réfléchir et de vous poser les bonnes questions. Cela vous fera gagner du temps et améliorera la qualité de vos tests.

### ✅ Vérifications à Faire Dès le Début

#### 1. Comprendre le Comportement Attendu

**Questions à se poser :**

- ❓ **Quel est le comportement attendu du composant/fonction ?**
  - Que doit-il faire dans le cas nominal ?
  - Quels sont les cas limites ?
  - Quels sont les cas d'erreur ?

- ❓ **Qui est l'utilisateur final ?**
  - Un utilisateur humain ?
  - Un autre développeur utilisant l'API ?
  - Un autre composant/module ?

- ❓ **Quel est le scénario d'utilisation réel ?**
  - Comment sera-t-il utilisé dans l'application ?
  - Quelles sont les interactions possibles ?

**Exemple :**

```typescript
// ❌ Mauvais : Teste l'implémentation
it('should set state to true', () => {
  // ...
})

// ✅ Bon : Teste le comportement utilisateur
it('should show error message when form is invalid', () => {
  // ...
})
```

#### 2. Identifier les Dépendances

**Questions à se poser :**

- ❓ **Quelles sont les dépendances externes ?**
  - APIs, services, contextes
  - Autres composants
  - Hooks personnalisés

- ❓ **Dois-je mocker ces dépendances ?**
  - Pour isoler le test
  - Pour contrôler les réponses
  - Pour éviter les effets de bord

**Checklist :**

- [ ] Identifier toutes les dépendances
- [ ] Décider ce qui doit être mocké
- [ ] Préparer les mocks nécessaires

**Exemple :**

```typescript
// Avant d'écrire le test, identifier les dépendances
function UserProfile({ userId }: { userId: string }) {
  const { data, loading } = useUserData(userId) // Dépendance : hook
  const navigate = useNavigate() // Dépendance : router

  // ...
}

// Dans le test, préparer les mocks
vi.mock('./hooks/useUserData')
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))
```

#### 3. Définir les Cas de Test

**Questions à se poser :**

- ❓ **Quels sont les cas de test essentiels ?**
  - Cas nominal (happy path)
  - Cas limites (edge cases)
  - Cas d'erreur (error cases)

- ❓ **Quels sont les états possibles ?**
  - Loading, success, error
  - Empty, filled, invalid
  - Enabled, disabled

**Template de réflexion :**

```
Composant/Fonction : [Nom]
├── Cas nominal
│   └── Quand [condition], alors [résultat attendu]
├── Cas limites
│   ├── Quand [condition limite 1], alors [résultat]
│   └── Quand [condition limite 2], alors [résultat]
└── Cas d'erreur
    ├── Quand [erreur 1], alors [comportement]
    └── Quand [erreur 2], alors [comportement]
```

**Exemple :**

```typescript
// Avant d'écrire, lister les cas de test
describe('Button', () => {
  // Cas nominal
  it('should call onClick when clicked')

  // Cas limites
  it('should be disabled when disabled prop is true')
  it('should handle multiple rapid clicks')

  // Cas d'erreur
  it('should not crash when onClick is undefined')
})
```

#### 4. Vérifier la Configuration

**Checklist avant de commencer :**

- [ ] Le fichier de test est au bon endroit (`.test.tsx` ou `.spec.tsx`)
- [ ] Les imports nécessaires sont disponibles
- [ ] L'environnement de test est configuré (jsdom pour React)
- [ ] Les alias de chemin fonctionnent
- [ ] Les helpers de test sont importés (`@testing-library/jest-dom`)

**Exemple de structure :**

```typescript
// ✅ Bon début de fichier de test
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // Pour les matchers
import userEvent from '@testing-library/user-event'
import Component from './Component'
```

### 🎯 Mindset à Adopter

#### 1. Tester le Comportement, pas l'Implémentation

**Principe :** Les tests doivent survivre aux refactorings.

```typescript
// ❌ Mauvais : Teste l'implémentation
it('should call setState with true', () => {
  const setState = vi.fn()
  // ...
  expect(setState).toHaveBeenCalledWith(true)
})

// ✅ Bon : Teste le comportement visible
it('should show success message after submission', () => {
  // ...
  expect(screen.getByText('Success!')).toBeInTheDocument()
})
```

#### 2. Un Test = Un Concept

**Principe :** Chaque test doit vérifier une seule chose.

```typescript
// ❌ Mauvais : Teste plusieurs concepts
it('should handle form submission', () => {
  // Teste la validation
  // Teste la soumission
  // Teste le message de succès
  // Teste la redirection
})

// ✅ Bon : Un concept par test
it('should validate email format', () => {
  /* ... */
})
it('should submit form when valid', () => {
  /* ... */
})
it('should show success message after submission', () => {
  /* ... */
})
it('should redirect to dashboard after success', () => {
  /* ... */
})
```

#### 3. Tests Lisibles comme de la Documentation

**Principe :** Les tests doivent être compréhensibles par un nouveau développeur.

```typescript
// ❌ Mauvais : Nom peu descriptif
it('test 1', () => {
  /* ... */
})
it('works', () => {
  /* ... */
})

// ✅ Bon : Nom descriptif qui explique le comportement
it('should display error message when email is invalid', () => {
  /* ... */
})
it('should disable submit button when form is empty', () => {
  /* ... */
})
```

#### 4. Arrange-Act-Assert Pattern

**Principe :** Structurez vos tests en 3 parties claires.

```typescript
it('should increment counter when button is clicked', () => {
  // Arrange : Préparer le contexte
  render(<Counter initialValue={0} />)
  const button = screen.getByRole('button', { name: /increment/i })

  // Act : Effectuer l'action
  userEvent.click(button)

  // Assert : Vérifier le résultat
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

### 📋 Checklist Avant d'Écrire un Test

Avant de commencer à écrire votre test, vérifiez :

- [ ] **Compréhension** : Je comprends le comportement attendu
- [ ] **Dépendances** : J'ai identifié toutes les dépendances
- [ ] **Mocks** : Je sais ce qui doit être mocké
- [ ] **Cas de test** : J'ai listé les cas à tester
- [ ] **Configuration** : L'environnement de test est prêt
- [ ] **Nom du test** : Le nom décrit clairement ce qui est testé
- [ ] **Structure** : Je vais utiliser Arrange-Act-Assert

### 🚨 Signaux d'Alarme

Si vous vous retrouvez dans ces situations, **arrêtez-vous et réfléchissez** :

- ⚠️ **Le test est trop long** (> 30 lignes)
  - → Divisez en plusieurs tests plus petits

- ⚠️ **Le test teste plusieurs choses**
  - → Séparez en tests distincts

- ⚠️ **Le test dépend d'autres tests**
  - → Rendez les tests indépendants

- ⚠️ **Le test est fragile (casse souvent)**
  - → Vérifiez que vous testez le comportement, pas l'implémentation

- ⚠️ **Vous ne savez pas quoi tester**
  - → Revenez aux questions préalables

### 💡 Exemple Complet de Réflexion

**Scénario :** Tester un composant `LoginForm`

**1. Comprendre le comportement :**

- L'utilisateur saisit email et mot de passe
- Clique sur "Se connecter"
- Si valide → redirection vers dashboard
- Si invalide → affichage d'erreur

**2. Identifier les dépendances :**

- `useNavigate` (react-router-dom) → à mocker
- `loginAPI` (service) → à mocker
- `useState` (React) → pas besoin de mocker

**3. Définir les cas de test :**

```
LoginForm
├── Cas nominal
│   └── Quand credentials valides → redirection dashboard
├── Cas limites
│   ├── Quand email invalide → erreur email
│   ├── Quand mot de passe vide → erreur password
│   └── Quand formulaire vide → bouton désactivé
└── Cas d'erreur
    ├── Quand API retourne erreur → message d'erreur
    └── Quand réseau échoue → message d'erreur réseau
```

**4. Écrire les tests :**

```typescript
describe('LoginForm', () => {
  // Cas nominal
  it('should redirect to dashboard when credentials are valid', async () => {
    // Arrange
    const mockNavigate = vi.fn()
    vi.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }))

    // Act
    // ...

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  // Cas limites
  it('should show error when email is invalid', () => {
    // ...
  })

  // Cas d'erreur
  it('should show error message when API fails', () => {
    // ...
  })
})
```

---

## 🚀 Commandes de Base

```bash
# Exécuter tous les tests
pnpm test

# Mode watch (surveille les changements)
pnpm test --watch

# Interface utilisateur
pnpm test:ui

# Exécuter un fichier spécifique
pnpm test Component.test.tsx

# Mode coverage
pnpm test --coverage
```

---

## ✍️ Écrire un Test

### Structure de Base

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Component from './Component'

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Test avec Props

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '@blockForge-ui/ui/button'

describe('Button', () => {
  it('should display the label', () => {
    render(<Button>Cliquer</Button>)
    expect(screen.getByText('Cliquer')).toBeInTheDocument()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Cliquer</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

## 🔍 Queries (Recherche d'éléments)

### Par Rôle (Recommandé)

```typescript
// Recherche par rôle ARIA
screen.getByRole('button')
screen.getByRole('heading', { name: 'Titre' })
screen.getByRole('textbox', { name: 'Email' })
screen.getByRole('link', { name: 'Accueil' })

// Rôles courants : button, heading, textbox, link, img, checkbox, radio, etc.
```

### Par Texte

```typescript
// Texte exact
screen.getByText('Hello World')

// Texte partiel (regex)
screen.getByText(/hello/i)

// Plusieurs éléments
screen.getAllByText('Item')
```

### Par Label

```typescript
// Par label associé
screen.getByLabelText('Email')
screen.getByLabelText(/email/i)
```

### Par Placeholder

```typescript
screen.getByPlaceholderText('Entrez votre nom')
```

### Par Test ID (Dernier recours)

```typescript
// Dans le composant : <div data-testid="custom-element">
screen.getByTestId('custom-element')
```

### Query Variantes

```typescript
// getBy* : trouve 1 élément ou échoue
screen.getByText('Hello')

// queryBy* : trouve 1 élément ou retourne null (pour vérifier l'absence)
screen.queryByText('Hello') // null si absent

// findBy* : trouve 1 élément de manière asynchrone (retourne une Promise)
await screen.findByText('Hello') // attend que l'élément apparaisse

// getAllBy*, queryAllBy*, findAllBy* : pour plusieurs éléments
screen.getAllByRole('button')
```

---

## 🎯 Actions Utilisateur

### Clic

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should handle click', async () => {
  const user = userEvent.setup()
  render(<Button onClick={handleClick}>Cliquer</Button>)

  await user.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalled()
})
```

### Saisie de Texte

```typescript
it('should update input value', async () => {
  const user = userEvent.setup()
  render(<Input />)

  const input = screen.getByRole('textbox')
  await user.type(input, 'Hello World')

  expect(input).toHaveValue('Hello World')
})
```

### Sélection dans un Select

```typescript
it('should select option', async () => {
  const user = userEvent.setup()
  render(<Select options={['Option 1', 'Option 2']} />)

  await user.selectOptions(screen.getByRole('combobox'), 'Option 1')
  expect(screen.getByRole('combobox')).toHaveValue('Option 1')
})
```

### Actions Courantes

```typescript
await user.click(element)
await user.type(element, 'text')
await user.clear(element)
await user.selectOptions(element, 'value')
await user.tab() // Navigation au clavier
await user.keyboard('{Enter}') // Appuyer sur une touche
```

---

## ✅ Assertions

### Assertions Jest-DOM (Recommandé)

```typescript
import '@testing-library/jest-dom'

// Présence/Absence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Attributs
expect(element).toBeVisible()
expect(element).toBeDisabled()
expect(element).toBeEnabled()
expect(element).toBeRequired()
expect(element).toHaveAttribute('aria-label', 'value')

// Classes CSS
expect(element).toHaveClass('active')
expect(element).not.toHaveClass('disabled')

// Valeurs
expect(input).toHaveValue('text')
expect(input).toHaveDisplayValue('text')

// Contenu
expect(element).toHaveTextContent('Hello')
expect(element).toContainHTML('<span>Hello</span>')

// Formulaires
expect(checkbox).toBeChecked()
expect(radio).toBeChecked()
expect(select).toHaveValue('option')
```

### Assertions Vitest Standard

```typescript
// Égalité
expect(value).toBe(5)
expect(value).toEqual({ name: 'John' })

// Vérité/Fausseté
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()

// Nombres
expect(value).toBeGreaterThan(5)
expect(value).toBeLessThan(10)

// Tableaux/Chaînes
expect(array).toContain('item')
expect(string).toMatch(/pattern/)
```

---

## 📝 Exemples Pratiques

### Test de Composant Simple

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Typography } from '@blockForge-ui/ui/typography'

describe('Typography', () => {
  it('should render heading variant', () => {
    render(<Typography variant="h1">Titre</Typography>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Titre')
  })
})
```

### Test avec Router

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '@blockForge-ui/components/Header/Header'

describe('Header', () => {
  it('should render navigation links', () => {
    render(
      <BrowserRouter>
        <Header navigationItems={[
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/settings', label: 'Settings' }
        ]} />
      </BrowserRouter>
    )

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument()
  })
})
```

### Test avec État et Interactions

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@blockForge-ui/ui/button'

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Cliquer</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Test de ProtectedRoute

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProtectedRoute from '@blockForge-ui/components/ProtectedRoute/ProtectedRoute'

describe('ProtectedRoute', () => {
  it('should show error page when not connected', () => {
    render(
      <ProtectedRoute isConnected={false} isAuthorized={true}>
        <div>Contenu protégé</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Non connecté')).toBeInTheDocument()
    expect(screen.queryByText('Contenu protégé')).not.toBeInTheDocument()
  })

  it('should show error page when not authorized', () => {
    render(
      <ProtectedRoute isConnected={true} isAuthorized={false}>
        <div>Contenu protégé</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Accès refusé')).toBeInTheDocument()
  })

  it('should render children when authorized', () => {
    render(
      <ProtectedRoute isConnected={true} isAuthorized={true}>
        <div>Contenu protégé</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Contenu protégé')).toBeInTheDocument()
  })
})
```

### Test Asynchrone

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

describe('AsyncComponent', () => {
  it('should load data asynchronously', async () => {
    const fetchData = vi.fn(() => Promise.resolve({ name: 'John' }))

    render(<AsyncComponent fetchData={fetchData} />)

    expect(screen.getByText('Chargement...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument()
    })

    expect(fetchData).toHaveBeenCalled()
  })
})
```

---

## 📸 Tests de Snapshot

Les tests de snapshot capturent le rendu d'un composant et le comparent avec une version précédemment enregistrée. Utiles pour détecter les changements inattendus dans le rendu.

### Test de Snapshot Basique

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Typography } from '@blockForge-ui/ui/typography'

describe('Typography Snapshot', () => {
  it('should match snapshot', () => {
    const { container } = render(<Typography variant="h1">Titre</Typography>)
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

### Test de Snapshot avec Props Variées

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from '@blockForge-ui/ui/button'

describe('Button Snapshots', () => {
  it('should match snapshot for default variant', () => {
    const { container } = render(<Button>Cliquer</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot for disabled state', () => {
    const { container } = render(<Button disabled>Cliquer</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot for different variants', () => {
    const { container: defaultContainer } = render(
      <Button variant="default">Default</Button>
    )
    const { container: destructiveContainer } = render(
      <Button variant="destructive">Destructive</Button>
    )

    expect(defaultContainer.firstChild).toMatchSnapshot('default-variant')
    expect(destructiveContainer.firstChild).toMatchSnapshot('destructive-variant')
  })
})
```

### Test de Snapshot avec Router

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '@blockForge-ui/components/Header/Header'

describe('Header Snapshot', () => {
  it('should match snapshot with navigation', () => {
    const { container } = render(
      <BrowserRouter>
        <Header
          title="BlockForge"
          navigationItems={[
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/settings', label: 'Settings' },
          ]}
        />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})
```

### Test de Snapshot avec État

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@blockForge-ui/ui/button'

describe('Button State Snapshots', () => {
  it('should match snapshot before and after click', async () => {
    const user = userEvent.setup()
    const { container } = render(<Button>Cliquer</Button>)

    // Snapshot initial
    expect(container.firstChild).toMatchSnapshot('initial-state')

    // Interaction
    await user.click(screen.getByRole('button'))

    // Snapshot après interaction (si le composant change)
    expect(container.firstChild).toMatchSnapshot('after-click')
  })
})
```

### Test de Snapshot de Structure HTML

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ErrorPage from '@blockForge-ui/components/ErrorPage/ErrorPage'

describe('ErrorPage Snapshots', () => {
  it('should match snapshot for 404 error', () => {
    const { container } = render(<ErrorPage errorCode={404} />)
    expect(container).toMatchSnapshot('error-404')
  })

  it('should match snapshot for 500 error', () => {
    const { container } = render(
      <ErrorPage
        errorCode={500}
        title="Erreur serveur"
        message="Une erreur s'est produite"
      />
    )
    expect(container).toMatchSnapshot('error-500')
  })
})
```

### Mise à Jour des Snapshots

Quand vous modifiez intentionnellement un composant, vous devez mettre à jour les snapshots :

```bash
# Mettre à jour tous les snapshots
pnpm test --update

# Mettre à jour un snapshot spécifique
pnpm test Component.test.tsx --update
```

### Snapshot Inline

Pour des snapshots plus petits et ciblés, utilisez des snapshots inline :

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from '@blockForge-ui/ui/button'

describe('Button Inline Snapshot', () => {
  it('should match inline snapshot', () => {
    const { container } = render(<Button>Cliquer</Button>)
    expect(container.firstChild).toMatchInlineSnapshot()
  })
})
```

Le snapshot sera généré directement dans le fichier de test :

```typescript
expect(container.firstChild).toMatchInlineSnapshot(`
  <button
    class="..."
  >
    Cliquer
  </button>
`)
```

### Bonnes Pratiques pour les Snapshots

1. **Utiliser avec modération** : Les snapshots ne remplacent pas les tests de comportement
2. **Tester les cas importants** : Créer des snapshots pour les états critiques
3. **Noms descriptifs** : Utiliser des noms de snapshot clairs
4. **Réviser les changements** : Toujours vérifier les différences lors des mises à jour
5. **Éviter les snapshots trop larges** : Préférer des snapshots ciblés sur des parties spécifiques

### Quand Utiliser les Snapshots

✅ **Bon usage :**

- Détecter les changements inattendus dans le rendu
- Tester les composants avec beaucoup de props/états
- Documentation visuelle du rendu attendu
- Tests de régression rapides

❌ **Mauvais usage :**

- Remplacer les tests de comportement
- Tester la logique métier
- Snapshots qui changent constamment (dates, IDs aléatoires)
- Snapshots trop larges et difficiles à maintenir

### Exemple Complet

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ProtectedRoute from '@blockForge-ui/components/ProtectedRoute/ProtectedRoute'

describe('ProtectedRoute Snapshots', () => {
  it('should match snapshot when not connected', () => {
    const { container } = render(
      <ProtectedRoute isConnected={false} isAuthorized={true}>
        <div>Contenu</div>
      </ProtectedRoute>
    )
    expect(container).toMatchSnapshot('not-connected')
  })

  it('should match snapshot when not authorized', () => {
    const { container } = render(
      <ProtectedRoute isConnected={true} isAuthorized={false}>
        <div>Contenu</div>
      </ProtectedRoute>
    )
    expect(container).toMatchSnapshot('not-authorized')
  })

  it('should match snapshot when authorized', () => {
    const { container } = render(
      <ProtectedRoute isConnected={true} isAuthorized={true}>
        <div>Contenu protégé</div>
      </ProtectedRoute>
    )
    expect(container).toMatchSnapshot('authorized')
  })
})
```

---

## 🔧 Tests de Fonctions

### Test de Fonction Pure

Les fonctions pures sont les plus simples à tester car elles n'ont pas d'effets de bord.

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from '@blockForge-ui/lib/utils'

describe('cn (utils)', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('should merge Tailwind classes correctly', () => {
    expect(cn('p-2 p-4')).toBe('p-4') // p-4 override p-2
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('', null, undefined)).toBe('')
  })
})
```

### Test de Fonction avec Paramètres

```typescript
import { describe, it, expect } from 'vitest'

function calculateTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

describe('calculateTotal', () => {
  it('should calculate total for single item', () => {
    const items = [{ price: 10, quantity: 2 }]
    expect(calculateTotal(items)).toBe(20)
  })

  it('should calculate total for multiple items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ]
    expect(calculateTotal(items)).toBe(35)
  })

  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
})
```

### Test de Fonction avec Validation

```typescript
import { describe, it, expect } from 'vitest'

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name@domain.co.uk')).toBe(true)
  })

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
    expect(validateEmail('test@')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})
```

### Test de Fonction Asynchrone

```typescript
import { describe, it, expect, vi } from 'vitest'

async function fetchUserData(
  userId: string
): Promise<{ id: string; name: string }> {
  // Simulation d'un appel API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: userId, name: 'John Doe' })
    }, 100)
  })
}

describe('fetchUserData', () => {
  it('should fetch user data', async () => {
    const userData = await fetchUserData('123')
    expect(userData).toEqual({ id: '123', name: 'John Doe' })
  })

  it('should handle errors', async () => {
    const fetchWithError = async () => {
      throw new Error('User not found')
    }
    await expect(fetchWithError()).rejects.toThrow('User not found')
  })
})
```

### Test avec Mocks

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

function processData(data: string, logger: (msg: string) => void): string {
  logger(`Processing: ${data}`)
  return data.toUpperCase()
}

describe('processData', () => {
  let mockLogger: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockLogger = vi.fn()
  })

  it('should process data and log', () => {
    const result = processData('hello', mockLogger)
    expect(result).toBe('HELLO')
    expect(mockLogger).toHaveBeenCalledWith('Processing: hello')
    expect(mockLogger).toHaveBeenCalledTimes(1)
  })
})
```

---

## 🎣 Tests de Hooks

### Test de Hook Simple avec renderHook

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useState } from 'react'

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initialValue)
  return { count, increment, decrement, reset }
}

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter())
    act(() => {
      result.current.increment()
    })
    expect(result.current.count).toBe(1)
  })

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5))
    act(() => {
      result.current.decrement()
    })
    expect(result.current.count).toBe(4)
  })

  it('should reset count', () => {
    const { result } = renderHook(() => useCounter(10))
    act(() => {
      result.current.increment()
      result.current.increment()
    })
    expect(result.current.count).toBe(12)
    act(() => {
      result.current.reset()
    })
    expect(result.current.count).toBe(10)
  })
})
```

### Test de Hook avec useEffect

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useEffect, useState } from 'react'

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
    return () => {
      document.title = ''
    }
  }, [title])
}

describe('useDocumentTitle', () => {
  beforeEach(() => {
    document.title = ''
  })

  afterEach(() => {
    document.title = ''
  })

  it('should set document title', () => {
    renderHook(() => useDocumentTitle('Test Page'))
    expect(document.title).toBe('Test Page')
  })

  it('should update document title when title changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Initial Title' },
    })
    expect(document.title).toBe('Initial Title')

    rerender({ title: 'Updated Title' })
    expect(document.title).toBe('Updated Title')
  })

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Test Page'))
    expect(document.title).toBe('Test Page')
    unmount()
    expect(document.title).toBe('')
  })
})
```

### Test de Hook avec Props Changeantes

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useState, useEffect } from 'react'

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 500 })
    expect(result.current).toBe('initial') // Pas encore mis à jour

    await new Promise(resolve => setTimeout(resolve, 600))
    expect(result.current).toBe('updated') // Maintenant mis à jour
  })
})
```

### Test de Hook avec Context

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

const ThemeContext = createContext<'light' | 'dark'>('light')

function useTheme() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children, theme }: { children: ReactNode; theme: 'light' | 'dark' }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

describe('useTheme', () => {
  it('should return theme from context', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme="dark">{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toBe('dark')
  })

  it('should return default theme when no provider', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current).toBe('light')
  })
})
```

### Test de Hook avec Router

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

function useCurrentPath() {
  const location = useLocation()
  return location.pathname
}

describe('useCurrentPath', () => {
  it('should return current path', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    const { result } = renderHook(() => useCurrentPath(), { wrapper })
    expect(result.current).toBe('/')
  })
})
```

### Test de Hook Complexe (useToast)

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from '@blockForge-ui/hooks/use-toast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should add toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
    expect(result.current.toasts[0].description).toBe('This is a test')
  })

  it('should dismiss toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      const toast = result.current.toast({ title: 'Test' })
      expect(result.current.toasts).toHaveLength(1)

      result.current.dismiss(toast.id)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })

  it('should limit toast count', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Toast 1' })
      result.current.toast({ title: 'Toast 2' })
      result.current.toast({ title: 'Toast 3' })
    })

    // TOAST_LIMIT = 1, donc seulement 1 toast
    expect(result.current.toasts).toHaveLength(1)
  })
})
```

### Points Importants pour les Tests de Hooks

1. **Utiliser `renderHook`** : Pour tester les hooks isolément
2. **Utiliser `act`** : Pour envelopper les mises à jour d'état
3. **Wrapper pour Context/Router** : Fournir les providers nécessaires
4. **Rerender** : Pour tester les changements de props
5. **Cleanup** : Vérifier que les effets de bord sont nettoyés

---

## 🎭 Mocking (Mocks et Spies)

Le mocking permet d'isoler les tests en remplaçant des dépendances par des versions contrôlables. Vitest fournit plusieurs outils pour créer des mocks.

### vi.fn() - Mocker une Fonction

Crée une fonction mock qui peut être surveillée et contrôlée.

```typescript
import { describe, it, expect, vi } from 'vitest'

describe('vi.fn()', () => {
  it('should create a mock function', () => {
    const mockFn = vi.fn()

    mockFn('arg1', 'arg2')

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should return a value', () => {
    const mockFn = vi.fn(() => 'return value')

    expect(mockFn()).toBe('return value')
  })

  it('should return different values on multiple calls', () => {
    const mockFn = vi
      .fn()
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second')
      .mockReturnValue('default')

    expect(mockFn()).toBe('first')
    expect(mockFn()).toBe('second')
    expect(mockFn()).toBe('default')
    expect(mockFn()).toBe('default')
  })

  it('should handle async functions', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' })

    const result = await mockFn()
    expect(result).toEqual({ data: 'test' })
  })

  it('should handle errors', () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('Test error'))

    expect(mockFn()).rejects.toThrow('Test error')
  })
})
```

### vi.mock() - Mocker un Module

Remplace un module entier par un mock.

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// Mocker un module avant les imports
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mocked' })),
  postData: vi.fn(() => Promise.resolve({ success: true })),
}))

describe('Component with mocked API', () => {
  it('should use mocked API', async () => {
    const { fetchData } = await import('./api')
    render(<Component />)

    // Le composant utilise maintenant le mock
    expect(fetchData).toHaveBeenCalled()
  })
})
```

**Mocker avec implémentation partielle :**

```typescript
import { vi } from 'vitest'

// Mocker avec certaines fonctions réelles
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils')
  return {
    ...actual,
    expensiveFunction: vi.fn(),
  }
})
```

### vi.spyOn() - Espionner une Méthode

Surveille une méthode existante sans la remplacer complètement.

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

class ApiService {
  fetchUser(id: string) {
    return fetch(`/api/users/${id}`)
  }
}

describe('vi.spyOn()', () => {
  let apiService: ApiService
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    apiService = new ApiService()
    // Espionner la méthode fetch globale
    fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: '123', name: 'John' }),
    } as Response)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should spy on fetch calls', async () => {
    await apiService.fetchUser('123')

    expect(fetchSpy).toHaveBeenCalledWith('/api/users/123')
  })

  it('should restore original implementation', () => {
    // Après restoreAllMocks(), fetch redevient normal
    vi.restoreAllMocks()
    // fetch est maintenant la fonction originale
  })
})
```

### Mocker React Router

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Component from './Component'

// Mocker useNavigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/test' }),
  }
})

describe('Component with router', () => {
  it('should navigate on click', () => {
    render(
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    )

    // Après interaction qui déclenche navigation
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})
```

### Mocker des Hooks Personnalisés

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// Mocker un hook personnalisé
vi.mock('./hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '123', name: 'Test User' },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}))

describe('Component with custom hook', () => {
  it('should use mocked hook', () => {
    render(<Component />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })
})
```

### Mocker des Appels API (fetch)

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('API mocking', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should mock successful API call', async () => {
    const mockData = { id: '1', name: 'John' }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response)

    const response = await fetch('/api/users/1')
    const data = await response.json()

    expect(data).toEqual(mockData)
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1')
  })

  it('should mock failed API call', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not found' }),
    } as Response)

    const response = await fetch('/api/users/999')
    expect(response.ok).toBe(false)
    expect(response.status).toBe(404)
  })
})
```

### Mocker des Modules avec Variables d'Environnement

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mocker process.env
describe('Environment variables', () => {
  beforeEach(() => {
    vi.stubEnv('API_URL', 'https://test-api.com')
    vi.stubEnv('API_KEY', 'test-key')
  })

  it('should use mocked env variables', () => {
    expect(import.meta.env.API_URL).toBe('https://test-api.com')
    expect(import.meta.env.API_KEY).toBe('test-key')
  })
})
```

### Mocker des Timers

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Timer mocking', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should fast-forward time', () => {
    const callback = vi.fn()

    setTimeout(callback, 1000)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should run all timers', () => {
    const callback = vi.fn()

    setTimeout(callback, 1000)
    setTimeout(callback, 2000)

    vi.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
```

### Exemple Complet : Mocker un Service

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'

// Service à mocker
const mockUserService = {
  getUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}

vi.mock('./services/userService', () => ({
  default: mockUserService,
}))

describe('UserProfile with mocked service', () => {
  beforeEach(() => {
    mockUserService.getUser.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })

  it('should load and display user data', async () => {
    render(<UserProfile userId="123" />)

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    expect(mockUserService.getUser).toHaveBeenCalledWith('123')
  })

  it('should handle update', async () => {
    mockUserService.updateUser.mockResolvedValue({ success: true })

    render(<UserProfile userId="123" />)

    // Simuler la mise à jour
    // ...

    expect(mockUserService.updateUser).toHaveBeenCalled()
  })
})
```

### Nettoyer les Mocks

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Cleaning up mocks', () => {
  beforeEach(() => {
    // Setup avant chaque test
  })

  afterEach(() => {
    // Nettoyer après chaque test
    vi.clearAllMocks() // Réinitialise les appels mais garde l'implémentation
    // ou
    vi.resetAllMocks() // Réinitialise appels ET implémentation
    // ou
    vi.restoreAllMocks() // Restaure les implémentations originales
  })
})
```

### Bonnes Pratiques pour le Mocking

1. **Isoler les tests** : Chaque test doit être indépendant
2. **Nettoyer après** : Utiliser `afterEach` pour nettoyer les mocks
3. **Mocker au bon niveau** : Mocker les dépendances externes, pas le code testé
4. **Vérifier les appels** : S'assurer que les mocks sont appelés correctement
5. **Éviter les over-mocking** : Ne pas mocker ce qui n'est pas nécessaire

```typescript
// ❌ Mauvais : Over-mocking
vi.mock('./utils')
vi.mock('./helpers')
vi.mock('./constants')
// Trop de mocks = test fragile

// ✅ Bon : Mocker uniquement les dépendances externes
vi.mock('./api') // API externe
vi.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }))
```

---

## 💡 Bonnes Pratiques

### 1. Priorité des Queries

1. **`getByRole`** - Le plus accessible, teste ce que l'utilisateur voit
2. **`getByLabelText`** - Pour les formulaires
3. **`getByText`** - Pour le contenu visible
4. **`getByTestId`** - Dernier recours uniquement

### 2. Nommer les Tests

```typescript
// ✅ Bon
it('should display error message when form is invalid', () => { ... })
it('should call onSubmit when submit button is clicked', () => { ... })

// ❌ Mauvais
it('test 1', () => { ... })
it('works', () => { ... })
```

### 3. Tester le Comportement, pas l'Implémentation

```typescript
// ✅ Bon - Teste ce que l'utilisateur voit
expect(screen.getByRole('button')).toBeDisabled()

// ❌ Mauvais - Teste l'implémentation
expect(component.props.disabled).toBe(true)
```

### 4. Utiliser `userEvent` plutôt que `fireEvent`

```typescript
// ✅ Bon
await user.click(button)

// ⚠️ Moins bon (mais fonctionne)
fireEvent.click(button)
```

### 5. Organiser avec `describe` et `it`

```typescript
describe('Component', () => {
  describe('when loading', () => {
    it('should show loading state', () => { ... })
  })

  describe('when data is loaded', () => {
    it('should display data', () => { ... })
  })

  describe('when error occurs', () => {
    it('should show error message', () => { ... })
  })
})
```

### 6. Nettoyer après les Tests

```typescript
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup() // Nettoie le DOM après chaque test
})
```

### 7. Mocks et Spies

```typescript
import { vi } from 'vitest'

// Mock de fonction
const mockFn = vi.fn()
const mockFn = vi.fn(() => 'return value')

// Mock de module
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
}))

// Spy sur une méthode
const spy = vi.spyOn(object, 'method')
```

---

## 🔗 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest-DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Library Queries](https://testing-library.com/docs/queries/about/)

---

## 📌 Checklist pour un Bon Test

- [ ] Teste le comportement utilisateur, pas l'implémentation
- [ ] Utilise `getByRole` en priorité
- [ ] Nom descriptif et clair
- [ ] Un seul concept testé par test
- [ ] Arrange-Act-Assert (AAA) pattern
- [ ] Pas de dépendances entre tests
- [ ] Tests rapides et isolés
