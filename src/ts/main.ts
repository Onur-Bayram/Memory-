import '../styles/style.scss';
import { initExitPopup } from './exit-popup';
import {
  assetPath,
  boardConfigs,
  cardImages,
  playerColors,
  type GameSettings,
  type Player,
} from './game-data';
import { getGameSettings, hasCompleteSettings, initSettingsSteps } from './settings';
import { initWinnerScreen, showGameOver } from './winner-screen';

init();

function init() {
  const homeScreenRef = document.getElementById('home-screen');
  const homeStartButtonRef = document.querySelector<HTMLButtonElement>('#home-start');
  const settingsScreenRef = document.getElementById('settings-screen');
  const settingsFormRef = document.querySelector<HTMLFormElement>('#settings-form');
  const settingsStartButtonRef = document.querySelector<HTMLButtonElement>('#settings-start');
  const settingsStepsRef = document.querySelector<HTMLElement>('.settings-steps');
  const selectedThemeRef = document.getElementById('selected-theme');
  const selectedPlayerRef = document.getElementById('selected-player');
  const selectedBoardSizeRef = document.getElementById('selected-board-size');
  const fieldRef = document.getElementById('field');
  const blueScoreRef = document.getElementById('blue-score');
  const orangeScoreRef = document.getElementById('orange-score');
  const finalBlueScoreRef = document.getElementById('final-blue-score');
  const finalOrangeScoreRef = document.getElementById('final-orange-score');
  const gameContentRef = document.querySelector<HTMLElement>('.game-content');
  const gameOverRef = document.getElementById('game-over');
  const winnerScreenRef = document.getElementById('winner-screen');
  const winnerImageRef = document.querySelector<HTMLImageElement>('#winner-image');
  const currentPlayerMarkerRef = document.querySelector<HTMLElement>('.current-player__marker');

  if (
    homeScreenRef &&
    homeStartButtonRef &&
    settingsScreenRef &&
    settingsFormRef &&
    settingsStartButtonRef &&
    settingsStepsRef &&
    selectedThemeRef &&
    selectedPlayerRef &&
    selectedBoardSizeRef &&
    fieldRef &&
    blueScoreRef &&
    orangeScoreRef &&
    finalBlueScoreRef &&
    finalOrangeScoreRef &&
    gameContentRef &&
    gameOverRef &&
    winnerScreenRef &&
    winnerImageRef &&
    currentPlayerMarkerRef
  ) {
    homeStartButtonRef.addEventListener('click', () => {
      homeScreenRef.hidden = true;
      settingsScreenRef.hidden = false;
    });

    initSettingsSteps(
      settingsFormRef,
      settingsStartButtonRef,
      settingsStepsRef,
      selectedThemeRef,
      selectedPlayerRef,
      selectedBoardSizeRef,
    );

    settingsFormRef.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!hasCompleteSettings(settingsFormRef)) {
        return;
      }

      settingsScreenRef.hidden = true;
      gameContentRef.hidden = false;

      startGame({
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
        settings: getGameSettings(settingsFormRef),
      });
    });
  }

  initExitPopup();
  initWinnerScreen();
}

function startGame({
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
}: {
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
}) {
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

function setBoardSize(fieldRef: HTMLElement, fieldClass: string) {
  fieldRef.classList.remove('field--16', 'field--24', 'field--36');
  fieldRef.classList.add(fieldClass);
}

function renderCards(fieldRef: HTMLElement, shuffledImages: string[]) {
  fieldRef.innerHTML = '';

  shuffledImages.forEach((cardImage) => {
    const cardRef = document.createElement('button');

    cardRef.classList.add('card');
    cardRef.type = 'button';
    cardRef.ariaLabel = 'Memory Karte';
    cardRef.dataset.cardImage = cardImage;
    cardRef.style.setProperty('--card-image', `url('${assetPath}${cardImage}')`);
    cardRef.innerHTML = `
      <span class="card__inner">
        <span class="card__face card__face--front"></span>
        <span class="card__face card__face--back"></span>
      </span>
    `;

    fieldRef.appendChild(cardRef);
  });
}

function shuffleCards(cards: string[]) {
  return cards.sort(() => Math.random() - 0.5);
}

function switchPlayer(currentPlayer: Player) {
  return currentPlayer === 'blue' ? 'orange' : 'blue';
}

function updateScore(scoreRef: HTMLElement, score: number) {
  scoreRef.textContent = score.toString();
}

function updateCurrentPlayerMarker(markerRef: HTMLElement, currentPlayer: Player) {
  markerRef.style.background = playerColors[currentPlayer];
}
