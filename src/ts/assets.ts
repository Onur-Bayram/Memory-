import type { Theme, Winner } from './game-data';

function getAssetBaseUrl() {
  // Vite serves public assets from /assets in dev, even if the browser is still on an old /dist URL.
  if (import.meta.env.DEV) {
    return new URL('/assets/', window.location.origin);
  }

  // Production builds should stay portable and resolve relative to the built page location.
  return new URL(`${import.meta.env.BASE_URL}assets/`, document.baseURI);
}

export function getAssetUrl(relativePath: string) {
  return new URL(relativePath, getAssetBaseUrl()).href;
}

type ThemeButtonImages = {
  normal: string;
  hover: string;
};

// The default Code Vibes result screen uses dedicated large symbols.
const defaultWinnerAssets = {
  drawIcon: 'code-vibes/Scale_Icon (1).png',
  bluePlayerIcon: 'code-vibes/Player.png',
  orangePlayerIcon: 'code-vibes/Player (1).png',
} as const;

// Theme folders keep related previews, card backs, buttons and result assets together.
const codeVibesAssets = {
  preview: 'code-vibes/codevibetheme.png',
  cardBack: 'code-vibes/bild1.png',
  exitButton: {
    normal: 'code-vibes/exit_game_oben.png',
    hover: 'code-vibes/exit_game_unten.png',
  },
  cards: [
    'code-vibes/karte_1_kopie_unten.png',
    'code-vibes/karte_2_unten.png',
    'code-vibes/karte_3_unten.png',
    'code-vibes/karte_4_unten.png',
    'code-vibes/karte_5_unten.png',
    'code-vibes/karte_6_unten.png',
    'code-vibes/karte_7_unten.png',
    'code-vibes/karte_8_unten.png',
    'code-vibes/karte_9_unten.png',
    'code-vibes/karte_10_unten.png',
    'code-vibes/karte_11_unten.png',
    'code-vibes/karte_12_unten.png',
    'code-vibes/karte_13_unten.png',
    'code-vibes/karte_14_unten.png',
    'code-vibes/karte_15_unten.png',
    'code-vibes/karte_16_unten.png',
    'code-vibes/karte_17_unten.png',
    'code-vibes/karte_18_unten.png',
  ],
} as const;

const gamingAssets = {
  preview: 'gaming/gamingtheme.png',
  cardBack: 'gaming/kartenrueckseite_sauber.png',
  exitButton: {
    normal: 'gaming/exit_game_oben_b.png',
    hover: 'gaming/exit_game_unten_b.png',
  },
  cards: [
    'gaming/motiv_01_kreis_sauber.png',
    'gaming/motiv_02_quadrat_sauber.png',
    'gaming/motiv_03_dreieck_sauber.png',
    'gaming/motiv_04_labyrinth_sauber.png',
    'gaming/motiv_05_creeper_sauber.png',
    'gaming/motiv_06_pilz_sauber.png',
    'gaming/motiv_07_wuerfel_sauber.png',
    'gaming/motiv_08_banane_sauber.png',
    'gaming/motiv_09_controller_sauber.png',
    'gaming/motiv_10_pacman_geist_sauber.png',
    'gaming/motiv_11_muenze_sauber.png',
    'gaming/motiv_12_retro_bildschirm_sauber.png',
    'gaming/motiv_13_level_up_sauber.png',
    'gaming/motiv_14_pacman_sauber.png',
    'gaming/motiv_15_gameboy_sauber.png',
    'gaming/motiv_16_puzzleteile_sauber.png',
    'gaming/motiv_17_spielkarte_sauber.png',
    'gaming/motiv_18_play_sauber.png',
  ],
} as const;

const daProjectsAssets = {
  preview: 'da-projects/daprotheme.png',
  cardBack: 'da-projects/da_projects_card_back.png',
  exitButton: {
    normal: 'da-projects/da_projects_exit_default.png',
    hover: 'da-projects/da_projects_exit_hover.png',
  },
  cards: [
    'da-projects/da_project_card_01.png',
    'da-projects/da_project_card_02.png',
    'da-projects/da_project_card_03.png',
    'da-projects/da_project_card_04.png',
    'da-projects/da_project_card_05.png',
    'da-projects/da_project_card_06.png',
    'da-projects/da_project_card_07.png',
    'da-projects/da_project_card_08.png',
    'da-projects/da_project_card_09.png',
    'da-projects/da_project_card_10.png',
    'da-projects/da_project_card_11.png',
    'da-projects/da_project_card_12.png',
    'da-projects/da_project_card_13.png',
    'da-projects/da_project_card_14.png',
    'da-projects/da_project_card_15.png',
    'da-projects/da_project_card_16.png',
    'da-projects/da_project_card_17.png',
    'da-projects/da_project_card_18.png',
  ],
  winner: {
    orangePlayerIcon: 'da-projects/Player.png',
    bluePlayerIcon: 'da-projects/Playerb.png',
    homeButton: 'da-projects/button exit.png',
  },
} as const;

