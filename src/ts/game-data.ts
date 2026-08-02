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
  foods: `${assetPath}foods.png`,
};

export const cardBackImages: Record<Theme, string> = {
  'code-vibes': `${assetPath}bild1.png`,
  gaming: `${assetPath}kartenrueckseite.png`,
  'da-projects': `${assetPath}bild1.png`,
  foods: `${assetPath}bild1.png`,
};

export const exitGameButtonImages: Record<Theme, { normal: string; hover: string }> = {
  'code-vibes': {
    normal: `${assetPath}exit_game_oben.png`,
    hover: `${assetPath}exit_game_unten.png`,
  },
  gaming: {
    normal: `${assetPath}exit_gamegame_oben.png`,
    hover: `${assetPath}exit_gamegame_unten.png`,
  },
  'da-projects': {
    normal: `${assetPath}exit_game_oben.png`,
    hover: `${assetPath}exit_game_unten.png`,
  },
  foods: {
    normal: `${assetPath}exit_game_oben.png`,
    hover: `${assetPath}exit_game_unten.png`,
  },
};

const codeVibesCardImages = [
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

const gamingCardImages = [
  'motiv_01_kreis.png',
  'motiv_02_quadrat.png',
  'motiv_03_dreieck.png',
  'motiv_04_labyrinth.png',
  'motiv_05_creeper.png',
  'motiv_06_pilz.png',
  'motiv_07_wuerfel.png',
  'motiv_08_banane.png',
  'motiv_09_controller.png',
  'motiv_10_pacman_geist.png',
  'motiv_11_muenze.png',
  'motiv_12_retro_bildschirm.png',
  'motiv_13_level_up.png',
  'motiv_14_pacman.png',
  'motiv_15_gameboy.png',
  'motiv_16_puzzleteile.png',
  'motiv_17_spielkarte.png',
  'motiv_18_play.png',
];

const themeCardImages: Record<Theme, string[]> = {
  'code-vibes': codeVibesCardImages,
  gaming: gamingCardImages,
  'da-projects': codeVibesCardImages,
  foods: codeVibesCardImages,
};

export function getThemeCardImages(theme: Theme, pairCount: number) {
  const cards = themeCardImages[theme];

  if (cards.length >= pairCount) {
    return cards.slice(0, pairCount);
  }

  const fallbackCards = codeVibesCardImages.filter((card) => !cards.includes(card));

  return [...cards, ...fallbackCards].slice(0, pairCount);
}

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
