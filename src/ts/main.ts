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

init();

function init() {
  const fieldRef = document.getElementById('field');

  if (fieldRef) {
    let flippedCards: HTMLElement[] = [];
    let isLocked = false;
    const cardRefs = fieldRef.querySelectorAll<HTMLElement>('.card');
    const shuffledImages = shuffleCards([...cardImages, ...cardImages]);

    cardRefs.forEach((cardRef, index) => {
      const cardImagePath = `/dist/assets/${shuffledImages[index]}`;

      cardRef.style.setProperty('--card-image', `url('${cardImagePath}')`);
    });

    fieldRef.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest('.card');

      if (!(card instanceof HTMLElement) || isLocked || card.classList.contains('is-flipped')) {
        return;
      }

      card.classList.add('is-flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        isLocked = true;

        setTimeout(() => {
          flippedCards.forEach((flippedCard) => {
            flippedCard.classList.remove('is-flipped');
          });

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
