# React Frontend — Project Context

## Tech Stack
- **React:** 19
- **Node:** v24.11.1
- **Language:** TypeScript
- **UI Library:** Ant Design (antd)
- **State Management:** MobX
- **HTTP Client:** Axios
- **Error Handling:** await-to-js (`to` function)
- **Package manager:** <!-- npm / pnpm / yarn -->

## Dev Commands
```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Project Structure Overview
```
src/
├── components/     # Reusable UI components (forms, inputs, app-wide components)
├── modules/        # Feature modules — each has store, types, constants, repo, service
├── pages/          # Route-level page components
├── router/         # Route definitions and constants
├── stores/         # Global UI stores (modal, drawer, filters, pagination, tab)
├── storage/        # sessionStorage and localStorage helpers
├── utils/          # Pure helper functions
├── assets/         # Images, icons, fonts
└── styles/         # Global styles
```

## Detailed Conventions
@.claude/conventions.md
@.claude/error-handling.md
@.claude/state.md

## Feature Modules
@src/modules/CLAUDE_MODULES.md

## Global Stores
@src/stores/CLAUDE_STORES.md

## Components
@src/components/CLAUDE_COMPONENTS.md

## Router
@src/router/CLAUDE_ROUTER.md
