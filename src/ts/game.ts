import {
  canFlipCard,
  flipCard,
  getClickedCard,
  haveSameCardImage,
  hideCards,
  markCardsAsMatched,
  renderCards,
  setBoardSize,
  shuffleCards,
} from './cards';
import { boardConfigs, cardImages, type GameSettings } from './game-data';
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
  let flippedCards: HTMLElement[] = [];
  let isLocked = false;
  let currentPlayer = settings.firstPlayer;
  const score = createPlayerScore();
  let matchedPairs = 0;
  const boardConfig = boardConfigs[settings.boardSize];
  const selectedImages = cardImages.slice(0, boardConfig.pairCount);
  const shuffledImages = shuffleCards([...selectedImages, ...selectedImages]);

  updateScores(blueScoreRef, orangeScoreRef, score);
  setBoardSize(fieldRef, boardConfig.fieldClass);
  renderCards(fieldRef, shuffledImages);
  updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);

  fieldRef.addEventListener('click', (e) => {
    const card = getClickedCard(e.target);

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
        markCardsAsMatched(flippedCards);
        addPoint(score, currentPlayer);
        updateScores(blueScoreRef, orangeScoreRef, score);
        matchedPairs++;
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === boardConfig.pairCount) {
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
        hideCards(flippedCards);
        currentPlayer = switchPlayer(currentPlayer);
        updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);
        flippedCards = [];
        isLocked = false;
      }, 1000);
    }
  });
}
