import { assetPath, type Winner } from './game-data';
import { type PlayerScore } from './players';

const gameOverDelay = 1600;

export function initWinnerScreen() {
  const backToStartButtonRef = document.querySelector<HTMLButtonElement>('.winner-screen__back-button');

  if (backToStartButtonRef) {
    backToStartButtonRef.addEventListener('click', () => {
      window.location.reload();
    });
  }
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
  updateScore(finalBlueScoreRef, blueScore);
  updateScore(finalOrangeScoreRef, orangeScore);

  gameContentRef.hidden = true;
  gameOverRef.hidden = false;

  setTimeout(() => {
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

  gameOverRef.hidden = true;
  winnerScreenRef.classList.toggle('winner-screen--draw', winner === 'draw');
  winnerScreenRef.classList.toggle('winner-screen--orange', winner === 'orange');
  winnerImageRef.src = `${assetPath}${getWinnerImage(winner)}`;
  winnerImageRef.alt = getWinnerAltText(winner);
  winnerScreenRef.hidden = false;
}

function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

function getWinnerImage(winner: Winner) {
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
