import { assetPath, type Winner } from './game-data';
import { type PlayerScore } from './players';

const gameOverDelay = 1600;

export function initWinnerScreen() {
  const backToStartButtonRefs = document.querySelectorAll<HTMLButtonElement>(
    '.winner-screen__back-button, .winner-screen__home-button',
  );

  backToStartButtonRefs.forEach((buttonRef) => {
    // Der Button startet das Spiel komplett neu.
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
  // Die Game-Over-Seite zeigt zuerst nur den finalen Punktestand.
  updateScore(finalBlueScoreRef, blueScore);
  updateScore(finalOrangeScoreRef, orangeScore);

  gameContentRef.hidden = true;
  gameOverRef.hidden = false;

  setTimeout(() => {
    // Danach folgt der Gewinner-Screen mit Animation.
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
  // Nach dem letzten gefundenen Paar warten wir kurz, bevor Game Over erscheint.
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
  // Diese Extra-Ansicht gehoert nur zum Gaming-Theme, wenn es einen Gewinner gibt.
  const isGamingWinner = winner !== 'draw' && isGamingTheme;
  const isGamingDraw = winner === 'draw' && isGamingTheme;
  const isNormalResult = !isGamingWinner && !isGamingDraw;

  // Die Klassen passen das Ergebnis-Design an.
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

  // Im Gaming-Theme kommt der Spielername als Figma-Bild.
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

  // Die Draw-Bilder werden hier bewusst gesetzt, damit keine alten Dateinamen im Browser haengen bleiben.
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
  // blue/orange werden zu bluewin.png oder orangewin.png.
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
