"use client";

import type { Dispatch } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Lock, MousePointer2, Trash2 } from "lucide-react";
import type { CustomizerAction } from "@/lib/customizer/reducer";
import type { JerseyCustomizerState } from "@/lib/customizer/types";
import { cn } from "@/lib/utils";
import { Panel } from "./panel";

type LayerPanelProps = {
  state: JerseyCustomizerState;
  dispatch: Dispatch<CustomizerAction>;
};

export function LayerPanel({ state, dispatch }: LayerPanelProps) {
  const layers = [...state.layers].sort((a, b) => b.zIndex - a.zIndex);
  const activeLayer = state.layers.find((layer) => layer.id === state.activeLayerId);

  return (
    <Panel kicker="Layer stack" title="Print layer management">
      <div className="grid gap-2">
        {layers.map((layer) => (
          <div
            key={layer.id}
            onClick={() => dispatch({ type: "selectLayer", layerId: layer.id })}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition",
              state.activeLayerId === layer.id
                ? "border-volt bg-volt/10"
                : "border-white/10 bg-black/20 hover:border-white/25"
            )}
          >
            <MousePointer2 className="h-4 w-4 text-ember" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-bone">{layer.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-steel">
                {layer.side} / {layer.kind} / z{layer.zIndex}
              </p>
            </div>
            {layer.locked ? <Lock className="h-4 w-4 text-steel" /> : null}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                dispatch({ type: "toggleLayerVisibility", layerId: layer.id });
              }}
              className="rounded-full p-1 text-steel hover:bg-white/10 hover:text-bone"
              aria-label={`Toggle ${layer.name} visibility`}
            >
              {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        ))}
      </div>
      {activeLayer ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/24 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-bone">{activeLayer.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-steel">{activeLayer.erpCode}</p>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => dispatch({ type: "moveLayer", layerId: activeLayer.id, direction: "up" })}
                className="grid h-8 w-8 place-items-center rounded-full text-steel hover:bg-white/10 hover:text-bone"
                aria-label="Move layer up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "moveLayer", layerId: activeLayer.id, direction: "down" })}
                className="grid h-8 w-8 place-items-center rounded-full text-steel hover:bg-white/10 hover:text-bone"
                aria-label="Move layer down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              {!activeLayer.locked ? (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "removeLayer", layerId: activeLayer.id })}
                  className="grid h-8 w-8 place-items-center rounded-full text-steel hover:bg-ember/10 hover:text-ember"
                  aria-label="Remove layer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          {activeLayer.text !== undefined ? (
            <label className="mb-3 block">
              <span className="mb-1 block text-xs font-black uppercase tracking-[0.16em] text-steel">
                Text
              </span>
              <input
                value={activeLayer.text}
                onChange={(event) =>
                  dispatch({ type: "updateLayer", layerId: activeLayer.id, patch: { text: event.target.value } })
                }
                className="h-10 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
              />
            </label>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-black uppercase tracking-[0.16em] text-steel">
                Color
              </span>
              <input
                type="color"
                value={activeLayer.fill ?? "#f5f1e8"}
                onChange={(event) =>
                  dispatch({ type: "updateLayer", layerId: activeLayer.id, patch: { fill: event.target.value } })
                }
                className="h-10 w-full cursor-pointer rounded-xl border border-white/10 bg-ink p-1"
              />
            </label>
            <NumberInput
              label="Rotate"
              value={activeLayer.transform.rotation}
              onChange={(value) =>
                dispatch({
                  type: "updateLayerTransform",
                  layerId: activeLayer.id,
                  transform: { rotation: value }
                })
              }
            />
            <NumberInput
              label="Scale"
              step={0.05}
              value={activeLayer.transform.scale}
              onChange={(value) =>
                dispatch({
                  type: "updateLayerTransform",
                  layerId: activeLayer.id,
                  transform: { scale: Math.max(0.1, value) }
                })
              }
            />
            <NumberInput
              label="X"
              value={Math.round(activeLayer.transform.position.x)}
              onChange={(value) =>
                dispatch({
                  type: "updateLayerTransform",
                  layerId: activeLayer.id,
                  transform: { position: { ...activeLayer.transform.position, x: value } }
                })
              }
            />
            <NumberInput
              label="Y"
              value={Math.round(activeLayer.transform.position.y)}
              onChange={(value) =>
                dispatch({
                  type: "updateLayerTransform",
                  layerId: activeLayer.id,
                  transform: { position: { ...activeLayer.transform.position, y: value } }
                })
              }
            />
          </div>
        </div>
      ) : null}
    </Panel>
  );
}

function NumberInput({
  label,
  value,
  step = 1,
  onChange
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-10 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
      />
    </label>
  );
}
