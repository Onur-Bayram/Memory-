import { type AppElements } from './app-elements';
import { startGame } from './game';
import { showGameScreen } from './screens';
import { getGameSettings, hasCompleteSettings, initSettingsSteps } from './settings';

export function initGameStart({
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
}: AppElements) {
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
