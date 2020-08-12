import Popup from './Popup.js';
import FormValidator from './FormValidator.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, validationSettings) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;

    this._formValidator = new FormValidator(validationSettings, this._form);
    this._formValidator.enableValidation();
  }

  open(values) {
    super.open();

    Object.entries(values).forEach(([ name, value ]) => {
      const input = this._form.elements[name];
      input.value = value;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      const values = this._getInputValues();
      this._handleFormSubmit(values);
      this.close();
      this._form.reset();
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