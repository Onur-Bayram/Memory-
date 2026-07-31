import { renderCards, setBoardSize, shuffleCards } from './cards';
import { boardConfigs, cardImages, type BoardConfig, type BoardSize } from './game-data';

export function setupGameBoard(fieldRef: HTMLElement, boardSize: BoardSize): BoardConfig {
  const boardConfig = boardConfigs[boardSize];
  const selectedImages = cardImages.slice(0, boardConfig.pairCount);
  const shuffledImages = shuffleCards([...selectedImages, ...selectedImages]);

  setBoardSize(fieldRef, boardConfig.fieldClass);
  renderCards(fieldRef, shuffledImages);

  return boardConfig;
}
