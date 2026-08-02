import {
  canFlipCard,
  flipCard,
  getClickedCard,
  haveSameCardImage,
  hideCards,
  markCardsAsMatched,
} from './cards';
import { setupGameBoard } from './game-board';
import { exitGameButtonImages, type GameSettings } from './game-data';
import {
  addPoint,
  createPlayerScore,
  switchPlayer,
  updateCurrentPlayerMarker,
  updateScores,
} from './players';
import { showGameOverAfterDelay } from './winner-screen';

type StartGameOptions = {
  fieldRef: HTMLElement;
  blueScoreRef: HTMLElement;
  orangeScoreRef: HTMLElement;
  finalBlueScoreRef: HTMLElement;
  finalOrangeScoreRef: HTMLElement;
  gameContentRef: HTMLElement;
  gameOverRef: HTMLElement;
  winnerScreenRef: HTMLElement;
  winnerImageRef: HTMLImageElement;
  currentPlayerMarkerRef: HTMLElement;
  settings: GameSettings;
};

export function startGame({
  fieldRef,
  blueScoreRef,
  orangeScoreRef,
  finalBlueScoreRef,
  finalOrangeScoreRef,
  gameContentRef,
  gameOverRef,
  winnerScreenRef,
  winnerImageRef,
  currentPlayerMarkerRef,
  settings,
}: StartGameOptions) {
  // Diese Variablen beschreiben den aktuellen Zustand der laufenden Runde.
  let flippedCards: HTMLElement[] = [];
  let isLocked = false;
  let currentPlayer = settings.firstPlayer;
  const score = createPlayerScore();
  let matchedPairs = 0;
  const exitGameButtonImage = exitGameButtonImages[settings.theme];
  const boardConfig = setupGameBoard(fieldRef, settings.boardSize, settings.theme);

  // Theme und Exit-Button-Bilder werden beim Spielstart passend gesetzt.
  document.body.dataset.gameTheme = settings.theme;
  gameContentRef.style.setProperty('--exit-game-image', `url('${exitGameButtonImage.normal}')`);
  gameContentRef.style.setProperty('--exit-game-hover-image', `url('${exitGameButtonImage.hover}')`);
  updateScores(blueScoreRef, orangeScoreRef, score);
  updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);

  fieldRef.addEventListener('click', (e) => {
    const card = getClickedCard(e.target);

    // Ungueltige Klicks ignorieren wir, zum Beispiel auf bereits offene Karten.
    if (!card || !canFlipCard(card, isLocked)) {
      return;
    }

    flipCard(card);
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      isLocked = true;
      const [firstCard, secondCard] = flippedCards;
      const isMatch = haveSameCardImage(firstCard, secondCard);

      if (isMatch) {
        // Bei einem Paar bleiben die Karten offen und der Spieler bekommt einen Punkt.
        markCardsAsMatched(flippedCards);
        addPoint(score, currentPlayer);
        updateScores(blueScoreRef, orangeScoreRef, score);
        matchedPairs++;
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === boardConfig.pairCount) {
          // Wenn alle Paare gefunden wurden, starten die Endscreen-Ablaufe.
          showGameOverAfterDelay(
            gameContentRef,
            gameOverRef,
            winnerScreenRef,
            winnerImageRef,
            finalBlueScoreRef,
            finalOrangeScoreRef,
            score,
          );
        }

        return;
      }

      setTimeout(() => {
        // Bei falschem Paar drehen sich die Karten zurueck und der Spieler wechselt.
        hideCards(flippedCards);
        currentPlayer = switchPlayer(currentPlayer);
        updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);
        flippedCards = [];
        isLocked = false;
      }, 1000);
    }
  });
}
