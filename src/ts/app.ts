import { getAppElements } from './app-elements';
import { initExitPopup } from './exit-popup';
import { startGame } from './game';
import { showGameScreen, showSettingsScreen } from './screens';
import { getGameSettings, hasCompleteSettings, initSettingsSteps } from './settings';
import { initWinnerScreen } from './winner-screen';

export function initApp() {
  const appElements = getAppElements();

  if (appElements) {
    const {
      homeScreenRef,
      homeStartButtonRef,
      settingsScreenRef,
      settingsFormRef,
      settingsStartButtonRef,
      settingsStepsRef,
      selectedThemeRef,
      selectedPlayerRef,
      selectedBoardSizeRef,
      fieldRef,
      blueScoreRef,
      orangeScoreRef,
      finalBlueScoreRef,
      finalOrangeScoreRef,
      gameContentRef,
      gameOverRef,
      winnerScreenRef,
      winnerImageRef,
      currentPlayerMarkerRef,
    } = appElements;

    homeStartButtonRef.addEventListener('click', () => {
      showSettingsScreen(homeScreenRef, settingsScreenRef);
    });

    initSettingsSteps(
      settingsFormRef,
      settingsStartButtonRef,
      settingsStepsRef,
      selectedThemeRef,
      selectedPlayerRef,
      selectedBoardSizeRef,
    );

    settingsFormRef.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!hasCompleteSettings(settingsFormRef)) {
        return;
      }

      showGameScreen(settingsScreenRef, gameContentRef);

      startGame({
        fieldRef,
        blueScoreRef,
        orangeScoreRef,
        finalBlueScoreRef,
        finalOrangeScoreRef,
        gameContentRef,
        gameOverRef,
        winnerScreenRef,
        winnerImageRef,
        currentPlayerMarkerRef,
        settings: getGameSettings(settingsFormRef),
      });
    });
  }

  initExitPopup();
  initWinnerScreen();
}
