import type {
  CollarType,
  DesignLayer,
  ErpDesignExport,
  FontFamily,
  JerseyCustomizerState,
  JerseyType,
  PlayerRosterRow,
  QuantityMatrix,
  SizeCode,
  UploadedAsset,
  ViewSide
} from "./types";

export type CustomizerAction =
  | { type: "setJerseyType"; jerseyType: JerseyType }
  | { type: "setCollarType"; collarType: CollarType }
  | { type: "setActiveSide"; side: ViewSide }
  | { type: "setFont"; font: FontFamily }
  | { type: "setColor"; key: keyof JerseyCustomizerState["colors"]; value: string }
  | { type: "selectLayer"; layerId?: string }
  | { type: "upsertLayer"; layer: DesignLayer }
  | { type: "updateLayer"; layerId: string; patch: Partial<DesignLayer> }
  | { type: "updateLayerTransform"; layerId: string; transform: Partial<DesignLayer["transform"]> }
  | { type: "moveLayer"; layerId: string; direction: "up" | "down" }
  | { type: "toggleLayerVisibility"; layerId: string }
  | { type: "removeLayer"; layerId: string }
  | { type: "addAsset"; asset: UploadedAsset }
  | { type: "updateRosterRow"; rowId: string; patch: Partial<PlayerRosterRow> }
  | { type: "addRosterRow" }
  | { type: "removeRosterRow"; rowId: string }
  | { type: "setQuantity"; size: SizeCode; quantity: number }
  | { type: "setNotes"; notes: string };

export function customizerReducer(
  state: JerseyCustomizerState,
  action: CustomizerAction
): JerseyCustomizerState {
  const touch = (next: JerseyCustomizerState): JerseyCustomizerState => ({
    ...next,
    updatedAt: new Date().toISOString()
  });

  switch (action.type) {
    case "setJerseyType":
      return touch({ ...state, jerseyType: action.jerseyType });
    case "setCollarType":
      return touch({ ...state, collarType: action.collarType });
    case "setActiveSide":
      return { ...state, activeSide: action.side };
    case "setFont":
      return touch({
        ...state,
        selectedFont: action.font,
        layers: state.layers.map((layer) =>
          layer.kind === "playerName" || layer.kind === "playerNumber"
            ? { ...layer, fontFamily: action.font }
            : layer
        )
      });
    case "setColor":
      return touch({
        ...state,
        colors: { ...state.colors, [action.key]: action.value },
        layers: state.layers.map((layer) => {
          if (layer.kind === "base" && action.key === "primary") return { ...layer, fill: action.value };
          if (layer.kind === "colorZone" && action.key === "secondary") return { ...layer, fill: action.value };
          if (layer.kind === "playerNumber" && action.key === "accent") return { ...layer, fill: action.value };
          if (layer.kind === "playerName" && action.key === "trim") return { ...layer, fill: action.value };
          return layer;
        })
      });
    case "selectLayer":
      return { ...state, activeLayerId: action.layerId };
    case "upsertLayer": {
      const exists = state.layers.some((layer) => layer.id === action.layer.id);
      const layers = exists
        ? state.layers.map((layer) => (layer.id === action.layer.id ? action.layer : layer))
        : [...state.layers, action.layer];
      return touch({ ...state, layers, activeLayerId: action.layer.id });
    }
    case "updateLayer":
      return touch({
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.layerId ? { ...layer, ...action.patch } : layer
        )
      });
    case "updateLayerTransform":
      return touch({
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.layerId
            ? { ...layer, transform: { ...layer.transform, ...action.transform } }
            : layer
        )
      });
    case "moveLayer":
      return touch({
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== action.layerId) return layer;
          return {
            ...layer,
            zIndex: action.direction === "up" ? layer.zIndex + 1 : Math.max(0, layer.zIndex - 1)
          };
        })
      });
    case "toggleLayerVisibility":
      return touch({
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.layerId ? { ...layer, visible: !layer.visible } : layer
        )
      });
    case "removeLayer":
      return touch({
        ...state,
        layers: state.layers.filter((layer) => layer.id !== action.layerId),
        activeLayerId: state.activeLayerId === action.layerId ? undefined : state.activeLayerId
      });
    case "addAsset":
      return touch({ ...state, assets: [...state.assets, action.asset] });
    case "updateRosterRow":
      return touch({
        ...state,
        roster: state.roster.map((row) => (row.id === action.rowId ? { ...row, ...action.patch } : row)),
        layers:
          state.roster[0]?.id === action.rowId
            ? state.layers.map((layer) => {
                if (layer.kind === "playerName" && action.patch.playerName !== undefined) {
                  return { ...layer, text: action.patch.playerName.toUpperCase() };
                }
                if (layer.kind === "playerNumber" && action.patch.playerNumber !== undefined) {
                  return { ...layer, text: action.patch.playerNumber };
                }
                return layer;
              })
            : state.layers
      });
    case "addRosterRow":
      return touch({
        ...state,
        roster: [
          ...state.roster,
          {
            id: `player-${state.roster.length + 1}`,
            playerName: "",
            playerNumber: "",
            size: "M",
            quantity: 1
          }
        ]
      });
    case "removeRosterRow":
      return touch({ ...state, roster: state.roster.filter((row) => row.id !== action.rowId) });
    case "setQuantity":
      return touch({
        ...state,
        quantityMatrix: { ...state.quantityMatrix, [action.size]: Math.max(0, action.quantity) }
      });
    case "setNotes":
      return touch({ ...state, notes: action.notes });
    default:
      return state;
  }
}

export function getTotalQuantity(matrix: QuantityMatrix) {
  return Object.values(matrix).reduce((total, quantity) => total + quantity, 0);
}

export function createErpExport(state: JerseyCustomizerState): ErpDesignExport {
  return {
    designId: state.designId,
    designName: state.designName,
    product: {
      jerseyType: state.jerseyType,
      collarType: state.collarType
    },
    colors: state.colors,
    roster: state.roster,
    quantityMatrix: state.quantityMatrix,
    assets: state.assets,
    printableLayers: state.layers
      .filter((layer) => layer.visible && !["safeArea", "guideline"].includes(layer.kind))
      .sort((a, b) => a.zIndex - b.zIndex),
    productionNotes: state.notes,
    revision: 1,
    exportedAt: state.updatedAt
  };
}
