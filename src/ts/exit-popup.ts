export function initExitPopup() {
  const exitGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-game');
  const exitPopupRef = document.getElementById('exit-popup');
  const backToGameButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__back-button');
  const confirmExitButtonRef = document.querySelector<HTMLButtonElement>('.exit-popup__exit-button');

  if (exitGameButtonRef && exitPopupRef && backToGameButtonRef && confirmExitButtonRef) {
    exitGameButtonRef.addEventListener('click', () => {
      exitPopupRef.hidden = false;
    });

    backToGameButtonRef.addEventListener('click', () => {
      exitPopupRef.hidden = true;
    });

    confirmExitButtonRef.addEventListener('click', () => {
      window.location.reload();
    });
  }
}
