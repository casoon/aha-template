// Grid component styles - extracted for use with fragment-renderer
export const gridStyles = `
.ui-grid {
  --grid-border-color: var(--ui-border-color, #e0e0e0);
  --grid-header-bg: var(--ui-surface-variant, #f5f5f5);
  --grid-row-hover: var(--ui-hover, #f9f9f9);
  --grid-row-selected: var(--ui-primary-light, #e3f2fd);

  position: relative;
  border: 1px solid var(--grid-border-color);
  border-radius: var(--ui-radius, 4px);
  background: var(--ui-surface, #fff);
  font-family: var(--ui-font-family, system-ui, sans-serif);
  font-size: var(--ui-font-size, 14px);
}

.ui-grid--loading {
  pointer-events: none;
  opacity: 0.7;
}

.ui-grid__loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.ui-grid__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--grid-border-color);
  border-top-color: var(--ui-primary, #0066cc);
  border-radius: 50%;
  animation: ui-spin 0.8s linear infinite;
}

@keyframes ui-spin {
  to { transform: rotate(360deg); }
}

.ui-grid__toolbar {
  padding: var(--ui-space-sm, 8px);
  border-bottom: 1px solid var(--grid-border-color);
}

.ui-grid__search {
  width: 100%;
  max-width: 300px;
  padding: var(--ui-space-xs, 4px) var(--ui-space-sm, 8px);
  border: 1px solid var(--grid-border-color);
  border-radius: var(--ui-radius, 4px);
  font-size: inherit;
}

.ui-grid__search:focus {
  outline: none;
  border-color: var(--ui-primary, #0066cc);
  box-shadow: 0 0 0 2px var(--ui-primary-alpha, rgba(0, 102, 204, 0.2));
}

.ui-grid__wrapper {
  overflow-x: auto;
}

.ui-grid__table {
  width: 100%;
  border-collapse: collapse;
}

.ui-grid__header {
  padding: var(--ui-space-sm, 8px) var(--ui-space-md, 12px);
  background: var(--grid-header-bg);
  border-bottom: 2px solid var(--grid-border-color);
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}

.ui-grid__header--sortable {
  padding: 0;
}

.ui-grid__sort-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: var(--ui-space-sm, 8px) var(--ui-space-md, 12px);
  background: transparent;
  border: none;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}

.ui-grid__sort-btn:hover {
  background: var(--ui-hover, #eee);
}

.ui-grid__header--sorted {
  background: var(--ui-hover, #eee);
}

.ui-grid__header--center { text-align: center; }
.ui-grid__header--right { text-align: right; }
.ui-grid__header--checkbox { width: 40px; text-align: center; }

.ui-grid__sort-icon {
  display: inline-block;
  opacity: 0.3;
  font-size: 0.8em;
}

.ui-grid__sort-icon::after {
  content: "↕";
}

.ui-grid__sort-icon[data-sort="asc"]::after {
  content: "↑";
  opacity: 1;
}

.ui-grid__sort-icon[data-sort="desc"]::after {
  content: "↓";
  opacity: 1;
}

.ui-grid__row {
  border-bottom: 1px solid var(--grid-border-color);
  transition: background 0.15s;
}

.ui-grid__row:hover {
  background: var(--grid-row-hover);
}

.ui-grid__row--selected {
  background: var(--grid-row-selected) !important;
}

.ui-grid__row--empty {
  text-align: center;
  color: var(--ui-text-muted, #888);
}

.ui-grid__cell {
  padding: var(--ui-space-sm, 8px) var(--ui-space-md, 12px);
}

.ui-grid__cell--center { text-align: center; }
.ui-grid__cell--right { text-align: right; }
.ui-grid__cell--checkbox { width: 40px; text-align: center; }

.ui-grid__checkbox,
.ui-grid__checkbox-all {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.ui-grid__pagination {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm, 8px);
  padding: var(--ui-space-sm, 8px) var(--ui-space-md, 12px);
  border-top: 1px solid var(--grid-border-color);
  background: var(--grid-header-bg);
}

.ui-grid__page-btn {
  padding: var(--ui-space-xs, 4px) var(--ui-space-sm, 8px);
  border: 1px solid var(--grid-border-color);
  border-radius: var(--ui-radius, 4px);
  background: var(--ui-surface, #fff);
  cursor: pointer;
  transition: background 0.15s;
  font-size: inherit;
}

.ui-grid__page-btn:hover:not(:disabled) {
  background: var(--ui-hover, #eee);
}

.ui-grid__page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-grid__page-info {
  margin: 0 var(--ui-space-sm, 8px);
}

.ui-grid__total {
  margin-left: auto;
  color: var(--ui-text-muted, #888);
}

.ui-grid.htmx-request {
  opacity: 0.7;
}
`;
