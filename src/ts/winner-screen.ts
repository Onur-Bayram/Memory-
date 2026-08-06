import {
  daProjectsWinnerAssets,
  defaultWinnerDrawImage,
  defaultWinnerIcons,
  foodsWinnerAssets,
  gamingWinnerAssets,
  getAssetUrl,
} from './assets';
import { type Winner } from './game-data';
import { type PlayerScore } from './players';

const gameOverDelay = 1600;

export function initWinnerScreen() {
  const backToStartButtonRefs = document.querySelectorAll<HTMLButtonElement>(
    '.winner-screen__back-button, .winner-screen__home-button, .winner-screen__da-home-button, .winner-screen__foods-home-button',
  );

  backToStartButtonRefs.forEach((buttonRef) => {
    // The button starts the game from the beginning.
    buttonRef.addEventListener('click', () => {
      window.location.reload();
    });
  });
}

export function showGameOver(
  gameContentRef: HTMLElement,
  gameOverRef: HTMLElement,
  winnerScreenRef: HTMLElement,
  winnerImageRef: HTMLImageElement,
  finalBlueScoreRef: HTMLElement,
  finalOrangeScoreRef: HTMLElement,
  blueScore: number,
  orangeScore: number,
) {
  // The game-over screen first shows only the final score.
  updateScore(finalBlueScoreRef, blueScore);
  updateScore(finalOrangeScoreRef, orangeScore);
  const gameTheme = document.body.dataset.gameTheme;
  gameOverRef.classList.toggle('game-over--gaming', gameTheme === 'gaming');
  gameOverRef.classList.toggle('game-over--da-projects', gameTheme === 'da-projects');
  gameOverRef.classList.toggle('game-over--foods', gameTheme === 'foods');

  gameContentRef.hidden = true;
  gameOverRef.hidden = false;

  setTimeout(() => {
    // After that, the animated winner screen appears.
    showWinner(gameOverRef, winnerScreenRef, winnerImageRef, blueScore, orangeScore);
  }, 2000);
}

export function showGameOverAfterDelay(
  gameContentRef: HTMLElement,
  gameOverRef: HTMLElement,
  winnerScreenRef: HTMLElement,
  winnerImageRef: HTMLImageElement,
  finalBlueScoreRef: HTMLElement,
  finalOrangeScoreRef: HTMLElement,
  score: PlayerScore,
) {
  // After the last matched pair, we wait briefly before showing game over.
  setTimeout(() => {
    showGameOver(
      gameContentRef,
      gameOverRef,
      winnerScreenRef,
      winnerImageRef,
      finalBlueScoreRef,
      finalOrangeScoreRef,
      score.blue,
      score.orange,
    );
  }, gameOverDelay);
}

function showWinner(
  gameOverRef: HTMLElement,
  winnerScreenRef: HTMLElement,
  winnerImageRef: HTMLImageElement,
  blueScore: number,
  orangeScore: number,
) {
  const winner = getWinner(blueScore, orangeScore);
  const isGamingTheme = document.body.dataset.gameTheme === 'gaming';
  const isDaProjectsTheme = document.body.dataset.gameTheme === 'da-projects';
  const isFoodsTheme = document.body.dataset.gameTheme === 'foods';
  // This extra view belongs only to the Gaming theme when there is a winner.
  const isGamingWinner = winner !== 'draw' && isGamingTheme;
  const isGamingDraw = winner === 'draw' && isGamingTheme;
  const isDaProjectsWinner = winner !== 'draw' && isDaProjectsTheme;
  const isDaProjectsDraw = winner === 'draw' && isDaProjectsTheme;
  const isFoodsWinner = winner !== 'draw' && isFoodsTheme;
  const isFoodsDraw = winner === 'draw' && isFoodsTheme;
  const isNormalResult =
    !isGamingWinner && !isGamingDraw && !isDaProjectsWinner && !isDaProjectsDraw && !isFoodsWinner && !isFoodsDraw;

  // These classes adjust the result design.
  gameOverRef.hidden = true;
  resetWinnerScreenState(winnerScreenRef);
  setWinnerScreenParts(winnerScreenRef, {
    showDefault: isNormalResult,
    showGamingResult: isGamingWinner,
    showGamingDraw: isGamingDraw,
    showDaProjectsResult: isDaProjectsWinner,
    showDaProjectsDraw: isDaProjectsDraw,
    showFoodsResult: isFoodsWinner,
    showFoodsDraw: isFoodsDraw,
  });
  updateGamingWinnerPlayerImage(winner);
  updateGamingDrawImages(isGamingDraw);
  updateDaProjectsWinnerImages(winner);
  updateDaProjectsDrawImages(isDaProjectsDraw);
  updateFoodsWinnerImages(winner);
  winnerScreenRef.classList.toggle('winner-screen--gaming-result', isGamingWinner);
  winnerScreenRef.classList.toggle('winner-screen--gaming-draw', isGamingDraw);
  winnerScreenRef.classList.toggle('winner-screen--da-projects-result', isDaProjectsWinner);
  winnerScreenRef.classList.toggle('winner-screen--da-projects-draw', isDaProjectsDraw);
  winnerScreenRef.classList.toggle('winner-screen--foods-result', isFoodsWinner);
  winnerScreenRef.classList.toggle('winner-screen--foods-draw', isFoodsDraw);
  winnerScreenRef.classList.toggle('winner-screen--draw', winner === 'draw' && isNormalResult);
  winnerScreenRef.classList.toggle('winner-screen--orange', winner === 'orange' && isNormalResult);
  updateDefaultWinnerVisuals(winner, winnerImageRef);
  updateDefaultWinnerPlayerText(winner);
  winnerScreenRef.hidden = false;
}

