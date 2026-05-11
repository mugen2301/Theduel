"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Group, Image as KonvaImage, Layer, Line, Rect, Stage, Text, Transformer } from "react-konva";
import type Konva from "konva";
import type { LogoLayer, TShirtCustomizerState } from "@/lib/customizer/tshirt-types";

type TShirtCanvasProps = {
  state: TShirtCustomizerState;
  onSelectLogo: (id?: string) => void;
  onUpdateLogo: (logo: LogoLayer) => void;
};

const canvas = {
  width: 720,
  height: 780
};

const placementVisibility: Record<LogoLayer["placement"], Array<TShirtCustomizerState["previewSide"]>> = {
  leftChest: ["front"],
  rightChest: ["front"],
  frontCenter: ["front"],
  backTop: ["back"],
  leftSleeve: ["front", "back"],
  rightSleeve: ["front", "back"]
};

export function TShirtCanvas({ state, onSelectLogo, onUpdateLogo }: TShirtCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const nodeRefs = useRef<Record<string, Konva.Node | null>>({});
  const [wrapperWidth, setWrapperWidth] = useState(720);
  const selectedLogo = state.logos.find((logo) => logo.id === state.selectedLogoId);

  const visibleLogos = useMemo(
    () => state.logos.filter((logo) => placementVisibility[logo.placement].includes(state.previewSide)),
    [state.logos, state.previewSide]
  );

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
    const node = state.selectedLogoId ? nodeRefs.current[state.selectedLogoId] : null;

    if (!transformer) return;

    transformer.nodes(node ? [node] : []);
    transformer.getLayer()?.batchDraw();
  }, [state.selectedLogoId, selectedLogo, visibleLogos]);

  const scale = Math.min(wrapperWidth / canvas.width, 1);

  return (
    <div
      ref={wrapperRef}
      className="grid min-h-[560px] place-items-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(245,241,232,0.1),rgba(7,9,13,0.96)_68%)] p-3"
    >
      <Stage
        width={Math.round(canvas.width * scale)}
        height={Math.round(canvas.height * scale)}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={(event) => {
          if (event.target === event.target.getStage()) onSelectLogo(undefined);
        }}
        onTouchStart={(event) => {
          if (event.target === event.target.getStage()) onSelectLogo(undefined);
        }}
      >
        <Layer>
          <GarmentShape state={state} />
          {visibleLogos.map((logo) => (
            <LogoObject
              key={logo.id}
              logo={logo}
              active={state.selectedLogoId === logo.id}
              setNode={(node) => {
                nodeRefs.current[logo.id] = node;
              }}
              onSelect={() => onSelectLogo(logo.id)}
              onUpdateLogo={onUpdateLogo}
            />
          ))}
          {state.previewSide === "back" ? (
            <Group>
              <Text
                x={220}
                y={185}
                width={280}
                align="center"
                text={state.playerName.toUpperCase()}
                fill={state.textColor}
                fontSize={42}
                fontStyle="bold"
                fontFamily={state.font}
              />
              <Text
                x={235}
                y={255}
                width={250}
                align="center"
                text={state.playerNumber}
                fill={state.textColor}
                fontSize={142}
                fontStyle="bold"
                fontFamily={state.font}
              />
            </Group>
          ) : null}
          <Transformer
            ref={transformerRef}
            rotateEnabled
            enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
            borderStroke="#c8ff45"
            anchorStroke="#c8ff45"
            anchorFill="#07090d"
            anchorSize={10}
          />
        </Layer>
      </Stage>
    </div>
  );
}

