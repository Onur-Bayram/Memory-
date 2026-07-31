import { playerColors, type Player } from './game-data';

export function switchPlayer(currentPlayer: Player) {
  return currentPlayer === 'blue' ? 'orange' : 'blue';
}

export function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

export function updateCurrentPlayerMarker(markerRef: HTMLElement, currentPlayer: Player) {
  markerRef.style.background = playerColors[currentPlayer];
}
