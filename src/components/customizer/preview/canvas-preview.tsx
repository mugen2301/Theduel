"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, DragEvent as ReactDragEvent } from "react";
import { Group, Image as KonvaImage, Layer, Line, Rect, Stage, Text, Transformer } from "react-konva";
import type Konva from "konva";
import { Eye, Layers3, Minus, Plus, RotateCcw, UploadCloud } from "lucide-react";
import type { CustomizerAction } from "@/lib/customizer/reducer";
import type { DesignLayer, JerseyCustomizerState, UploadedAsset, ViewSide } from "@/lib/customizer/types";
import { getLayersForSide } from "@/lib/customizer/canvas-adapter";
import { viewSides } from "@/lib/customizer/data";
import { cn } from "@/lib/utils";

type CanvasPreviewProps = {
  state: JerseyCustomizerState;
  dispatch: Dispatch<CustomizerAction>;
  totalQuantity: number;
};

const canvasSize = {
  width: 720,
  height: 820
};

export function CanvasPreview({ state, dispatch, totalQuantity }: CanvasPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const nodeRefs = useRef<Record<string, Konva.Node | null>>({});
  const [wrapperWidth, setWrapperWidth] = useState(720);
  const [zoom, setZoom] = useState(0.82);

  const sideLayers = useMemo(
    () => getLayersForSide(state, state.activeSide),
    [state, state.activeSide]
  );

  const activeLayer = state.layers.find((layer) => layer.id === state.activeLayerId);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWrapperWidth(Math.max(320, entry.contentRect.width));
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const transformer = transformerRef.current;
    const node = state.activeLayerId ? nodeRefs.current[state.activeLayerId] : null;

    if (!transformer) return;

    if (node && activeLayer && !activeLayer.locked) {
      transformer.nodes([node]);
    } else {
      transformer.nodes([]);
    }

    transformer.getLayer()?.batchDraw();
  }, [activeLayer, state.activeLayerId, state.activeSide, sideLayers]);

  const stageScale = Math.min(wrapperWidth / canvasSize.width, 1) * zoom;
  const stageWidth = Math.round(canvasSize.width * stageScale);
  const stageHeight = Math.round(canvasSize.height * stageScale);

  function handleDrop(event: ReactDragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) return;

    const asset: UploadedAsset = {
      id: `asset-${crypto.randomUUID()}`,
      name: file.name,
      role: state.activeSide.includes("Sleeve") ? "sleeveLogo" : "teamLogo",
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      previewUrl: URL.createObjectURL(file),
      productionStatus: "local"
    };

    const point = stageRef.current?.getPointerPosition();
    const stagePoint = point
      ? {
          x: point.x / stageScale,
          y: point.y / stageScale
        }
      : { x: 360, y: 260 };

    dispatch({ type: "addAsset", asset });
    dispatch({
      type: "upsertLayer",
      layer: {
        id: `layer-${asset.id}`,
        kind: state.activeSide.includes("Sleeve") ? "sleeveLogo" : "logo",
        side: state.activeSide,
        name: asset.name,
        locked: false,
        visible: true,
        zIndex: 20,
        assetId: asset.id,
        transform: {
          position: stagePoint,
          scale: 1,
          rotation: 0,
          width: 120,
          height: 72
        },
        printTechnique: "sublimation",
        erpCode: state.activeSide.includes("Sleeve") ? "LOGO_SLEEVE_CUSTOM" : "LOGO_CUSTOM"
      }
    });
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-glow sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-steel">React Konva studio</p>
          <h2 className="mt-1 font-display text-2xl font-black">{state.designName}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {viewSides.map((side) => (
            <button
              key={side.value}
              type="button"
              onClick={() => dispatch({ type: "setActiveSide", side: side.value })}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-black transition",
                state.activeSide === side.value
                  ? "bg-volt text-ink"
                  : "border border-white/10 bg-white/[0.04] text-steel hover:text-bone"
              )}
            >
              {side.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={wrapperRef}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="relative grid min-h-[620px] place-items-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(245,241,232,0.08),rgba(7,9,13,0.96)_65%)] p-4"
      >
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs font-bold text-steel backdrop-blur">
          <Eye className="h-4 w-4 text-volt" />
          {state.activeSide} preview
        </div>
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs font-bold text-steel backdrop-blur">
          <Layers3 className="h-4 w-4 text-ember" />
          {sideLayers.length} layers
        </div>

        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur">
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(0.55, Number((value - 0.08).toFixed(2))))}
            className="grid h-9 w-9 place-items-center rounded-full text-steel hover:bg-white/10 hover:text-bone"
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-14 text-center text-xs font-black text-bone">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(1.25, Number((value + 0.08).toFixed(2))))}
            className="grid h-9 w-9 place-items-center rounded-full text-steel hover:bg-white/10 hover:text-bone"
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(0.82)}
            className="grid h-9 w-9 place-items-center rounded-full text-steel hover:bg-white/10 hover:text-bone"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs font-bold text-steel backdrop-blur sm:flex">
          <UploadCloud className="h-4 w-4 text-volt" />
          Drag a logo onto the jersey
        </div>

        <Stage
          ref={stageRef}
          width={stageWidth}
          height={stageHeight}
          scaleX={stageScale}
          scaleY={stageScale}
          onMouseDown={(event) => {
            if (event.target === event.target.getStage()) {
              dispatch({ type: "selectLayer", layerId: undefined });
            }
          }}
          onTouchStart={(event) => {
            if (event.target === event.target.getStage()) {
              dispatch({ type: "selectLayer", layerId: undefined });
            }
          }}
        >
          <Layer>
            <JerseyBody state={state} side={state.activeSide} />
            {sideLayers
              .filter((layer) => !["base", "colorZone"].includes(layer.kind))
              .map((layer) => (
                <CanvasLayer
                  key={layer.id}
                  layer={layer}
                  asset={state.assets.find((asset) => asset.id === layer.assetId)}
                  isActive={state.activeLayerId === layer.id}
                  setNode={(node) => {
                    nodeRefs.current[layer.id] = node;
                  }}
                  onSelect={() => dispatch({ type: "selectLayer", layerId: layer.id })}
                  onTransform={(nextLayer) =>
                    dispatch({
                      type: "updateLayerTransform",
                      layerId: layer.id,
                      transform: nextLayer.transform
                    })
                  }
                />
              ))}
            <Transformer
              ref={transformerRef}
              rotateEnabled
              enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
              borderStroke="#c8ff45"
              anchorStroke="#c8ff45"
              anchorFill="#07090d"
            />
          </Layer>
        </Stage>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Total quantity" value={`${totalQuantity} pcs`} />
        <Stat label="Collar" value={state.collarType} />
        <Stat label="Selected layer" value={activeLayer?.name ?? "None"} />
      </div>
    </section>
  );
}

