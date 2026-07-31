import { playerColors, type Player } from './game-data';

export type PlayerScore = {
  blue: number;
  orange: number;
};

export function createPlayerScore(): PlayerScore {
  return {
    blue: 0,
    orange: 0,
  };
}

export function switchPlayer(currentPlayer: Player) {
  return currentPlayer === 'blue' ? 'orange' : 'blue';
}

export function addPoint(score: PlayerScore, player: Player) {
  score[player]++;
}

export function updateScores(blueScoreRef: HTMLElement, orangeScoreRef: HTMLElement, score: PlayerScore) {
  updateScore(blueScoreRef, score.blue);
  updateScore(orangeScoreRef, score.orange);
}

function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

export function updateCurrentPlayerMarker(markerRef: HTMLElement, currentPlayer: Player) {
  markerRef.style.background = playerColors[currentPlayer];
}
