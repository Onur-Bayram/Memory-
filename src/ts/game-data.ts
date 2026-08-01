export type Player = 'blue' | 'orange';
export type Winner = Player | 'draw';
export type BoardSize = 16 | 24 | 36;
export type Theme = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';

export type GameSettings = {
  theme: Theme;
  boardSize: BoardSize;
  firstPlayer: Player;
};

export type BoardConfig = {
  pairCount: number;
  fieldClass: string;
};

export const assetPath = '/dist/assets/';

export const themePreviewImages: Record<Theme, string> = {
  'code-vibes': `${assetPath}memory_bild.png`,
  gaming: `${assetPath}gaming.png`,
  'da-projects': `${assetPath}da_projects.png`,
  foods: `${assetPath}memory_bild.png`,
};

export const cardImages = [
  'karte_1_kopie_unten.png',
  'karte_2_unten.png',
  'karte_3_unten.png',
  'karte_4_unten.png',
  'karte_5_unten.png',
  'karte_6_unten.png',
  'karte_7_unten.png',
  'karte_8_unten.png',
  'karte_9_unten.png',
  'karte_10_unten.png',
  'karte_11_unten.png',
  'karte_12_unten.png',
  'karte_13_unten.png',
  'karte_14_unten.png',
  'karte_15_unten.png',
  'karte_16_unten.png',
  'karte_17_unten.png',
  'karte_18_unten.png',
];

export const playerColors: Record<Player, string> = {
  blue: '#2fb4ff',
  orange: '#ff8a2a',
};

export const boardConfigs: Record<BoardSize, BoardConfig> = {
  16: {
    pairCount: 8,
    fieldClass: 'field--16',
  },
  24: {
    pairCount: 12,
    fieldClass: 'field--24',
  },
  36: {
    pairCount: 18,
    fieldClass: 'field--36',
  },
};
