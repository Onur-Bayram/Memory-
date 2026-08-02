import { getAppElements } from './app-elements';
import { initExitPopup } from './exit-popup';
import { initGameStart } from './game-start';
import { initHomeStart } from './home';
import { initWinnerScreen } from './winner-screen';

export function initApp() {
  // Alle wichtigen HTML-Elemente werden einmal gesucht und dann weitergegeben.
  const appElements = getAppElements();

  if (appElements) {
    // Diese Teile brauchen die gefundenen Elemente aus der Seite.
    initHomeStart(appElements);
    initGameStart(appElements);
  }

  // Diese Initialisierungen suchen ihre wenigen Elemente selbst.
  initExitPopup();
  initWinnerScreen();
}
