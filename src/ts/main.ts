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
];

type Player = 'blue' | 'orange';

const playerColors = {
  blue: '#2fb4ff',
  orange: '#ff8a2a',
};

init();

function init() {
  const fieldRef = document.getElementById('field');
  const blueScoreRef = document.getElementById('blue-score');
  const orangeScoreRef = document.getElementById('orange-score');
  const currentPlayerMarkerRef = document.querySelector<HTMLElement>('.current-player__marker');

  if (fieldRef && blueScoreRef && orangeScoreRef && currentPlayerMarkerRef) {
    let flippedCards: HTMLElement[] = [];
    let isLocked = false;
    let currentPlayer: Player = 'blue';
    let blueScore = 0;
    let orangeScore = 0;
    const shuffledImages = shuffleCards([...cardImages, ...cardImages]);

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
          flippedCards = [];
          isLocked = false;

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

  initExitPopup();
}

function renderCards(fieldRef: HTMLElement, shuffledImages: string[]) {
  fieldRef.innerHTML = '';

  shuffledImages.forEach((cardImage) => {
    const cardRef = document.createElement('button');

    cardRef.classList.add('card');
    cardRef.type = 'button';
    cardRef.ariaLabel = 'Memory Karte';
    cardRef.dataset.cardImage = cardImage;
    cardRef.style.setProperty('--card-image', `url('/dist/assets/${cardImage}')`);
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