const foodsAssets = {
  preview: 'foods/foodtheme.png',
  cardBack: 'foods/foods_card_back.png',
  exitButton: {
    normal: 'foods/foods_exit_default.png',
    hover: 'foods/foods_exit_hover.png',
  },
  cards: [
    'foods/food_card_01.png',
    'foods/food_card_02.png',
    'foods/food_card_03.png',
    'foods/food_card_04.png',
    'foods/food_card_05.png',
    'foods/food_card_06.png',
    'foods/food_card_07.png',
    'foods/food_card_08.png',
    'foods/food_card_09.png',
    'foods/food_card_10.png',
    'foods/food_card_11.png',
    'foods/food_card_12.png',
    'foods/food_card_13.png',
    'foods/food_card_14.png',
    'foods/food_card_15.png',
    'foods/food_card_16.png',
    'foods/food_card_17.png',
    'foods/food_card_18.png',
  ],
  winner: {
    orangeWinnerText: 'foods/Textfood.png',
    blueWinnerText: 'foods/Text bluefood.png',
    orangeWinnerIllustration: 'foods/Player illustration.png',
    blueWinnerIllustration: 'foods/Player illustration bluefood.png',
    drawLabel: 'foods/It’s afood.png',
    drawTitle: 'foods/DRAWfood.png',
    drawScale: 'foods/scale_iconfood.png',
    homeButton: 'foods/buttonfood.png',
  },
} as const;

export const themePreviewImages: Record<Theme, string> = {
  'code-vibes': getAssetUrl(codeVibesAssets.preview),
  gaming: getAssetUrl(gamingAssets.preview),
  'da-projects': getAssetUrl(daProjectsAssets.preview),
  foods: getAssetUrl(foodsAssets.preview),
};

export const cardBackImages: Record<Theme, string> = {
  'code-vibes': getAssetUrl(codeVibesAssets.cardBack),
  gaming: getAssetUrl(gamingAssets.cardBack),
  'da-projects': getAssetUrl(daProjectsAssets.cardBack),
  foods: getAssetUrl(foodsAssets.cardBack),
};

export const exitGameButtonImages: Record<Theme, ThemeButtonImages> = {
  'code-vibes': {
    normal: getAssetUrl(codeVibesAssets.exitButton.normal),
    hover: getAssetUrl(codeVibesAssets.exitButton.hover),
  },
  gaming: {
    normal: getAssetUrl(gamingAssets.exitButton.normal),
    hover: getAssetUrl(gamingAssets.exitButton.hover),
  },
  'da-projects': {
    normal: getAssetUrl(daProjectsAssets.exitButton.normal),
    hover: getAssetUrl(daProjectsAssets.exitButton.hover),
  },
  foods: {
    normal: getAssetUrl(foodsAssets.exitButton.normal),
    hover: getAssetUrl(foodsAssets.exitButton.hover),
  },
};

// The default winner screen now uses real text plus separate icon assets.
export const defaultWinnerIcons: Record<Exclude<Winner, 'draw'>, string> = {
  blue: getAssetUrl(defaultWinnerAssets.bluePlayerIcon),
  orange: getAssetUrl(defaultWinnerAssets.orangePlayerIcon),
};

export const defaultWinnerDrawImage = getAssetUrl(defaultWinnerAssets.drawIcon);

export const daProjectsWinnerAssets = daProjectsAssets.winner;
export const foodsWinnerAssets = foodsAssets.winner;

const themeCardImages: Record<Theme, string[]> = {
  'code-vibes': [...codeVibesAssets.cards],
  gaming: [...gamingAssets.cards],
  'da-projects': [...daProjectsAssets.cards],
  foods: [...foodsAssets.cards],
};

export function getThemeCardImages(theme: Theme, pairCount: number) {
  const cards = themeCardImages[theme];

  if (cards.length >= pairCount) {
    return cards.slice(0, pairCount);
  }

  const fallbackCards = codeVibesAssets.cards.filter((card) => !cards.includes(card));

  // Code Vibes acts as the fallback when another theme has too few exported cards.
  return [...cards, ...fallbackCards].slice(0, pairCount);
}
