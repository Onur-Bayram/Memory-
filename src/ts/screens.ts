export function showSettingsScreen(homeScreenRef: HTMLElement, settingsScreenRef: HTMLElement) {
  // hidden ist hier unsere einfache Navigation zwischen den Screens.
  homeScreenRef.hidden = true;
  settingsScreenRef.hidden = false;
}

export function showGameScreen(settingsScreenRef: HTMLElement, gameContentRef: HTMLElement) {
  // Nach dem Start verschwindet Settings und das Spielfeld wird sichtbar.
  settingsScreenRef.hidden = true;
  gameContentRef.hidden = false;
}
