import { getAppElements } from './app-elements';
import { initExitPopup } from './exit-popup';
import { initGameStart } from './game-start';
import { initHomeStart } from './home';
import { initWinnerScreen } from './winner-screen';

export function initApp() {
  // All important HTML elements are collected once and passed to the modules.
  const appElements = getAppElements();

  if (appElements) {
    // These parts need the elements that were found on the page.
    initHomeStart(appElements);
    initGameStart(appElements);
  }

  // These initializers only need a few elements and find them themselves.
  initExitPopup();
  initWinnerScreen();
}
