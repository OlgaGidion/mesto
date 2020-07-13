'use strict';

function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    const submitButton = form.querySelector(settings.buttonSubmitSelector);
    const inputs = Array.from(form.querySelectorAll(settings.inputTextSelector));

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInput(input, settings);
        checkFormButton(submitButton, inputs);
      });
    });

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
}

function checkInput(input, settings) {
  const inputError = document.querySelector(`#${input.id}_error`);

  if (!input.validity.valid) {
    input.classList.add(settings.inputTextErrorClass);
    inputError.classList.remove(settings.inputErrorHiddenClass);
    inputError.textContent = input.validationMessage;
  } else {
    input.classList.remove(settings.inputTextErrorClass);
    inputError.classList.add(settings.inputErrorHiddenClass);
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

function checkValidation(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputTextSelector));
  const submitButton = form.querySelector(settings.buttonSubmitSelector);

  inputs.forEach((input) => {
    const inputError = document.querySelector(`#${input.id}_error`);

    input.classList.remove(settings.inputTextErrorClass);
    inputError.classList.add(settings.inputErrorHiddenClass);
  });

  checkFormButton(submitButton, inputs);
}