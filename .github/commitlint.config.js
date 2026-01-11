/**
 * Configuration pour commitlint
 * Valide les messages de commit selon les Conventional Commits
 * 
 * Installation :
 * pnpm add -D @commitlint/cli @commitlint/config-conventional
 * pnpm add -D husky
 * npx husky install
 * npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum
    'type-enum': [
      2,
      'always',
      [
        'feat',     // ✨ Nouvelle fonctionnalité
        'fix',      // 🐛 Correction de bug
        'refactor', // ♻️ Refactoring
        'docs',     // 📝 Documentation
        'style',    // 💄 Style/UI
        'test',     // ✅ Tests
        'chore',    // 🔧 Tâches diverses
        'perf',     // ⚡ Performance
        'build',    // 📦 Build/CI
        'ci',       // 👷 CI/CD
        'revert',   // ⏪ Revert
      ],
    ],
    // Scope enum (optionnel, peut être désactivé)
    'scope-enum': [
      2,
      'always',
      [
        'designer',
        'architect',
        'library',
        'blocks',
        'layers',
        'canvas',
        'store',
        'ui',
        'api',
        'types',
        'tests',
        'docs',
        'deps',
      ],
    ],
    // Message doit être en lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // Message ne doit pas finir par un point
    'subject-full-stop': [2, 'never', '.'],
    // Message doit faire minimum 10 caractères
    'subject-min-length': [2, 'always', 10],
    // Message doit faire maximum 72 caractères
    'subject-max-length': [2, 'always', 72],
    // Type doit être en lowercase
    'type-case': [2, 'always', 'lower-case'],
    // Scope doit être en lowercase
    'scope-case': [2, 'always', 'lower-case'],
  },
};
