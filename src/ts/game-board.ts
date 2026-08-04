import { cardBackImages, getThemeCardImages } from './assets';
import { renderCards, setBoardSize, shuffleCards } from './cards';
import {
  boardConfigs,
  type BoardConfig,
  type BoardSize,
  type Theme,
} from './game-data';

export function setupGameBoard(fieldRef: HTMLElement, boardSize: BoardSize, theme: Theme): BoardConfig {
  // Get the matching pair count and CSS class for the selected board size.
  const boardConfig = boardConfigs[boardSize];
  const selectedImages = getThemeCardImages(theme, boardConfig.pairCount);
  const cardBackImage = cardBackImages[theme];
  // Each image is added twice because Memory always needs pairs.
  const shuffledImages = shuffleCards([...selectedImages, ...selectedImages]);

  setBoardSize(fieldRef, boardConfig.fieldClass);
  // The card back is set through a CSS variable, so themes can replace it.
  fieldRef.style.setProperty('--card-back-image', `url('${cardBackImage}')`);
  renderCards(fieldRef, shuffledImages, cardBackImage);

  return boardConfig;
}
