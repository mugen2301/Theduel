import type { CollarType, FontFamily, JerseyCustomizerState, JerseyType, SizeCode, ViewSide } from "./types";

export const jerseyTypes: Array<{ value: JerseyType; label: string; description: string }> = [
  { value: "cricket", label: "Cricket Jersey", description: "Relaxed team fit with sponsor zones." },
  { value: "football", label: "Football Jersey", description: "Athletic fit for match-day kits." },
  { value: "cycling", label: "Cycling Jersey", description: "Aero fit with panel-heavy artwork." },
  { value: "esports", label: "Esports Jersey", description: "Bold graphics for competitive teams." }
];

export const collarTypes: Array<{ value: CollarType; label: string }> = [
  { value: "round", label: "Round" },
  { value: "v-neck", label: "V-Neck" },
  { value: "polo", label: "Polo" },
  { value: "mandarin", label: "Mandarin" }
];

export const fontFamilies: FontFamily[] = ["Bebas Neue", "Montserrat", "Oswald", "Inter", "Varsity"];

export const viewSides: Array<{ value: ViewSide; label: string }> = [
  { value: "front", label: "Front" },
  { value: "back", label: "Back" },
  { value: "leftSleeve", label: "Left sleeve" },
  { value: "rightSleeve", label: "Right sleeve" }
];

export const sizeCodes: SizeCode[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

export const initialCustomizerState: JerseyCustomizerState = {
  designId: "design-local-001",
  designName: "Untitled Team Jersey",
  jerseyType: "cricket",
  collarType: "round",
  activeSide: "front",
  activeLayerId: "front-team-logo",
  colors: {
    primary: "#10141b",
    secondary: "#ff4f1f",
    accent: "#c8ff45",
    trim: "#f5f1e8"
  },
  selectedFont: "Bebas Neue",
  assets: [],
  roster: [
    { id: "player-1", playerName: "CAPTAIN", playerNumber: "10", size: "L", quantity: 1 },
    { id: "player-2", playerName: "STRIKER", playerNumber: "07", size: "M", quantity: 1 }
  ],
  quantityMatrix: {
    XS: 0,
    S: 4,
    M: 8,
    L: 8,
    XL: 5,
    "2XL": 2,
    "3XL": 0,
    "4XL": 0
  },
  layers: [
    {
      id: "front-base",
      kind: "base",
      side: "front",
      name: "Front jersey base",
      locked: true,
      visible: true,
      zIndex: 0,
      fill: "#10141b",
      transform: { position: { x: 240, y: 260 }, scale: 1, rotation: 0, width: 280, height: 360 },
      erpCode: "BASE_FRONT"
    },
    {
      id: "front-accent",
      kind: "colorZone",
      side: "front",
      name: "Front accent panel",
      locked: false,
      visible: true,
      zIndex: 1,
      fill: "#ff4f1f",
      opacity: 0.94,
      transform: { position: { x: 240, y: 250 }, scale: 1, rotation: -16, width: 120, height: 380 },
      erpCode: "PANEL_FRONT_ACCENT"
    },
    {
      id: "front-team-logo",
      kind: "logo",
      side: "front",
      name: "Team crest",
      locked: false,
      visible: true,
      zIndex: 5,
      text: "TD",
      fontFamily: "Bebas Neue",
      fill: "#c8ff45",
      transform: { position: { x: 190, y: 190 }, scale: 1, rotation: 0, width: 58, height: 58 },
      printTechnique: "sublimation",
      erpCode: "LOGO_CHEST_LEFT"
    },
    {
      id: "back-name",
      kind: "playerName",
      side: "back",
      name: "Player name",
      locked: false,
      visible: true,
      zIndex: 4,
      text: "PLAYER",
      fontFamily: "Bebas Neue",
      fill: "#f5f1e8",
      transform: { position: { x: 240, y: 160 }, scale: 1, rotation: 0, width: 180, height: 42 },
      printTechnique: "sublimation",
      erpCode: "PLAYER_NAME"
    },
    {
      id: "back-number",
      kind: "playerNumber",
      side: "back",
      name: "Player number",
      locked: false,
      visible: true,
      zIndex: 5,
      text: "10",
      fontFamily: "Bebas Neue",
      fill: "#c8ff45",
      transform: { position: { x: 240, y: 250 }, scale: 1, rotation: 0, width: 150, height: 130 },
      printTechnique: "sublimation",
      erpCode: "PLAYER_NUMBER"
    }
  ],
  notes: "Keep sponsor logos within safe print zones. Confirm final roster before production.",
  updatedAt: "draft"
};
