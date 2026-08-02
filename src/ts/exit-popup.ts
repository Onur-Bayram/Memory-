export function initExitPopup() {
  // Das Popup braucht den Exit-Button, den Zurueck-Button und den Bestaetigungs-Button.
  const exitGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-game');
  const exitPopupRef = document.getElementById('exit-popup');
  const backToGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__back-button');
  const confirmExitButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__exit-button');

  if (exitGameButtonRef && exitPopupRef && backToGameButtonRef && confirmExitButtonRef) {
    exitGameButtonRef.addEventListener('click', () => {
      // Beim Klick auf Exit wird nur das Popup sichtbar.
      exitPopupRef.hidden = false;
    });

    backToGameButtonRef.addEventListener('click', () => {
      // Zurueck zum Spiel: Popup wieder verstecken.
      exitPopupRef.hidden = true;
    });

    confirmExitButtonRef.addEventListener('click', () => {
      // Fuer den Moment reicht ein Reload, weil dadurch alles auf Start zurueckgesetzt wird.
      window.location.reload();
    });
  }
}
