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

          flippedCards = [];
          isLocked = false;

          return;
        }

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
