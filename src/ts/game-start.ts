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
  // Die Settings-Leiste aktualisiert sich, sobald der Benutzer eine Option auswaehlt.
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

    // Ohne vollstaendige Auswahl darf das Spiel nicht starten.
    if (!hasCompleteSettings(settingsFormRef)) {
      return;
    }

    showGameScreen(settingsScreenRef, gameContentRef);

    // Ab hier werden die gewaehlten Settings an die Spielrunde uebergeben.
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
