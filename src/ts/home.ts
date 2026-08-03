import { type AppElements } from './app-elements';
import { showSettingsScreen } from './screens';

export function initHomeStart({ homeScreenRef, homeStartButtonRef, settingsScreenRef }: AppElements) {
  homeStartButtonRef.addEventListener('click', () => {
    // The play button takes the user from the home screen to settings.
    showSettingsScreen(homeScreenRef, settingsScreenRef);
  });
}
