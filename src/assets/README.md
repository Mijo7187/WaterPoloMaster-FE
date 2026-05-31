# Assets

Static assets used throughout the application.

## Structure

```
assets/
├── images/       # Photos, backgrounds, illustrations (.png, .jpg, .webp)
└── icons/        # Icon files (.svg preferred)
```

## Guidelines

- **Images** — Place all raster/vector images here. Use descriptive kebab-case names: `team-logo.png`, `pool-background.webp`.
- **Icons** — SVG icons only. Keep them optimised (no unnecessary metadata). Name them by what they represent: `arrow-left.svg`, `whistle.svg`.
- **Imports** — Import assets via their path so Vite can hash and optimise them:
  ```tsx
  import logo from "@/assets/images/logo.png";
  ```
- **Do not** store component-specific assets elsewhere — all static files belong here.
- **Do not** place fonts here — fonts live in `src/styles/fonts.scss`.