function resetWinnerScreenState(winnerScreenRef: HTMLElement) {
  // Remove old result classes first, so a previous theme cannot leak into the next result.
  winnerScreenRef.classList.remove(
    'winner-screen--gaming-result',
    'winner-screen--gaming-draw',
    'winner-screen--da-projects-result',
    'winner-screen--da-projects-draw',
    'winner-screen--foods-result',
    'winner-screen--foods-draw',
    'winner-screen--draw',
    'winner-screen--orange',
  );
}

function setWinnerScreenParts(
  winnerScreenRef: HTMLElement,
  visibility: {
    showDefault: boolean;
    showGamingResult: boolean;
    showGamingDraw: boolean;
    showDaProjectsResult: boolean;
    showDaProjectsDraw: boolean;
    showFoodsResult: boolean;
    showFoodsDraw: boolean;
  },
) {
  // Hidden sections are controlled in TypeScript as a safety net beside the theme CSS.
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__content', visibility.showDefault);
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__gaming-result', visibility.showGamingResult);
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__gaming-draw', visibility.showGamingDraw);
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__da-projects-result', visibility.showDaProjectsResult);
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__da-projects-draw', visibility.showDaProjectsDraw);
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__foods-result', visibility.showFoodsResult);
  setWinnerPartVisibility(winnerScreenRef, '.winner-screen__foods-draw', visibility.showFoodsDraw);
}

function setWinnerPartVisibility(winnerScreenRef: HTMLElement, selector: string, isVisible: boolean) {
  const partRef = winnerScreenRef.querySelector<HTMLElement>(selector);

  if (partRef) {
    partRef.hidden = !isVisible;
  }
}

function updateGamingWinnerPlayerImage(winner: Winner) {
  const gamingWinnerPlayerImageRef = document.getElementById('gaming-winner-player-image') as HTMLImageElement | null;

  if (!gamingWinnerPlayerImageRef || winner === 'draw') {
    return;
  }

  // In the Gaming theme, the player name comes from a Figma image.
  const imageName = winner === 'blue' ? gamingWinnerAssets.bluePlayer : gamingWinnerAssets.orangePlayer;
  const label = winner === 'blue' ? 'Blue Player' : 'Orange Player';

  gamingWinnerPlayerImageRef.src = getAssetUrl(imageName);
  gamingWinnerPlayerImageRef.alt = label;
}

function updateGamingDrawImages(isGamingDraw: boolean) {
  if (!isGamingDraw) {
    return;
  }

  const labelImageRef = document.querySelector<HTMLImageElement>('.winner-screen__draw-small');
  const titleImageRef = document.querySelector<HTMLImageElement>('.winner-screen__draw-title');
  const scaleImageRef = document.querySelector<HTMLImageElement>('.winner-screen__draw-icon');

  // Draw images are set here so old file names do not stay cached in the browser.
  if (labelImageRef) {
    labelImageRef.src = getAssetUrl(gamingWinnerAssets.drawLabel);
  }

  if (titleImageRef) {
    titleImageRef.src = getAssetUrl(gamingWinnerAssets.drawTitle);
  }

  if (scaleImageRef) {
    scaleImageRef.src = getAssetUrl(gamingWinnerAssets.drawScale);
  }
}

