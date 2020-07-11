let validationSettings;

function enableValidation(settings) {
  validationSettings = settings;

  const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));
  forms.forEach((form) => {
    const submitButton = form.querySelector(validationSettings.buttonSubmitSelector);
    const inputs = Array.from(form.querySelectorAll(validationSettings.inputTextSelector));

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
    input.classList.add(validationSettings.inputTextErrorClass);
    inputError.classList.remove(validationSettings.inputErrorHiddenClass);
    inputError.textContent = input.validationMessage;
  } else {
    input.classList.remove(validationSettings.inputTextErrorClass);
    inputError.classList.add(validationSettings.inputErrorHiddenClass);
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

function checkValidation(form) {
  const inputs = Array.from(form.querySelectorAll(validationSettings.inputTextSelector));
  const submitButton = form.querySelector(validationSettings.buttonSubmitSelector);

  inputs.forEach((input) => {
    const inputError = document.querySelector(`#${input.id}_error`);

    input.classList.remove(validationSettings.inputTextErrorClass);
    inputError.classList.add(validationSettings.inputErrorHiddenClass);
  });

  checkFormButton(submitButton, inputs);
}