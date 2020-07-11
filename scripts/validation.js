function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((form) => {
    const submitButton = form.querySelector('.button_type_submit');
    const inputs = Array.from(form.querySelectorAll('.input-text'));

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInput(input);
        checkFormButton(submitButton, inputs);
      });
    });

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
}

function checkInput(input) {
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

function checkFormButton(button, inputs) {
  const isFormValid = !hasInvalidInput(inputs);
  if (isFormValid) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', true);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => !input.validity.valid);
}