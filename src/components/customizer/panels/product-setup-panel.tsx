"use client";

import type { Dispatch } from "react";
import type { CustomizerAction } from "@/lib/customizer/reducer";
import type { FontFamily, JerseyCustomizerState } from "@/lib/customizer/types";
import { collarTypes, fontFamilies, jerseyTypes } from "@/lib/customizer/data";
import { cn } from "@/lib/utils";
import { Panel } from "./panel";

type ProductSetupPanelProps = {
  state: JerseyCustomizerState;
  dispatch: Dispatch<CustomizerAction>;
};

export function ProductSetupPanel({ state, dispatch }: ProductSetupPanelProps) {
  return (
    <Panel kicker="Step 1" title="Product setup">
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-steel">
            Jersey type
          </label>
          <div className="grid gap-2">
            {jerseyTypes.map((type) => (
              <button
                type="button"
                key={type.value}
                onClick={() => dispatch({ type: "setJerseyType", jerseyType: type.value })}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  state.jerseyType === type.value
                    ? "border-volt bg-volt/10"
                    : "border-white/10 bg-black/20 hover:border-white/25"
                )}
              >
                <p className="text-sm font-black text-bone">{type.label}</p>
                <p className="mt-1 text-xs leading-5 text-steel">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-steel">
            Collar type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {collarTypes.map((collar) => (
              <button
                type="button"
                key={collar.value}
                onClick={() => dispatch({ type: "setCollarType", collarType: collar.value })}
                className={cn(
                  "h-10 rounded-full text-sm font-black transition",
                  state.collarType === collar.value
                    ? "bg-bone text-ink"
                    : "border border-white/10 bg-black/20 text-steel hover:text-bone"
                )}
              >
                {collar.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-steel">
            Player font
          </label>
          <select
            value={state.selectedFont}
            onChange={(event) => dispatch({ type: "setFont", font: event.target.value as FontFamily })}
            className="h-11 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-steel">
            Color customization
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.colors).map(([key, value]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-xs capitalize text-steel">{key}</span>
                <input
                  type="color"
                  value={value}
                  onChange={(event) =>
                    dispatch({
                      type: "setColor",
                      key: key as keyof JerseyCustomizerState["colors"],
                      value: event.target.value
                    })
                  }
                  className="h-11 w-full cursor-pointer rounded-xl border border-white/10 bg-black/20 p-1"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
