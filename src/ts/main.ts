import '../styles/style.scss';
import { getAppElements } from './app-elements';
import { initExitPopup } from './exit-popup';
import { startGame } from './game';
import { getGameSettings, hasCompleteSettings, initSettingsSteps } from './settings';
import { initWinnerScreen } from './winner-screen';

init();

function init() {
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
      homeScreenRef.hidden = true;
      settingsScreenRef.hidden = false;
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

      settingsScreenRef.hidden = true;
      gameContentRef.hidden = false;

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
