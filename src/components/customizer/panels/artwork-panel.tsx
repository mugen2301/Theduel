"use client";

import type { ChangeEvent, Dispatch, ReactNode } from "react";
import { ImagePlus, Shirt } from "lucide-react";
import type { CustomizerAction } from "@/lib/customizer/reducer";
import type { JerseyCustomizerState, UploadedAsset } from "@/lib/customizer/types";
import { Panel } from "./panel";

type ArtworkPanelProps = {
  state: JerseyCustomizerState;
  dispatch: Dispatch<CustomizerAction>;
};

export function ArtworkPanel({ state, dispatch }: ArtworkPanelProps) {
  function addAssetFromFile(role: UploadedAsset["role"], file?: File) {
    const asset: UploadedAsset = {
      id: `asset-${crypto.randomUUID()}`,
      name: file?.name ?? (role === "sleeveLogo" ? "Sleeve sponsor.svg" : "Team crest.svg"),
      role,
      mimeType: file?.type || "image/svg+xml",
      sizeBytes: file?.size ?? 128000,
      previewUrl: file ? URL.createObjectURL(file) : "",
      productionStatus: "local"
    };

    dispatch({ type: "addAsset", asset });
    dispatch({
      type: "upsertLayer",
      layer: {
        id: `layer-${asset.id}`,
        kind: role === "sleeveLogo" ? "sleeveLogo" : "logo",
        side: role === "sleeveLogo" ? "leftSleeve" : state.activeSide,
        name: asset.name,
        locked: false,
        visible: true,
        zIndex: 8,
        assetId: asset.id,
        text: role === "sleeveLogo" ? "SL" : "LOGO",
        fill: state.colors.accent,
        fontFamily: state.selectedFont,
        transform: {
          position: { x: role === "sleeveLogo" ? 240 : 280, y: role === "sleeveLogo" ? 220 : 190 },
          scale: 1,
          rotation: 0,
          width: 82,
          height: 52
        },
        printTechnique: "sublimation",
        erpCode: role === "sleeveLogo" ? "LOGO_SLEEVE_LEFT" : "LOGO_CUSTOM"
      }
    });
  }

  return (
    <Panel kicker="Step 2" title="Artwork and logos">
      <div className="grid gap-3">
        <UploadButton
          icon={<ImagePlus className="h-5 w-5" />}
          title="Upload team or sponsor logo"
          text="Accept SVG, PDF, AI, EPS, PNG. Store final files in R2 and attach IDs to ERP layers."
          onFile={(file) => addAssetFromFile("teamLogo", file)}
        />
        <UploadButton
          icon={<Shirt className="h-5 w-5" />}
          title="Upload sleeve logo"
          text="Sleeve artwork is tracked as its own production layer and print position."
          onFile={(file) => addAssetFromFile("sleeveLogo", file)}
        />

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-steel">Assets</p>
          <div className="mt-3 grid gap-2">
            {state.assets.length === 0 ? (
              <p className="text-sm text-steel">No uploaded assets yet.</p>
            ) : (
              state.assets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span className="text-sm font-bold text-bone">{asset.name}</span>
                  <span className="text-xs uppercase text-volt">{asset.productionStatus}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function UploadButton({
  icon,
  title,
  text,
  onFile
}: {
  icon: ReactNode;
  title: string;
  text: string;
  onFile: (file?: File) => void;
}) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onFile(event.target.files?.[0]);
    event.target.value = "";
  }

  return (
    <label className="block cursor-pointer rounded-xl border border-dashed border-white/18 bg-black/20 p-4 text-left transition hover:border-volt/70">
      <input
        type="file"
        accept=".svg,.png,.jpg,.jpeg,.webp,.pdf,.ai,.eps"
        onChange={handleChange}
        className="sr-only"
      />
      <div className="text-ember">{icon}</div>
      <p className="mt-3 text-sm font-black text-bone">{title}</p>
      <p className="mt-1 text-xs leading-5 text-steel">{text}</p>
    </label>
  );
}
