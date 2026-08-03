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
  themePreviewImageRef,
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
  // The settings bar updates whenever the user chooses an option.
  initSettingsSteps(
    settingsFormRef,
    settingsStartButtonRef,
    settingsStepsRef,
    selectedThemeRef,
    selectedPlayerRef,
    selectedBoardSizeRef,
    themePreviewImageRef,
  );

  settingsFormRef.addEventListener('submit', (e) => {
    e.preventDefault();

    // The game must not start until every setting is selected.
    if (!hasCompleteSettings(settingsFormRef)) {
      return;
    }

    showGameScreen(settingsScreenRef, gameContentRef);

    // From here, the selected settings are passed to the game round.
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
