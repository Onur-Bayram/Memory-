import '../styles/style.scss';

const cardImages = [
  'karte_1_kopie_unten.png',
  'karte_2_unten.png',
  'karte_3_unten.png',
  'karte_4_unten.png',
  'karte_5_unten.png',
  'karte_6_unten.png',
  'karte_7_unten.png',
  'karte_8_unten.png',
  'karte_9_unten.png',
  'karte_10_unten.png',
  'karte_11_unten.png',
  'karte_12_unten.png',
  'karte_13_unten.png',
  'karte_14_unten.png',
  'karte_15_unten.png',
  'karte_16_unten.png',
  'karte_17_unten.png',
  'karte_18_unten.png',
];

type Player = 'blue' | 'orange';
type Winner = Player | 'draw';
type BoardSize = 16 | 24 | 36;
type GameSettings = {
  boardSize: BoardSize;
  firstPlayer: Player;
};

const playerColors = {
  blue: '#2fb4ff',
  orange: '#ff8a2a',
};

const assetPath = '/dist/assets/';
const boardConfigs = {
  16: {
    pairCount: 8,
    fieldClass: 'field--16',
  },
  24: {
    pairCount: 12,
    fieldClass: 'field--24',
  },
  36: {
    pairCount: 18,
    fieldClass: 'field--36',
  },
};

init();

function init() {
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

function initSettingsSteps(
  settingsFormRef: HTMLFormElement,
  settingsStartButtonRef: HTMLButtonElement,
  settingsStepsRef: HTMLElement,
  selectedThemeRef: HTMLElement,
  selectedPlayerRef: HTMLElement,
  selectedBoardSizeRef: HTMLElement,
) {
  updateSettingsSteps(
    settingsFormRef,
    settingsStartButtonRef,
    settingsStepsRef,
    selectedThemeRef,
    selectedPlayerRef,
    selectedBoardSizeRef,
  );

  settingsFormRef.addEventListener('change', () => {
    updateSettingsSteps(
      settingsFormRef,
      settingsStartButtonRef,
      settingsStepsRef,
      selectedThemeRef,
      selectedPlayerRef,
      selectedBoardSizeRef,
    );
  });
}

function updateSettingsSteps(
  settingsFormRef: HTMLFormElement,
  settingsStartButtonRef: HTMLButtonElement,
  settingsStepsRef: HTMLElement,
  selectedThemeRef: HTMLElement,
  selectedPlayerRef: HTMLElement,
  selectedBoardSizeRef: HTMLElement,
) {
  const isComplete = hasCompleteSettings(settingsFormRef);
  const themeLabel = getSelectedLabel(settingsFormRef, 'theme');
  const playerLabel = getSelectedLabel(settingsFormRef, 'first-player');
  const boardSizeLabel = getSelectedLabel(settingsFormRef, 'board-size');

  selectedThemeRef.textContent = themeLabel ?? 'Theme';
  selectedPlayerRef.textContent = playerLabel ?? 'Player';
  selectedBoardSizeRef.textContent = boardSizeLabel ?? 'Board size';
  settingsStepsRef.classList.toggle('settings-steps--has-theme', Boolean(themeLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-player', Boolean(playerLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-board', Boolean(boardSizeLabel));
  settingsStartButtonRef.disabled = !isComplete;
}

function getSelectedLabel(settingsFormRef: HTMLFormElement, fieldName: string) {
  const selectedInputRef = settingsFormRef.querySelector<HTMLInputElement>(`input[name="${fieldName}"]:checked`);

  return selectedInputRef?.dataset.label;
}

function hasCompleteSettings(settingsFormRef: HTMLFormElement) {
  const formData = new FormData(settingsFormRef);

  return Boolean(formData.get('theme') && formData.get('first-player') && formData.get('board-size'));
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

function getGameSettings(settingsFormRef: HTMLFormElement): GameSettings {
  const formData = new FormData(settingsFormRef);
  const boardSize = Number(formData.get('board-size'));
  const firstPlayer = formData.get('first-player');

  return {
    boardSize: isBoardSize(boardSize) ? boardSize : 16,
    firstPlayer: isPlayer(firstPlayer) ? firstPlayer : 'blue',
  };
}

function isBoardSize(value: number): value is BoardSize {
  return value === 16 || value === 24 || value === 36;
}

function isPlayer(value: FormDataEntryValue | null): value is Player {
  return value === 'blue' || value === 'orange';
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

function initExitPopup() {
  const exitGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-game');
  const exitPopupRef = document.getElementById('exit-popup');
  const backToGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__back-button');
  const confirmExitButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__exit-button');

  if (exitGameButtonRef && exitPopupRef && backToGameButtonRef && confirmExitButtonRef) {
    exitGameButtonRef.addEventListener('click', () => {
      exitPopupRef.hidden = false;
    });

    backToGameButtonRef.addEventListener('click', () => {
      exitPopupRef.hidden = true;
    });

    confirmExitButtonRef.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

function initWinnerScreen() {
  const backToStartButtonRef = document.querySelector<HTMLButtonElement>('.winner-screen__back-button');

  if (backToStartButtonRef) {
    backToStartButtonRef.addEventListener('click', () => {
      window.location.reload();
    });
  }
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

function showGameOver(
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
