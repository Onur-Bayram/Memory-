import { assetPath } from './game-data';

export function setBoardSize(fieldRef: HTMLElement, fieldClass: string) {
  // Remove all board size classes first, so only one size is active.
  fieldRef.classList.remove('field--16', 'field--24', 'field--36');
  fieldRef.classList.add(fieldClass);
}

export function renderCards(fieldRef: HTMLElement, shuffledImages: string[]) {
  fieldRef.innerHTML = '';

  shuffledImages.forEach((cardImage) => {
    const cardRef = document.createElement('button');

    // Store the image in the dataset, so two cards can be compared later.
    cardRef.classList.add('card');
    cardRef.type = 'button';
    cardRef.ariaLabel = 'Memory Karte';
    cardRef.dataset.cardImage = cardImage;
    cardRef.style.setProperty('--card-image', `url('${assetPath}${cardImage}')`);
    // The two card sides stay separate in HTML, so CSS can flip the card.
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
  // A click can hit an inner span, so we look for the closest card element.
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  const cardRef = target.closest('.card');

  return cardRef instanceof HTMLElement ? cardRef : null;
}

export function canFlipCard(cardRef: HTMLElement, isLocked: boolean) {
  // Do not flip another card while two cards are being checked.
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
  // Two cards match when they store the same image value.
  return firstCard.dataset.cardImage === secondCard.dataset.cardImage;
}

export function shuffleCards(cards: string[]) {
  // This simple random sort is enough for this small game.
  return cards.sort(() => Math.random() - 0.5);
}
