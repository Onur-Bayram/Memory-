export type AppElements = {
  homeScreenRef: HTMLElement;
  homeStartButtonRef: HTMLButtonElement;
  settingsScreenRef: HTMLElement;
  settingsFormRef: HTMLFormElement;
  settingsStartButtonRef: HTMLButtonElement;
  settingsStepsRef: HTMLElement;
  selectedThemeRef: HTMLElement;
  selectedPlayerRef: HTMLElement;
  selectedBoardSizeRef: HTMLElement;
  fieldRef: HTMLElement;
  blueScoreRef: HTMLElement;
  orangeScoreRef: HTMLElement;
  finalBlueScoreRef: HTMLElement;
  finalOrangeScoreRef: HTMLElement;
  gameContentRef: HTMLElement;
  gameOverRef: HTMLElement;
  winnerScreenRef: HTMLElement;
  winnerImageRef: HTMLImageElement;
  currentPlayerMarkerRef: HTMLElement;
};

export function getAppElements(): AppElements | null {
  const homeScreenRef = document.getElementById('home-screen');
  const homeStartButtonRef = document.querySelector<HTMLButtonElement>('#home-start');
  const settingsScreenRef = document.getElementById('settings-screen');
  const settingsFormRef = document.querySelector<HTMLFormElement>('#settings-form');
  const settingsStartButtonRef = document.querySelector<HTMLButtonElement>('#settings-start');
  const settingsStepsRef = document.querySelector<HTMLElement>('.settings-steps');
  const selectedThemeRef = document.getElementById('selected-theme');
  const selectedPlayerRef = document.getElementById('selected-player');
  const selectedBoardSizeRef = document.getElementById('selected-board-size');
  const fieldRef = document.getElementById('field');
  const blueScoreRef = document.getElementById('blue-score');
  const orangeScoreRef = document.getElementById('orange-score');
  const finalBlueScoreRef = document.getElementById('final-blue-score');
  const finalOrangeScoreRef = document.getElementById('final-orange-score');
  const gameContentRef = document.querySelector<HTMLElement>('.game-content');
  const gameOverRef = document.getElementById('game-over');
  const winnerScreenRef = document.getElementById('winner-screen');
  const winnerImageRef = document.querySelector<HTMLImageElement>('#winner-image');
  const currentPlayerMarkerRef = document.querySelector<HTMLElement>('.current-player__marker');

  if (
    !homeScreenRef ||
    !homeStartButtonRef ||
    !settingsScreenRef ||
    !settingsFormRef ||
    !settingsStartButtonRef ||
    !settingsStepsRef ||
    !selectedThemeRef ||
    !selectedPlayerRef ||
    !selectedBoardSizeRef ||
    !fieldRef ||
    !blueScoreRef ||
    !orangeScoreRef ||
    !finalBlueScoreRef ||
    !finalOrangeScoreRef ||
    !gameContentRef ||
    !gameOverRef ||
    !winnerScreenRef ||
    !winnerImageRef ||
    !currentPlayerMarkerRef
  ) {
    return null;
  }

  return {
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
  };
}
