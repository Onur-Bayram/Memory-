import { type AppElements } from './app-elements';
import { showSettingsScreen } from './screens';

export function initHomeStart({ homeScreenRef, homeStartButtonRef, settingsScreenRef }: AppElements) {
  homeStartButtonRef.addEventListener('click', () => {
    showSettingsScreen(homeScreenRef, settingsScreenRef);
  });
}
