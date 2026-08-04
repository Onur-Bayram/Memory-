import type { Player } from './game-data';

export type PlayerScore = {
  blue: number;
  orange: number;
};

export function createPlayerScore(): PlayerScore {
  // Every round starts with 0 points for both players.
  return {
    blue: 0,
    orange: 0,
  };
}

export function switchPlayer(currentPlayer: Player) {
  // After a wrong pair, the other player gets the turn.
  return currentPlayer === 'blue' ? 'orange' : 'blue';
}

export function addPoint(score: PlayerScore, player: Player) {
  // A correct pair gives one point to the current player.
  score[player]++;
}

export function updateScores(blueScoreRef: HTMLElement, orangeScoreRef: HTMLElement, score: PlayerScore) {
  // The score object and the HTML display must stay in sync.
  updateScore(blueScoreRef, score.blue);
  updateScore(orangeScoreRef, score.orange);
}

function updateScore(scoreRef: HTMLElement, score: number) {
  // HTML only accepts strings, so numbers are converted before rendering.
  scoreRef.textContent = score.toString();
}

export function updateCurrentPlayerMarker(markerRef: HTMLElement, currentPlayer: Player) {
  // data-current-player lets CSS show the right symbol for each theme.
  markerRef.dataset.currentPlayer = currentPlayer;
}
