export function showSettingsScreen(homeScreenRef: HTMLElement, settingsScreenRef: HTMLElement) {
  // hidden is our simple navigation between screens.
  homeScreenRef.hidden = true;
  settingsScreenRef.hidden = false;
}

export function showGameScreen(settingsScreenRef: HTMLElement, gameContentRef: HTMLElement) {
  // After starting, settings is hidden and the game field becomes visible.
  settingsScreenRef.hidden = true;
  gameContentRef.hidden = false;
}
