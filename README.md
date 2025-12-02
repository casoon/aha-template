# AHA-Stack Template

A template for AHA-Stack projects: **Astro + HTMX + Alpine.js + Tailwind CSS v4**

This template serves as a proof of concept for reusable AHA-Stack applications with server-side fragment rendering.

## Stack

- **[Astro 5](https://astro.build)** - Static & Server-Side Rendering
- **[HTMX](https://htmx.org)** - Server-side interactivity via HTML fragments
- **[Alpine.js](https://alpinejs.dev)** - Lightweight client interactivity
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Edge deployment

## Casoon Packages

| Package | Description |
|---------|-------------|
| [@casoon/fragment-renderer](https://github.com/casoon/fragment-renderer) | Renders Astro components as HTML fragments for HTMX responses |
| [@casoon/skibidoo-ui](https://github.com/casoon/skibidoo-ui) | SSR-first UI components for the AHA-Stack |

## Concept

The AHA-Stack combines the benefits of server-side rendering with targeted client interactivity:

```
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  HTMX Request (e.g. sorting, pagination)              │  │
│  │  GET /api/users?page=2&sortField=name                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                │
│                            ▼                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Server (Astro API Route)                             │  │
│  │  1. Load data from DB                                 │  │
│  │  2. Filter, sort, paginate                            │  │
│  │  3. Render fragment with @casoon/fragment-renderer    │  │
│  │  4. Return HTML + styles                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                │
│                            ▼                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  HTMX replaces DOM element with new HTML              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- No client-side state management
- Data logic stays on the server
- Components deliver their own styles
- Progressive - works without JavaScript

## Installation

```bash
# Clone repository
git clone https://github.com/casoon/aha-template.git
cd aha-template

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro       # Base layout with HTMX/Alpine setup
├── pages/
│   ├── api/
│   │   └── users.ts           # API endpoint with fragment rendering
│   ├── index.astro
│   └── examples.astro
├── i18n/
│   └── translations.ts        # i18n (de/en)
└── styles/
    └── base.css               # Tailwind + custom styles
```

## Fragment Rendering with Registry

The core concept: Astro components from `@casoon/skibidoo-ui` are rendered server-side via the registry and returned as HTML fragments to HTMX.

### API Endpoint Example

```typescript
// src/pages/api/users.ts
import { createAstroRuntime } from "@casoon/fragment-renderer";
import { createPartialRegistry } from "@casoon/skibidoo-ui/registry";

// Create runtime with UI registry
const runtime = createAstroRuntime({
  components: createPartialRegistry(["ui-grid"]),
});

export const GET: APIRoute = async ({ url }) => {
  const page = parseInt(url.searchParams.get("page") || "1");
  const sortField = url.searchParams.get("sortField");

  // Load and process data (server-side!)
  const data = await fetchAndProcessData({ page, sortField });

  // Render component as HTML fragment
  const html = await runtime.renderToString({
    componentId: "ui-grid",
    props: { 
      data, 
      currentPage: page, 
      sortField,
      endpoint: "/api/users",
    },
  });

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};
```

### Astro Config

Add `@casoon/skibidoo-ui` to your Vite SSR config:

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["@casoon/skibidoo-ui"],
    },
  },
});
```

## Available Registry Components

| Component ID    | Description                           |
|-----------------|---------------------------------------|
| `ui-grid`       | Data grid with sort/filter/pagination |
| `ui-form`       | Dynamic form with validation          |
| `ui-button`     | Button with variants                  |
| `ui-card`       | Card container                        |
| `ui-alert`      | Alert/notification box                |
| `ui-modal`      | Modal dialog                          |
| `ui-input`      | Text input field                      |
| `ui-select`     | Select dropdown                       |
| `ui-datepicker` | Date picker                           |

## Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm preview      # Build preview
pnpm cf-deploy    # Deploy to Cloudflare Workers
pnpm lint         # Biome linting
pnpm format       # Biome formatting
```

## Deployment

### Cloudflare Workers

```bash
# Configure wrangler.toml, then:
pnpm cf-deploy
```

## Requirements

- Node.js >= 22
- pnpm

## Roadmap

- [ ] Integrate more skibidoo-ui components
- [ ] Form handling with server-side validation
- [ ] Auth example
- [ ] Database integration (D1/Drizzle)

## License

MIT
