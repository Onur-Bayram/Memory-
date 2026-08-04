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

// Vite copies public/assets to dist/assets during the build.
export const assetPath = '/dist/assets/';

// These images are shown in settings as the selected theme preview.
export const themePreviewImages: Record<Theme, string> = {
  'code-vibes': `${assetPath}memory_bild.png`,
  gaming: `${assetPath}gaming.png`,
  'da-projects': `${assetPath}da_projects.png`,
  foods: `${assetPath}foods.png`,
};

// Each theme can use its own card back.
export const cardBackImages: Record<Theme, string> = {
  'code-vibes': `${assetPath}bild1.png`,
  gaming: `${assetPath}kartenrueckseite_sauber.png`,
  'da-projects': `${assetPath}da_projects_card_back.png`,
  foods: `${assetPath}foods_card_back.png`,
};

// The normal and hover states of the exit button are set per theme.
export const exitGameButtonImages: Record<Theme, { normal: string; hover: string }> = {
  'code-vibes': {
    normal: `${assetPath}exit_game_oben.png`,
    hover: `${assetPath}exit_game_unten.png`,
  },
  gaming: {
    normal: `${assetPath}exit_game_oben_b.png`,
    hover: `${assetPath}exit_game_unten_b.png`,
  },
  'da-projects': {
    normal: `${assetPath}da_projects_exit_default.png`,
    hover: `${assetPath}da_projects_exit_hover.png`,
  },
  foods: {
    normal: `${assetPath}exit_game_oben.png`,
    hover: `${assetPath}exit_game_unten.png`,
  },
};

// Code vibes is also the fallback for themes that do not have enough cards yet.
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

// These images belong to the Gaming theme.
const gamingCardImages = [
  'motiv_01_kreis_sauber.png',
  'motiv_02_quadrat_sauber.png',
  'motiv_03_dreieck_sauber.png',
  'motiv_04_labyrinth_sauber.png',
  'motiv_05_creeper_sauber.png',
  'motiv_06_pilz_sauber.png',
  'motiv_07_wuerfel_sauber.png',
  'motiv_08_banane_sauber.png',
  'motiv_09_controller_sauber.png',
  'motiv_10_pacman_geist_sauber.png',
  'motiv_11_muenze_sauber.png',
  'motiv_12_retro_bildschirm_sauber.png',
  'motiv_13_level_up_sauber.png',
  'motiv_14_pacman_sauber.png',
  'motiv_15_gameboy_sauber.png',
  'motiv_16_puzzleteile_sauber.png',
  'motiv_17_spielkarte_sauber.png',
  'motiv_18_play_sauber.png',
];

// These images belong to the DA Projects theme.
const daProjectsCardImages = [
  'da_project_card_01.png',
  'da_project_card_02.png',
  'da_project_card_03.png',
  'da_project_card_04.png',
  'da_project_card_05.png',
  'da_project_card_06.png',
  'da_project_card_07.png',
  'da_project_card_08.png',
  'da_project_card_09.png',
  'da_project_card_10.png',
  'da_project_card_11.png',
  'da_project_card_12.png',
  'da_project_card_13.png',
  'da_project_card_14.png',
  'da_project_card_15.png',
  'da_project_card_16.png',
  'da_project_card_17.png',
  'da_project_card_18.png',
];

// These images belong to the Foods theme.
const foodsCardImages = [
  'food_card_01.png',
  'food_card_02.png',
  'food_card_03.png',
  'food_card_04.png',
  'food_card_05.png',
  'food_card_06.png',
  'food_card_07.png',
  'food_card_08.png',
  'food_card_09.png',
  'food_card_10.png',
  'food_card_11.png',
  'food_card_12.png',
  'food_card_13.png',
  'food_card_14.png',
  'food_card_15.png',
  'food_card_16.png',
  'food_card_17.png',
  'food_card_18.png',
];

// This maps each theme to its card images.
const themeCardImages: Record<Theme, string[]> = {
  'code-vibes': codeVibesCardImages,
  gaming: gamingCardImages,
  'da-projects': daProjectsCardImages,
  foods: foodsCardImages,
};

// Returns only as many card images as the selected board size needs.
export function getThemeCardImages(theme: Theme, pairCount: number) {
  const cards = themeCardImages[theme];

  if (cards.length >= pairCount) {
    return cards.slice(0, pairCount);
  }

  const fallbackCards = codeVibesCardImages.filter((card) => !cards.includes(card));

  // If a theme has too few images, code-vibes images fill the missing slots.
  return [...cards, ...fallbackCards].slice(0, pairCount);
}

// pairCount is the number of pairs, not the number of all cards.
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
