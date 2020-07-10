function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll('.input-text'));
    inputs.forEach((input) => {
      input.addEventListener('input', inputHandler);
    });
  });
}

function inputHandler(evt) {
  const input = evt.target;
  if (!input.validity.valid) {
    input.classList.add('popup__input-error');
  } else {
    input.classList.remove('popup__input-error');
  }
}
