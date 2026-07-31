export function showSettingsScreen(homeScreenRef: HTMLElement, settingsScreenRef: HTMLElement) {
  homeScreenRef.hidden = true;
  settingsScreenRef.hidden = false;
}

export function showGameScreen(settingsScreenRef: HTMLElement, gameContentRef: HTMLElement) {
  settingsScreenRef.hidden = true;
  gameContentRef.hidden = false;
}
