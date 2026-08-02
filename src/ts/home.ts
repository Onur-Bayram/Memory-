import { type AppElements } from './app-elements';
import { showSettingsScreen } from './screens';

export function initHomeStart({ homeScreenRef, homeStartButtonRef, settingsScreenRef }: AppElements) {
  homeStartButtonRef.addEventListener('click', () => {
    // Der Play-Button bringt den Benutzer von der Startseite zu den Settings.
    showSettingsScreen(homeScreenRef, settingsScreenRef);
  });
}
