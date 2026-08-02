import { renderCards, setBoardSize, shuffleCards } from './cards';
import {
  boardConfigs,
  cardBackImages,
  cardImages,
  type BoardConfig,
  type BoardSize,
  type Theme,
} from './game-data';

export function setupGameBoard(fieldRef: HTMLElement, boardSize: BoardSize, theme: Theme): BoardConfig {
  const boardConfig = boardConfigs[boardSize];
  const selectedImages = cardImages.slice(0, boardConfig.pairCount);
  const shuffledImages = shuffleCards([...selectedImages, ...selectedImages]);

  setBoardSize(fieldRef, boardConfig.fieldClass);
  fieldRef.style.setProperty('--card-back-image', `url('${cardBackImages[theme]}')`);
  renderCards(fieldRef, shuffledImages);

  return boardConfig;
}
