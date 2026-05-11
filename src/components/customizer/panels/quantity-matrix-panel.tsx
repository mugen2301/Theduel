"use client";

import type { Dispatch } from "react";
import type { CustomizerAction } from "@/lib/customizer/reducer";
import { getTotalQuantity } from "@/lib/customizer/reducer";
import type { JerseyCustomizerState } from "@/lib/customizer/types";
import { sizeCodes } from "@/lib/customizer/data";
import { Panel } from "./panel";

type QuantityMatrixPanelProps = {
  state: JerseyCustomizerState;
  dispatch: Dispatch<CustomizerAction>;
};

export function QuantityMatrixPanel({ state, dispatch }: QuantityMatrixPanelProps) {
  const totalQuantity = getTotalQuantity(state.quantityMatrix);

  return (
    <Panel kicker="Sizing" title="Quantity matrix">
      <div className="grid grid-cols-4 gap-2">
        {sizeCodes.map((size) => (
          <label key={size} className="block rounded-xl border border-white/10 bg-black/20 p-2">
            <span className="block text-center text-xs font-black text-steel">{size}</span>
            <input
              type="number"
              min={0}
              value={state.quantityMatrix[size]}
              onChange={(event) =>
                dispatch({ type: "setQuantity", size, quantity: Number(event.target.value) })
              }
              className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-ink text-center text-sm font-black text-bone outline-none focus:border-volt"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-volt p-4 text-ink">
        <p className="text-xs font-black uppercase tracking-[0.16em]">Total order quantity</p>
        <p className="mt-1 font-display text-3xl font-black">{totalQuantity} pcs</p>
      </div>
      <label className="mt-4 block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-steel">
          Production notes
        </span>
        <textarea
          value={state.notes}
          onChange={(event) => dispatch({ type: "setNotes", notes: event.target.value })}
          rows={4}
          className="w-full resize-none rounded-xl border border-white/10 bg-ink p-3 text-sm leading-6 text-bone outline-none focus:border-volt"
        />
      </label>
    </Panel>
  );
}
