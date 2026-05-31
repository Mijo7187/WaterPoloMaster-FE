# Styles

Global SCSS styles, variables, mixins, and utilities.

## Current files

| File                | Purpose                                                                    |
| ------------------- | -------------------------------------------------------------------------- |
| `globals.scss`      | Master import file — imports all partials. Included once in the app entry. |
| `fonts.scss`        | `@font-face` declarations and font family variables.                       |
| `_variables.scss`   | SCSS variables (spacing, sizing, z-index, etc.).                           |
| `_colors.scss`      | Color palette variables.                                                   |
| `_breakpoints.scss` | Media query breakpoint values.                                             |
| `_mixins.scss`      | Reusable SCSS mixins.                                                      |
| `_responsive.scss`  | Responsive utility classes and helpers.                                    |
| `_animations.scss`  | `@keyframes` animation definitions.                                        |

## Guidelines

- **Partials** — Files prefixed with `_` are SCSS partials. They are never compiled on their own — they are imported via `globals.scss`.
- **Component styles** — Do NOT put component-specific styles here. Use `.module.scss` files co-located with each component.
- **Variables first** — Always use variables from `_variables.scss` and `_colors.scss` instead of hardcoding values.
- **Mixins** — Create mixins in `_mixins.scss` for repeated patterns (e.g. flex-center, truncate-text).
- **Breakpoints** — Use the breakpoint variables/mixins from `_breakpoints.scss` for all media queries. Never hardcode pixel values.
- **Naming** — Use kebab-case for class names. Follow BEM if a global class is needed.
