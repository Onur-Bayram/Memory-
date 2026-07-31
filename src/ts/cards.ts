import { assetPath } from './game-data';

export function setBoardSize(fieldRef: HTMLElement, fieldClass: string) {
  fieldRef.classList.remove('field--16', 'field--24', 'field--36');
  fieldRef.classList.add(fieldClass);
}

export function renderCards(fieldRef: HTMLElement, shuffledImages: string[]) {
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

export function getClickedCard(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  const cardRef = target.closest('.card');

  return cardRef instanceof HTMLElement ? cardRef : null;
}

export function canFlipCard(cardRef: HTMLElement, isLocked: boolean) {
  return (
    !isLocked &&
    !cardRef.classList.contains('is-flipped') &&
    !cardRef.classList.contains('is-matched')
  );
}

export function flipCard(cardRef: HTMLElement) {
  cardRef.classList.add('is-flipped');
}

export function hideCards(cards: HTMLElement[]) {
  cards.forEach((card) => {
    card.classList.remove('is-flipped');
  });
}

export function markCardsAsMatched(cards: HTMLElement[]) {
  cards.forEach((card) => {
    card.classList.add('is-matched');
  });
}

export function haveSameCardImage(firstCard: HTMLElement, secondCard: HTMLElement) {
  return firstCard.dataset.cardImage === secondCard.dataset.cardImage;
}

export function shuffleCards(cards: string[]) {
  return cards.sort(() => Math.random() - 0.5);
}
