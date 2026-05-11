"use client";

import { useMemo, useReducer } from "react";
import { Download, Save } from "lucide-react";
import { initialCustomizerState } from "@/lib/customizer/data";
import { createErpExport, customizerReducer, getTotalQuantity } from "@/lib/customizer/reducer";
import { CanvasPreview } from "./preview/canvas-preview";
import { ProductSetupPanel } from "./panels/product-setup-panel";
import { ArtworkPanel } from "./panels/artwork-panel";
import { RosterPanel } from "./panels/roster-panel";
import { QuantityMatrixPanel } from "./panels/quantity-matrix-panel";
import { LayerPanel } from "./panels/layer-panel";

export function CustomizerShell() {
  const [state, dispatch] = useReducer(customizerReducer, initialCustomizerState);
  const totalQuantity = useMemo(() => getTotalQuantity(state.quantityMatrix), [state.quantityMatrix]);
  const exportPayload = useMemo(() => createErpExport(state), [state]);

  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="border-b border-white/10 bg-ink/92 backdrop-blur">
        <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">Jersey customizer</p>
            <h1 className="mt-2 font-display text-3xl font-black">Production-ready design studio</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-bold text-bone hover:bg-white/8">
              <Save className="h-4 w-4" />
              Save design
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-full bg-bone px-4 text-sm font-black text-ink hover:bg-volt">
              <Download className="h-4 w-4" />
              Export to ERP
            </button>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-5 py-5 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
        <aside className="grid gap-4 xl:max-h-[calc(100vh-120px)] xl:overflow-y-auto xl:pr-1">
          <ProductSetupPanel state={state} dispatch={dispatch} />
          <ArtworkPanel state={state} dispatch={dispatch} />
        </aside>

        <main className="min-w-0">
          <CanvasPreview state={state} dispatch={dispatch} totalQuantity={totalQuantity} />
        </main>

        <aside className="grid gap-4 xl:max-h-[calc(100vh-120px)] xl:overflow-y-auto xl:pl-1">
          <LayerPanel state={state} dispatch={dispatch} />
          <RosterPanel state={state} dispatch={dispatch} />
          <QuantityMatrixPanel state={state} dispatch={dispatch} />
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">ERP payload preview</p>
            <pre className="mt-4 max-h-72 overflow-auto rounded-xl bg-black/40 p-3 text-xs leading-5 text-steel">
              {JSON.stringify(exportPayload, null, 2)}
            </pre>
          </div>
        </aside>
      </div>
    </div>
  );
}
