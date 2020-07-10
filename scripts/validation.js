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
  const inputError = document.querySelector(`#${input.id}_error`);

  if (!input.validity.valid) {
    input.classList.add('input-text_error');
    inputError.classList.remove('popup__input-error_hidden');
    inputError.textContent = input.validationMessage;
  } else {
    input.classList.remove('input-text_error');
    inputError.classList.add('popup__input-error_hidden');
  }
}
