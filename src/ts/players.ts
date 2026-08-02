import { playerColors, type Player } from './game-data';

export type PlayerScore = {
  blue: number;
  orange: number;
};

export function createPlayerScore(): PlayerScore {
  // Jede Runde startet mit 0 Punkten fuer beide Spieler.
  return {
    blue: 0,
    orange: 0,
  };
}

export function switchPlayer(currentPlayer: Player) {
  // Nach einem falschen Paar ist der andere Spieler dran.
  return currentPlayer === 'blue' ? 'orange' : 'blue';
}

export function addPoint(score: PlayerScore, player: Player) {
  // Bei einem richtigen Paar bekommt der aktuelle Spieler einen Punkt.
  score[player]++;
}

export function updateScores(blueScoreRef: HTMLElement, orangeScoreRef: HTMLElement, score: PlayerScore) {
  // Die Werte im Objekt und die Anzeige im HTML muessen zusammenbleiben.
  updateScore(blueScoreRef, score.blue);
  updateScore(orangeScoreRef, score.orange);
}

function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

export function updateCurrentPlayerMarker(markerRef: HTMLElement, currentPlayer: Player) {
  // data-current-player hilft CSS, je nach Theme das richtige Symbol zu zeigen.
  markerRef.dataset.currentPlayer = currentPlayer;
  markerRef.style.backgroundColor = playerColors[currentPlayer];
}