function GarmentShape({ state }: { state: TShirtCustomizerState }) {
  const fullSleeves = state.sleeveType === "Full Sleeves";
  const collarY = state.productType === "Polo" || state.productType === "Chinese Collar" ? 132 : 148;

  return (
    <Group>
      <Line
        points={[
          220, 122,
          fullSleeves ? 88 : 128, fullSleeves ? 310 : 255,
          fullSleeves ? 132 : 174, fullSleeves ? 548 : 322,
          194, 282,
          194, 670,
          526, 670,
          526, 282,
          fullSleeves ? 588 : 546, fullSleeves ? 548 : 322,
          fullSleeves ? 632 : 592, fullSleeves ? 310 : 255,
          500, 122,
          420, 154,
          360, 168,
          300, 154
        ]}
        closed
        fill={state.baseColor}
        stroke="#ffffff33"
        strokeWidth={2}
        shadowColor="#000000"
        shadowBlur={28}
        shadowOpacity={0.34}
      />

      {state.sleeveCuff === "Yes" ? (
        <>
          <Line
            points={fullSleeves ? [102, 526, 152, 552, 136, 594, 88, 568] : [142, 292, 184, 316, 166, 350, 126, 324]}
            closed
            fill={state.cuffColor}
            opacity={0.96}
          />
          <Line
            points={fullSleeves ? [568, 552, 618, 526, 632, 568, 584, 594] : [536, 316, 578, 292, 594, 324, 554, 350]}
            closed
            fill={state.cuffColor}
            opacity={0.96}
          />
        </>
      ) : null}

      {state.productType === "Polo" ? (
        <>
          <Line points={[310, 146, 360, 206, 410, 146, 385, 250, 360, 230, 335, 250]} closed fill="#07090d" stroke="#ffffff55" strokeWidth={3} />
          <Rect x={326} y={154} width={68} height={36} cornerRadius={8} fill="#f5f1e8" opacity={0.9} />
        </>
      ) : (
        <Line
          points={[300, collarY, 360, 174, 420, collarY, 404, 202, 360, 224, 316, 202]}
          closed
          fill="#07090d"
          stroke="#ffffff55"
          strokeWidth={3}
        />
      )}

      {state.productType === "Zip Neck" ? (
        <Line points={[360, 170, 360, 308]} stroke="#f5f1e8" strokeWidth={5} opacity={0.88} />
      ) : null}

      {state.productType === "Henley" ? (
        <>
          <Line points={[360, 174, 360, 276]} stroke="#f5f1e8" strokeWidth={4} opacity={0.8} />
          {[198, 226, 254].map((y) => (
            <Rect key={y} x={353} y={y} width={14} height={14} cornerRadius={7} fill="#f5f1e8" />
          ))}
        </>
      ) : null}

      <Text
        x={230}
        y={700}
        width={260}
        align="center"
        text={`${state.previewSide.toUpperCase()} PREVIEW`}
        fill="#8f9aaa"
        fontSize={18}
        fontStyle="bold"
      />
    </Group>
  );
}

function LogoObject({
  logo,
  active,
  setNode,
  onSelect,
  onUpdateLogo
}: {
  logo: LogoLayer;
  active: boolean;
  setNode: (node: Konva.Image | null) => void;
  onSelect: () => void;
  onUpdateLogo: (logo: LogoLayer) => void;
}) {
  const image = useLoadedImage(logo.src);

  if (!image) return null;

  return (
    <KonvaImage
      ref={setNode}
      image={image}
      x={logo.x}
      y={logo.y}
      width={logo.width}
      height={logo.height}
      rotation={logo.rotation}
      draggable
      stroke={active ? "#c8ff45" : undefined}
      strokeWidth={active ? 2 : 0}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(event) =>
        onUpdateLogo({
          ...logo,
          x: event.target.x(),
          y: event.target.y()
        })
      }
      onTransformEnd={(event) => {
        const node = event.target;
        const nextWidth = Math.max(34, node.width() * node.scaleX());
        const nextHeight = Math.max(24, node.height() * node.scaleY());

        node.scaleX(1);
        node.scaleY(1);

        onUpdateLogo({
          ...logo,
          x: node.x(),
          y: node.y(),
          width: nextWidth,
          height: nextHeight,
          rotation: node.rotation()
        });
      }}
    />
  );
}

function useLoadedImage(src: string) {
  const [image, setImage] = useState<HTMLImageElement | undefined>();

  useEffect(() => {
    const nextImage = new window.Image();
    nextImage.crossOrigin = "anonymous";
    nextImage.onload = () => setImage(nextImage);
    nextImage.src = src;
  }, [src]);

  return image;
}