function updateDaProjectsWinnerImages(winner: Winner) {
  if (winner === 'draw') {
    return;
  }

  const playerNameImageRef = document.getElementById('da-projects-winner-player-image') as HTMLImageElement | null;
  const playerIconImageRef = document.getElementById('da-projects-winner-icon') as HTMLImageElement | null;

  if (!playerNameImageRef || !playerIconImageRef) {
    return;
  }

  // DA Projects uses exported Figma images, so we swap both player graphics here.
  const playerNameImage = winner === 'blue' ? daProjectsWinnerAssets.bluePlayerName : daProjectsWinnerAssets.orangePlayerName;
  const playerIconImage = winner === 'blue' ? daProjectsWinnerAssets.bluePlayerIcon : daProjectsWinnerAssets.orangePlayerIcon;
  const label = winner === 'blue' ? 'Blue Player' : 'Orange Player';

  playerNameImageRef.src = getAssetUrl(playerNameImage);
  playerNameImageRef.alt = label;
  playerIconImageRef.src = getAssetUrl(playerIconImage);
}

function updateDaProjectsDrawImages(isDaProjectsDraw: boolean) {
  if (!isDaProjectsDraw) {
    return;
  }

  const labelImageRef = document.querySelector<HTMLImageElement>('.winner-screen__da-draw-small');
  const titleImageRef = document.querySelector<HTMLImageElement>('.winner-screen__da-draw-title');
  const scaleImageRef = document.querySelector<HTMLImageElement>('.winner-screen__da-draw-icon');

  // DA Projects draw uses its own exported Figma images.
  if (labelImageRef) {
    labelImageRef.src = getAssetUrl(daProjectsWinnerAssets.drawLabel);
  }

  if (titleImageRef) {
    titleImageRef.src = getAssetUrl(daProjectsWinnerAssets.drawTitle);
  }

  if (scaleImageRef) {
    scaleImageRef.src = getAssetUrl(daProjectsWinnerAssets.drawScale);
  }
}

function updateFoodsWinnerImages(winner: Winner) {
  if (winner === 'draw') {
    return;
  }

  const textImageRef = document.getElementById('foods-winner-text-image') as HTMLImageElement | null;
  const illustrationImageRef = document.getElementById('foods-winner-illustration-image') as HTMLImageElement | null;

  if (!textImageRef || !illustrationImageRef) {
    return;
  }

  const textImage = winner === 'blue' ? foodsWinnerAssets.blueWinnerText : foodsWinnerAssets.orangeWinnerText;
  const illustrationImage =
    winner === 'blue' ? foodsWinnerAssets.blueWinnerIllustration : foodsWinnerAssets.orangeWinnerIllustration;
  const playerLabel = winner === 'blue' ? 'Blue Player' : 'Orange Player';

  textImageRef.src = getAssetUrl(textImage);
  textImageRef.alt = `The winner is ${playerLabel}`;
  illustrationImageRef.src = getAssetUrl(illustrationImage);
  illustrationImageRef.alt = `${playerLabel} piece`;
}

function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

function updateDefaultWinnerPlayerText(winner: Winner) {
  const winnerPlayerTitleRef = document.getElementById('winner-player-title');

  if (!winnerPlayerTitleRef || winner === 'draw') {
    return;
  }

  winnerPlayerTitleRef.textContent = winner === 'orange' ? 'ORANGE PLAYER' : 'BLUE PLAYER';
}

function updateDefaultWinnerVisuals(winner: Winner, winnerImageRef: HTMLImageElement) {
  const winnerIconImageRef = document.getElementById('winner-icon-image') as HTMLImageElement | null;

  if (!winnerIconImageRef) {
    return;
  }

  if (winner === 'draw') {
    winnerIconImageRef.hidden = true;
    winnerImageRef.hidden = false;
    winnerImageRef.src = defaultWinnerDrawImage;
    winnerImageRef.alt = '';
    return;
  }

  winnerIconImageRef.hidden = false;
  winnerIconImageRef.src = defaultWinnerIcons[winner];
  winnerIconImageRef.alt = '';
  winnerImageRef.hidden = true;
  winnerImageRef.alt = '';
}

function getWinner(blueScore: number, orangeScore: number): Winner {
  if (blueScore === orangeScore) {
    return 'draw';
  }

  return blueScore > orangeScore ? 'blue' : 'orange';
}
