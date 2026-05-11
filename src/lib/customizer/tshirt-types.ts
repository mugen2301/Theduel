export type ProductType = "Round Neck" | "Polo" | "Chinese Collar" | "Zip Neck" | "Henley";

export type SleeveType = "Half Sleeves" | "Full Sleeves";

export type PreviewSide = "front" | "back";

export type SleeveCuff = "Yes" | "No";

export type LogoPlacement =
  | "leftChest"
  | "rightChest"
  | "frontCenter"
  | "backTop"
  | "leftSleeve"
  | "rightSleeve";

export type SizeCode = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL" | "4XL";

export type FontChoice = "Bebas Neue" | "Montserrat" | "Oswald" | "Inter" | "Varsity";

export type LogoLayer = {
  id: string;
  placement: LogoPlacement;
  name: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type TShirtCustomizerState = {
  productType: ProductType;
  sleeveType: SleeveType;
  sleeveCuff: SleeveCuff;
  cuffColor: string;
  baseColor: string;
  playerName: string;
  playerNumber: string;
  font: FontChoice;
  textColor: string;
  previewSide: PreviewSide;
  selectedLogoId?: string;
  logos: LogoLayer[];
  sizes: Record<SizeCode, number>;
};

export const productTypes: ProductType[] = [
  "Round Neck",
  "Polo",
  "Chinese Collar",
  "Zip Neck",
  "Henley"
];

export const sleeveTypes: SleeveType[] = ["Half Sleeves", "Full Sleeves"];

export const sizeCodes: SizeCode[] = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

export const fontChoices: FontChoice[] = ["Bebas Neue", "Montserrat", "Oswald", "Inter", "Varsity"];

export const logoPlacements: Array<{ value: LogoPlacement; label: string; side: PreviewSide | "both" }> = [
  { value: "leftChest", label: "Left chest", side: "front" },
  { value: "rightChest", label: "Right chest", side: "front" },
  { value: "frontCenter", label: "Belly / front center", side: "front" },
  { value: "backTop", label: "Back top", side: "back" },
  { value: "leftSleeve", label: "Left sleeve", side: "both" },
  { value: "rightSleeve", label: "Right sleeve", side: "both" }
];

export const initialTShirtState: TShirtCustomizerState = {
  productType: "Round Neck",
  sleeveType: "Half Sleeves",
  sleeveCuff: "No",
  cuffColor: "#f5f1e8",
  baseColor: "#10141b",
  playerName: "PLAYER",
  playerNumber: "10",
  font: "Bebas Neue",
  textColor: "#c8ff45",
  previewSide: "front",
  logos: [],
  sizes: {
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
    "3XL": 0,
    "4XL": 0
  }
};
