import { assetPath, type Winner } from './game-data';
import { type PlayerScore } from './players';

const gameOverDelay = 1600;

export function initWinnerScreen() {
  const backToStartButtonRefs = document.querySelectorAll<HTMLButtonElement>(
    '.winner-screen__back-button, .winner-screen__home-button',
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
  // This extra view belongs only to the Gaming theme when there is a winner.
  const isGamingWinner = winner !== 'draw' && isGamingTheme;
  const isGamingDraw = winner === 'draw' && isGamingTheme;
  const isNormalResult = !isGamingWinner && !isGamingDraw;

  // These classes adjust the result design.
  gameOverRef.hidden = true;
  updateGamingWinnerPlayerImage(winner);
  updateGamingDrawImages(isGamingDraw);
  winnerScreenRef.classList.toggle('winner-screen--gaming-result', isGamingWinner);
  winnerScreenRef.classList.toggle('winner-screen--gaming-draw', isGamingDraw);
  winnerScreenRef.classList.toggle('winner-screen--draw', winner === 'draw' && isNormalResult);
  winnerScreenRef.classList.toggle('winner-screen--orange', winner === 'orange' && isNormalResult);
  winnerImageRef.src = `${assetPath}${getWinnerImage(winner)}`;
  winnerImageRef.alt = getWinnerAltText(winner);
  winnerScreenRef.hidden = false;
}

function updateGamingWinnerPlayerImage(winner: Winner) {
  const gamingWinnerPlayerImageRef = document.getElementById('gaming-winner-player-image') as HTMLImageElement | null;

  if (!gamingWinnerPlayerImageRef || winner === 'draw') {
    return;
  }

  // In the Gaming theme, the player name comes from a Figma image.
  const imageName = winner === 'blue' ? 'Blue Player.png' : 'Orange Player.png';
  const label = winner === 'blue' ? 'Blue Player' : 'Orange Player';

  gamingWinnerPlayerImageRef.src = encodeURI(`${assetPath}${imageName}`);
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
    labelImageRef.src = `${assetPath}gaming_draw_label.png`;
  }

  if (titleImageRef) {
    titleImageRef.src = `${assetPath}gaming_draw_title.png`;
  }

  if (scaleImageRef) {
    scaleImageRef.src = `${assetPath}gaming_draw_scale.png`;
  }
}

function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

function getWinnerImage(winner: Winner) {
  // blue/orange become bluewin.png or orangewin.png.
  if (winner === 'draw') {
    return 'draw.png';
  }

  return `${winner}win.png`;
}

function getWinnerAltText(winner: Winner) {
  if (winner === 'draw') {
    return 'It is a draw';
  }

  return `${winner} player wins`;
}

function getWinner(blueScore: number, orangeScore: number): Winner {
  if (blueScore === orangeScore) {
    return 'draw';
  }

  return blueScore > orangeScore ? 'blue' : 'orange';
}
