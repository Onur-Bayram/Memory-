export function initExitPopup() {
  // The popup needs the exit button, back button and confirm button.
  const exitGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-game');
  const exitPopupRef = document.getElementById('exit-popup');
  const backToGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__back-button');
  const confirmExitButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__exit-button');

  if (exitGameButtonRef && exitPopupRef && backToGameButtonRef && confirmExitButtonRef) {
    exitGameButtonRef.addEventListener('click', () => {
      // Clicking exit only shows the confirmation popup.
      exitPopupRef.hidden = false;
    });

    backToGameButtonRef.addEventListener('click', () => {
      // Back to the game: hide the popup again.
      exitPopupRef.hidden = true;
    });

    confirmExitButtonRef.addEventListener('click', () => {
      // For now a reload is enough because it resets the app to the start.
      window.location.reload();
    });
  }
}
