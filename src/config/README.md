# Config

Centralised application configuration.

## What belongs here

- **Axios instance** — Pre-configured Axios client with base URL, interceptors (auth tokens, error handling), and default headers.
- **Translation / i18n** — Internationalisation setup (e.g. i18next configuration, language resources).
- **Environment helpers** — Typed access to `import.meta.env` variables.
- **Any other global config** — Third-party SDK init, feature flags, app-wide constants that are not module-specific.

## Structure

```
config/
├── axios.ts           # Axios instance & interceptors
├── i18n.ts            # Translation / internationalisation setup
├── env.ts             # Environment variable helpers
└── ...                # Additional configs as needed
```

## Guidelines

- **Single responsibility** — One config concern per file.
- **No UI code** — This folder contains only configuration, never components or hooks.
- **Typed** — Export typed objects/functions so consumers get autocomplete and safety.
- **Secrets** — Never hardcode API keys or secrets. Read them from environment variables via `import.meta.env`.
