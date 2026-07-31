import { getAppElements } from './app-elements';
import { initExitPopup } from './exit-popup';
import { initGameStart } from './game-start';
import { initHomeStart } from './home';
import { initWinnerScreen } from './winner-screen';

export function initApp() {
  const appElements = getAppElements();

  if (appElements) {
    initHomeStart(appElements);
    initGameStart(appElements);
  }

  initExitPopup();
  initWinnerScreen();
}
