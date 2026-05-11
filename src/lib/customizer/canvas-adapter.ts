import type { DesignLayer, ErpDesignExport, JerseyCustomizerState, ViewSide } from "./types";
import { createErpExport } from "./reducer";

export type CanvasEngine = {
  mount: (element: HTMLCanvasElement) => void;
  unmount: () => void;
  renderSide: (state: JerseyCustomizerState, side: ViewSide) => void;
  exportPng: () => Promise<Blob>;
  exportSvg: () => string;
  serialize: () => unknown;
};

export function getLayersForSide(state: JerseyCustomizerState, side: ViewSide): DesignLayer[] {
  return state.layers
    .filter((layer) => layer.side === side && layer.visible)
    .sort((a, b) => a.zIndex - b.zIndex);
}

export function createExportPayload(state: JerseyCustomizerState): ErpDesignExport {
  return createErpExport(state);
}

/*
  Canvas engine integration contract:

  - Keep DesignLayer as the source of truth.
  - Convert every DesignLayer into canvas objects with stable IDs.
  - Store ERP metadata on every canvas object.
  - Export SVG or high-resolution PNG previews for dashboards and artwork review.
  - Persist both canvas JSON and normalized ErpDesignExport.

  This file intentionally keeps the current UI independent from canvas internals.
*/
