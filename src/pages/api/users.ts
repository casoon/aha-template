import { createAstroRuntime } from "@casoon/fragment-renderer";
import Grid from "@casoon/skibidoo-ui/src/components/grid/Grid.astro";
import { gridStyles } from "@casoon/skibidoo-ui/dist/styles/grid";
import type { APIRoute } from "astro";

// Simulierte Datenbank mit Einträgen
const allUsers = [
  {
    id: 1,
    name: "Max Mustermann",
    email: "max@example.de",
    status: "active",
    role: "Admin",
  },
  {
    id: 2,
    name: "Erika Schmidt",
    email: "erika@example.de",
    status: "active",
    role: "User",
  },
  {
    id: 3,
    name: "Hans Mueller",
    email: "hans@example.de",
    status: "inactive",
    role: "User",
  },
  {
    id: 4,
    name: "Anna Weber",
    email: "anna@example.de",
    status: "active",
    role: "Editor",
  },
  {
    id: 5,
    name: "Peter Fischer",
    email: "peter@example.de",
    status: "active",
    role: "User",
  },
  {
    id: 6,
    name: "Maria Braun",
    email: "maria@example.de",
    status: "inactive",
    role: "User",
  },
  {
    id: 7,
    name: "Thomas Klein",
    email: "thomas@example.de",
    status: "active",
    role: "Admin",
  },
  {
    id: 8,
    name: "Julia Wagner",
    email: "julia@example.de",
    status: "active",
    role: "Editor",
  },
  {
    id: 9,
    name: "Michael Hoffmann",
    email: "michael@example.de",
    status: "active",
    role: "User",
  },
  {
    id: 10,
    name: "Sarah Becker",
    email: "sarah@example.de",
    status: "inactive",
    role: "User",
  },
  {
    id: 11,
    name: "Andreas Schulz",
    email: "andreas@example.de",
    status: "active",
    role: "Editor",
  },
  {
    id: 12,
    name: "Claudia Meyer",
    email: "claudia@example.de",
    status: "active",
    role: "User",
  },
  {
    id: 13,
    name: "Stefan Koch",
    email: "stefan@example.de",
    status: "inactive",
    role: "Admin",
  },
  {
    id: 14,
    name: "Laura Richter",
    email: "laura@example.de",
    status: "active",
    role: "User",
  },
  {
    id: 15,
    name: "Christian Wolf",
    email: "christian@example.de",
    status: "active",
    role: "Editor",
  },
  {
    id: 16,
    name: "Nina Schaefer",
    email: "nina@example.de",
    status: "inactive",
    role: "User",
  },
];

// Grid-Spalten Konfiguration
const gridColumns = [
  {
    field: "id",
    label: "ID",
    width: 60,
    sortable: true,
    align: "center" as const,
  },
  { field: "name", label: "Name", sortable: true },
  { field: "email", label: "E-Mail", sortable: true },
  { field: "role", label: "Rolle", sortable: true },
  { field: "status", label: "Status", sortable: true },
];

// Fragment-Renderer Runtime erstellen mit Styles
function createRuntime() {
  return createAstroRuntime({
    components: [
      {
        id: "grid",
        loader: () => Promise.resolve({ default: Grid }),
        styles: gridStyles,
      },
    ],
  });
}

export const GET: APIRoute = async ({ url }) => {
  // Query-Parameter auslesen
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "5");
  const sortField = url.searchParams.get("sortField") || undefined;
  const sortDirection =
    (url.searchParams.get("sortDirection") as "asc" | "desc") || undefined;
  const filter = url.searchParams.get("filter") || "";

  // 1. Filtern
  let filteredData = [...allUsers];
  if (filter) {
    const lowerFilter = filter.toLowerCase();
    filteredData = filteredData.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerFilter) ||
        user.email.toLowerCase().includes(lowerFilter) ||
        user.role.toLowerCase().includes(lowerFilter) ||
        user.status.toLowerCase().includes(lowerFilter),
    );
  }

  // 2. Sortieren
  if (sortField) {
    filteredData.sort((a, b) => {
      const aVal = String(a[sortField as keyof typeof a] ?? "").toLowerCase();
      const bVal = String(b[sortField as keyof typeof b] ?? "").toLowerCase();

      // Numerische Sortierung für ID
      if (sortField === "id") {
        const aNum = Number(a.id);
        const bNum = Number(b.id);
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }

      if (sortDirection === "asc") {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });
  }

  // 3. Paginieren
  const totalItems = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // Grid mit fragment-renderer rendern (inkl. Styles)
  const runtime = createRuntime();

  const html = await runtime.renderToString({
    componentId: "grid",
    props: {
      __id: "users-grid",
      columns: gridColumns,
      data: paginatedData,
      pagination: { pageSize, showTotal: true },
      sorting: true,
      filtering: true,
      selection: "none",
      rowKey: "id",
      emptyText: "Keine Daten gefunden",
      endpoint: "/api/users",
      currentPage: page,
      totalItems,
      sortField,
      sortDirection,
      filterValue: filter,
    },
  });

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
};
