# AHA-Stack Template

Ein Template für AHA-Stack Projekte: **Astro + HTMX + Alpine.js + Tailwind CSS v4**

Dieses Template dient als Proof of Concept für wiederverwendbare AHA-Stack Anwendungen mit serverseitigem Fragment-Rendering.

## Stack

- **[Astro 5](https://astro.build)** - Statisches & Server-Side Rendering
- **[HTMX](https://htmx.org)** - Serverseitige Interaktivität via HTML-Fragmente
- **[Alpine.js](https://alpinejs.dev)** - Leichtgewichtige Client-Interaktivität
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-First CSS
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Edge Deployment

## Casoon Packages

| Package | Beschreibung |
|---------|-------------|
| [@casoon/fragment-renderer](https://github.com/casoon/fragment-renderer) | Rendert Astro-Komponenten als HTML-Fragmente für HTMX-Responses |
| [@casoon/skibidoo-ui](https://github.com/casoon/skibidoo-ui) | SSR-first UI-Komponenten für den AHA-Stack |

## Konzept

Der AHA-Stack kombiniert die Vorteile von serverseitigem Rendering mit gezielter Client-Interaktivität:

```
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  HTMX Request (z.B. Sortierung, Paginierung)          │  │
│  │  GET /api/users?page=2&sortField=name                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                │
│                            ▼                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Server (Astro API Route)                             │  │
│  │  1. Daten aus DB laden                                │  │
│  │  2. Filtern, Sortieren, Paginieren                    │  │
│  │  3. Fragment mit @casoon/fragment-renderer rendern    │  │
│  │  4. HTML + Styles zurückgeben                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                │
│                            ▼                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  HTMX ersetzt DOM-Element mit neuem HTML              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Vorteile:**
- Keine Client-Side State-Verwaltung
- Datenlogik bleibt auf dem Server
- Komponenten liefern eigene Styles mit
- Progressiv - funktioniert auch ohne JavaScript

## Installation

```bash
# Repository klonen
git clone https://github.com/casoon/aha-template.git
cd aha-template

# Dependencies installieren
pnpm install

# Entwicklungsserver starten
pnpm dev
```

## Projektstruktur

```
src/
├── components/
│   └── ui/                    # Lokale UI-Komponenten
│       ├── Grid.astro         # HTMX-fähiges Data Grid
│       └── styles/
│           └── grid.ts        # Extrahierte Styles für Fragment-Rendering
├── layouts/
│   └── BaseLayout.astro       # Basis-Layout mit HTMX/Alpine Setup
├── pages/
│   ├── api/
│   │   └── users.ts           # API-Endpoint mit Fragment-Rendering
│   ├── index.astro
│   └── examples.astro
├── i18n/
│   └── translations.ts        # i18n (de/en)
└── styles/
    └── base.css               # Tailwind + Custom Styles
```

## Fragment-Rendering

Das Kernkonzept: Astro-Komponenten werden serverseitig gerendert und als HTML-Fragmente an HTMX zurückgegeben.

### API-Endpoint Beispiel

```typescript
// src/pages/api/users.ts
import { createAstroRuntime } from "@casoon/fragment-renderer";
import Grid from "@components/ui/Grid.astro";
import { gridStyles } from "@components/ui/styles/grid";

const runtime = createAstroRuntime({
  components: [{
    id: "grid",
    loader: () => Promise.resolve({ default: Grid }),
    styles: gridStyles,  // Styles werden mit dem Fragment geliefert
  }],
});

export const GET: APIRoute = async ({ url }) => {
  const page = parseInt(url.searchParams.get("page") || "1");
  const sortField = url.searchParams.get("sortField");
  
  // Daten laden und verarbeiten (serverseitig!)
  const data = await fetchAndProcessData({ page, sortField });
  
  // Komponente als HTML-Fragment rendern
  const html = await runtime.renderToString({
    componentId: "grid",
    props: { data, currentPage: page, sortField },
  });

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};
```

### Komponente mit HTMX

```astro
<!-- Grid.astro -->
<div id="users-grid" class="ui-grid">
  <table>
    <thead>
      <tr>
        {columns.map((col) => (
          <th>
            <button
              hx-get={`/api/users?sortField=${col.field}`}
              hx-target="#users-grid"
              hx-swap="outerHTML"
            >
              {col.label}
            </button>
          </th>
        ))}
      </tr>
    </thead>
    <!-- ... -->
  </table>
</div>
```

## Scripts

```bash
pnpm dev          # Entwicklungsserver
pnpm build        # Production Build
pnpm preview      # Build Preview
pnpm cf-deploy    # Deploy zu Cloudflare Workers
pnpm lint         # Biome Linting
pnpm format       # Biome Formatierung
```

## Deployment

### Cloudflare Workers

```bash
# wrangler.toml konfigurieren, dann:
pnpm cf-deploy
```

## Roadmap

- [ ] Weitere Skibidoo-UI Komponenten integrieren
- [ ] Form-Handling mit serverseitiger Validierung
- [ ] Auth-Beispiel
- [ ] Datenbank-Integration (D1/Drizzle)

## Lizenz

MIT
