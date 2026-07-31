import { renderCards, setBoardSize, shuffleCards } from './cards';
import { boardConfigs, cardImages, type GameSettings } from './game-data';
import { switchPlayer, updateCurrentPlayerMarker, updateScore } from './players';
import { showGameOver } from './winner-screen';

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
  let blueScore = 0;
  let orangeScore = 0;
  let matchedPairs = 0;
  const boardConfig = boardConfigs[settings.boardSize];
  const selectedImages = cardImages.slice(0, boardConfig.pairCount);
  const shuffledImages = shuffleCards([...selectedImages, ...selectedImages]);

  updateScore(blueScoreRef, blueScore);
  updateScore(orangeScoreRef, orangeScore);
  setBoardSize(fieldRef, boardConfig.fieldClass);
  renderCards(fieldRef, shuffledImages);
  updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);

  fieldRef.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.card');

    if (
      !(card instanceof HTMLElement) ||
      isLocked ||
      card.classList.contains('is-flipped') ||
      card.classList.contains('is-matched')
    ) {
      return;
    }

    card.classList.add('is-flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      isLocked = true;
      const [firstCard, secondCard] = flippedCards;
      const isMatch = firstCard.dataset.cardImage === secondCard.dataset.cardImage;

      if (isMatch) {
        flippedCards.forEach((flippedCard) => {
          flippedCard.classList.add('is-matched');
        });

        if (currentPlayer === 'blue') {
          blueScore++;
        } else {
          orangeScore++;
        }

        updateScore(blueScoreRef, blueScore);
        updateScore(orangeScoreRef, orangeScore);
        matchedPairs++;
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === boardConfig.pairCount) {
          setTimeout(() => {
            showGameOver(
              gameContentRef,
              gameOverRef,
              winnerScreenRef,
              winnerImageRef,
              finalBlueScoreRef,
              finalOrangeScoreRef,
              blueScore,
              orangeScore,
            );
          }, 1600);
        }

        return;
      }

      setTimeout(() => {
        flippedCards.forEach((flippedCard) => {
          flippedCard.classList.remove('is-flipped');
        });

        currentPlayer = switchPlayer(currentPlayer);
        updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);
        flippedCards = [];
        isLocked = false;
      }, 1000);
    }
  });
}
