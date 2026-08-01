import { type BoardSize, type GameSettings, type Player, type Theme } from './game-data';

export function initSettingsSteps(
  settingsFormRef: HTMLFormElement,
  settingsStartButtonRef: HTMLButtonElement,
  settingsStepsRef: HTMLElement,
  selectedThemeRef: HTMLElement,
  selectedPlayerRef: HTMLElement,
  selectedBoardSizeRef: HTMLElement,
) {
  updateSettingsSteps(
    settingsFormRef,
    settingsStartButtonRef,
    settingsStepsRef,
    selectedThemeRef,
    selectedPlayerRef,
    selectedBoardSizeRef,
  );

  settingsFormRef.addEventListener('change', () => {
    updateSettingsSteps(
      settingsFormRef,
      settingsStartButtonRef,
      settingsStepsRef,
      selectedThemeRef,
      selectedPlayerRef,
      selectedBoardSizeRef,
    );
  });
}

export function hasCompleteSettings(settingsFormRef: HTMLFormElement) {
  const formData = new FormData(settingsFormRef);

  return Boolean(formData.get('theme') && formData.get('first-player') && formData.get('board-size'));
}

export function getGameSettings(settingsFormRef: HTMLFormElement): GameSettings {
  const formData = new FormData(settingsFormRef);
  const theme = formData.get('theme');
  const boardSize = Number(formData.get('board-size'));
  const firstPlayer = formData.get('first-player');

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
) {
  const isComplete = hasCompleteSettings(settingsFormRef);
  const themeLabel = getSelectedLabel(settingsFormRef, 'theme');
  const playerLabel = getSelectedLabel(settingsFormRef, 'first-player');
  const boardSizeLabel = getSelectedLabel(settingsFormRef, 'board-size');

  selectedThemeRef.textContent = themeLabel ?? 'Theme';
  selectedPlayerRef.textContent = playerLabel ?? 'Player';
  selectedBoardSizeRef.textContent = boardSizeLabel ?? 'Board size';
  settingsStepsRef.classList.toggle('settings-steps--has-theme', Boolean(themeLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-player', Boolean(playerLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-board', Boolean(boardSizeLabel));
  settingsStartButtonRef.disabled = !isComplete;
}

function getSelectedLabel(settingsFormRef: HTMLFormElement, fieldName: string) {
  const selectedInputRef = settingsFormRef.querySelector<HTMLInputElement>(`input[name="${fieldName}"]:checked`);

  return selectedInputRef?.dataset.label;
}

function isBoardSize(value: number): value is BoardSize {
  return value === 16 || value === 24 || value === 36;
}

function isPlayer(value: FormDataEntryValue | null): value is Player {
  return value === 'blue' || value === 'orange';
}

function isTheme(value: FormDataEntryValue | null): value is Theme {
  return value === 'code-vibes' || value === 'gaming' || value === 'da-projects' || value === 'foods';
}