function JerseyBody({ state, side }: { state: JerseyCustomizerState; side: ViewSide }) {
  const isSleeve = side === "leftSleeve" || side === "rightSleeve";

  if (isSleeve) {
    return (
      <>
        <Rect x={230} y={170} width={260} height={420} cornerRadius={90} fill={state.colors.primary} stroke="#ffffff33" />
        <Rect x={300} y={170} width={74} height={420} fill={state.colors.secondary} opacity={0.9} rotation={side === "leftSleeve" ? -8 : 8} />
        <Text x={262} y={610} width={196} align="center" text={side === "leftSleeve" ? "LEFT SLEEVE" : "RIGHT SLEEVE"} fill="#8f9aaa" fontSize={18} fontStyle="bold" />
      </>
    );
  }

  return (
    <>
      <Line
        points={[220, 120, 180, 175, 120, 250, 162, 310, 190, 278, 190, 660, 530, 660, 530, 278, 558, 310, 600, 250, 540, 175, 500, 120, 420, 152, 360, 164, 300, 152]}
        closed
        fill={state.colors.primary}
        stroke="#ffffff33"
        strokeWidth={2}
        shadowColor="#000000"
        shadowBlur={28}
        shadowOpacity={0.32}
      />
      <Line
        points={[316, 142, 372, 158, 448, 640, 372, 660, 292, 166]}
        closed
        fill={state.colors.secondary}
        opacity={0.92}
      />
      <Line
        points={[300, 150, 360, 178, 420, 150, 400, 210, 360, 232, 320, 210]}
        closed
        fill="#07090d"
        stroke={state.colors.trim}
        strokeWidth={3}
      />
      <Line
        points={[190, 660, 530, 660]}
        stroke={state.colors.trim}
        strokeWidth={8}
        opacity={0.9}
      />
    </>
  );
}

