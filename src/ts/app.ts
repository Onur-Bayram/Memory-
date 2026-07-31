import { getAppElements } from './app-elements';
import { initExitPopup } from './exit-popup';
import { initGameStart } from './game-start';
import { showSettingsScreen } from './screens';
import { initWinnerScreen } from './winner-screen';

export function initApp() {
  const appElements = getAppElements();

  if (appElements) {
    appElements.homeStartButtonRef.addEventListener('click', () => {
      showSettingsScreen(appElements.homeScreenRef, appElements.settingsScreenRef);
    });

    initGameStart(appElements);
  }

  initExitPopup();
  initWinnerScreen();
}
