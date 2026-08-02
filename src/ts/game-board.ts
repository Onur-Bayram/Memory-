import { renderCards, setBoardSize, shuffleCards } from './cards';
import {
  boardConfigs,
  cardBackImages,
  getThemeCardImages,
  type BoardConfig,
  type BoardSize,
  type Theme,
} from './game-data';

export function setupGameBoard(fieldRef: HTMLElement, boardSize: BoardSize, theme: Theme): BoardConfig {
  // Zur Boardgroesse holen wir die passende Anzahl Paare und die passende CSS-Klasse.
  const boardConfig = boardConfigs[boardSize];
  const selectedImages = getThemeCardImages(theme, boardConfig.pairCount);
  // Jedes Motiv wird doppelt eingefuegt, weil Memory immer Paare braucht.
  const shuffledImages = shuffleCards([...selectedImages, ...selectedImages]);

  setBoardSize(fieldRef, boardConfig.fieldClass);
  // Die Rueckseite wird per CSS-Variable gesetzt, damit Themes sie austauschen koennen.
  fieldRef.style.setProperty('--card-back-image', `url('${cardBackImages[theme]}')`);
  renderCards(fieldRef, shuffledImages);

  return boardConfig;
}
