import { exitGameButtonImages } from './assets';
import {
  canFlipCard,
  flipCard,
  getClickedCard,
  haveSameCardImage,
  hideCards,
  markCardsAsMatched,
} from './cards';
import { setupGameBoard } from './game-board';
import { type GameSettings } from './game-data';
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
  // These variables describe the current state of the running round.
  let flippedCards: HTMLElement[] = [];
  let isLocked = false;
  let currentPlayer = settings.firstPlayer;
  const score = createPlayerScore();
  let matchedPairs = 0;
  const exitGameButtonImage = exitGameButtonImages[settings.theme];
  const exitGameButtonRef = gameContentRef.querySelector<HTMLButtonElement>('.exit-game');
  const boardConfig = setupGameBoard(fieldRef, settings.boardSize, settings.theme);

  // Theme and exit button images are set when the game starts.
  document.body.dataset.gameTheme = settings.theme;
  gameContentRef.style.setProperty('--exit-game-image', `url('${exitGameButtonImage.normal}')`);
  gameContentRef.style.setProperty('--exit-game-hover-image', `url('${exitGameButtonImage.hover}')`);
  exitGameButtonRef?.style.setProperty('--exit-game-image', `url('${exitGameButtonImage.normal}')`);
  exitGameButtonRef?.style.setProperty('--exit-game-hover-image', `url('${exitGameButtonImage.hover}')`);
  updateScores(blueScoreRef, orangeScoreRef, score);
  updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);

  fieldRef.addEventListener('click', (e) => {
    const card = getClickedCard(e.target);

    // Ignore invalid clicks, for example clicks on already open cards.
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
        // Matching cards stay open and the current player gets one point.
        markCardsAsMatched(flippedCards);
        addPoint(score, currentPlayer);
        updateScores(blueScoreRef, orangeScoreRef, score);
        matchedPairs++;
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === boardConfig.pairCount) {
          // When all pairs are found, the end-screen flow starts.
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
        // Wrong pairs flip back and the turn moves to the other player.
        hideCards(flippedCards);
        currentPlayer = switchPlayer(currentPlayer);
        updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);
        flippedCards = [];
        isLocked = false;
      }, 1000);
    }
  });
}
