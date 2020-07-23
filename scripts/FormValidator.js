class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  enableValidation() {
    const submitButton = this._form.querySelector(this._settings.buttonSubmitSelector);
    const inputs = Array.from(this._form.querySelectorAll(this._settings.inputTextSelector));

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInput(input);
        this._checkFormButton(submitButton, inputs);
      });
    });

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  checkValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._settings.inputTextSelector));
    const submitButton = this._form.querySelector(this._settings.buttonSubmitSelector);

    inputs.forEach((input) => {
      input.classList.remove(this._settings.inputTextErrorClass);

      const inputError = document.querySelector(`#${input.id}_error`);
      inputError.classList.add(this._settings.inputErrorHiddenClass);
    });

    this._checkFormButton(submitButton, inputs);
  }

  _checkInput(input) {
    const inputError = document.querySelector(`#${input.id}_error`);

    if (!input.validity.valid) {
      input.classList.add(this._settings.inputTextErrorClass);
      inputError.classList.remove(this._settings.inputErrorHiddenClass);
      inputError.textContent = input.validationMessage;
    } else {
      input.classList.remove(this._settings.inputTextErrorClass);
      inputError.classList.add(this._settings.inputErrorHiddenClass);
    }
  }

  _checkFormButton(button, inputs) {
    const isFormValid = !this._hasInvalidInput(inputs);
    if (isFormValid) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  }
}

export default FormValidator;