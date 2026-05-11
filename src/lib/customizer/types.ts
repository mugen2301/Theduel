export type ViewSide = "front" | "back" | "leftSleeve" | "rightSleeve";

export type JerseyType = "cricket" | "football" | "cycling" | "esports";

export type CollarType = "round" | "v-neck" | "polo" | "mandarin";

export type FontFamily = "Bebas Neue" | "Montserrat" | "Oswald" | "Inter" | "Varsity";

export type SizeCode = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL";

export type LayerKind = "base" | "pattern" | "colorZone" | "logo" | "sleeveLogo" | "playerName" | "playerNumber" | "safeArea" | "guideline";

export type PrintTechnique = "sublimation" | "dtf" | "embroidery";

export type CanvasPoint = {
  x: number;
  y: number;
};

export type LayerTransform = {
  position: CanvasPoint;
  scale: number;
  rotation: number;
  width?: number;
  height?: number;
};

export type DesignLayer = {
  id: string;
  kind: LayerKind;
  side: ViewSide;
  name: string;
  locked: boolean;
  visible: boolean;
  zIndex: number;
  transform: LayerTransform;
  fill?: string;
  stroke?: string;
  opacity?: number;
  fontFamily?: FontFamily;
  text?: string;
  assetId?: string;
  printTechnique?: PrintTechnique;
  erpCode?: string;
};

export type UploadedAsset = {
  id: string;
  name: string;
  role: "teamLogo" | "sponsorLogo" | "sleeveLogo" | "reference";
  mimeType: string;
  sizeBytes: number;
  previewUrl: string;
  r2ObjectKey?: string;
  productionStatus: "local" | "uploaded" | "approved" | "rejected";
};

export type PlayerRosterRow = {
  id: string;
  playerName: string;
  playerNumber: string;
  size: SizeCode;
  quantity: number;
};

export type QuantityMatrix = Record<SizeCode, number>;

export type JerseyCustomizerState = {
  designId: string;
  designName: string;
  jerseyType: JerseyType;
  collarType: CollarType;
  activeSide: ViewSide;
  activeLayerId?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    trim: string;
  };
  selectedFont: FontFamily;
  layers: DesignLayer[];
  assets: UploadedAsset[];
  roster: PlayerRosterRow[];
  quantityMatrix: QuantityMatrix;
  notes: string;
  updatedAt: string;
};

export type ErpDesignExport = {
  designId: string;
  designName: string;
  product: {
    jerseyType: JerseyType;
    collarType: CollarType;
  };
  colors: JerseyCustomizerState["colors"];
  roster: PlayerRosterRow[];
  quantityMatrix: QuantityMatrix;
  assets: UploadedAsset[];
  printableLayers: DesignLayer[];
  productionNotes: string;
  revision: number;
  exportedAt: string;
};
