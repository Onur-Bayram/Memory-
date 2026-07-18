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
    const cardRefs = fieldRef.querySelectorAll<HTMLElement>('.card');
    const shuffledImages = shuffleCards([...cardImages, ...cardImages]);

    updateCurrentPlayerMarker(currentPlayerMarkerRef, currentPlayer);

    cardRefs.forEach((cardRef, index) => {
      const cardImage = shuffledImages[index];
      const cardImagePath = `/dist/assets/${cardImage}`;

      cardRef.style.setProperty('--card-image', `url('${cardImagePath}')`);
      cardRef.dataset.cardImage = cardImage;
    });

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
