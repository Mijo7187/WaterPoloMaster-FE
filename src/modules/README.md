# Modules

Feature modules containing all domain-specific business logic. Each module is a self-contained folder representing a single domain (e.g. users, teams, matches).

## Module file convention

Every module folder **must** follow this naming pattern:

```
modules/
└── <moduleName>/
    ├── <moduleName>.repo.ts         # API calls (repository layer)
    ├── <moduleName>.service.ts      # Business logic & data transformations
    ├── <moduleName>.constants.ts    # Module-specific constants & enums
    ├── <moduleName>.store.ts        # State management (store/slice)
    ├── <moduleName>.types.ts        # TypeScript types & interfaces
    └── <moduleName>.mock.ts         # Mock / fixture data
```

### Example — `users`

```
modules/users/
├── users.repo.ts
├── users.service.ts
├── users.constants.ts
├── users.store.ts
├── users.types.ts
└── users.mock.ts
```

## File responsibilities

| File            | Responsibility                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `.repo.ts`      | **Repository** — The only file that makes HTTP requests (via the Axios instance from `src/config/`). Returns raw API responses or mapped DTOs. |
| `.service.ts`   | **Service** — Business logic, data mapping, computed helpers. Calls `.repo` functions, never Axios directly.                                   |
| `.constants.ts` | **Constants** — Enums, static lookup tables, config values scoped to this module.                                                              |
| `.store.ts`     | **Store** — State management for this domain (Zustand store, Redux slice, React context, etc.). Actions dispatch through `.service`.           |
| `.types.ts`     | **Types** — All TypeScript interfaces, types, and enums used by the module. Imported by every other file in the module.                        |
| `.mock.ts`      | **Mocks** — Fake data for development, storybook, or unit tests. Follows the shapes defined in `.types.ts`.                                    |

## Guidelines

- **No UI code** — Modules contain zero React components. Components live in `src/components/` or `src/pages/`.
- **Import direction** — `types → constants → repo → service → store`. Never import upward in this chain.
- **Cross-module usage** — If module A needs data from module B, import B's `.service` or `.store` — never its `.repo` directly.
- **Naming** — Use camelCase folder names matching the domain: `users`, `teams`, `matchEvents`.