function CanvasLayer({
  layer,
  asset,
  isActive,
  setNode,
  onSelect,
  onTransform
}: {
  layer: DesignLayer;
  asset?: UploadedAsset;
  isActive: boolean;
  setNode: (node: Konva.Node | null) => void;
  onSelect: () => void;
  onTransform: (layer: DesignLayer) => void;
}) {
  const image = useLoadedImage(asset?.previewUrl);
  const commonProps = {
    id: layer.id,
    x: layer.transform.position.x,
    y: layer.transform.position.y,
    width: layer.transform.width ?? 120,
    height: layer.transform.height ?? 52,
    scaleX: layer.transform.scale,
    scaleY: layer.transform.scale,
    rotation: layer.transform.rotation,
    opacity: layer.opacity ?? 1,
    draggable: !layer.locked,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: (event: Konva.KonvaEventObject<Event>) => {
      onTransform({
        ...layer,
        transform: {
          ...layer.transform,
          position: { x: event.target.x(), y: event.target.y() }
        }
      });
    },
    onTransformEnd: (event: Konva.KonvaEventObject<Event>) => {
      const node = event.target;
      onTransform({
        ...layer,
        transform: {
          ...layer.transform,
          position: { x: node.x(), y: node.y() },
          rotation: node.rotation(),
          scale: node.scaleX(),
          width: node.width(),
          height: node.height()
        }
      });
    }
  };

  if (image) {
    return (
      <KonvaImage
        {...commonProps}
        ref={(node) => setNode(node)}
        image={image}
        stroke={isActive ? "#c8ff45" : undefined}
        strokeWidth={isActive ? 2 : 0}
      />
    );
  }

  if (layer.kind === "logo" || layer.kind === "sleeveLogo") {
    return (
      <Group {...commonProps} ref={(node) => setNode(node)}>
        <Rect
          x={0}
          y={0}
          width={layer.transform.width ?? 120}
          height={layer.transform.height ?? 52}
          cornerRadius={16}
          fill="#07090dcc"
          stroke={isActive ? "#c8ff45" : layer.fill ?? "#f5f1e8"}
          strokeWidth={2}
        />
        <Text
          x={0}
          y={18}
          width={layer.transform.width ?? 120}
          align="center"
          text={layer.text ?? "LOGO"}
          fill={layer.fill ?? "#c8ff45"}
          fontSize={22}
          fontStyle="bold"
          listening={false}
        />
      </Group>
    );
  }

  return (
    <Text
      {...commonProps}
      ref={(node) => setNode(node)}
      text={layer.text ?? layer.name}
      fill={layer.fill ?? "#f5f1e8"}
      fontSize={layer.kind === "playerNumber" ? 96 : 34}
      fontFamily={layer.fontFamily}
      fontStyle="bold"
      align="center"
      verticalAlign="middle"
      stroke={isActive ? "#07090d" : undefined}
      strokeWidth={isActive ? 1 : 0}
    />
  );
}

function useLoadedImage(src?: string) {
  const [image, setImage] = useState<HTMLImageElement | undefined>();

  useEffect(() => {
    if (!src) {
      setImage(undefined);
      return;
    }

    const nextImage = new window.Image();
    nextImage.crossOrigin = "anonymous";
    nextImage.onload = () => setImage(nextImage);
    nextImage.src = src;
  }, [src]);

  return image;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-steel">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-bone">{value}</p>
    </div>
  );
}
