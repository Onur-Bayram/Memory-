import { themePreviewImages, type BoardSize, type GameSettings, type Player, type Theme } from './game-data';

export function initSettingsSteps(
  settingsFormRef: HTMLFormElement,
  settingsStartButtonRef: HTMLButtonElement,
  settingsStepsRef: HTMLElement,
  selectedThemeRef: HTMLElement,
  selectedPlayerRef: HTMLElement,
  selectedBoardSizeRef: HTMLElement,
  themePreviewImageRef: HTMLImageElement,
) {
  // On load, the steps should already reflect the current form state.
  updateSettingsSteps(
    settingsFormRef,
    settingsStartButtonRef,
    settingsStepsRef,
    selectedThemeRef,
    selectedPlayerRef,
    selectedBoardSizeRef,
    themePreviewImageRef,
  );

  settingsFormRef.addEventListener('change', () => {
    // Every selection updates the step bar, preview and start button.
    updateSettingsSteps(
      settingsFormRef,
      settingsStartButtonRef,
      settingsStepsRef,
      selectedThemeRef,
      selectedPlayerRef,
      selectedBoardSizeRef,
      themePreviewImageRef,
    );
  });
}

export function hasCompleteSettings(settingsFormRef: HTMLFormElement) {
  // The start button is only active when all three areas are selected.
  const formData = new FormData(settingsFormRef);

  return Boolean(formData.get('theme') && formData.get('first-player') && formData.get('board-size'));
}

export function getGameSettings(settingsFormRef: HTMLFormElement): GameSettings {
  // FormData returns generic values first, so we validate them afterwards.
  const formData = new FormData(settingsFormRef);
  const theme = formData.get('theme');
  const boardSize = Number(formData.get('board-size'));
  const firstPlayer = formData.get('first-player');

  // If the form contains something unexpected, safe defaults are used.
  return {
    theme: isTheme(theme) ? theme : 'code-vibes',
    boardSize: isBoardSize(boardSize) ? boardSize : 16,
    firstPlayer: isPlayer(firstPlayer) ? firstPlayer : 'blue',
  };
}

function updateSettingsSteps(
  settingsFormRef: HTMLFormElement,
  settingsStartButtonRef: HTMLButtonElement,
  settingsStepsRef: HTMLElement,
  selectedThemeRef: HTMLElement,
  selectedPlayerRef: HTMLElement,
  selectedBoardSizeRef: HTMLElement,
  themePreviewImageRef: HTMLImageElement,
) {
  const isComplete = hasCompleteSettings(settingsFormRef);
  // The data-label values are the texts shown in the step bar below.
  const themeLabel = getSelectedLabel(settingsFormRef, 'theme');
  const playerLabel = getSelectedLabel(settingsFormRef, 'first-player');
  const boardSizeLabel = getSelectedLabel(settingsFormRef, 'board-size');
  const selectedTheme = getSelectedTheme(settingsFormRef);

  selectedThemeRef.textContent = themeLabel ?? 'Theme';
  selectedPlayerRef.textContent = playerLabel ?? 'Player';
  selectedBoardSizeRef.textContent = boardSizeLabel ?? 'Board size';
  themePreviewImageRef.src = themePreviewImages[selectedTheme];
  themePreviewImageRef.alt = `${themeLabel ?? 'Memory'} preview`;
  // These classes control the yellow arrows and active texts in the step bar.
  settingsStepsRef.classList.toggle('settings-steps--has-theme', Boolean(themeLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-player', Boolean(playerLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-board', Boolean(boardSizeLabel));
  settingsStartButtonRef.disabled = !isComplete;
}

function getSelectedLabel(settingsFormRef: HTMLFormElement, fieldName: string) {
  // :checked finds the currently selected radio option inside a group.
  const selectedInputRef = settingsFormRef.querySelector<HTMLInputElement>(`input[name="${fieldName}"]:checked`);

  return selectedInputRef?.dataset.label;
}

function getSelectedTheme(settingsFormRef: HTMLFormElement): Theme {
  // The preview needs a theme even when the user has not selected one yet.
  const formData = new FormData(settingsFormRef);
  const theme = formData.get('theme');

  return isTheme(theme) ? theme : 'code-vibes';
}

function isBoardSize(value: number): value is BoardSize {
  // After this check, TypeScript knows that value is an allowed BoardSize.
  return value === 16 || value === 24 || value === 36;
}

function isPlayer(value: FormDataEntryValue | null): value is Player {
  // Only these two values are valid players.
  return value === 'blue' || value === 'orange';
}

function isTheme(value: FormDataEntryValue | null): value is Theme {
  // Only known themes are accepted.
  return value === 'code-vibes' || value === 'gaming' || value === 'da-projects' || value === 'foods';
}
