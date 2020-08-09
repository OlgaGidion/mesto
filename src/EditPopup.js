import PopupWithForm from './PopupWithForm.js';

class EditPopup extends PopupWithForm {
  constructor(popupSelector, validationSettings, submitFunction) {
    super(popupSelector, validationSettings);

    this._submitFunction = submitFunction;

    this._nameInput = this._popup.querySelector('.popup__input-name');
    this._jobInput = this._popup.querySelector('.popup__input-description');
  }

  open(name, job) {
    super.open();

    this._nameInput.value = name;
    this._jobInput.value = job;

    this._formValidator.validate();
  }

  _formSubmitHandler() {
    super._formSubmitHandler();

    this._submitFunction(this._nameInput.value, this._jobInput.value);
    this.close();
  }
}

export default EditPopup;