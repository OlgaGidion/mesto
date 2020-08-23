import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, submittingButtonText, handleFormSubmit }) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.button_type_submit');
    this._submittingButtonText = submittingButtonText;
    this._handleFormSubmit = handleFormSubmit;

    this._initialSubmitButtonText = this._submitButton.textContent;
  }

  open(values) {
    super.open();

    this._submitButton.textContent = this._initialSubmitButtonText;
    this._form.reset();

    Object.entries(values).forEach(([ name, value ]) => {
      const input = this._form.elements[name];
      input.value = value;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._submitButton.textContent = this._submittingButtonText;

      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
  }

  _getInputValues() {
    const values = {};

    const inputs = this._form.querySelectorAll('.input-text');
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }
}

export default PopupWithForm;