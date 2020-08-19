import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(values = {}) {
    super.open();

    Object.entries(values).forEach(([ name, value ]) => {
      const input = this._form.elements[name];
      input.value = value;
    });
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      const values = this._getInputValues();
      this._handleFormSubmit(values);
      this.close();
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