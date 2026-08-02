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
  // Beim Laden sollen die Steps schon den aktuellen Formularzustand anzeigen.
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
    // Jede Auswahl aktualisiert die Step-Leiste, Preview und Startbutton.
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
  // Der Startbutton darf erst aktiv sein, wenn alle drei Bereiche gewaehlt sind.
  const formData = new FormData(settingsFormRef);

  return Boolean(formData.get('theme') && formData.get('first-player') && formData.get('board-size'));
}

export function getGameSettings(settingsFormRef: HTMLFormElement): GameSettings {
  // FormData liefert erst einmal allgemeine Werte, deshalb pruefen wir sie danach.
  const formData = new FormData(settingsFormRef);
  const theme = formData.get('theme');
  const boardSize = Number(formData.get('board-size'));
  const firstPlayer = formData.get('first-player');

  // Falls etwas Unerwartetes im Formular steht, nehmen wir sichere Standardwerte.
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
  // Die data-label Werte sind die Texte, die unten in der Step-Leiste erscheinen.
  const themeLabel = getSelectedLabel(settingsFormRef, 'theme');
  const playerLabel = getSelectedLabel(settingsFormRef, 'first-player');
  const boardSizeLabel = getSelectedLabel(settingsFormRef, 'board-size');
  const selectedTheme = getSelectedTheme(settingsFormRef);

  selectedThemeRef.textContent = themeLabel ?? 'Theme';
  selectedPlayerRef.textContent = playerLabel ?? 'Player';
  selectedBoardSizeRef.textContent = boardSizeLabel ?? 'Board size';
  themePreviewImageRef.src = themePreviewImages[selectedTheme];
  themePreviewImageRef.alt = `${themeLabel ?? 'Memory'} preview`;
  // Diese Klassen steuern die gelben Pfeile und aktiven Texte in der Step-Leiste.
  settingsStepsRef.classList.toggle('settings-steps--has-theme', Boolean(themeLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-player', Boolean(playerLabel));
  settingsStepsRef.classList.toggle('settings-steps--has-board', Boolean(boardSizeLabel));
  settingsStartButtonRef.disabled = !isComplete;
}

function getSelectedLabel(settingsFormRef: HTMLFormElement, fieldName: string) {
  // :checked findet die aktuell ausgewaehlte Radio-Option in einer Gruppe.
  const selectedInputRef = settingsFormRef.querySelector<HTMLInputElement>(`input[name="${fieldName}"]:checked`);

  return selectedInputRef?.dataset.label;
}

function getSelectedTheme(settingsFormRef: HTMLFormElement): Theme {
  // Fuer die Preview brauchen wir auch dann ein Theme, wenn noch keins gewaehlt wurde.
  const formData = new FormData(settingsFormRef);
  const theme = formData.get('theme');

  return isTheme(theme) ? theme : 'code-vibes';
}

function isBoardSize(value: number): value is BoardSize {
  // TypeScript weiss nach dieser Pruefung, dass value eine erlaubte BoardSize ist.
  return value === 16 || value === 24 || value === 36;
}

function isPlayer(value: FormDataEntryValue | null): value is Player {
  // Nur diese zwei Werte duerfen als Spieler gespeichert werden.
  return value === 'blue' || value === 'orange';
}

function isTheme(value: FormDataEntryValue | null): value is Theme {
  // Nur bekannte Themes werden akzeptiert.
  return value === 'code-vibes' || value === 'gaming' || value === 'da-projects' || value === 'foods';
}
