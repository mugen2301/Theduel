"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle2, ImagePlus, RotateCcw, Send, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
  LogoLayer,
  LogoPlacement,
  PreviewSide,
  ProductType,
  SizeCode,
  SleeveCuff,
  SleeveType,
  TShirtCustomizerState
} from "@/lib/customizer/tshirt-types";
import {
  fontChoices,
  initialTShirtState,
  logoPlacements,
  productTypes,
  sizeCodes,
  sleeveTypes
} from "@/lib/customizer/tshirt-types";
import { cn } from "@/lib/utils";

const CanvasPreview = dynamic(
  () => import("./tshirt-canvas").then((module) => module.TShirtCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[560px] place-items-center rounded-[1.5rem] border border-white/10 bg-white/[0.04] text-sm font-bold text-steel">
        Loading design canvas...
      </div>
    )
  }
);

const placementDefaults: Record<LogoPlacement, { x: number; y: number; width: number; height: number }> = {
  leftChest: { x: 255, y: 235, width: 76, height: 58 },
  rightChest: { x: 392, y: 235, width: 76, height: 58 },
  frontCenter: { x: 285, y: 350, width: 150, height: 94 },
  backTop: { x: 285, y: 145, width: 150, height: 82 },
  leftSleeve: { x: 132, y: 272, width: 76, height: 50 },
  rightSleeve: { x: 512, y: 272, width: 76, height: 50 }
};

export function TShirtCustomizer() {
  const [state, setState] = useState<TShirtCustomizerState>(initialTShirtState);
  const [success, setSuccess] = useState(false);

  const totalQuantity = useMemo(
    () => Object.values(state.sizes).reduce((total, quantity) => total + quantity, 0),
    [state.sizes]
  );

  const placementsUsed = useMemo(
    () =>
      logoPlacements.filter((placement) =>
        state.logos.some((logo) => logo.placement === placement.value)
      ),
    [state.logos]
  );

  function updateState(patch: Partial<TShirtCustomizerState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function updateSize(size: SizeCode, quantity: number) {
    setState((current) => ({
      ...current,
      sizes: {
        ...current.sizes,
        [size]: Math.max(0, quantity)
      }
    }));
  }

  function addLogo(placement: LogoPlacement, file?: File) {
    if (!file) return;

    const defaults = placementDefaults[placement];
    const logo: LogoLayer = {
      id: crypto.randomUUID(),
      placement,
      name: file.name,
      src: URL.createObjectURL(file),
      x: defaults.x,
      y: defaults.y,
      width: defaults.width,
      height: defaults.height,
      rotation: 0
    };

    setState((current) => ({
      ...current,
      previewSide: placement === "backTop" ? "back" : "front",
      selectedLogoId: logo.id,
      logos: [...current.logos.filter((item) => item.placement !== placement), logo]
    }));
  }

  function updateLogo(nextLogo: LogoLayer) {
    setState((current) => ({
      ...current,
      logos: current.logos.map((logo) => (logo.id === nextLogo.id ? nextLogo : logo))
    }));
  }

  function removeSelectedLogo() {
    setState((current) => ({
      ...current,
      selectedLogoId: undefined,
      logos: current.logos.filter((logo) => logo.id !== current.selectedLogoId)
    }));
  }

  function submitInquiry() {
    const inquiry = {
      ...state,
      totalQuantity,
      placementsUsed: placementsUsed.map((placement) => placement.label),
      submittedAt: new Date().toISOString()
    };

    const previous = JSON.parse(localStorage.getItem("theduel_inquiries") ?? "[]") as unknown[];
    localStorage.setItem("theduel_inquiries", JSON.stringify([inquiry, ...previous]));
    setSuccess(true);
  }

  return (
    <main className="min-h-screen bg-ink text-bone">
      <header className="border-b border-white/10 bg-ink/90 backdrop-blur">
        <div className="container-page flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" className="font-display text-xl font-black uppercase tracking-[0.18em]">
              The Duel
            </Link>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-volt">Custom builder</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-none sm:text-6xl">
              Design Your T-Shirt
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setState(initialTShirtState);
                setSuccess(false);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-black text-bone hover:bg-white/8"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={submitInquiry}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-sm font-black text-ink hover:bg-volt"
            >
              <Send className="h-4 w-4" />
              Submit Inquiry
            </button>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-5 py-6 xl:grid-cols-[330px_minmax(0,1fr)_340px]">
        <aside className="grid gap-4 xl:max-h-[calc(100vh-110px)] xl:overflow-y-auto xl:pr-1">
          <Panel title="Product setup" eyebrow="Step 1">
            <ControlGroup label="Product type">
              <div className="grid gap-2">
                {productTypes.map((type) => (
                  <ChoiceButton
                    key={type}
                    active={state.productType === type}
                    onClick={() => updateState({ productType: type as ProductType })}
                  >
                    {type}
                  </ChoiceButton>
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Sleeve type">
              <div className="grid grid-cols-2 gap-2">
                {sleeveTypes.map((type) => (
                  <ChoiceButton
                    key={type}
                    active={state.sleeveType === type}
                    onClick={() => updateState({ sleeveType: type as SleeveType })}
                  >
                    {type}
                  </ChoiceButton>
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Sleeve cuff">
              <div className="grid grid-cols-2 gap-2">
                {(["Yes", "No"] as SleeveCuff[]).map((value) => (
                  <ChoiceButton
                    key={value}
                    active={state.sleeveCuff === value}
                    onClick={() => updateState({ sleeveCuff: value })}
                  >
                    {value}
                  </ChoiceButton>
                ))}
              </div>
              {state.sleeveCuff === "Yes" ? (
                <ColorInput
                  label="Cuff color"
                  value={state.cuffColor}
                  onChange={(cuffColor) => updateState({ cuffColor })}
                />
              ) : null}
            </ControlGroup>

            <ColorInput
              label="Base T-shirt color"
              value={state.baseColor}
              onChange={(baseColor) => updateState({ baseColor })}
            />
          </Panel>

          <Panel title="Logo placements" eyebrow="Step 2">
            <div className="grid gap-3">
              {logoPlacements.map((placement) => {
                const uploaded = state.logos.find((logo) => logo.placement === placement.value);
                return (
                  <label
                    key={placement.value}
                    className="block cursor-pointer rounded-xl border border-dashed border-white/16 bg-black/20 p-3 transition hover:border-volt/70"
                  >
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp,.svg"
                      className="sr-only"
                      onChange={(event) => {
                        addLogo(placement.value, event.target.files?.[0]);
                        event.target.value = "";
                      }}
                    />
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-ember/15 text-ember">
                        <ImagePlus className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-bone">{placement.label}</p>
                        <p className="mt-1 truncate text-xs text-steel">
                          {uploaded ? uploaded.name : "Upload logo file"}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </Panel>
        </aside>

        <section className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-glow sm:p-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-steel">Live visual preview</p>
              <p className="mt-1 font-display text-2xl font-black">{state.productType}</p>
            </div>
            <div className="flex rounded-full border border-white/10 bg-black/24 p-1">
              {(["front", "back"] as PreviewSide[]).map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => updateState({ previewSide: side, selectedLogoId: undefined })}
                  className={cn(
                    "h-10 rounded-full px-5 text-sm font-black capitalize transition",
                    state.previewSide === side ? "bg-volt text-ink" : "text-steel hover:text-bone"
                  )}
                >
                  {side}
                </button>
              ))}
            </div>
          </div>

          <CanvasPreview
            state={state}
            onSelectLogo={(selectedLogoId) => updateState({ selectedLogoId })}
            onUpdateLogo={updateLogo}
          />

          {state.selectedLogoId ? (
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/24 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-steel">
                Selected logo can be dragged, resized from the corner handles, or deleted.
              </p>
              <button
                type="button"
                onClick={removeSelectedLogo}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ember/40 px-4 text-sm font-black text-ember hover:bg-ember/10"
              >
                <Trash2 className="h-4 w-4" />
                Remove logo
              </button>
            </div>
          ) : null}
        </section>

        <aside className="grid gap-4 xl:max-h-[calc(100vh-110px)] xl:overflow-y-auto xl:pl-1">
          <Panel title="Name and number" eyebrow="Step 3">
            <div className="grid gap-3">
              <TextInput label="Player name" value={state.playerName} onChange={(playerName) => updateState({ playerName })} />
              <TextInput label="Player number" value={state.playerNumber} onChange={(playerNumber) => updateState({ playerNumber })} />
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">Font</span>
                <select
                  value={state.font}
                  onChange={(event) => updateState({ font: event.target.value as TShirtCustomizerState["font"] })}
                  className="h-11 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
                >
                  {fontChoices.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
              <ColorInput
                label="Name/number color"
                value={state.textColor}
                onChange={(textColor) => updateState({ textColor })}
              />
            </div>
          </Panel>

          <Panel title="Size and quantity" eyebrow="Step 4">
            <div className="grid grid-cols-4 gap-2">
              {sizeCodes.map((size) => (
                <label key={size} className="rounded-xl border border-white/10 bg-black/20 p-2">
                  <span className="block text-center text-xs font-black text-steel">{size}</span>
                  <input
                    type="number"
                    min={0}
                    value={state.sizes[size]}
                    onChange={(event) => updateSize(size, Number(event.target.value))}
                    className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-ink text-center text-sm font-black text-bone outline-none focus:border-volt"
                  />
                </label>
              ))}
            </div>
          </Panel>

          <Panel title="Order summary" eyebrow="Review">
            <div className="grid gap-3 text-sm">
              <SummaryRow label="Product type" value={state.productType} />
              <SummaryRow label="Sleeve type" value={state.sleeveType} />
              <SummaryRow label="Sleeve cuff" value={state.sleeveCuff === "Yes" ? `Yes (${state.cuffColor})` : "No"} />
              <SummaryRow label="Logos used" value={placementsUsed.length ? placementsUsed.map((item) => item.label).join(", ") : "None"} />
              <SummaryRow label="Name/number" value={`${state.playerName || "No name"} / ${state.playerNumber || "No number"}`} />
              <SummaryRow label="Total quantity" value={`${totalQuantity} pcs`} />
            </div>

            <div className="mt-4 rounded-xl bg-black/24 p-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-steel">Size quantities</p>
              <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs font-bold text-bone">
                {sizeCodes.map((size) => (
                  <div key={size} className="rounded-lg bg-white/8 px-2 py-2">
                    {size}: {state.sizes[size]}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={submitInquiry}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bone text-sm font-black text-ink hover:bg-volt"
            >
              <Send className="h-4 w-4" />
              Submit Inquiry
            </button>

            {success ? (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-volt/30 bg-volt/10 p-3 text-sm text-bone">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
                Inquiry saved in this browser. Our team can connect this to the Laravel backend next.
              </div>
            ) : null}
          </Panel>
        </aside>
      </div>
    </main>
  );
}

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">{eyebrow}</p>
      <h2 className="mt-1 font-display text-xl font-black text-bone">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</p>
      {children}
    </div>
  );
}

function ChoiceButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-xl border px-3 text-left text-sm font-black transition",
        active ? "border-volt bg-volt/10 text-volt" : "border-white/10 bg-black/20 text-bone hover:border-white/25"
      )}
    >
      {children}
    </button>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <div className="flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-2">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
        <span className="text-sm font-bold text-bone">{value.toUpperCase()}</span>
      </div>
    </label>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-steel">{label}</span>
      <span className="max-w-44 text-right font-black text-bone">{value}</span>
    </div>
  );
}
